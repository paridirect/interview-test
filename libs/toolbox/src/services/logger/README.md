# Logger

Logger is composed of three main elements:

- LogLevel: An enum with all available log levels
- Logger: Abstract logger class that can be used as an interface. Never try to create an instance of Logger itself.
- LoggerFactory: The official way to create a logger

## Creating a Logger Instance

Create a logger instance using the factory.

```typescript
import { LoggerFactory } from '@market-tools/toolbox'

const logger = LoggerFactory.create()
```

Logger instance for testing with mock.

```typescript
import { LoggerFactory } from '@market-tools/toolbox/test'

const logger = LoggerTestFactory.createMock()
```

Use Logger abstract class only as interface.

```typescript
import { Logger } from '@market-tools/toolbox'

class StubClass {
  constructor(logger: Logger) {}
}
```

## Config logger environment

To config logger behavior we need to define some environment variables.

- ENV, APP_NAME and APP_VERSION for automatic data logging about environment and application.
- LOG_LEVEL to defined the minimum level to log.
- CONSOLE_LOG_TIMESTAMP to enable/disable timestamp in console logs.
- CONSOLE_LOG_APPLICATION_NAME to enable/disable application name in console logs.
- CONSOLE_LOG_DATA to enable/disable stringified JSON data in console logs.

## Using logger

Always send logs with a simple descriptive message as the first argument and structured data in the second argument.

```typescript
import { LoggerFactory, LogLevel } from '@market-tools/toolbox'

const logger = LoggerFactory.createMock()

logger.debug('Descriptive message', { ... })
logger.info('Descriptive message', { ... })
logger.warn('Descriptive message', { ... })
logger.error('Descriptive message', { ... })

// You can use the log method with LogLevel enum as well.
logger.log('Descriptive message', { ... }, LogLevel.ERROR)
```

## Data outside the box

Logger will merge automatically some data out of the box to help querying logs.
- environment (from process.env.ENV)
- application (from process.env.APP_NAME)
- version (from process.env.APP_VERSION)

```typescript
process.env.ENV = 'development'
process.env.APP_NAME = 'activities'
process.env.APP_VERSION = 'activities'

/**
 * The code bellow will send the following object as context:
 * { foo: 'bar', environment: 'development', application: 'activities' }
 */
logger.info('Descriptive message', { foo: 'bar' })
```

### Enriching logger

It is also possible to extend the logger default data with the helper enrichContext.

Useful when you want to add execution or other environment context to all logs.

```typescript
import { LoggerFactory, LogLevel } from '@market-tools/toolbox'

const logger = LoggerFactory.create()
const enrichedLogger = LoggerFactory.enrichContext(logger, {
  correlationId: 'abc'
})

enrichedLogger.info('Descriptive message', { foo: 'bar' })
```

The code above will log the following data:

```typescript
{ 
  foo: 'bar',
  correlationId: 'abc',
  environment: 'development',
  application: 'activities'
}
```
