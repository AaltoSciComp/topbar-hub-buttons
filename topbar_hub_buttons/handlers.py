import json
import os

from jupyter_server.base.handlers import APIHandler
from jupyter_server.utils import url_path_join
from tornado.httpclient import AsyncHTTPClient, HTTPRequest
import tornado


class TokenHandler(APIHandler):
    # The following decorator should be present on all verb methods (head, get, post,
    # patch, put, delete, options) to ensure only authorized user can request the
    # Jupyter server
    @tornado.web.authenticated
    def get(self):
        token = os.environ.get("JUPYTERHUB_API_TOKEN", "")
        if token:
            self.finish(json.dumps({
                "token": token
            }))
        else:
            self.finish(json.dumps({
                "error": "API token not found."
            }))


class ShutdownHandler(APIHandler):
    @tornado.web.authenticated
    @tornado.gen.coroutine
    def get(self):
        api_url = os.environ.get("JUPYTERHUB_API_URL", "")
        if not api_url:
            self.finish(json.dumps({
                "error": "API URL not found."
            }))
        else:
            token = os.environ.get("JUPYTERHUB_API_TOKEN", "")
            user = os.environ.get("JUPYTERHUB_USER", "")
            server_name = os.environ.get("JUPYTERHUB_SERVER_NAME", "")
            path = api_url + '/users/' + user + '/servers/' + server_name
            client = AsyncHTTPClient()
            request = HTTPRequest(
                path,
                "DELETE",
                headers={"Authorization": "token {}".format(token)}
            )
            response = yield client.fetch(request)
            self.finish(response)


def setup_handlers(web_app):
    host_pattern = ".*$"

    base_url = web_app.settings["base_url"]
    token_pattern = url_path_join(base_url, "topbar-hub-buttons", "get-token")
    shutdown_pattern = url_path_join(base_url, "topbar-hub-buttons", "shutdown")
    handlers = [
        (token_pattern, TokenHandler),
        (shutdown_pattern, ShutdownHandler)
    ]
    web_app.add_handlers(host_pattern, handlers)
