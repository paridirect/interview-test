import { cloneDeep as clone, merge, isPlainObject as isObject } from 'lodash-es';
import { Primitive } from '../../types';

/**
 * Deep clone an object. This function will not mutate the object.
 * @param obj The object to clone.
 * @returns The cloned object.
 */
export const cloneDeep = <T>(obj: T): T => clone(obj);

/**
 * Check if a value is a plain object.
 * @param val The value to check.
 * @returns Whether the value is a plain object.
 */
export const isPlainObject = (val): val is Record<string, unknown> => isObject(val);

export type RecursiveToJSON<T> = T extends Primitive
  ? T
  : T extends { toJSON: () => infer U }
    ? U
    : T extends Array<infer U>
      ? Array<RecursiveToJSON<U>>
      : { [K in keyof T]: RecursiveToJSON<T[K]> | '[Circular]' };

/**
 * Convert an object to JSON friendly format that can easily be stringified in the JSON format without losing data.
 * It ignores all properties starting with an underscore.
 * Primitive types and functions are returned directly.
 * If the object has a toJSON method, it will be called and the result will be converted.
 * Circular references are detected and replaced with the string '[Circular]'.
 * Useful for logging objects.
 * This function will not mutate the object.
 * @param value The value to convert.
 * @param seen The seen values. This is used to detect circular references.
 * @returns The JSON friendly value.
 */
export const toJson = <T>(value: T, seen = new WeakSet()): RecursiveToJSON<T> => {
  // Handle primitive types and functions directly
  if (value === null || typeof value !== 'object' || typeof value === 'function') {
    return value as RecursiveToJSON<T>;
  }

  // Check for circular references
  if (seen.has(value)) {
    return '[Circular]' as RecursiveToJSON<T>;
  }
  seen.add(value);

  // Use toJSON method if available
  if ('toJSON' in value && typeof value.toJSON === 'function') {
    return toJson(value.toJSON(), seen);
  }

  // Handle arrays
  if (Array.isArray(value)) {
    return value.map((item) => toJson(item, seen)) as RecursiveToJSON<T>;
  }

  // Handle objects
  const result: Record<string, unknown> = {};
  Object.getOwnPropertyNames(value).forEach((prop) => {
    if (prop.startsWith('_')) return;
    const descriptor = Object.getOwnPropertyDescriptor(value, prop);
    if (descriptor && descriptor.value) {
      result[prop] = toJson(descriptor.value, seen);
    }
  });

  if (value instanceof Error) {
    result['name'] = value.name;
  }

  return result as RecursiveToJSON<T>;
};

/**
 * Deep freeze a plain object. This function will mutate the object.
 * It freezes the object and all its nested plain objects.
 * If the object is already frozen, it will not be mutated.
 * If the input is not a plain object, it will not be mutated.
 * @param val The object to freeze.
 * @returns The frozen object.
 */
export const deepFreeze = <T>(val: T): T => {
  if (!isPlainObject(val)) return val;

  const stack = [val];

  while (stack.length > 0) {
    const currentObj = stack.pop();

    if (!isPlainObject(currentObj)) continue;
    if (!Object.isFrozen(currentObj)) Object.freeze(currentObj);

    Object.getOwnPropertyNames(currentObj).forEach((prop) => {
      const value = (currentObj as any)[prop];

      stack.push(value);
    });
  }

  return val;
};

/**
 * Deeply remove all undefined properties from an object.
 * This function won't mutate the object.
 * @param obj The object to clean.
 * @returns The cleaned object.
 */
export const clearUndefined = <T>(obj: T): T => {
  const cleanedObject = clone(obj);

  Object.getOwnPropertyNames(cleanedObject).forEach((prop) => {
    const value = (cleanedObject as any)[prop];

    if (value === undefined) {
      delete (cleanedObject as any)[prop];
    }
  });

  return cleanedObject;
};

/**
 * Pick properties from an object.
 * @param obj The object to pick from.
 * @param keys The keys to pick.
 * @returns The picked object.
 */
export const pick = <T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const pickedObject = {} as Pick<T, K>;

  keys.forEach((key) => {
    pickedObject[key] = obj[key];
  });

  return pickedObject;
};

/**
 * Merge all sources deeply into a new object.
 * @param sources The sources to merge.
 * @returns The merged object.
 */
export const mergeAllDeep = <T>(...sources: T[]): T => merge({}, ...sources);

type GroupedBy<T, K extends keyof T> = {
  [P in T[K] extends string | number | symbol ? T[K] : never]: T[];
};

/**
 * Group an array of objects by a single property.
 * @param arr The array to group.
 * @param prop The prop to group by.
 * @returns The grouped object.
 */
export const groupByProp = <T extends Record<string, any>, K extends keyof T>(arr: T[], prop: K): GroupedBy<T, K> => {
  return arr.reduce(
    (accumulator, currentValue) => {
      const groupKey = currentValue[prop] as T[K] extends string | number | symbol ? T[K] : never;
      if (!accumulator[groupKey]) {
        accumulator[groupKey] = [];
      }
      accumulator[groupKey].push(currentValue);
      return accumulator;
    },
    {} as GroupedBy<T, K>
  );
};
