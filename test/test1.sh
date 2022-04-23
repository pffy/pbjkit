#!/usr/bin/bash

## dot test
node . --version;

## ver test
node ./pbj-cli.js --version;
node ./pbjson-cli.js --version;

## clone pinyinbase or a similar repo
if test -d pinyinbase; then echo "pb-dir-FOUND"; else echo "pb-dir-GET"; git clone https://github.com/pffy/pinyinbase; fi

## simple outfile
node ./pbj-cli.js -i ./pinyinbase/vocab/*.txt
node ./pbjson-cli.js -i ./pinyinbase/vocab/*.txt

## dated outfile
node ./pbj-cli.js -d -i ./pinyinbase/vocab/*.txt
node ./pbjson-cli.js -d -i ./pinyinbase/vocab/*.txt


# node pbjson;
