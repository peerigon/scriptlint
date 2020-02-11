# scriptlint

Enforceable standards for your package.json scripts – like eslint for `npm run`


[![npm version badge](https://img.shields.io/npm/v/scriptlint)](npmjs.com/package/scriptlint)  
[![dependency badge](https://img.shields.io/librariesio/release/npm/scriptlint)](https://libraries.io/npm/scriptlint)  
[![CI badge](https://github.com/peerigon/scriptlint/workflows/ci/badge.svg)](https://github.com/peerigon/scriptlint/actions?query=workflow%3Aci)  
[![Issue badge](https://img.shields.io/github/issues/peerigon/scriptlint)](https://github.com/peerigon/scriptlint/issues)  

## Intro

There are quite a few pitfalls when it comes to using `package.json` scripts:

- **memorable** and **consistent** script naming, also across projects
- using **hooks** correctly (`pre*`/`post*`)
- making your scripts **platform independent**
- working with devDependencies

`scriptlint` provides a workable standard set of rules including a toolkit to also enforce these rules. Think of a linter for your `package.json`'s `"scripts"` section.

## CLI basics

You can install the `scriptlint` CLI tool locally or globally

### Local installation  (recommended)
Install with `npm install scriptlint -D` / `yarn add scriptlint -D` and add a linting script to your `package.json`:


```
"scripts": {
    ...
    "test:lint:scripts": "scriptlint",
    ...
  },
```

You can also add this as a pre-run to husky or as a precommit-hook.

### Global installation

Install with `npm install scriptlint -g` / `yarn global add scriptlint` and then run with `scriptlint`.


### Available rules

```
alphabetic-order           scripts should be in a-z order
correct-casing             script name must be camel case
mandatory-dev              must contain a "dev" script
mandatory-start            must contain a "start" script
mandatory-test             must contain a "test" script
no-aliases                 don't alias binaries, use npx/yarn instead
no-default-test            `test` script can't be the default script
no-rm-rf                   forbid use of `rm -rf` in favor of rimraf
no-double-ampersand        forbid `&&` for script sequences in favor of npm-run-all
no-single-ampersand        forbid `&` for script parallelization in favor of npm-run-all
prepost-trigger-defined    custom hooks must not be missing their trigger scripts
uses-allowed-namespace     script name should start with one of the allowed namespaces
```

### CLI options

```
Usage: scriptlint [options] <packageFile>

Options:
  -V, --version  output the version number
  -s, --strict   strict mode
  -j, --json     JSON output
  -c, --config   inspect the config
  -f, --fix      autofixing
  -h, --help     output usage information
```

#### Examples

**Find problems in the current directory's `package.json`:**  
`scriptlint`

**Find problems in the current directory's `package.json` in strict mode:**  
`scriptlint --strict` or `scriptlint -s`

**Fix autofixable problems in the current directory's `package.json` in strict mode:**  
`scriptlint --fix`

**Find problems in a specific `package.json`:**  
`scriptlint ~/foo/project-dir/package.json`

and so on...

### Project configuration

Configuration can be loaded from a `package.json` property (`scriptlint`), a `.scriptlintrc` (as JSON), or a `scriptlint.js` (CommonJS module). Check the [cosmiconfig docs](https://github.com/davidtheclark/cosmiconfig#explorersearch) for an explanation how this works.

This is the default:

```json
{
	"strict": false,
	"fix": false,
	"config": false,
	"json": false,
	"rules": {},
	"ignoreScripts": [],
	"customRules": []
}
```


#### `strict`

This defines what set of rules will be used. Non-strict means minimum rules, `"strict": true` uses all of the default rules available. See [below](#minimum-rules) for in depth explanation for each rule

Turn a rule on/off like this:

```json
{
	"strict": true,
	"rules": {
		"uses-allowed-namespace": false
	}
}
```

#### `json`

Output the issues in a json format

```json
[
  …
  {
    "message": "Use of unix double ampersand (&&) in script 'test' is not allowed, consider using npm-run-all/run-s (no-unix-double-ampersand)",
    "type": "warning",
    "affected": "test"
  }
  …
]
```

#### `config`

Print the config as json for debugging purposes.

#### `fix`

🚨 **This alters the contents of your `package.json`, only use it in a version controlled environment!**

Attempt to fix all found issues. Not every rule has a autofix function ready, but some do. 

#### ignore scripts

```json
{
	"strict": true,
	"ignoreScripts": ["my-funny-scriptname"]
}
```

Scripts in this list will be exempt from linting.

#### custom rules

You can add custom rule implementations in your config. `customRules` is an array of objects like this:

```js
{
	// your custom rule's name
	name: string,
	
	// is the rule looking at an individual script or the whole scripts object
	isObjectRule: boolean,
	
	// the error message if the validation fails for this rule, uses template tags {{name}} (and {{names}} for object rules)
	message: string,
	
	// the validation function for the rule
	// for object rules it returns the failing scripts on fail
	// if isObjectRule === true: (scripts: Object) => true | Array<string>
	// for script rules it returns true or false
	// if isObjectRule === false: (key: string, script: string, scripts: Object) => boolean
	validate: function
	
	// if the problem is autofixable, provide a fix function here
	// for object rules it returns a fixed scripts object
	// for script rules it returns an array with [key: string, value: string]
	fix: function
}
```

As a speaking example here's a custom config (`.scriptlintrc.js`) to override the `camelCase` rule and replace it with a `kebab-case` one:

```js
module.exports = {
  rules: {
    "correct-casing": false,
    "correct-kebab-casings": true
  },
  customRules: [
    {
      name: "correct-kebab-casings",
      isObjectRule: false,
      message: "`{{name}}`: Script name must be kebab case",
      validate: name => /^[\d:a-z\-]+$/.test(name)
    }
  ]
};

```

## Minimum rules

There are two stages of scriptlint compliance: a default, minimum one and a `strict` one. The default "rules" are very simple:

### 1. mandatory scripts

Every `package.json` has to have at least these 3 scripts:

```json
{
...
	"scripts": {
		"start": "...",
		"test": "...",
		"dev": "...",
	}
...
}
```
☑️

**Note:** if you have a project, where having for example a `start` script doesn't make sense, feel free to alias it to something else like `dev` or you keep it as a stub, for example `"start": "echo \"start what?\""`. 

### 2. the test script is not the default one from `npm init`

```json
{
...
	"scripts": {
		...
		"test": "echo \"Error: no test specified\" && exit 1"
		...
	}
...
}
```
❗️

Reasoning: Every project has at least one method of quick code verification. When in doubt, try to alias it to your build script, that's better than nothing.

That's it for the default rules! They should be relatively easy to follow and not require a lot of changes to get your project up to standard. When you've worked those out, it's time to switch over to strict mode:


```json
{
	"scriptlint": {
		"strict": true
	}
}
```

In your `package.json`, see below for other configuration options.

### 3. How to name scripts

#### Use categories, subcategories and `:`

To better signify, what category a script belongs to, prefix it with one of these categories:

- `build`
- `dev`
- `format`
- `other`
- `report`
- `setup`
- `start`
- `test`

So for example if you want to name a script that runs your unit tests: `test:unit`. `eslint` would be called from `format:lint`.

**Of course category names themselves can (sometimes must) be script names!** For example `build` or `test`. In those cases they often serve as a sequence of subscripts, like here:


```
"scripts": {
    ...
    "test": "npm run test:unit && npm run test:lint",
    "test:unit": "...",
    "test:lint": "...",
    ...
  },
```
This is great practice!

You can also use more then one cateogry and/or subcategory. This is rare, but sometimes something like `test:unit:watch:all` comes in handy.

Anything that doesn't fit in these categories can go in `other`.

#### keep 'em readable

The semantic of your subcategories is totally up to you, it is still good avdice to keep things readable yet abstract: for example, try to use a dependency's category instead of its' actual name: `test:lint` ☑️ instead of `test:eslint` ❗️


#### use camelCase

Since npm does it, we should do it:

- `prepublishOnly` ☑️
- `test:unit:watchAll` ☑️
- `test-unit` ❗️
- `lint_fix` ❗️

#### Notes
- of course all the [default hooks and scripts](https://docs.npmjs.com/misc/scripts) are fine as they are
- Scripts like this `"eslint": "eslint"` used to be common to make dependencies executable with `npm run`. Since [`npx`](https://www.npmjs.com/package/npx) (and with yarn of course) this is obsolete. There's a lint rule in the CLI for this.
- scripts that start with `pre*` or `post*` should only be used as hooks for built-in commands or other scripts

## scriptlint as a module dependency

You can install scriptlint as a dependency and call it as a function like this:

```js
const scriptlint = require("scriptlint");

const scriptlintIssues = scriptlint({
	strict: true,
	packageFile: "/Users/foobar/project-dir"
});

```
The function returns found issues as an array:

```js
[
  {
    "message": "must contain a \"start\" script (mandatory-start)",
    "type": "warning",
    "affected": false // script name or false for object rules
  },
  {
    "message": "Use of unix double ampersand (&&) in script 'test' is not allowed, consider using npm-run-all/run-s (no-unix-double-ampersand)",
    "type": "warning",
    "affected": "test"
  }
]
```

## local dev

- `yarn install`
- `yarn build`
- `yarn link`
- `yarn dev`
- in another project `yarn link "scriptlint"`
- in that project's `package.json`:

```
"scripts": {
    …
    "test:lint:scripts": "scriptlint",
    …
  },
```

Then run with `yarn test:lint:scripts` to see the problems in that project's package scripts.
