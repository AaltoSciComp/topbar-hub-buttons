# topbar_hub_buttons

[![Github Actions Status](https://github.com/AaltoSciComp/topbar-hub-buttons/workflows/Build/badge.svg)](https://github.com/AaltoSciComp/topbar-hub-buttons/actions/workflows/build.yml)
A JupyterLab extension that adds JupyterHub buttons on the topbar

## Change logs

- v0.2.0 (Alireza) Removed the schema to directly execute the JupyterFrontend commands defined by Jupyterhub extension. Also some minor style issues have been fixed.
- v0.1.0 (Tunç): Below is the text copied directly from the extension template. I can change it later if necessary. For now, the only thing to know is that this extension adds "Hub Control Panel" and "Logout" buttons to the JupyterLab top bar. The main logic to do so is in `schema/plugin.json`, and `src/index.ts` has a little bit of code that uses the former (and logs a message to the console).

## Requirements

- JupyterLab >= 4.0.0

## Install

To install the extension, execute:

```bash
pip install topbar_hub_buttons
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall topbar_hub_buttons
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the topbar_hub_buttons directory
# Install package in development mode
pip install -e "."
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall topbar_hub_buttons
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `topbar-hub-buttons` within that folder.

### Testing the extension

#### Frontend tests

This extension is using [Jest](https://jestjs.io/) for JavaScript code testing.

To execute them, execute:

```sh
jlpm
jlpm test
```

#### Integration tests

This extension uses [Playwright](https://playwright.dev/docs/intro) for the integration tests (aka user level tests).
More precisely, the JupyterLab helper [Galata](https://github.com/jupyterlab/jupyterlab/tree/master/galata) is used to handle testing the extension in JupyterLab.

More information are provided within the [ui-tests](./ui-tests/README.md) README.

### Packaging the extension

See [RELEASE](RELEASE.md)
