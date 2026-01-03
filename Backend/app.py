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
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    offset = (page - 1) * limit
    res = db.fetch(name, offset, limit)
    return jsonify(res)

if __name__ == '__main__':
    app.run()


