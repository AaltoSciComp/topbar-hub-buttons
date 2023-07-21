from ._version import __version__
from .handlers import setup_handlers


def _jupyter_labextension_paths():
    return [{
        "src": "labextension",
        "dest": "topbar-hub-buttons"
    }]


def _jupyter_server_extension_points():
    return [{
        "module": "topbar_hub_buttons"
    }]


def _load_jupyter_server_extension(server_app):
    """Registers the API handler to receive HTTP requests from the frontend extension.

    Parameters
    ----------
    server_app: jupyterlab.labapp.LabApp
        JupyterLab application instance
    """
    setup_handlers(server_app.web_app)
    name = "topbar_hub_buttons"
    server_app.log.info(f"Registered {name} server extension")
