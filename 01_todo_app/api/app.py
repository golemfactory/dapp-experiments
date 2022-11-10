import argparse
from flask import Flask, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

parser = argparse.ArgumentParser("simple flask app")
parser.add_argument("--db-address", help="the address of the rqlite database", default="localhost")
parser.add_argument("--db-port", help="the  of the rqlite database", default="4001")
parser.add_argument("--debug", action="store_true", help="Allow the debug mode in Flask")

subparsers = parser.add_subparsers(dest="cmd", required=True)

subparsers.add_parser("initdb", help="initialize the database")
run_parser = subparsers.add_parser("run", help="run the app")
args = parser.parse_args()

app = Flask(__name__)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {"echo": True}
app.config["SQLALCHEMY_DATABASE_URI"] = f"rqlite+pyrqlite://{args.db_address}:{args.db_port}/"

db = SQLAlchemy(app)


class ToDo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255))
    status = db.Column(db.String(255))


@app.route("/api/list", methods=["get"])
def root_get():
    return list(map(
        lambda item: {"id": item.id, "text": item.text, "status": item.status},
        list(ToDo.query.filter_by(status="NEW").order_by(ToDo.id.desc())) + list(ToDo.query.filter_by(status="DONE").order_by(ToDo.id.desc()))
    ))


@app.route("/api/add", methods=["post"])
def root_post():
    db.session.add(ToDo(text=request.form["text"], status=request.form["status"]))
    db.session.commit()
    return redirect(url_for("root_get"))


@app.route("/api/<pk>/update", methods=["post"])
def detail_update(pk):
    todo = ToDo.query.filter_by(id=pk).first()
    todo.status = "NEW" if todo.status != "NEW" else "DONE"
    db.session.commit()
    return redirect(url_for("root_get"))


@app.route("/api/<pk>/delete", methods=["post"])
def detail_delete(pk):
    ToDo.query.filter_by(id=pk).delete()
    db.session.commit()
    return redirect(url_for("root_get"))


if args.cmd == "initdb":
    with app.app_context():
        db.create_all()
elif args.cmd == "run":
    app.run(host="0.0.0.0", debug=args.debug)
