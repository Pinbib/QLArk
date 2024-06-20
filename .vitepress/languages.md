---
outline: deep
---

# Languages

QLArk supports or will support the following languages:

|        Name        | Code  |       Ready        |    Link     |
|:------------------:|:-----:|:------------------:|:-----------:|
| Browser JavaScript | `js`  | :white_check_mark: |  [JS](#js)  |
|  NodeJS CommonJS   | `cjs` | :white_check_mark: | [CJS](#cjs) |
|     NodeJS ESM     | `mjs` | :white_check_mark: | [MJS](#mjs) |
|       Python       | `py`  | :white_check_mark: |  [PY](#py)  |
|     TypeScript     | `ts`  | :white_check_mark: |  [TS](#ts)  |
|       CSharp       | `cs`  |        :x:         |  [CS](#cs)  |

## JS

Each method returns a promise through which all requests are processed.

Example:

::: code-group

```xml [qlark.config.xml]
<?xml version="1.0" encoding="utf-8"?>
<QLArk>
    <namespace>Test</namespace>
    <language id="js"/> // [!code focus]
    <comment save="true"/>
    <from src="./src"/>
    <to src="./dist"/>
</QLArk>
```

```qlore [test.ql]
$ URL = http://localhost:3000
$ message
$ id

! @id : @message

POST @URL /newMessage
? message = @message
? id = @id
<<<

GET @URL /getMessage
? id = @id
<<<
```

:::

Let's process this promise:

```js
import Test from "./dist/Test.js";

Test.test("My message.", "id").then(console.log).catch(console.log);
```

We should get something like this:

```
id: My message.
[[object Object], [object Object]]
```

## CJS

Each method returns a promise through which all requests are processed. And
the [`axios`]( https://www.npmjs.com/package/axios ) npm package is used to send requests.

Example:

::: code-group

```xml [qlark.config.xml]
<?xml version="1.0" encoding="utf-8"?>
<QLArk>
    <namespace>Test</namespace>
    <language id="cjs"/> // [!code focus]
    <comment save="true"/>
    <from src="./src"/>
    <to src="./dist"/>
</QLArk>
```

```qlore [test.ql]
$ URL = http://localhost:3000
$ message
$ id

! @id : @message

POST @URL /newMessage
? message = @message
? id = @id
<<<

GET @URL /getMessage
? id = @id
<<<
```

:::

Let's process this promise:

```js
const Test = require("./dist/Test.js");

Test.test("My message.", "id").then(console.log).catch(console.log);
```

We should get something like this:

```
id: My message.
[[object Object], [object Object]]
```

And you should have a `package.json` file created with the `axios` dependency.

## MJS

Each method returns a promise through which all requests are processed. And
the [`axios`]( https://www.npmjs.com/package/axios ) npm package is used to send requests.

Example:

::: code-group

```xml [qlark.config.xml]
<?xml version="1.0" encoding="utf-8"?>
<QLArk>
    <namespace>Test</namespace>
    <language id="mjs"/> // [!code focus]
    <comment save="true"/>
    <from src="./src"/>
    <to src="./dist"/>
</QLArk>
```

```qlore [test.ql]
$ URL = http://localhost:3000
$ message
$ id

! @id : @message

POST @URL /newMessage
? message = @message
? id = @id
<<<

GET @URL /getMessage
? id = @id
<<<
```

:::

Let's process this promise:

```js
import Test from "./dist/Test.js";

Test.test("My message.", "id").then(console.log).catch(console.log);
```

We should get something like this:

```
id: My message.
[[object Object], [object Object]]
```

And you should have a `package.json` file created with the `axios` dependency.

## TS

Each method returns a promise through which all requests are processed. And
the [`axios`]( https://www.npmjs.com/package/axios ) npm package is used to send requests.

Example:

::: code-group

```xml [qlark.config.xml]
<?xml version="1.0" encoding="utf-8"?>
<QLArk>
    <namespace>Test</namespace>
    <language id="ts"/> // [!code focus]
    <comment save="true"/>
    <from src="./src"/>
    <to src="./dist"/>
</QLArk>
```

```qlore [test.ql]
$ URL = http://localhost:3000
$ message
$ id

! @id : @message

POST @URL /newMessage
? message = @message
? id = @id
<<<

GET @URL /getMessage
? id = @id
<<<
```

:::

Let's process this promise:

```js
import Test from "./dist/Test.js";

Test.test("My message.", "id").then(console.log).catch(console.log);
```

We should get something like this:

```
id: My message.
[[object Object], [object Object]]
```

And you should have a `package.json` file created with the `axios` dependency.

## PY

Each method returns an array of query responses.

Example:

::: code-group

```xml [qlark.config.xml]
<?xml version="1.0" encoding="utf-8"?>
<QLArk>
    <namespace>Test</namespace>
    <language id="py"/> // [!code focus]
    <comment save="true"/>
    <from src="./src"/>
    <to src="./dist"/>
</QLArk>
```

```qlore [test.ql]
$ URL = http://localhost:3000
$ message
$ id

! @id : @message

POST @URL /newMessage
? message = @message
? id = @id
<<<

GET @URL /getMessage
? id = @id
<<<
```

:::

Let's process this promise:

```py
from test import Test

print(Test.test("My message.", "id"))
```

We should get something like this:

```
id: My message.
[<Response [200]>, <Response [200]>]
```
