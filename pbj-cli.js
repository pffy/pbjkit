#!/usr/bin/env node
"use strict";
/*
 * name     : pbj-cli.js
 * job      : the Pinyinbase joiner utility
 * git      : https://github.com/pffy/pbjkit
 * author   : The Pffy Authors https://pffy.dev
 * license  : https://opensource.org/licenses/MIT
 */
const fs = require('fs');
const yargs = require('yargs');
const chalk = require('chalk');

const CedictLineParser = require('cedict-line-parser-js');

// publish dates and times
const date = new Date();
const pubdate = date.toISOString();
const pubtime = Math.floor(date.getTime() / 1000);

// array of unsorted lines
const arr = [];

// flags
const options = yargs
  .usage(chalk.bold("Usage: -i <input-files>"))
  .usage("Usage: -i <input-files> -q")
  .option("i", {
    alias: "files",
    describe: "list of files list",
    type: "array",
    demandOption: true
  })
  .option("d", {
    alias: "datedoutfile",
    describe: "is this filename dated?",
    type: "boolean",
    demandOption: false
  })
  .option("q", {
    alias: "quiet",
    describe: "is this quiet?",
    type: "boolean",
    demandOption: false
  })
  .help()
  .argv;

// check for exisiting files
const files = options.files.filter(function (fn) {
  return fs.existsSync(fn);
});

// exit if no files found
if (files.length < 1) {
  if (!options.quiet) {
    console.log('No files found. Exiting.');
  }
  process.exit();
}

// existing files
// console.log(files);

for (let f in files) {

  let filename = files[f];
  let data = '';

  try {
    data = fs.readFileSync(filename, 'utf8');
  } catch (err) {
    console.error(err);
    process.exit();
  }

  let lines = data.split(/\r\n|\n|\r/);
  let re = new RegExp('^# ' + filename.split('/').pop(), 'g');
  let isGlossaryValid = !!lines[0].match(re);

  // validation waterfall
  lines = lines.filter(function () {
    // filter out invalid glossary files
    return isGlossaryValid;
  }).filter(function (str) {
    // filter out comment lines
    return str.trim() && str.charCodeAt(0) !== 35;
  }).filter(function (str) {
    // validate remaining lines
    return CedictLineParser.parse(str).isValid;
  }).map(function (str) {
    // cleanup each line
    return str.trim();
  });

  // valid lines
  for (let i in lines) {
    arr.push(CedictLineParser.parse(lines[i]));
  }
}

// exit if no valid lines found
if (arr.length < 1) {
  if (!options.quiet) {
    console.log('No valid CEDICT lines found. Exiting.');
  }
  process.exit();
}

// begin finishing

const sorted = arr.sort(function (a, b) {
  if (a.entry.p > b.entry.p) {
    return 1;
  }

  if (a.entry.p < b.entry.p) {
    return -1;
  }

  return 0;
});

// sorted entries
const entries = [];
for (let item in sorted) {
  entries.push(sorted[item].input);
}

// combine data
let outdata = '';
outdata += getComments() + '\n';
outdata += entries.join('\n') + '\n';

// final finishing
const outfile = getOutfile();
if (!options.quiet) {
  console.log('Writing to file: [%s].', chalk.bold(outfile));
}

// write stream (for big files)
let writeStream = fs.createWriteStream(outfile);
writeStream.write(outdata, 'utf-8');
writeStream.on('finish', () => {
  if (!options.quiet) {
    console.log('Done writing to file.');
  }
});
writeStream.end();

/*
 * functions
 */

// returns simple outfile
function getOutfile() {
  return options.datedoutfile ? getDatedOutfile() : 'pb.txt';
}

// returns dated outfile
function getDatedOutfile() {
  return `pb-${pubtime}.txt`;
}

// returns comments for outfile
function getComments() {
  return `
# Your custom CEDICT-formatted dictionary.
#
# Compiled by pbj.
# https://github.com/pffy/pbjkit
#
# Powered by Pinyinbase.
# https://github.com/pffy/pinyinbase
#
#! version=1
#! subversion=0
#! format=ts
#! charset=UTF-8
#! entries=${entries.length}
#! publisher=https://pffy.dev
#! license=https://creativecommons.org/publicdomain/zero/1.0/
#! date=${pubdate}
#! time=${pubtime}`.trimLeft();
}
