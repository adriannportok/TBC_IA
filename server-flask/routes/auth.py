from flask import Blueprint, request, jsonify
from config import get_db_connection
import bcrypt
import jwt
import datetime

auth_bp = Blueprint('auth', __name__)
SECRET_KEY = "tu_clave_secreta"  # Reemplaza esto por una clave segura en entorno de producción

def validar_credenciales(usermed, clave):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT clave FROM medico WHERE usermed = %s", (usermed,))
        result = cur.fetchone()
        cur.close()
        conn.close()

        if not result:
            return False, "Usuario no encontrado"

        clave_hash = result[0].encode('utf-8')
        if bcrypt.checkpw(clave.encode('utf-8'), clave_hash):
            return True, "Login exitoso"
        else:
            return False, "Clave incorrecta"

    except Exception as e:
        # Aquí puedes loguear el error internamente si lo deseas
        return None, "Error interno del servidor"

# 🚪 Ruta de login
@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"success": False, "message": "No se proporcionaron datos"}), 400
            
        usermed = data.get('usermed')
        clave = data.get('clave')

        if not usermed or not clave:
            return jsonify({"success": False, "message": "Faltan campos"}), 400

        resultado, mensaje = validar_credenciales(usermed, clave)

        if resultado is None:
            return jsonify({"success": False, "message": mensaje}), 500
        elif resultado is False:
            status_code = 404 if mensaje == "Usuario no encontrado" else 401
            return jsonify({"success": False, "message": mensaje}), status_code

        # Generar token JWT
        token = jwt.encode({
            "usermed": usermed,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
        }, SECRET_KEY, algorithm="HS256")

        return jsonify({
            "success": True,
            "message": mensaje,
            "token": token,
            "usermed": usermed
        }), 200
        
    except Exception as e:
        print(f"Error en login: {str(e)}")
        return jsonify({"success": False, "message": "Error interno del servidor"}), 500