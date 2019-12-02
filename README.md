# scriptlint
an enforceable script naming standard for package.json

## standards

**TBD**

## the CLI

### local dev

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