from flask import render_template, Blueprint, request, jsonify, make_response, session
from .macdalerts import get_graph
import json

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

@main_blueprint.route('/macdalerts/addfavorite', methods=['GET', 'POST'])
def favorites():
    if 'favorites' in session:
        favorite = request.args.get('add')
        if favorite in session['favorites']:
            data = {
                'status' : 200,
                'favorites' : session['favorites']
            }
            data = json.dumps(data)
        else:
            session['favorites'] += [favorite.upper()]
            data = {
                'status' : 200,
                'favorites' : session['favorites']
            }
            data = json.dumps(data)
    else:
        session['favorites'] = []
        favorite = request.args.get('add')
        session['favorites'] += [favorite.upper()]
        data = {
            'status' : 200,
            'favorites' : session['favorites']
        }
        data = json.dumps(data)
    return data

