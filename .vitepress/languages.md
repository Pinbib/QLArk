# Languages

QLArk supports or will support the following languages:

|Name|Code|Ready|Link|
|:---:|:---:|:---:|:---:|
|Browser JavaScript|`js`|:white_check_mark:|[JS](#js)|
|NodeJS CommonJS|`cjs`|:x:|[CJS](#cjs)|
|NodeJS ESM|`mjs`|:x:|[MJS](#mjs)|
|Python|`py`|:x:|[PY](#py)|
|TypeScript|`ts`|:x:|[TS](#ts)|
|CSharp|`cs`|:x:|[CS](#cs)|

## JS

Each method returns a promise through which all requests are processed.

Example:

::: code-group
```xml [qlark.config.xml]
<?xml version="1.0" encoding="utf-8"?>
<QLArk>
    <namespace>Test</namespace>
    <language id="js" /> // [!code focus]
    <comment save="true" />
    <from src="./src" />
    <to src="./dist" />
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