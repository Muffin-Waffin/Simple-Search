import pymysql
import sys
import os
from dotenv import load_dotenv

load_dotenv()

db_username = os.getenv("DB_USERNAME")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")
db_database = os.getenv("DB_DATABASE")
db_port = int(os.getenv("DB_PORT", 3306))

class Dbhelper:
    def __init__(self):
        try:
            self.conn = pymysql.connect(
                host=db_host,
                user=db_username,
                password=db_password,
                database=db_database,
                port=db_port,
                cursorclass=pymysql.cursors.DictCursor
            )
            self.mycursor = self.conn.cursor()
            print("Connected to the Database")
        except Exception as e:
            print("DB Error:", e)
            sys.exit(500)

    def fetch(self, name, offset, limit):
        pattern = f"%{name}%"

        count_query = "SELECT COUNT(*) AS total FROM book WHERE name LIKE %s"
        self.mycursor.execute(count_query, (pattern,))
        total_count = self.mycursor.fetchone()["total"]

        query = "SELECT * FROM book WHERE name LIKE %s LIMIT %s OFFSET %s"
        self.mycursor.execute(query, (pattern, limit, offset))
        result = self.mycursor.fetchall()

        return {"results": result, "total": total_count}
