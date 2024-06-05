---
outline: deep
---

# Installation

QLArk is available on Windows, Linux, MacOS:

# OS

|   OS    |             FILE              | TESTED | DOCS |
|:-------:|:-----------------------------:|:------:|:----:|
| Windows |  [HERE](https://github.com/Pinbib/QLArk/blob/main/PKG/win/QLArk.exe)  |   :white_check_mark:    |   [DOCS](#window) |
|  Linux  | [HERE](https://github.com/Pinbib/QLArk/blob/main/PKG/linux/QLArk) |   :x:    |   [DOCS](#linux) |
|  MacOS  | [HERE](https://github.com/Pinbib/QLArk/blob/main/PKG/wacos/QLArk) |   :x:    |   [DOCS](#macos) |

## Window

To work with QLArk, download this [file](https://github.com/Pinbib/QLArk/blob/main/PKG/win/QLArk.exe) to your device and move this file to the `C:/Windows/System32/` folder.
Then follow the steps [here](#after).

## Linux

To work with QLArk, download this [file](https://github.com/Pinbib/QLArk/blob/main/PKG/linux/QLArk) to your device. Then, for this, you need to transfer this file to the `/usr/bin/` folder to do this, open a terminal and run:

```bash
sudo cp QLArk /usr/bin/
```

```bash 
sudo chmod +x /usr/bin/QLArk
```

Then follow the steps [here](#after).

## MacOS

To work with QLArk, download this [file](https://github.com/Pinbib/QLArk/blob/main/PKG/macos/QLArk) to your device. Then, for this, you need to transfer this file to the `/usr/bin/` folder to do this, open a terminal and run:

```bash
sudo cp QLArk /usr/bin/
```

```bash 
sudo chmod +x /usr/bin/QLArk
```

Then follow the steps [here](#after).

## After

After installation, open a terminal and run the following command:

```bash
qlark version
```

You should get something like:

```text
QLArk: v0.0.0
```
