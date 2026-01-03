import pymysql
import sys
import os
from dotenv import load_dotenv

load_dotenv()

db_username = os.getenv('DB_USERNAME') 
db_password = os.getenv('DB_PASSWORD') 
db_host = os.getenv('DB_HOST')
db_database = os.getenv('DB_DATABASE')

class Dbhelper():
    def __init__(self):
        try:
            self.conn = pymysql.connector.connect(host=db_host, user=db_username, password=db_password,database=db_database, port= 3306)
            self.mycursor =self.conn.cursor(dictionary=True)
        except Exception as e:
            print(e)
            # print("Couldn't Connect to the Database")
            sys.exit(500)
        else:
            print("Connected to the Database")
 

    def fetch(self, name, offset, limit):
        count_query = "SELECT COUNT(*) as total FROM book WHERE name LIKE %s"
        pattern = f"%{name}%"
        self.mycursor.execute(count_query, (pattern,))
        total_count = self.mycursor.fetchone()['total']

        query = "SELECT * FROM book WHERE name LIKE %s LIMIT %s OFFSET %s"
        self.mycursor.execute(query, (pattern, limit, offset))
        result = self.mycursor.fetchall()
        
        return {'results': result, 'total': total_count}
