---
outline: deep
---

# CLI

Available commands:

- [init](#init)
- [run](#run)
- [inspect](#inspect)
- [version](#version)

## init

`init` - is used to initialize the project and creates a configuration file.

Run:

```bash
qlark init
```

## run

`run` - starts the build of the initialized project.

Run:

```bash
qlark run
```

## inspect

`inspect` - checks the specified file.

::: tip
Since QLArk uses modified QLore, it is recommended to check files for syntax errors through this command.
:::

Run:

```bash
qlark inspect path/to/file.ql
```

Or through an alias:

```bash
qlark --i path/to/file.ql
```

## version

`version` - displays the version of QLArk on your device.

Run:

```bash
qlark version
```

Or through an alias:

```bash
qlark --v
```
