const LEVELS = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

let currentLevel = process.env.LOG_LEVEL?.toLowerCase() || 'info';
if (!LEVELS[currentLevel]) {
  currentLevel = 'info';
}

function getTimestamp() {
  return new Date().toISOString();
}

function shouldLog(level) {
  return LEVELS[level] >= LEVELS[currentLevel];
}

function formatMessage(level, args) {
  const prefix = `${getTimestamp()} [${level.toUpperCase()}]`;
  return [prefix, ...args].join(' ');
}

function log(level, ...args) {
  if (!LEVELS[level]) {
    throw new Error(`Unknown log level: ${level}`);
  }
  if (!shouldLog(level)) {
    return;
  }
  const message = formatMessage(level, args.map(String));
  if (level === 'error') {
    console.error(message);
  } else if (level === 'warn') {
    console.warn(message);
  } else {
    console.log(message);
  }
}

function debug(...args) {
  log('debug', ...args);
}

function info(...args) {
  log('info', ...args);
}

function warn(...args) {
  log('warn', ...args);
}

function error(...args) {
  log('error', ...args);
}

function setLogLevel(level) {
  const normalized = String(level || '').toLowerCase();
  if (!LEVELS[normalized]) {
    throw new Error(`Invalid log level: ${level}`);
  }
  currentLevel = normalized;
}

module.exports = {
  debug,
  info,
  warn,
  error,
  setLogLevel,
  getLogLevel: () => currentLevel,
};
