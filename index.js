// Set Regulation
let exp = regulation("--");

/**
 * Foreach
 * @param source {json}
 * @param callback {function}
 * ======== ======== ========
 */
function foreach(source, callback = () => {}) {
  // No Source
  if (source === undefined) {
    return console.error("please enter param.");
  }
  // No Call
  if (callback.constructor !== Function) {
    return console.error("callback must be function.");
  }
  // Array
  if (source.constructor === Array) {
    return source.map((value, index) => callback(value, index));
  }
  // Any (Json)
  return Object.keys(source).map(key => callback(source[key], key));
}

/**
 * Test RegExp
 * ======== ======== ========
 */
function test(value) {
  return new RegExp(exp).test(value);
}

/**
 * Setup RegExp
 * ======== ======== ========
 */
function regulation(exp) {
  // return `^${exp.replace(/\S/g, $0 => `${$0}?`)}`;
  return `^${exp}`;
}

/**
 * Parameter Processing
 * ======== ======== ========
 */
function processing(argv) {
  return argv.replace(new RegExp(exp), "");
}

/**
 * Parameter Tear
 * ======== ======== ========
 */
function tear(argv, index, origin) {
  // Set Key => Value
  let key, value;

  // Is Key-Value
  if (/\=/.test(argv)) {
    let temp = argv.split("=");
    (key = processing(temp[0])), (value = temp[1]);
  }
  // Is Value
  else {
    (key = processing(argv)), (value = origin[index + 1] || true);
  }

  // Return Json
  return {
    [key]: value
  };
}

/**
 * Factory Argvs
 * ======== ======== ========
 */
function factory(argvs) {
  // Set Result
  let result = {};
  // Loops
  foreach(argvs, (argv, index) => {
    // Only Match Mod
    if (test(argv)) {
      Object.assign(result, tear(argv, index, argvs));
    }
  });
  // Return
  return result;
}

/**
 * Get Command From Argv
 * ======== ======== ========
 */
function getCommandFromArgv() {
  // Get Argvs
  let argvs = process.argv.slice(2);
  // Return
  return factory(argvs);
}

/**
 * Get Command From Line
 * ======== ======== ========
 */
function getCommandFromLine() {
  // Get Argv
  let argvs = JSON.parse(process.env.npm_config_argv).original;
  // Return
  return factory(argvs);
}

/**
 * Get Command From Script
 * ======== ======== ========
 */
function getCommandFromScript() {
  // Get Argv
  let argvs = (
    process.env.npm_package_scripts_serve || process.env.npm_lifecycle_script
  ).split(" ");
  // Return
  return factory(argvs);
}

/**
 * Get Command
 * ======== ======== ========
 */
function getArgv(mod) {
  // Set Exp
  exp = regulation(mod);

  // Touch Argv
  if (process.argv) {
    return getCommandFromArgv();
  }

  // Another
  return {
    ...getCommandFromScript(),
    ...getCommandFromLine()
  };
}

// Export
module.exports = {
  getArgv,
  argvs: getArgv("--")
};
