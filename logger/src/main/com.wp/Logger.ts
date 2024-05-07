import { ILog, LogLevel, LogStackType, LogEngine } from './interfaces/ILog';
import { util } from '@kit.ArkTS';
import { DefaultLogger } from './imps/DefaultLogger';
import { LogConstant } from './constants/LogConstant';

export class Logger {
  /**
   * 日志实现, 默认使用 DefaultLogger
   * (可按需替换成其他日志系统 : XXXLog)
   * @see DefaultLogger
   */
  private static iLog: ILog
  private static logEngine: LogEngine
  private static logStackType: LogStackType

  private constructor() {
  }

  /**
   * optional
   * 设置日志实现
   * @param myLogImp
   * @see DefaultLogger (不设置，则使用sdk默认实现)
   */
  static setILog(myLogImp: ILog) {
    Logger.iLog = myLogImp
  }

  /**
   * optional
   * 设置默认日志打印引擎
   * @param logEngine
   * LogEngine.ONLINE,   // 实时日志，实时上传日志平台
   * LogEngine.OFFLINE,  // 离线日志，存储本地，离线回捞上传
   * LogEngine.CONSOLE,  // 控制台Console日志，仅输出
   * LogEngine.HILOG,    // 控制台HiLog日志，仅输出  (不设置，默认使用hilog)
   */
  static changeDefaultLogEngine(logEngine: LogEngine) {
    if (logEngine && logEngine !== Logger.logEngine) {
      Logger.logEngine = logEngine
    }
  }

  /**
   * optional
   * 设置日志打印是否输出堆栈
   * @param logStackType
   * LogStackType:NONE,         // 不输出日志堆栈, 仅打印日志内容 (不设置，默认为此类型)
   * LogStackType.FULL_STACK,   // 输出日志完整调用堆栈
   * LogStackType.FIRST_STACK,  // 输出起始调用堆栈
   */
  static changeDefaultLogStackType(logStackType: LogStackType) {
    if (logStackType && logStackType !== Logger.logStackType) {
      Logger.logStackType = logStackType
    }
  }

  static setLogSingleLineMaxLength(logSingleLineMaxLength: number) {
    LogConstant.setLogSingleLineMaxLength(logSingleLineMaxLength)
  }

  /**
   * @param tag           must:     tag
   * @param logMsg        must:     内容
   * @param logEngine     optional: 引擎 (默认使用HiLog引擎打印日志) @see LogEngine <离线、在线引擎暂未实现>
   * @param logStackType  optional: 堆栈类型 (默认不输出堆栈)        @see LogStackType
   * @param args          optional: format参数
   */
  static v(tag: string, logMsg: string, logStackType: LogStackType = Logger.getLogStackType(), logEngine: LogEngine = Logger.getLogEngine(), ...args: any[]): void {
    Logger.innerLog(LogLevel.VERBOSE, tag, logMsg, logStackType, logEngine, ...args)
  }

  static d(tag: string, logMsg: string, logStackType: LogStackType = Logger.getLogStackType(), logEngine: LogEngine = Logger.getLogEngine(), ...args: any[]): void {
    Logger.innerLog(LogLevel.DEBUG, tag, logMsg, logStackType, logEngine, ...args)
  }

  static i(tag: string, logMsg: string, logStackType: LogStackType = Logger.getLogStackType(), logEngine: LogEngine = Logger.getLogEngine(), ...args: any[]): void {
    Logger.innerLog(LogLevel.INFO, tag, logMsg, logStackType, logEngine, ...args)
  }

  static w(tag: string, logMsg: string, logStackType: LogStackType = Logger.getLogStackType(), logEngine: LogEngine = Logger.getLogEngine(), ...args: any[]): void {
    Logger.innerLog(LogLevel.WARN, tag, logMsg, logStackType, logEngine, ...args)
  }

  static e(tag: string, logMsg: string, logStackType: LogStackType = Logger.getLogStackType(), logEngine: LogEngine = Logger.getLogEngine(), ...args: any[]): void {
    Logger.innerLog(LogLevel.ERROR, tag, logMsg, logStackType, logEngine, ...args)
  }

  static fatal(tag: string, logMsg: string, logStackType: LogStackType = Logger.getLogStackType(), logEngine: LogEngine = Logger.getLogEngine(), ...args: any[]): void {
    Logger.innerLog(LogLevel.FATAL, tag, logMsg, logStackType, logEngine, ...args)
  }

  static innerLog(level: LogLevel, tag: string, logMsg: string, logStackType: LogStackType, logEngine: LogEngine, ...args: any[]): void {
    const checkedTag = tag || LogConstant.LOG_DEFAULT_TAG
    let checkLogMsg = logMsg;
    try {
      if (logMsg !== undefined && args !== undefined) {
        checkLogMsg = util.format(logMsg, ...args);
      }
    } catch (error) {
      checkLogMsg = logMsg;
    }
    Logger.get().log(level, checkedTag, checkLogMsg, logEngine, logStackType)
  }

  private static get(): ILog {
    if (!Logger.iLog) {
      Logger.iLog = new DefaultLogger()
    }
    return Logger.iLog
  }

  private static getLogEngine(): LogEngine {
    if (Logger.logEngine) {
      return Logger.logEngine
    }

    return LogEngine.HILOG
  }

  private static getLogStackType(): LogStackType {
    if (Logger.logStackType) {
      return Logger.logStackType
    }

    return LogStackType.NONE
  }
}