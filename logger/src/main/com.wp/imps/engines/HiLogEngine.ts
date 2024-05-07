import { ILogEngine } from '../ILogEngine';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { LogUtil } from '../../utils/LogUtil';
import { LogLevel, LogStackType } from '../../interfaces/ILog';

const HiLogDomain = 0x0007

export class HiLogEngine implements ILogEngine {
  log(logLevel: LogLevel, logTag: string, logMsg: string, logStackType: LogStackType): void {
    switch (logLevel) {
      case LogLevel.VERBOSE:
      case LogLevel.DEBUG:
        hilog.debug(HiLogDomain, logTag, LogUtil.formatLog(logStackType, logTag, logMsg))
        break;
      case LogLevel.INFO:
        hilog.info(HiLogDomain, logTag, LogUtil.formatLog(logStackType, logTag, logMsg))
        break;
      case LogLevel.WARN:
        hilog.warn(HiLogDomain, logTag, LogUtil.formatLog(logStackType, logTag, logMsg))
        break;
      case LogLevel.ERROR:
        hilog.error(HiLogDomain, logTag, LogUtil.formatLog(logStackType, logTag, logMsg))
        break;
      case LogLevel.FATAL:
        hilog.fatal(HiLogDomain, logTag, LogUtil.formatLog(logStackType, logTag, logMsg))
        break;
    }
  }
}