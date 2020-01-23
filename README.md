# scriptlint

an enforceable script naming standard for your package.json scripts

## intro

When frequently switching between projects, keeping track run/dev commands and helper scripts is hard. Was it `npm run dev` or `npm run start:development`? Was it `yarn lint` or `yarn eslint`? Until now, there's no convention or standard to follow or enforce but now there is! This document aims to define an easy to comply style guide how to name (and use) your package scripts, as well as a enforceable set of rules to improve their intuitive use. We created a CLI tool to lint your package scripts, so to speak.

## minimum rules

There are two stages of scriptlint compliance: `default` and `strict`. The default "rules" are very simple:

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
		"extends": ["scriptlint/strict"]
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

## the CLI

The CLI can help you enforce these rules. Install it with `npm install scriptlint -D`/`yarn add scriptlint -D` and add a linting script to your `package.json`:


```
"scripts": {
    ...
    "test:lint:scripts": "scriptlint",
    ...
  },
```

You can also add this as a pre-run to husky or as a precommit-hook.

### configuration

Configuration can be loaded from a `package.json` property (`scriptlint`), `.scriptlintrc` (as JSON), or `scriptlint.js` (CommonJS module). This is the default:

```json
{
	"extends": ["scriptlint/default"],
	"rules": {},
	"ignoreScripts": []
}
```

#### `extends`

This defines what set of rules will be used. The default one only enforces the minimum rules, `scriptlint/strict` uses all of the rules.

#### rules

```
mandatory-start            must contain a "start" script
mandatory-test             must contain a "test" script
mandatory-dev              must contain a "dev" script
no-default-test            `test` script can't be the default script
correct-casing             script name must be camel case
no-aliases                 don't alias binaries, use npx/yarn instead
uses-allowed-namespace     script name should start with one of the allowed namespaces
prepost-trigger-defined    custom hooks must not be missing their trigger scripts
```

Turn a rule on/off like this:

```json
{
	"extends": "scriptlint/strict",
	"rules": {
		"uses-allowed-namespace": false
	}
}
```

#### ignore scripts

```json
{
	"extends": "scriptlint/strict",
	"ignoreScripts": ["my-funny-scriptname"]
}
```

Scripts in this list will be exempt from linting.


## local dev

- `yarn install`
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