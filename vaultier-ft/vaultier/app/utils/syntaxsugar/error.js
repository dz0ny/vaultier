var defineError = function (defaultName, defaultMessage, defaultCode, parent, constructor) {
  defaultName = defaultName || 'CustomError';
  defaultMessage = defaultMessage || 'I am error';
  defaultCode = defaultCode || 0;
  parent = parent || Error;

  var defaultErrorConstructor = function (message = defaultMessage, code = defaultCode, previous = null) {
    this.name = defaultName;
    this.message = message;
    this.code = code;
    this.stack = new Error().stack;
    this.previous = previous;
    this.smartStack = '';
    this.smartStackNum = 0;
    this.addErrorToStack(this);
  };

  var Constructor = constructor || defaultErrorConstructor;

  Constructor.prototype = Object.create(parent.prototype);

  Constructor.prototype.withPreviousError = function (e) {
    this.previous = e;
    this.addErrorToStack(e);
    return this;
  };

  Constructor.prototype.addErrorToStack = function (e) {
    // normalize stack
    var stack = e.stack || '';
    stack = stack.substring(stack.indexOf("\n") + 1);

    // add to smart stack
    this.smartStack += "\n\n";
    this.smartStack += this.smartStackNum === 0 ? `Error: ${e.name} (${e.message}) at:` : `Previous: ${e.name} (${e.message}) at:`;
    this.smartStack += "\n";
    this.smartStack += stack;

    this.smartStackNum++;
  };

  Constructor.prototype.constructor = Constructor;

  return Constructor;
};


function NotImplementedError(message = "Not implemented") {
  this.name = "NotImplementedError";
  this.message = (message);
}
NotImplementedError.prototype = Object.create(Error.prototype);
NotImplementedError.prototype.constructor = NotImplementedError;

function PrivateError(message = "Its private") {
  this.name = "PrivateError";
  this.message = message;
  this.stack = new Error().stack;
}
PrivateError.prototype = Object.create(Error.prototype);
PrivateError.prototype.constructor = PrivateError;

function DependencyInjectionError(message = "Its private") {
  this.name = "DependencyInjectionError";
  this.message = message;
  this.stack = new Error().stack;
}
DependencyInjectionError.prototype = Object.create(Error.prototype);
DependencyInjectionError.prototype.constructor = DependencyInjectionError;

function InvalidTypeError(message = "Invalid type") {
  this.name = "InvalidTypeError";
  this.message = message;
  this.stack = new Error().stack;
}
InvalidTypeError.prototype = Object.create(Error.prototype);
InvalidTypeError.prototype.constructor = InvalidTypeError;

export var defineError;
export var NotImplementedError;
export var PrivateError;
export var DependencyInjectionError;
export var InvalidTypeError;
