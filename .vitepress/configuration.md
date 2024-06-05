---
outline: deep
---

# Configuration

QLArk uses a configuration file `qlark.config.xml` to understand where to get files from, what to generate, and where to save.

# Init

To quickly create a configuration, there is a command: 

```bash
qlark init
``` 

After executing this command, several questions will be asked, and then a configuration will be created that will look something like this:

<<< @/qlark.config.xml

## QLArk

All further information about the project should be in tag `<QLArk>`:

<<< @/qlark.config.xml{2,8}

::: tip Missing
If this tag is missing, you will receive the following message:

```
An error occurred while reading the configuration: Config.QLArk does not exist... // [!code error]
```
:::

### Namespace

The `<namespace>` tag specifies the name under which the object will be generated, exported and collected in a file with the following name:


<<< @/qlark.config.xml{3}

::: tip Missing
If this tag is missing, you will receive the following message:

```
An error occurred while reading the configuration: QLArk.namespace does not exist... // [!code error]
```
:::

::: tip Empty
If this tag is empty, you will receive the following message:

```
An error occurred while reading the configuration: QLArk.namespace cannot be empty... // [!code error]
```
:::

### Language

In this tag `<language>`, the `id` argument specifies the language in which the API will be built ((supported languages)[/languages]):

<<< @/qlark.config.xml{4}

::: tip Missing
If this tag is missing, you will receive the following message:

```
An error occurred while reading the configuration: QLArk.language does not exist... // [!code error]
```
:::

::: tip Missing id argument
If argument `id` is missing from this tag, you will get the following message:

```
An error occurred while reading the configuration: QLArk.language["id"] cannot be empty... // [!code error]
```
:::

::: tip The language is not supported
If the specified language is not supported, you will receive the following message:

```
Builder {id} does not exist or it was incorrectly specified... // [!code warning]
```
:::

### Comment

This tag is optional, it specifies a boolean value (`true` or `false`) in argument `save` whether comments will be kept:

<<< @/qlark.config.xml{5}

### Direction (from, to)

The `<from>` and `<to>` tags in argument `src` indicate the path, respectively, from where the files will be taken and where they will be built:

<<< @/qlark.config.xml{6,7}

::: warning
If you have a similar project structure:
```
.
├─ src
│  ├─ folder
│  │  └─ f.ql
│  ├─ test.ql
└─ qlark.config.xml
```

And in your configuration file, tag `<from>` is specified like this:

```xml
<from src="./src"/>
```

Only file `test.ql` will be processed.
:::

::: tip Missing `<from>`
If tag `<from>` is missing, you will receive the following message:

```
An error occurred while reading the configuration: QLArk.from does not exist... // [!code error]
```
:::

::: tip Missing `<to>`
If tag `<to>` is missing, you will receive the following message:

```
An error occurred while reading the configuration: QLArk.to does not exist... // [!code error]
```
:::

::: tip Missing src argument in tag `<from>`
If argument `src` is missing from this tag, you will get the following message:

```
An error occurred while reading the configuration: QLArk.from["src"] cannot be empty... // [!code error]
```
:::

::: tip Missing src argument in tag `<to>`
If argument `src` is missing from this tag, you will get the following message:

```
An error occurred while reading the configuration: QLArk.to["src"] cannot be empty... // [!code error]
```
:::

::: tip If the path in argument `src` in tag `<from>` does not exist
If the path in argument `src` in tag `<from>` does not exist, you will get the following message:

```
An error occurred while reading the configuration: QLArk.from["src"] path does not exist or is not a directory... // [!code error]
```
:::