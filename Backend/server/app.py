from flask import Flask, jsonify, make_response, request, abort
from flask_migrate import Migrate   
from models import db, Personnel, Unit, Role, Squad, Droprequest, Operations
from datetime import datetime



app = Flask(__name__)

# Configure your database connection

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///military.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

db.init_app(app)
migrate = Migrate(app, db)

@app.route('/')
def index():
    return "Index for User/Power/HeroPower API"





if __name__ == "__main__":
    app.run(port=5555, debug=True)