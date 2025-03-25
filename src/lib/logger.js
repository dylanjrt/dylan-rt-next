/**
 * Simple logger utility for application-wide logging
 *
 * Provides methods for different log levels with lazy formatting
 * to avoid unnecessary string interpolation
 */
const logger = {
  /**
   * Log info level messages
   *
   * @param {string} message - Message template with %s placeholders
   * @param {...any} args - Values to replace placeholders
   */
  info: (message, ...args) => {
    console.log(`[INFO] ${formatMessage(message, args)}`);
  },

  /**
   * Log error level messages
   *
   * @param {string} message - Message template with %s placeholders
   * @param {...any} args - Values to replace placeholders
   */
  error: (message, ...args) => {
    console.error(`[ERROR] ${formatMessage(message, args)}`);
  },

  /**
   * Log warning level messages
   *
   * @param {string} message - Message template with %s placeholders
   * @param {...any} args - Values to replace placeholders
   */
  warn: (message, ...args) => {
    console.warn(`[WARN] ${formatMessage(message, args)}`);
  },

  /**
   * Log debug level messages
   *
   * @param {string} message - Message template with %s placeholders
   * @param {...any} args - Values to replace placeholders
   */
  debug: (message, ...args) => {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[DEBUG] ${formatMessage(message, args)}`);
    }
  },
};

/**
 * Helper function to format log messages
 *
 * @param {string} message - Message template with %s placeholders
 * @param {Array<any>} args - Values to replace placeholders
 * @returns {string} Formatted message
 */
function formatMessage(message, args) {
  if (!args || args.length === 0) return message;

  return message.replace(/%s/g, () => {
    return args.shift() !== undefined ? args.shift() : "%s";
  });
}

export default logger;
