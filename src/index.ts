import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

/**
 * Initialization data for the topbar-hub-buttons extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'topbar-hub-buttons:plugin',
  description: 'A JupyterLab extension that adds JupyterHub buttons on the topbar',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, settingRegistry: ISettingRegistry | null) => {
    console.log('JupyterLab extension topbar-hub-buttons is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('topbar-hub-buttons settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for topbar-hub-buttons.', reason);
        });
    }
  }
};

export default plugin;
