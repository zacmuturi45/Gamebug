from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_graphql import GraphQLView
from models import db
from config import config
from schema import schema

migrate = Migrate()


def create_app(config_name="default"):
    app = Flask(__name__)
    app.config.from_object(config[config_name])

    db.init_app(app)
    CORS(app)
    migrate.init_app(app, db)

    app.add_url_rule(
        "/graphql",
        view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True),
    )

    return app
