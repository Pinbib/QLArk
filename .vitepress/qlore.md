---
outline: deep
---

# QLore

QLArk uses a slightly modified version of QLore. The most modified are modules (emmit mode has appeared) and comments.

## Emmit

It is recommended to create script files in the same folder as the configuration file because there may be problems with the modules, but to prevent such problems there is an emmit mode that disables the module check.
To enable this mode, the following symbol `~` is used.

For example, we have the following file structure:

```
test
├─ src
│  ├─ test.ql
├─ myModule.js
└─ qlark.config.xml
```

::: code-group 

```xml [qlark.config.xml]
<?xml version="1.0" encoding="utf-8"?>
<QLArk>
    <namespace>EmmitMode</namespace>
    <language id="js" />
    <comment save="true" />
    <from src="./src" />
    <to src="./dist" />
</QLArk>
```

```js [myModule.js]
module.exports = (args)=>args.join(" ");
```

```qlore [src/test.ql]
# myModule ../myModule.js

$ text :: myModule Hello, World!

! @text
```

:::

```bash
qlark run
```

You will get something like this:

```
An error occurred during construction: The file: /path/to/myModule.js does not exist. // [!code warning]
```

The following code would be correct:

::: code-group 
```qlore [src/test.ql]
# myModule ./myModule.js

$ text :: myModule Hello, World!

! @text
```
:::

But mistakes may occur in the future.Therefore, it is recommended to use emmit mod in such cases:

::: code-group 
```qlore [src/test.ql]
~
# myModule ../myModule.js

$ text :: myModule Hello, World!

! @text
```
:::

It is also recommended to use after building through QLArk, if you use modules use a collector of type Webpack, Rollup for JavaScript...

## Comments 

Comments are defined by two slashes `//`. You can specify in the configuration file whether comments will be saved or not.

Example:

```qlore
// This is a comment
```

## Arguments

QLArk has the principle that each file is a method, and a method can have arguments. 
All empty changes will be considered as arguments, i.e.:

::: code-group 

```xml [qlark.config.xml]
<?xml version="1.0" encoding="utf-8"?>
<QLArk>
    <namespace>Test</namespace>
    <language id="js" />
    <comment save="true" />
    <from src="./src" />
    <to src="./dist" />
</QLArk>
```

```qlore [src/test.ql]
$ arg1

! @arg1
```

:::

```bash 
qlark run
```

File `Test.js` should be built, which will contain object `Test` and a static method `test` with the argument `arg1` (`Test.test(arg1: String)`).

An example of a building in `js`(Browser JavaScript):

```js
class Test {
	static test(arg1){
        // ...
	}
}

export default Test;
```