import json
import unittest
import boto3
from datetime import datetime

# Prepare of image

js = '[{"datetime": "2023-02-24", "open": "150.09000", "high": "150.09000", "low": "145.72020", "close": "146.71001", "volume": "55344942"}, {"datetime": "2023-02-23", "open": "150.09000", "high": "150.34000", "low": "147.24001", "close": "149.39999", "volume": "48394200"}, {"datetime": "2023-02-22", "open": "148.87000", "high": "149.95000", "low": "147.16000", "close": "148.91000", "volume": "51011300"}, {"datetime": "2023-02-21", "open": "150.20000", "high": "151.30000", "low": "148.41000", "close": "148.48000", "volume": "58867200"}, {"datetime": "2023-02-17", "open": "152.35001", "high": "153.00000", "low": "150.85001", "close": "152.55000", "volume": "59095900"}, {"datetime": "2023-02-16", "open": "153.50999", "high": "156.33000", "low": "153.35001", "close": "153.71001", "volume": "68167900"}, {"datetime": "2023-02-15", "open": "153.11000", "high": "155.50000", "low": "152.88000", "close": "155.33000", "volume": "65669300"}, {"datetime": "2023-02-14", "open": "152.12000", "high": "153.77000", "low": "150.86000", "close": "153.20000", "volume": "61707600"}, {"datetime": "2023-02-13", "open": "150.95000", "high": "154.25999", "low": "150.92000", "close": "153.85001", "volume": "62199000"}, {"datetime": "2023-02-10", "open": "149.46001", "high": "151.34000", "low": "149.22000", "close": "151.00999", "volume": "57409100"}, {"datetime": "2023-02-09", "open": "153.78000", "high": "154.33000", "low": "150.42000", "close": "150.87000", "volume": "56007100"}, {"datetime": "2023-02-08", "open": "153.88000", "high": "154.58000", "low": "151.17000", "close": "151.92000", "volume": "64120100"}, {"datetime": "2023-02-07", "open": "150.64000", "high": "155.23000", "low": "150.64000", "close": "154.64999", "volume": "83322600"}, {"datetime": "2023-02-06", "open": "152.57001", "high": "153.10001", "low": "150.78000", "close": "151.73000", "volume": "69858300"}, {"datetime": "2023-02-03", "open": "148.03000", "high": "157.38000", "low": "147.83000", "close": "154.50000", "volume": "154279900"}, {"datetime": "2023-02-02", "open": "148.89999", "high": "151.17999", "low": "148.17000", "close": "150.82001", "volume": "118339000"}, {"datetime": "2023-02-01", "open": "143.97000", "high": "146.61000", "low": "141.32001", "close": "145.42999", "volume": "77663600"}, {"datetime": "2023-01-31", "open": "142.70000", "high": "144.34000", "low": "142.28000", "close": "144.28999", "volume": "65874500"}, {"datetime": "2023-01-30", "open": "144.96001", "high": "145.55000", "low": "142.85001", "close": "143.00000", "volume": "64015300"}, {"datetime": "2023-01-27", "open": "143.16000", "high": "147.23000", "low": "143.08000", "close": "145.92999", "volume": "70492800"}, {"datetime": "2023-01-26", "open": "143.17000", "high": "144.25000", "low": "141.89999", "close": "143.96001", "volume": "54105100"}, {"datetime": "2023-01-25", "open": "140.89000", "high": "142.42999", "low": "138.81000", "close": "141.86000", "volume": "65799300"}, {"datetime": "2023-01-24", "open": "140.31000", "high": "143.16000", "low": "140.30000", "close": "142.53000", "volume": "66435100"}, {"datetime": "2023-01-23", "open": "138.12000", "high": "143.32001", "low": "137.89999", "close": "141.11000", "volume": "81760300"}, {"datetime": "2023-01-20", "open": "135.28000", "high": "138.02000", "low": "134.22000", "close": "137.87000", "volume": "79972200"}, {"datetime": "2023-01-19", "open": "134.08000", "high": "136.25000", "low": "133.77000", "close": "135.27000", "volume": "58280400"}, {"datetime": "2023-01-18", "open": "136.82001", "high": "138.61000", "low": "135.03000", "close": "135.21001", "volume": "69672800"}, {"datetime": "2023-01-17", "open": "134.83000", "high": "137.28999", "low": "134.13000", "close": "135.94000", "volume": "63646600"}, {"datetime": "2023-01-13", "open": "132.03000", "high": "134.92000", "low": "131.66000", "close": "134.75999", "volume": "57758000"}, {"datetime": "2023-01-12", "open": "133.88000", "high": "134.25999", "low": "131.44000", "close": "133.41000", "volume": "71379600"}]'

df = json.loads( js )

# calc_average calculates average from max and min price in specific day
def calc_average( day_stats ):
    if not "high" in day_stats or not "low" in day_stats:
        raise Exception( "Mandatory data are missing" )

    return ( float(day_stats["high"]) + float(day_stats["low"]) ) / 2

# calc_day_capitalization calculates average money spent on specific day
# from average price and number of shares sell/buy on market
def calc_day_capitalization( average, volume ):
    return ( average * volume )


def get_day_capitalization():
    latest_date = ""
    for day in df:
        date = datetime.strptime( day["datetime"], "%Y-%m-%d" )
        if latest_date == "":
            latest_date = day
        elif date > datetime.strptime( latest_date["datetime"], "%Y-%m-%d" ):
            latest_date = day

    try:
        return calc_day_capitalization( calc_average( latest_date ), float(latest_date["volume"]) )
    except Exception:
        return -1

def lambda_handler(event, context):
    if event["rawPath"] == "/capitalization":
        cap = get_day_capitalization()
        if cap == -1:
            return {
                'statusCode': 403,
                'body': json.dumps("Calculation failed")
            }
        return {
            'statusCode': 200,
            'body': json.dumps(cap)
        }
    return {
        'statusCode': 404,
        'body': json.dumps("Endpoint not found")
    }

# Unit tests

class TestCalcMethods(unittest.TestCase):
    def test_calc_average( self ):
        input_values = { 
                "high": 20.0,
                "low": 10.0
        }
        self.assertEqual( calc_average( input_values ), 15.0 )
        self.assertRaises( Exception, calc_average, {} )
        self.assertRaises( Exception, calc_average, { "high": 10.0 } )
        self.assertRaises( Exception, calc_average, { "low": 10.0 } )

    def test_calc_day_capitalization( self ):
        self.assertEqual( calc_day_capitalization( 1.0, 10 ), 10.0 )
        self.assertEqual( calc_day_capitalization( -1.0, 10 ), -10.0 )
