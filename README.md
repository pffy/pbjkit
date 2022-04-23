# pbjkit

Command-line Chinese-English dictionary development kit for [Pinyinbase][pb], CC-CEDICT and more.

## Tools in pbjkit
  + [`pbj`](#pbj) - Pinyinbase Joiner
  + [`pbjson`](#pbjson) - Pinyinbase JSON document generator
  + [Making a custom CEDICT dictionary using the `xargs` command](https://github.com/pffy/pbjkit#making-a-custom-cedict-dictionary-using-the-xargs-command)

> **NOTE:** `pbj` is baking cakes from ingredients. `pbjson` is putting baked cakes into JSON packages.


# INSTALL

## Requirements
+ Requires [NodeJS][node].

```bash
$ npm i -g git+https://github.com/pffy/pbjkit.git
```
You can can also:
```bash
$ npm i -g github:pffy/pbjkit
```
# TROUBLESHOOT

  + Fixing the [EACCES error issue on Linux for Chromebook](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally).

# QUICK START

### 1. Download Pinyinbase or any other distributed CEDICT-format dictionary into your working directory:

```bash
$ git clone https://github.com/pffy/pinyinbase
```

### 2. Combine all the glossaries in the folder into a single CEDICT file:

```bash
$ pbj ./pinyinbase/vocab/*.txt
```
The output file is **pb.txt** (a CEDICT-format dictionary file).


# `pbj`

## Overview
  + Command-line Pinyinbase Joiner utility
  + Combine multiple Pinyinase glossaries into a single data source file



## Options


### `--version`
Displays the version, then exits:
```bash
$ pbj --version
```

### `--help`
Displays the help information, then exits:
```bash
$ pbj --help
```

### `-i`

Input Pinyinbase glossary files to be validated, processed, and combined.

```bash
$ pbj -i file1 file2 file3
```

`pbj` performs validation:
  + Each file must be a [valid Pinyinbase glossary](#valid-pinyinbase-glossaries).
  + Each line of a valid Pinyinbase glossary must be a CEDICT-formatted dictionary entry.

All three files will be combined into a single CEDICT-formatted file called **pb.txt.**


### `-d`
Adds epoch date to output file.
```bash
$ pbj -d -i file1 file2
```
Output file is similar to **pb-1605898061.txt.**


### `-q`
Quiet processing. 🤐
```bash
$ pbj -q -i ./folder/*.txt
```

## Valid Pinyinbase glossaries

> **NOTE:** For examples of glossary files, please visit the [Pinyinbase][pb] repo.

+ The filename must exactly match the first comment line to be a valid glossary file.
  + Otherwise, the file will be ignored by `pbj`.

+ **EXAMPLE:** `file1.txt`
   + The following is a blank AND perfectly valid glossary file.
   + Notice there are no entries in this file.
```bash
# file1.txt


```

+ **EXAMPLE:** `file2.txt`
  + The following glossary is ***invalid***. The filenames and first line comment ***do not exactly match.***
```bash
# file3.txt


```

+ **EXAMPLE:** `file8.txt`
  + The following glossary is ***valid***. The filenames and first line comment ***do exactly match.***
  + There are no valid CEDICT-formatted entires in this file.
```bash
# file8.txt
some text here whatever
more text here whatever
this is not not valid text

```

# `pbjson`

## Overview
  + Command-line **Pinyinbase JSON document** generator
  + Convert a compiled Chinese-English dictionary into a JSON file
  + Adds metapinyin data for better entry storage and retrieval

### `--version`
Shows version, then exits.
```bash
$ pbjson --version
```

### `--help`
Shows help, then exits.
```bash
$ pbjson --help
```

### `-i`

Input CEDICT-formatted dictionary files to be validated, processed, and combined.

```bash
$ pbjson -i file1 file2 file3
```

`pbjson` performs validation:
  + Each line of the input dictionary file must be a CEDICT-formatted dictionary entry; otherwise, the line is ignored.

All three files will be combined into a single JSON document called **pb.json.**


### `-d`
Adds epoch date to output file.
```bash
$ pbjson -d -i file.*txt
$ pbjson -d -i cedict1 cedict2 ./folder/*.txt
```
Output file is similar to **pb-1605898061.json.**


### `-q`
Quiet processing. 🤐
```bash
$ pbjson -q -i ./folder/*.txt
```


# Making a custom CEDICT dictionary using the `xargs` command
  + In a working directory containing Pinyinbase glossaries.

```bash
$ cd ./pinyinbase/vocab
```

  + With a custom list of glossaries in a text file called `astro1.txt`:
```
vocab-cmn-astronomy-planets-earth-moons.txt
vocab-cmn-astronomy-planets-jupiter-moons.txt
vocab-cmn-astronomy-planets-mars-moons.txt
vocab-cmn-astronomy-planets.txt
vocab-cmn-astronomy-thesun.txt
```
> **NOTE:** The text file `astro1.txt` should only contains glossary file names -- not CEDICT-formatted entries.

For example, in the `pinyinbase/vocab` folder containing a new file called `astro1.txt`:
```
parent/
  - pinyinbase/
    - vocab/  <-- YOU ARE HERE
      - astro1.txt
      - ...
```

```bash
$ xargs pbj -i < astro1.txt
```

Only the glossaries in the file `astro1.txt` are processed. The glossaries are combined into a single file called **pb.txt**.

This command pattern also works for `pbjson`.

> **PBJ vs PBJSON:** `pbj` validates Pinyinbase glossaries and CEDICT syntax and combines files.`pbjson` only validates CEDICT syntax and converts CEDICT files into JSON documents.

For example, in the `pinyinbase/vocab` folder, where the file `astro2.txt` is in the parent folder:
```
parent/
  - astro2.txt
  - pinyinbase/
    - vocab/ <-- YOU ARE HERE
    - ...
```

```bash
$ xargs pbjson -i < ../../astro2.txt
```

Only the dictionary files in the file `astro2.txt` are processed. The dictionary files are combined into a single file called **pb.json**.

### Alternative to `xargs`

As alternative to `xargs`, you can use `cat`.

In this example, the file `astro2.txt` is the parent directory along with `pinyinbase` folder:
```
parent/ <-- YOU ARE HERE
  - astro2.txt
  - pinyinbase/
    - vocab/
    - ...
```

We can extract the file list for `pbjson` using `cat` as follows:
```bash
$ pbjson -i ./pinyinbase/vocab/$(cat astro2.txt)
```

As you can see, you can build several custom CEDICT dictionaries very quickly by simply using dictionary file lists as recipes.


# Licenses
  + MIT License: https://opensource.org/licenses/MIT

[pb]: https://github.com/pffy/pinyinbase
[node]: https://nodejs.org
