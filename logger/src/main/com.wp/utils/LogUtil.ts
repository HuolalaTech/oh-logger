import { LogConstant } from '../constants/LogConstant';
import { LogStackType } from '../interfaces/ILog';

export class LogUtil {
  /**
   * 格式化日志内容 (可按需修改)
   */
  static formatLog(logStackType: LogStackType, tag: string, logMsg: string): string {
    let logStack = this.getLogStack(logStackType)
    let logTail = logStack ? this.insertTagIntoDivider(LogConstant.LOG_STACK_TITLE, LogConstant.LOG_STACK_DIVIDER) + '\n' + logStack + '\n' : '';

    let formatLogMsg = this.insertTagIntoDivider(tag, LogConstant.LOG_START_STYLE) + '\n'
      + this.formatLongLog(LogConstant.getLogSingleLineMaxLength(), this.formatJsonInString(logMsg)) + '\n'
      + logTail
      + LogConstant.LOG_END_STYLE;
    return formatLogMsg;
  }

  /**
   *  获取日志调用堆栈
   */
  static getLogStack(logStackType: LogStackType): string {
    if (logStackType === LogStackType.NONE) {
      return undefined
    }
    return (logStackType === LogStackType.FULL_STACK) ? `${new Error().stack}` : `${new Error().stack?.split('\n').slice(-2)[0]}`;
  }

  /**
   * divider 中间插入tag, 保持divider长度不变
   */
  static insertTagIntoDivider(tag: string, divider: string): string {
    let firstHalfLength = Math.floor(divider.length / 2) - Math.floor(tag.length / 2);
    let secondHalfLength = divider.length - firstHalfLength - tag.length;

    let firstHalf = divider.substring(0, firstHalfLength);
    let secondHalf = divider.substring(divider.length - secondHalfLength);

    return firstHalf + tag + secondHalf;
  }

  /**
   * 格式化日志中的json串, 每一级属性按4个空格缩进
   * @param input
   * @returns
   */
  private static formatJsonInString(input: string): string {
    if (!input) {
      return input
    }

    const jsonStart = input.indexOf('{');
    const jsonEnd = input.lastIndexOf('}') + 1;
    // 判断是否有JSON字符串
    if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
      const jsonString = input.substring(jsonStart, jsonEnd);

      try {
        const json = JSON.parse(jsonString);
        const formattedJson = JSON.stringify(json, null, 4);
        return input.substring(0, jsonStart) + formattedJson + input.substring(jsonEnd);
      } catch (error) {
        return input;
      }
    }
    return input;
  }

  /**
   * 格式化日志中超长的内容
   * @param signalLineLength 超过此长度的自动换行
   * (默认保留log中自动换行的逻辑)
   */
  private static formatLongLog(signalLineLength: number, logMsg: string): string {
    if (!logMsg || logMsg.length <= signalLineLength) {
      return logMsg
    }
    const regExp = new RegExp(`(.{1,${signalLineLength}})`, 'g');
    const substrings = logMsg.split('\n');
    const newLines = substrings.map(subStr => {
      if (subStr.length > 0) {
        // 日志单行超过signalLineLength 的自动换行
        const subLines = subStr.match(regExp);
        if (subLines) {
          return subLines.join('\n');
        }
      }
      return subStr;
    });
    return newLines.join('\n');
  }
}