const consoleLog = console.log.bind(console);

function jsonAppender(tokens) {
  tokens = tokens || {};

  return function (loggingEvent) {
    const additionalProperties = {};
    for (let key in tokens) {
      const value = tokens[key];
      if (typeof (value) === 'function') {
        const result = value(loggingEvent);
        additionalProperties[key] = result;
        continue;
      }
      if (typeof (value) !== 'undefined') {
        additionalProperties[key] = value;
      }
    }

    const logObject = {
      level: loggingEvent.levelStr,
      date: loggingEvent.startTime
    }

    for (let key in additionalProperties) {
      logObject[key] = additionalProperties[key];
    }

    const strings = [];

    loggingEvent.data.forEach(x => {
      if (typeof (x) === 'object') {
        logObject.data = x;
        return;
      }

      if (typeof (x) !== 'undefined') {
        strings.push(x);
      }
    });

    logObject.message = strings.join(' ');

    consoleLog(JSON.stringify(logObject));
  };
}

function configure(config) {
  return jsonAppender(config.tokens);
}

exports.appender = jsonAppender;
exports.configure = configure;
