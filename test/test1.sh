#!/usr/bin/bash

## dot test
node . --version;

## ver test
node ./pbj-cli.js --version;
node ./pbjson-cli.js --version;

## clone pinyinbase or a similar repo
## $ git clone https://github.com/pffy/pinyinbase

## simple outfile
node ./pbj-cli.js -i ./pinyinbase/vocab/*.txt
node ./pbjson-cli.js -i ./pinyinbase/vocab/*.txt

## dated outfile
node ./pbj-cli.js -d -i ./pinyinbase/vocab/*.txt
node ./pbjson-cli.js -d -i ./pinyinbase/vocab/*.txt


# node pbjson;
