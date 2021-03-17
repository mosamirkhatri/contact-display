## DevDependencies
**********************
* autopep8 
* pycodesyle
* toml

## Injecting CSV data into sqlite3


    import csv, sqlite3
    con = sqlite3.connect("./db.sqlite3")
    cur = con.cursor()
    result = cur.execute("Select * from sqlite_master where type='table'") # Testing 

    with open('../../phone-numbers.csv', 'r') as fin:
        dr = csv.DictReader(fin)
        to_db = [(i['name'], i['number']) for i in dr]

    cur.executemany("INSERT INTO api_contact (name, number) VALUES (?, ?);", to_db)
    con.commit()
    con.close()
    exit()