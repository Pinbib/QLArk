# Languages

QLArk supports or will support the following languages:

|        Name        | Code  |       Ready        |    Link     |
|:------------------:|:-----:|:------------------:|:-----------:|
| Browser JavaScript | `js`  | :white_check_mark: |  [JS](#js)  |
|  NodeJS CommonJS   | `cjs` | :white_check_mark: | [CJS](#cjs) |
|     NodeJS ESM     | `mjs` | :white_check_mark: | [MJS](#mjs) |
|       Python       | `py`  |        :x:         |  [PY](#py)  |
|     TypeScript     | `ts`  |        :x:         |  [TS](#ts)  |
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

# cjs

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

# mjs

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
