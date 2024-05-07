
export interface ILog {
  /**
   *
   * @param logLevel      日志等级
   * @param logTag        日志tag
   * @param logMsg        日志内容
   * @param logEngine     日志引擎
   * @param logStackType  日志堆栈类型
   */
  log(logLevel: LogLevel, logTag: string, logMsg: string, logEngine: LogEngine, logStackType: LogStackType);
}

export enum LogEngine {
  CONSOLE,  // 控制台Console日志，仅输出
  HILOG,    // 控制台HiLog日志，仅输出
}

export enum LogLevel {
  VERBOSE,
  DEBUG,
  INFO,
  WARN,
  ERROR,
  FATAL,
}

export enum LogStackType {
  NONE,         // 不输出日志堆栈, 仅打印日志内容
  FULL_STACK,   // 输出日志完整调用堆栈
  FIRST_STACK,  // 输出起始调用堆栈
}

