import winston, { transports } from "winston";

const customLevelOpt = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    fatal: "red",
    error: "magenta",
    warning: "blue",
    info: "green",
    debug: "yellow",
  },
};

const logger = winston.createLogger({
  levels: customLevelOpt.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./Errors.log",
      level: "fatal",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./errors.log",
      level: "error",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "./loggers.log",
      level: "warning",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors }),
        winston.format.simple()
      ),
    }),

    new winston.transports.File({
      filename: "./loggers.log",
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOpt.colors.info }),
        winston.format.simple()
      ),
    }),
  ],
});

export const addlogger = (req, res, next) => {
  (req.logger = logger),
    req.logger.info(
      `${req.method} es ${req.url} - ${new Date().toLocaleDateString()}`
    );
  next();
};
