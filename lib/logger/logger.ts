import isEqual from "lodash/isEqual";
import { ArrayItem } from "@/lib/util/types";

const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;

const SILENT = "silent";

export type LogLevel = ArrayItem<typeof LOG_LEVELS>;

export type LogLevelSetting = LogLevel | typeof SILENT;

export type LogMessage = string | Error;

export type LogMetadata = Record<string, any>;

export interface Log {
  message: LogMessage;
  level: LogLevel;
  metadata: LogMetadata;
}

interface LoggerEvents {
  log: Log & { contextName: string };
}

const getLogSequence = (level: LogLevel) => LOG_LEVELS.indexOf(level);

const validateLevel = <IsSetting extends boolean = false>(
  level: string,
  isSetting: IsSetting = false as IsSetting
): level is IsSetting extends true ? LogLevelSetting : LogLevel => {
  const isValid =
    (isSetting && level === SILENT) || getLogSequence(level as LogLevel) > -1;
  if (!isValid) {
    console.warn(new Error(`Invalid log level '${level}'`));
  }
  return isValid;
};

const isLevelAtLeast = (level: LogLevel, levelSetting: LogLevelSetting) =>
  levelSetting !== SILENT &&
  getLogSequence(level) >= getLogSequence(levelSetting);

interface LoggerOptions {
  printLevel?: LogLevelSetting;
  contextName?: string;
}

export class Logger {
  get printLevel() {
    return this._printLevel;
  }

  set printLevel(level: LogLevelSetting) {
    if (validateLevel(level)) {
      this._printLevel = level;
    }
  }

  debug(message: LogMessage, metadata?: LogMetadata) {
    this.log("debug", message, metadata);
  }

  info(message: LogMessage, metadata?: LogMetadata) {
    this.log("info", message, metadata);
  }

  warn(message: LogMessage, metadata?: LogMetadata) {
    this.log("warn", message, metadata);
  }

  error(message: LogMessage, metadata?: LogMetadata) {
    this.log("error", message, metadata);
  }

  log(level: LogLevel, message: LogMessage, metadata?: LogMetadata) {
    try {
      if (validateLevel(level)) {
        this._log({ level, message, metadata: metadata || {} });
      }
    } catch (error) {
      console.error("Failed to log", error);
    }
  }

  warnNotImplemented() {
    this.warn(new Error("Not implemented"));
  }

  get contextName(): string {
    return this._contextName || "";
  }

  set contextName(name: string | null) {
    this._contextName = name ?? undefined;
  }

  constructor(options?: LoggerOptions) {
    this._printLevel =
      options?.printLevel ||
      (process.env.NODE_ENV === "development" ? "debug" : "warn");
    this._contextName = options?.contextName;
  }

  private _contextName?: string;

  private _log(log: Log) {
    this.printLog(log);
  }

  private printLog(log: Log) {
    if (isLevelAtLeast(log.level, this._printLevel)) {
      console[log.level](
        this.formatLog(log),
        ...this.createMetadataArgs(log.metadata)
      );
    }
  }

  private formatLog(log: Log) {
    return `[garkdown: ${log.level.toUpperCase()}]${
      this._contextName ? ` [${this._contextName}]` : ""
    } ${
      log.message instanceof Error
        ? `Error: ${log.message.message}\nStack:${log.message.stack?.replace(
            "Error:",
            ""
          )}`
        : log.message
    }`;
  }

  private createMetadataArgs(metadata: LogMetadata) {
    return isEqual(metadata, {})
      ? []
      : [
          {
            metadata,
          },
        ];
  }

  private _printLevel: LogLevelSetting;
}
