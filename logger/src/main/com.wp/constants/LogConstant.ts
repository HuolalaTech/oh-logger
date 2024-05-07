/**
 * log format constants
 */
export class LogConstant {
  static LOG_DEFAULT_TAG = "Logger"

  // 日志开始样式
  static LOG_START_STYLE = "┌───────────────────────────────────────────────────────────────────────────────────────────────────────────────┐"

  // 日志结束样式
  static LOG_END_STYLE = "└───────────────────────────────────────────────────────────────────────────────────────────────────────────────┘"

  // 日志堆栈分割符
  static LOG_STACK_DIVIDER = "├┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┤"

  // 日志堆栈标题文案
  static LOG_STACK_TITLE = "Stack:"

  // 单行日志最大长度(为了美观：默认不超过 LOG_START_STYLE的长度)
  private static LOG_SINGLE_LINE_MAX_LENGTH = LogConstant.LOG_START_STYLE.length - 4

  static getLogSingleLineMaxLength() {
    return LogConstant.LOG_SINGLE_LINE_MAX_LENGTH
  }

  static setLogSingleLineMaxLength(logSingleLineMaxLength: number) {
    if (logSingleLineMaxLength <= 0 || logSingleLineMaxLength > 1024 || logSingleLineMaxLength === LogConstant.LOG_SINGLE_LINE_MAX_LENGTH) {
      return
    }
    LogConstant.LOG_SINGLE_LINE_MAX_LENGTH = logSingleLineMaxLength
  }
}

