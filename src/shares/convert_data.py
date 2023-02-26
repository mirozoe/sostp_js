import json

f = open("data.json")
w = open("converted.sql", "w")
js = json.load(f)
for i in js:
    string = f"INSERT INTO shares (symbol,date,open,high,low,close) VALUES ('T','{i['datetime']}','{i['open']}','{i['high']}','{i['low']}','{i['close']}');\n"
    w.write( string )

w.close()
f.close()
