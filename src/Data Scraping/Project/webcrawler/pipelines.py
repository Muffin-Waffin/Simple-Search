import mysql.connector
import sys
class BookPipeline():
    def __init__(self):
        try:
            self.conn = mysql.connector.connect(host="localhost", user="root", password="" ,database="search_engine")
            self.mycursor =self.conn.cursor()
        except:
            print("Couldn't Connect to the Database")
            sys.exit(500)
        else:
            print("Connected to the Database")

    def process_item(self, item,spider):
        # try:
        self.mycursor.execute("INSERT INTO book (name, price , link) VALUES(%s ,%s ,%s)", (item['name'],item['price'],item['link']))
        self.conn.commit()
        # except:
        #     print("an error occured")
        self.conn.commit()
        return item
 