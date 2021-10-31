# process-env-argv

Get commands from `argv` or `env` in `process` by specifying the formatting

```sh
npm i process-env-argv
# or
yarn add process-env-argv
```

## ::1st way

```js
const { getArgv } = require("process-env-argv");

const argvs = getArgv("--");

if (argvs.command === "help") {
  // do something ...
}
```

## ::2nd way

> Use default rule: `--`

```js
const { argvs } = require("process-env-argv");

if (argvs.command === "help") {
  // do something ...
}
```
