import { LogLevel, LogStackType } from '../interfaces/ILog';

export interface ILogEngine {
  /**
   *
   * @param logLevel      日志等级
   * @param logTag        日志tag
   * @param logMsg        日志内容
   * @param logStackType  日志堆栈类型
   */
  log(logLevel: LogLevel, logTag: string, logMsg: string,  logStackType: LogStackType);
}



