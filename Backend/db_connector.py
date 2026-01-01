import mysql.connector
import sys
class Dbhelper():
    def __init__(self):
        try:
            self.conn = mysql.connector.connect(host="localhost", user="root", password="" ,database="search_engine")
            self.mycursor =self.conn.cursor(dictionary=True)
        except:
            print("Couldn't Connect to the Database")
            sys.exit(500)
        else:
            print("Connected to the Database")
 

    def fetch(self, name):

        query = "SELECT * FROM book WHERE name LIKE %s"
        pattern = f"%{name}%"

        self.mycursor.execute(query, (pattern,))
        result = self.mycursor.fetchall()
        return result
