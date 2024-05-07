import { ILogEngine } from '../ILogEngine';
import { LogUtil } from '../../utils/LogUtil';
import { LogLevel, LogStackType } from '../../interfaces/ILog';

export class ConsoleEngine implements ILogEngine {
  log(logLevel: LogLevel, logTag: string, logMsg: string, logStackType: LogStackType): void {
    switch (logLevel) {
      case LogLevel.VERBOSE:
      case LogLevel.DEBUG:
        console.debug(LogUtil.formatLog(logStackType, logTag, logMsg))
        break;
      case LogLevel.INFO:
        console.info(LogUtil.formatLog(logStackType, logTag, logMsg))
        break;
      case LogLevel.WARN:
        console.warn(LogUtil.formatLog(logStackType, logTag, logMsg))
        break;
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        console.error(LogUtil.formatLog(logStackType, logTag, logMsg))
        break;
    }
  }
}