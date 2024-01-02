import {
  clearUndefined,
  deepFreeze,
  cloneDeep,
  pick,
  mergeAllDeep,
  isPlainObject,
  toJson,
  groupByProp,
} from './object';

describe('Object utils unit tests', () => {
  it('should identify plain objects', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ prop: 'value' })).toBe(true);
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject(new ArrayBuffer(8))).toBe(false);
    expect(isPlainObject(new Float32Array(10))).toBe(false);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(3)).toBe(false);
    expect(isPlainObject('value')).toBe(false);
    expect(isPlainObject(true)).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
  });

  describe('toJson test function', () => {
    class NestedClass {
      constructor(public val: number) {}
      toJSON() {
        return { value: this.val };
      }
    }

    class TestClass {
      private _private = 'private';
      constructor(
        public nested: NestedClass,
        public name: string
      ) {}

      toJSON() {
        return { nested: this.nested, name: this.name.toUpperCase() };
      }
    }

    class NoToJson {
      private _private = 'private';
      constructor(public data: string) {}
    }

    it('should handle primitive types', () => {
      expect(toJson(42)).toBe(42);
      expect(toJson('string')).toBe('string');
      expect(toJson(true)).toBe(true);
      expect(toJson(null)).toBeNull();
      expect(toJson(undefined)).toBeUndefined();
    });

    it('should handle arrays', () => {
      expect(toJson([1, 2, 3])).toEqual([1, 2, 3]);
      expect(toJson(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
      expect(toJson([true, false, true])).toEqual([true, false, true]);
    });

    it('should handle objects with toJSON method', () => {
      const nested = new NestedClass(10);
      const testObj = new TestClass(nested, 'Test');
      expect(toJson(testObj)).toEqual({ nested: { value: 10 }, name: 'TEST' });
    });

    it('should handle objects without toJSON method', () => {
      const obj = new NoToJson('data');
      expect(toJson(obj)).toEqual({ data: 'data' });
    });

    it('should handle nested objects and arrays', () => {
      const complexObject = {
        number: 1,
        string: 'text',
        array: [1, 2, 3],
        object: { key: 'value' },
        classInstance: new TestClass(new NestedClass(5), 'Nested'),
      };

      expect(toJson(complexObject)).toEqual({
        number: 1,
        string: 'text',
        array: [1, 2, 3],
        object: { key: 'value' },
        classInstance: { nested: { value: 5 }, name: 'NESTED' },
      });
    });

    it('should handle objects with inherited properties', () => {
      // Create a prototype object with a property
      const prototypeObject = { inheritedProp: 'value' };

      // Create an object that inherits from prototypeObject
      const childObject = Object.create(prototypeObject);
      childObject.ownProp = 'ownValue';

      // The jsonify function should process ownProp but not inheritedProp
      expect(toJson(childObject)).toEqual({ ownProp: 'ownValue' });

      // Directly check if descriptor of inherited property is undefined
      const descriptor = Object.getOwnPropertyDescriptor(childObject, 'inheritedProp');
      expect(descriptor).toBeUndefined();
    });

    it('should handle functions', () => {
      const fn = () => {};
      expect(toJson(fn)).toBe(fn);
    });

    it('should handle objects with null prototype', () => {
      const obj = Object.create(null);
      obj.prop = 'value';
      expect(toJson(obj)).toEqual({ prop: 'value' });
    });

    it('should handle objects with getter/setter', () => {
      const obj = {
        get prop() {
          return 'value';
        },
        set prop(val) {
          (this as any)._prop = val;
        },
      };
      expect(toJson(obj)).toEqual({});
    });

    it('should handle circular references', () => {
      const obj: Record<string, unknown> = { prop: 'value' };
      obj['circular'] = obj;
      const result = toJson(obj);
      expect(result).toEqual({ prop: 'value', circular: '[Circular]' });
    });

    it('should handle objects with properties having undefined descriptors', () => {
      const obj: Record<string, unknown> = {};
      // Define a property with no value and no setter
      Object.defineProperty(obj, 'undefinedProp', {
        get() {
          return undefined;
        },
        enumerable: true,
      });

      obj['ownProp'] = 'ownValue';

      // The jsonify function should process ownProp but not undefinedProp
      const result: any = toJson(obj);
      expect(result).toEqual({ ownProp: 'ownValue' });
      expect('undefinedProp' in result).toBeFalsy();

      // Directly check if descriptor of undefinedProp is defined but value is undefined
      const descriptor = Object.getOwnPropertyDescriptor(obj, 'undefinedProp');
      expect(descriptor).toBeDefined();
      expect(descriptor?.value).toBeUndefined();
    });

    it('should handle errors', () => {
      const error = new Error('test error', { cause: new Error('cause error') });
      expect(toJson(error)).toEqual({
        name: 'Error',
        message: 'test error',
        stack: expect.any(String),
        cause: { name: 'Error', message: 'cause error', stack: expect.any(String) },
      });
    });
  });

  describe('deep freeze test function', () => {
    it('should deep freeze object', () => {
      let obj = {
        prop: 'value',
        nested: {
          prop: 'value',
        },
      } as any;

      const frozenObject = deepFreeze(obj);

      expect(() => (obj.prop = 'newValue')).toThrow();
      expect(() => (obj.nested.prop = 'newValue')).toThrow();
      expect(obj).toStrictEqual(frozenObject);

      expect(() => (obj = {})).not.toThrow();
    });

    it('should deep freeze even if a previous first layer is frozen already', () => {
      let obj = Object.freeze({
        prop: 'value',
        nested: Object.freeze({
          prop: 'value',
          nested: {
            prop: 'value',
          },
        }),
      } as any);

      const frozenObject = deepFreeze(obj);

      expect(() => (obj.prop = 'newValue')).toThrow();
      expect(() => (obj.nested.prop = 'newValue')).toThrow();
      expect(() => (obj.nested.nested.prop = 'newValue')).toThrow();
      expect(obj).toStrictEqual(frozenObject);

      expect(() => (obj = {})).not.toThrow();
    });

    it('should not deep freeze', () => {
      let value = 3;

      const frozenValue = deepFreeze(value);

      expect(() => (value = 2)).not.toThrow();
      expect(value).toBe(2);
      expect(frozenValue).toBe(3);
    });

    it('should clean undefined', () => {
      const obj = {
        prop: 'value',
        undef: undefined,
      } as any;

      const cleanedObject = clearUndefined(obj);

      expect(cleanedObject).toStrictEqual({ prop: 'value' });
    });

    it('should clone object deeply', () => {
      const obj = {
        prop: 'value',
        nested: {
          prop: 'value',
        },
      } as any;

      const clonedObject = cloneDeep(obj);

      expect(clonedObject).toStrictEqual(obj);
      expect(clonedObject).not.toBe(obj);
      expect(clonedObject.nested).not.toBe(obj.nested);
    });

    it('should clone scalars', () => {
      expect(cloneDeep(3)).toBe(3);
      expect(cloneDeep('value')).toBe('value');
      expect(cloneDeep(true)).toBe(true);
      expect(cloneDeep(null)).toBe(null);
      expect(cloneDeep(undefined)).toBe(undefined);
    });

    it('should pick properties', () => {
      const obj = {
        prop: 'value',
        foo: 'bar',
        nested: {
          prop: 'value',
        },
      };

      const pickedObject = pick(obj, ['prop', 'nested']);

      expect(pickedObject).toStrictEqual({ prop: 'value', nested: { prop: 'value' } });
    });

    it('should not freeze unfrozen instances', () => {
      const nonWritableObject = new Float32Array(10);

      const frozenNonWritableObject = deepFreeze(nonWritableObject);
      expect(nonWritableObject === frozenNonWritableObject).toBe(true);
    });
  });

  describe('mergeAllDeep function', () => {
    it('should merge all properties deeply', () => {
      const source1: Record<string, any> = { a: 1, b: { c: 2 } };
      const source2: Record<string, any> = { b: { d: 3 }, e: 4 };
      const source3: Record<string, any> = { a: 5, b: { c: 6, e: 7 }, f: 8 };

      const result = mergeAllDeep(source1, source2, source3);

      expect(result).toStrictEqual({
        a: 5,
        b: {
          c: 6,
          d: 3,
          e: 7,
        },
        e: 4,
        f: 8,
      });
    });

    it('should not mutate the source objects', () => {
      const source1: Record<string, any> = { a: 1, b: { c: 2 } };
      const source2: Record<string, any> = { b: { d: 3 }, e: 4 };
      const source3: Record<string, any> = { a: 5, b: { c: 6, e: 7 }, f: 8 };

      const source1Clone = cloneDeep(source1);
      const source2Clone = cloneDeep(source2);
      const source3Clone = cloneDeep(source3);

      mergeAllDeep(source1, source2, source3);

      expect(source1).toStrictEqual(source1Clone);
      expect(source2).toStrictEqual(source2Clone);
      expect(source3).toStrictEqual(source3Clone);
    });

    it('should return an empty object when no sources are provided', () => {
      const result = mergeAllDeep();

      expect(result).toStrictEqual({});
    });
  });

  describe('groupBy function', () => {
    const people = [
      { name: 'Alice', age: 30, city: 'London' },
      { name: 'Bob', age: 30, city: 'Paris' },
      { name: 'Charlie', age: 25, city: 'London' },
      { name: 'Diana', age: 25 },
    ];

    it('groups items by a number property', () => {
      const result = groupByProp(people, 'age');
      expect(Object.keys(result)).toEqual(['25', '30']);
      expect(result[30]).toEqual([
        { name: 'Alice', age: 30, city: 'London' },
        { name: 'Bob', age: 30, city: 'Paris' },
      ]);
      expect(result[25]).toHaveLength(2);
    });

    it('groups items by a string property', () => {
      const result = groupByProp(people, 'city');
      expect(Object.keys(result)).toEqual(['London', 'Paris', 'undefined']);
      expect(result['London']).toHaveLength(2);
      expect(result['Paris']).toHaveLength(1);
      expect(result['undefined']).toHaveLength(1);
    });

    it('handles empty arrays', () => {
      const result = groupByProp([], 'age');
      expect(result).toEqual({});
    });

    it('handles array with one item', () => {
      const result = groupByProp([people[0]], 'age');
      expect(result).toEqual({ '30': [people[0]] });
    });
  });
});
