import { ILog, LogLevel, LogStackType, LogEngine } from '../interfaces/ILog';
import { ILogEngine } from './ILogEngine';
import { HiLogEngine } from './engines/HiLogEngine';
import { ConsoleEngine } from './engines/ConsoleEngine';

/**
 * 默认日志实现
 */
export class DefaultLogger implements ILog {
  private mLogEngines: Partial<Record<LogEngine, ILogEngine>>

  public constructor() {
  }

  log(logLevel: LogLevel, logTag: string, logMsg: string, logEngine: LogEngine, logStackType: LogStackType): void {
    this.getLogEngin(logEngine).log(logLevel, logTag, logMsg, logStackType)
  }

  private getLogEngin(logEngine: LogEngine): ILogEngine {
    if (!this.mLogEngines) {
      this.mLogEngines = {};
    }

    if (!this.mLogEngines[logEngine]) {
      let newLogEngine: ILogEngine;
      switch (logEngine) {
        case LogEngine.HILOG:
          newLogEngine = new HiLogEngine();
          break;
        case LogEngine.CONSOLE:
          newLogEngine = new ConsoleEngine();
          break;
      }
      this.mLogEngines[logEngine] = newLogEngine;
    }

    return this.mLogEngines[logEngine];
  }
}
