import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { CommandIDs } from '@jupyterlab/hub-extension';

import { Toolbar, ToolbarButton } from '@jupyterlab/ui-components';

/**
 * Initialization data for the topbar-hub-buttons extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'topbar-hub-buttons:plugin',
  description:
    'A JupyterLab extension to sync the prev code with the new Jupyterlab version.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension topbar-hub-buttons is activated!');
    // Hacky since ref + mode didn't work; add buttons only after other top bar items are done
    app.restored.then(() => {
      // Create toolbar
      const tb = new Toolbar();
      tb.id = 'hub-toolbar';

      // Create control panel button and add to toolbar
      const controlPanelButton = new ToolbarButton({
        className: 'logoutButton',
        iconClass: 'fa fa-cogs',
        tooltip: 'Control Panel',
        label: 'Control Panel'
      });
      controlPanelButton.id = 'hub-control-panel';
      controlPanelButton.onClick = async () => {
        await app.commands.execute(CommandIDs.controlPanel);
      };
      tb.addItem('controlPanelButton', controlPanelButton);

      // Create logout button and add to toolbar
      const logoutButton = new ToolbarButton({
        className: 'logoutButton',
        iconClass: 'fa fa-sign-out',
        tooltip: 'Log Out',
        label: 'Log Out'
      });
      logoutButton.id = 'hub-logout';
      logoutButton.onClick = async () => {
        await app.commands.execute(CommandIDs.logout);
      };
      tb.addItem('logoutButton', logoutButton);

      const spacer = Toolbar.createSpacerItem();
      spacer.id = 'spacer';

      // Add spacer and toolbar to top area
      app.shell.add(spacer, 'top', { ref: 'jp-MainMenu', mode: 'split-right' });
      app.shell.add(tb, 'top', { ref: 'spacer', mode: 'split-right' });
    });
  }
};

export default plugin;
