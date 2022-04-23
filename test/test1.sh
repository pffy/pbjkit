#!/usr/bin/bash

## dot test
echo "dot test";
echo ". --version";
node . --version;

echo "";
echo "version tests";
## version test
echo "pbj --version";
node ./pbj-cli.js --version;
echo "pbjson --version";
node ./pbjson-cli.js --version;

## clone pinyinbase or a similar repo
echo "pinyinbase working directory test";
if test -d pinyinbase; then echo "pb-dir-FOUND"; else echo "pb-dir-GET"; git clone https://github.com/pffy/pinyinbase; fi

## simple outfile
echo "simple outfile tests";
node ./pbj-cli.js -i ./pinyinbase/vocab/*.txt
node ./pbjson-cli.js -i ./pinyinbase/vocab/*.txt

## dated outfile
echo "dated outfile tests";
node ./pbj-cli.js -d -i ./pinyinbase/vocab/*.txt
node ./pbjson-cli.js -d -i ./pinyinbase/vocab/*.txt
