import mysql.connector
import sys
class Dbhelper():
    def __init__(self):
        try:
            self.conn = mysql.connector.connect(host="localhost", user="root", password="" ,database="search_engine")
            self.mycursor =self.conn.cursor()
        except:
            print("Couldn't Connect to the Database")
            sys.exit(500)
        else:
            print("Connected to the Database")
 

    def fetch(self, name):
        self.mycursor.execute

    def fetch(self, link):
        pass

    def fetch(self, id):
        pass