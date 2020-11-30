from flask import render_template, Blueprint, request, jsonify, make_response
from .macdalerts import get_graph

main_blueprint = Blueprint('main',__name__)

@main_blueprint.route('/', methods=['GET', 'POST'])
def macdalerts():
    return render_template("macdalerts.html")

@main_blueprint.route('/getgraph', methods=['GET', 'POST'])
def getgraph():
    ticker = request.args.get('stock')
    time = request.args.get('timeframe')
    data = get_graph(ticker, time)
    return data
