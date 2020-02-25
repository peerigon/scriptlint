<img src="https://raw.githubusercontent.com/peerigon/scriptlint/master/assets/scriptlint-logo.png" width="150" height="150"><br>

[![scriptlint status](https://img.shields.io/endpoint?url=https://scriptlint.now.sh/api/shield/scriptlint/1.4.0)](https://scriptlint.now.sh/issues/scriptlint/latest)  
[![npm version badge](https://img.shields.io/npm/v/scriptlint)](https://npmjs.com/package/scriptlint)  
[![dependency badge](https://img.shields.io/librariesio/release/npm/scriptlint)](https://libraries.io/npm/scriptlint)  
[![CI badge](https://github.com/peerigon/scriptlint/workflows/ci/badge.svg)](https://github.com/peerigon/scriptlint/actions?query=workflow%3Aci)  
[![Issue badge](https://img.shields.io/github/issues/peerigon/scriptlint)](https://github.com/peerigon/scriptlint/issues)  

# scriptlint

Enforceable standards for your package.json scripts – like eslint for `npm run`

## Intro

`package.json` scripts are an integral part of the JavaScript dev experience: we use them to start our projects, run our dev environments and for all kinds of formatting, linting and tooling in general. They are just as important as our code. Yet we don't treat them with the same meticulous attention to detail. **Scripts need :heart: too!**

One of the main goals for scriptlint, was to enable people to use memorable and consistent script names across their projects. Tools like [nps](https://github.com/sezna/nps) are great when you have to organize scripts with a certain level of complexity, but they don't help you with the structure and naming of your scripts.

This is where [[the scriptlint CLI]] shines: it makes best practices outlined in this documentation enforceable throughout your project(s). Think of it as eslint for your `"scripts"` section.


## TL;DR "standard"

Here's the tl;dr of all the best practices we consider the "`scriptlint` standard"

Your `package.json`'s `"scripts"` section should…

- have a `test` script that is not the default script from `npm init`
- have a `dev` script and a `start` script
- _abstract script names from their implementation (`test`, not `jest`)_
- _use namespaces to categorize scripts (`"test:unit": "jest"`)_
- _use `:` as a namespace separator_
- _be in alphabetic or natural order_
- _have a trigger script for all hooks (if you have `preFoo`, there must be a `foo`)_
- _use `camelCase` for all script names_
- _not alias `devDependencies` (`"jest": "jest"`)_
- _not use `&&` or `&` for sequential or parallel script execution (doesn't work on all operating systems)_

(_italic = strict rule_)


## TL;DR CLI

Install locally: 

`npm install scriptlint -D` (or `yarn add scriptlint -D`)

… then run `npx scriptlint --strict` 

[Read about configuration here](https://github.com/peerigon/scriptlint/wiki/Configuration)

# Documentation
<ol>
<li><a href="https://github.com/peerigon/scriptlint/wiki/Motivation">Motivation</a></li>
<li><a href="https://github.com/peerigon/scriptlint/wiki/The-scriptlint-%22standard%22-tl%3Bdr">The
scriptlint "standard" tl;dr</a></li>
<li>
<a href="https://github.com/peerigon/scriptlint/wiki/The-scriptlint-%22standard%22">The
scriptlint
"standard"</a>
<ol>
<li>Rules enforceable via the scriptlint CLI
<ol>
<li>
<a
href="https://github.com/peerigon/scriptlint/wiki/The-scriptlint-%22standard%22#minimum-rules">Minimum
rules</a>
<ol>
<li><a
href="https://github.com/peerigon/scriptlint/wiki/The-scriptlint-%22standard%22#mandatory-start-mandatory-dev-and-mandatory-test">mandatory-start</a>
</li>
<li><a
href="https://github.com/peerigon/scriptlint/wiki/The-scriptlint-%22standard%22#mandatory-start-mandatory-dev-and-mandatory-test">mandatory-dev</a>
</li>
<li><a
href="https://github.com/peerigon/scriptlint/wiki/The-scriptlint-%22standard%22#mandatory-start-mandatory-dev-and-mandatory-test">mandatory-test</a>
</li>
<li><a
href="https://github.com/peerigon/scriptlint/wiki/The-scriptlint-%22standard%22#mandatory-start-mandatory-dev-and-mandatory-test">no-default-test</a>
</li>
</ol>
</li>
<li>Strict rules
<ol>
<li><a
href="https://github.com/peerigon/scriptlint/wiki/uses-allowed-namespace">uses-allowed-namespace</a>
</li>
<li><a
href="https://github.com/peerigon/scriptlint/wiki/alphabetic-order">alphabetic-order</a>
</li>
<li><a href="https://github.com/peerigon/scriptlint/wiki/correct-casing">correct-casing</a>
</li>
<li><a href="https://github.com/peerigon/scriptlint/wiki/no-aliases">no-aliases</a>
</li>
<li><a
href="https://github.com/peerigon/scriptlint/wiki/prepost-trigger-defined">prepost-trigger-defined</a>
</li>
<li><a
href="https://github.com/peerigon/scriptlint/wiki/no-unix-double-ampersand">no-unix-double-ampersand</a>
</li>
<li><a
href="https://github.com/peerigon/scriptlint/wiki/no-unix-single-ampersand">no-unix-single-ampersand</a>
</li>
</ol>
</li>
</ol>
</li>
<li><a href="https://github.com/peerigon/scriptlint/wiki/Best-practices">Best
practices</a></li>
</ol>
</li>
<li>The scriptlint CLI
<ol>
<li><a href="https://github.com/peerigon/scriptlint/wiki/Installation">Installation</a></li>
<li><a href="https://github.com/peerigon/scriptlint/wiki/Usage">Usage</a></li>
<li><a href="https://github.com/peerigon/scriptlint/wiki/Configuration">Configuration</a></li>
<li><a href="https://github.com/peerigon/scriptlint/wiki/Extending">Extending</a>
</li>
<li><a href="https://github.com/peerigon/scriptlint/wiki/Use-as-a-JavaScript-module">Use as a
JavaScript module</a></li>
</ol>
</li>
<li><a href="https://github.com/peerigon/scriptlint/wiki/Contributing-to-scriptlint">Contributing to
scriptlint</a></li>
</ol>

From Peerigon with :heart: