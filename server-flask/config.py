import psycopg2

def get_db_connection():
    return psycopg2.connect(
        dbname="bd_tbc",
        user="postgres",
        password="USAT2026",
        host="localhost",
        port="5432"
    )
