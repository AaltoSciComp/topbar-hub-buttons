import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { requestAPI } from './handler';

export namespace CommandIDs {
  // stop-server command logic is defined here
  // the rest is reused from @jupyterlab/hub-extension
  export const stopServer = 'hub-buttons:stop-server';
}

function activateExtension(
  app: JupyterFrontEnd,
  paths: JupyterFrontEnd.IPaths,
  settingRegistry: ISettingRegistry
): void {
  // check if we are in a JupyterHub environment
  const hubPrefix = paths.urls.hubPrefix || '';
  if (!hubPrefix) {
    return;
  }
  console.log('JupyterLab extension topbar-hub-buttons is activated!');

  //const hubUser = paths.urls.hubUser || '';
  //const hubServerName = paths.urls.hubServerName || '';

  // empty by default, fetched below
  /*let hubAPIToken = '';
  requestAPI<any>('get-token')
    .then(data => {
      // checking with `in` should be fine here since these are simple objects
      if ('token' in data) {
        hubAPIToken = data.token;
      } else if ('error' in data) {
        console.log('topbar-hub-buttons: ', data.error);
      }
    })
    .catch(reason => {
      console.error(
        `The topbar_hub_buttons server extension appears to be missing.\n${reason}`
      );
    });*/

  /*
   * Send stop request to JupyterHub REST API
   */
  /*async function requestStop(): Promise<void> {
    console.log('Sending stop request');
    const url =
      hubPrefix + 'api/users/' + hubUser + '/servers/' + hubServerName;

    // not sure if this is needed in general,
    // I needed it locally
    const xsrf_cookie =
      document.cookie
        .split('; ')
        .find(row => row.startsWith('_xsrf='))
        ?.split('=')[1] || '';

    // send DELETE request with basic error handling
    await fetch(url, {
      method: 'DELETE',
      headers: {
        Authentication: 'token ' + hubAPIToken,
        'X-Csrftoken': xsrf_cookie
      }
    })
      .then(response => {
        if (!response.ok) {
          console.log('Stop request: Bad response');
        }
      })
      .catch(error => {
        console.log('Stop request: fetch error');
        console.log(error);
      });
  }*/

  async function test(): Promise<void> {
    requestAPI<any>('shutdown')
    .then(data => console.log(data))
    .catch(reason => {
      console.error(reason);
    });
  }

  // Register newly defined commands
  const { commands } = app;
  commands.addCommand(CommandIDs.stopServer, {
    label: 'Stop Server',
    caption: 'Request that the Hub stop this server',
    execute: test
  });

  settingRegistry
    .load(plugin.id)
    .then(settings => {
      console.log('topbar-hub-buttons settings loaded:', settings.composite);
    })
    .catch(reason => {
      console.error('Failed to load settings for topbar-hub-buttons.', reason);
    });
}

/**
 * Initialization data for the topbar-hub-buttons extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'topbar-hub-buttons:plugin',
  description:
    'A JupyterLab extension that adds JupyterHub buttons on the topbar',
  autoStart: true,
  requires: [JupyterFrontEnd.IPaths, ISettingRegistry],
  activate: activateExtension
};

export default plugin;
