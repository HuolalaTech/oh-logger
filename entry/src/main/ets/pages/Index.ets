import { Logger } from "@huolala/logger"
import { LogEngine, LogLevel, LogStackType } from '@huolala/logger/src/main/com.wp/interfaces/ILog';

const logTag = 'LogDemo'

const complexJson = 'code:200, rsp.result:{"endpoint":"","appId":"","complexData":{"userInfo":{"Id":"1234","phone":"13978921235"}},"signature":"","bucket":"","path":"","url":"","requestUrl":"https://abc/xxx.","objectKey":"xxx.txt"}'

const longlongLog = '超长日志："endpoint":"","appId":"","signature":"","bucket":"","path":"","url":"","requestUrl":"https://abc/xxx","objectKey":"pre/xxx.abckahdkshkashhkzhxkhaksdahsdakh.sdhkashdkhakshdkahsdkahsdkashdakshdak.client-android/ac/1713321011633_test_test.txt，' +
  '"objectKey":"pre/xxx.abckahdkshkashhkzhxkhaksdahsdakh.\nsdhkashdkhakshdkahsdkahsdkashdakshdak.client-android/ac/1713321011633_test_test.txt，' +
  '"objectKey":"pre/xxx.abckahdkshkashhkzhxkhaksdahsdakh.sdhkashdkhakshdkahsdkahsdkashdakshdak.client-android/ac/1713321011633_test_test.txt，' +
  '"objectKey":"pre/xxx.abckahdkshkashhkzhxkhaksdahsdakh.sdhkashdkhakshdkahsdkahsdkashdakshdak.client-android/ac/1713321011633_test_test.txt，'


@Entry
@Component
struct Index {
  @State message: string = '日志库Demo';

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(36)
          .fontWeight(FontWeight.Bold)
        Button() {
          Text("Hilog日志打印").fontSize(20).fontWeight(FontWeight.Regular).fontColor(Color.White)
        }
        .type(ButtonType.Capsule)
        .margin({ top: 20 })
        .backgroundColor(Color.Green)
        .width('50%')
        .height('5%')
        .onClick(() => {
          // 默认所有日志的LogEngine都是 HiLog

          // 1.边界测试
          Logger.e(undefined, undefined)
          Logger.e(undefined, "测试默认tag日志")
          Logger.e("test", undefined)
          Logger.w(logTag, `test hilog complex json -> %s`, undefined, undefined)
          Logger.w(undefined, undefined, undefined, undefined, undefined)

          // 2.正常打印测试
          Logger.v(logTag, `test hilog basic log print`)

          Logger.w("LogTag", "test default log print", LogStackType.FIRST_STACK)

          Logger.i(logTag, `test hilog complex json -> %s`, undefined, undefined, complexJson)

          Logger.w(logTag, `test hilog long long log ${longlongLog}`)

          Logger.e(logTag, `test hiloglog print with full stack`, LogStackType.FULL_STACK)

          // 单条日志手动切换其他engine 输出
          Logger.fatal(logTag, `test change log engine to : %s`, LogStackType.FIRST_STACK, LogEngine.CONSOLE, 'this log print by console')

          Logger.i(logTag, `test hilog format params p1 -> %s , p2 -> %d, p3 -> %o`, undefined, undefined, "参数1", 2, logTag)

        })

        Button() {
          Text("Console日志打印").fontSize(20).fontWeight(FontWeight.Regular).fontColor(Color.White)
        }
        .type(ButtonType.Capsule)
        .margin({ top: 20 })
        .backgroundColor(Color.Green)
        .width('50%')
        .height('5%')
        .onClick(() => {
          // 1.切换log engine 为console
          Logger.changeDefaultLogEngine(LogEngine.CONSOLE)

          Logger.v(logTag, `test console basic log print`)

          Logger.w("LogTag", "test console log print", LogStackType.FIRST_STACK)

          Logger.i(logTag, `test console complex json -> %s`, undefined, undefined, complexJson)

          Logger.w(logTag, `test console long long log ${longlongLog}`)

          Logger.e(logTag, `test console print with full stack`, LogStackType.FULL_STACK)

          Logger.fatal(logTag, `test change log engine to : %s`, LogStackType.FIRST_STACK, LogEngine.HILOG, ...['this log print by console'])

          Logger.i(logTag, `test console format params p1 -> %s , p2 -> %d, p3 -> %o`, undefined, undefined, "参数1", 2, logTag)

        })

        Button() {
          Text("自定义实现日志功能").fontSize(20).fontWeight(FontWeight.Regular).fontColor(Color.White)
        }
        .type(ButtonType.Capsule)
        .margin({ top: 20 })
        .backgroundColor(Color.Green)
        .width('50%')
        .height('5%')
        .onClick(() => {
          // optional: set your LogImp (simple code ...)
          Logger.setILog({
            log(logLevel: LogLevel, logTag: string, logMsg: string, logEngine: LogEngine, logStackType: LogStackType) {
              switch (logLevel) {
                case LogLevel.VERBOSE:
                case LogLevel.DEBUG:
                  console.debug(`${logTag} ->${logMsg}`)
                  break;
                case LogLevel.INFO:
                  console.info(`${logTag} ->${logMsg}`)
                  break;
                case LogLevel.WARN:
                  console.warn(`${logTag} ->${logMsg}`)
                  break;
                case LogLevel.ERROR:
                case LogLevel.FATAL:
                  console.error(`${logTag} ->${logMsg}`)
                  break;
              }
            }
          })

          Logger.v(logTag, `test basic log print by your Log `)

          Logger.setILog(undefined)

          Logger.changeDefaultLogStackType(LogStackType.NONE)
        })
      }

      .width('100%')
    }
    .height('100%')
  }
}