from flask import Flask,request,jsonify
from db_connector import Dbhelper

from flask_cors import CORS

app = Flask(__name__)
CORS(app)
db = Dbhelper()


@app.route("/")
def home():
    print("Hello world")

@app.route("/search")
def search():
    name = request.args.get("q", "")
    res = db.fetch(name)
    return jsonify(res)



