import numpy as np
import pandas as pd 
import json, datetime
import matplotlib.pyplot as plt
import yfinance as yf

TIMEFRAME = {'max': 0, '1y' : 365, '1mo' : 30, '2y': 830}
DIFFERENCE = 4

def get_graph(ticker, tf):
    ticker = ticker.replace('"','')
    stock = yf.Ticker(ticker)
    print('getting hist')
    hist = stock.history(period='max')
    print('step 2')
    if len(hist) < 1:
        return {
            'status' : 400,
            'hasError' : True
            }
    fulldf = addmacd(hist)
    fulldf = fulldf[-TIMEFRAME[tf]:]
    findcrossmacd(fulldf)
    findcrossstocastic(fulldf)
    isbuy(fulldf)
    fulldf = fulldf.fillna('null')

    prices = fulldf['Close'].to_list()
    fiftyma = fulldf['FiftyMA'].to_list()
    twhohundredma = fulldf['TwohundredMA'].to_list()
    k = fulldf['K2'].to_list()
    d = fulldf['D'].to_list()
    macd = fulldf['MACD'].to_list()
    signal = fulldf['Signal'].to_list()
    buys = fulldf['Buys'].to_list()
    sells = fulldf['Sells'].to_list()
    current = fulldf['Close'][-1]
    dates =  [d.strftime("%m/%d/%Y") for d in fulldf.index]
    data = {'close': prices,
            'dates' : dates,
            'fiftyma' : fiftyma,
            'stochk' : k,
            'stochd' : d,
            'macd' : macd,
            'signal' : signal,
            'twohundredma' : twhohundredma,
            'buys' : buys,
            'sells' : sells,
            'current' : current,
            'status' : 200
        }
    data = json.dumps(data, default = myconverter)
    return data

def addmacd(df):
    df['High14'] = df['High'].rolling(14).max()         # Create 14 Day high/low, 50/200 day moving Average, and 50 day EMA
    df['Low14'] = df['Low'].rolling(14).min()       
    df['FiftyMA'] = df['Close'].rolling(window=50).mean()
    df['TwohundredMA'] = df['Close'].rolling(window=200).mean()
    df['FiftyEMA'] = df['Close'].ewm(span=50, adjust=False).mean()

    df['K'] = 100*((df['Close'] - df['Low14']) / (df['High14'] - df['Low14']) ) # Calculate Stochastic indicators
    df['D'] = df['K'].rolling(window=3).mean()
    df['K2'] = df['D'].rolling(window=3).mean()

    try:
        df = df.drop(['High', 'Low', 'Volume', 'Dividends', 'Stock Splits', 'Low14', 'High14'], axis=1)
    except:
        df = df.drop(['High', 'Low', 'Volume', 'Low14', 'High14'], axis=1)

    exp1 = df["Close"].ewm(span=12, adjust=False).mean()
    exp2 = df["Close"].ewm(span=26, adjust=False).mean()
    macd = exp1-exp2
    signalline = macd.ewm(span=10, adjust=False).mean()
    df['MACD'] = macd
    df['Signal'] = signalline
    df['Histogram'] = macd - signalline
    return df


# Find Crossovers
def findcrossmacd(df):
    bullish = False
    for i in df.itertuples():
        if i.MACD >= i.Signal and bullish==False:
            df.at[i.Index, 'MACDCross'] = 1
            bullish=True
        elif i.MACD <= i.Signal and bullish==True:
            df.at[i.Index, 'MACDCross'] = 0
            bullish=False

def findcrossstocastic(df):
    bullish = False
    for i in df.itertuples():
        if i.K2 >= i.D and bullish==False and i.K2 > 50:
            df.at[i.Index, 'STOCHCross'] = 1
            bullish=True
        elif i.K2 <= i.D and bullish==True:
            df.at[i.Index, 'STOCHCross'] = 0
            bullish=False

# Find Buys
def isbuy(df):
    counter = 0
    macd, stoch = False, False
    buys, sells = ['NaN'], ['NaN']
    for i in df.itertuples():
        if i.STOCHCross == 1 and i.K2 < 80:
            stoch = True
            counter = 0
        elif counter <= DIFFERENCE and i.MACDCross == 1:
            macd = True
            df.at[i.Index, 'Buys'] = i.Close
            buys.append(i.Index.strftime('%Y-%m-%d') + ' at $' + str(i.Close))
        elif i.MACDCross == 0:
            macd = False
            df.at[i.Index, 'Sells'] = i.Close
            sells.append(i.Index.strftime('%Y-%m-%d') + ' at $' + str(i.Close))
        elif i.STOCHCross == 0:
            stoch = False
        elif counter > DIFFERENCE:
            counter = 0
        elif stoch == True:
            counter += 1
    return df, buys, sells

def myconverter(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()

