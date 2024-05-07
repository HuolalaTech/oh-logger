import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { window } from '@kit.ArkUI';
import { Logger } from '@huolala/logger/Index';

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    Logger.i('testTag', 'Ability onCreate');
  }

  onDestroy(): void {
    Logger.i('testTag', 'Ability onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    // Main window is created, set main page for this ability
    Logger.i('testTag', 'Ability onWindowStageCreate');

    windowStage.loadContent('pages/Index', (err) => {
      if (err.code) {
        Logger.i('testTag', 'Failed to load the content. Cause: %s', undefined, undefined, JSON.stringify(err) ?? '');
        return;
      }
      Logger.i('testTag', 'Succeeded in loading the content.');
    });
  }

  onWindowStageDestroy(): void {
    // Main window is destroyed, release UI related resources
    Logger.i('testTag', 'Ability onWindowStageDestroy');
  }

  onForeground(): void {
    // Ability has brought to foreground
    Logger.i('testTag', 'Ability onForeground');
  }

  onBackground(): void {
    // Ability has back to background
    Logger.i('testTag', 'Ability onBackground');
  }
}
