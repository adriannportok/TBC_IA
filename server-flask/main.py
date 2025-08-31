from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from config import get_db_connection
from flask import jsonify

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp, url_prefix='/auth')

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/test-db')
def test_db():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT COUNT(*) FROM medico")
        count = cur.fetchone()[0]
        cur.close()
        conn.close()
        return jsonify({"success": True, "medicos_registrados": count})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
