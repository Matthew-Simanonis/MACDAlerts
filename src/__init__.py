from flask import Flask
from src.backend.views import main_blueprint

application = Flask(__name__, static_folder = './public', template_folder="./static")

application.secret_key = 'alskdjfalksjdsdfflkajoiejsdroiajweoja'

# register the blueprints
application.register_blueprint(main_blueprint)