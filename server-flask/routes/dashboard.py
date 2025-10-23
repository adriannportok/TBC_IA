from flask import Blueprint, jsonify, request
from config import get_db_connection

dashboard = Blueprint('dashboard', __name__)

@dashboard.route('/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        username = request.args.get('username')
        if not username:
            return jsonify({"error": "Username es requerido"}), 400

        cur.execute(
            "SELECT id_usuario FROM usuario WHERE usuario = %s AND rol = 'medico'",
            (username,)
        )
        medico = cur.fetchone()
        
        if not medico:
            return jsonify({"error": "Médico no encontrado"}), 404
        
        medico_id = medico[0]
        # Query para total de pacientes
        cur.execute(
            "SELECT COUNT(*) FROM paciente WHERE id_usuario = %s",
            (medico_id,)
        )
        total_pacientes = cur.fetchone()[0]

        # Query para predicciones positivas
        cur.execute("""
            SELECT COUNT(*) 
            FROM prediccion p 
            JOIN paciente pac ON p.id_paciente = pac.id_paciente 
            WHERE pac.id_usuario = %s AND p.porcentaje > 50
        """, (medico_id,))
        predicciones_positivas = cur.fetchone()[0]
        
        # Query para últimas predicciones
        cur.execute("""
            SELECT 
                pac.nombres, 
                pac.apellidos, 
                p.porcentaje, 
                p.fecha_pred,
                p.ruta_imagen
            FROM prediccion p 
            JOIN paciente pac ON p.id_paciente = pac.id_paciente 
            WHERE pac.id_usuario = %s
            ORDER BY p.fecha_pred DESC 
            LIMIT 5
        """, (medico_id,))
        rows = cur.fetchall()
        
        # Query para estadísticas mensuales
        cur.execute("""
            SELECT 
                TO_CHAR(p.fecha_pred, 'YYYY-MM') as mes,
                COUNT(CASE WHEN p.porcentaje > 50 THEN 1 END)::FLOAT / COUNT(*) * 100 as porcentaje_positivos,
                COUNT(CASE WHEN p.porcentaje <= 50 THEN 1 END)::FLOAT / COUNT(*) * 100 as porcentaje_negativos,
                COUNT(*) as total_analisis
            FROM prediccion p
            JOIN paciente pac ON p.id_paciente = pac.id_paciente
            WHERE pac.id_usuario = %s
            GROUP BY TO_CHAR(p.fecha_pred, 'YYYY-MM')
            ORDER BY mes DESC
            LIMIT 6
        """, (medico_id,))
        stats_mensuales = [
            {
                "mes": row[0],
                "porcentaje_positivos": float(row[1]) if row[1] is not None else 0.0,
                "porcentaje_negativos": float(row[2]) if row[2] is not None else 0.0,
                "total_analisis": row[3]
            }
            for row in cur.fetchall()
        ]
        
        predicciones_lista = []
        for row in rows:
            predicciones_lista.append({
                "nombre_paciente": f"{row[0]} {row[1]}",
                "porcentaje": float(row[2]) if row[2] is not None else 0.0,
                "fecha": row[3].strftime("%Y-%m-%d %H:%M:%S") if row[3] else None,
                "ruta_imagen": row[4]
            })
        
        cur.close()
        conn.close()

        return jsonify({
            "total_pacientes": total_pacientes,
            "predicciones_positivas": predicciones_positivas,
            "ultimas_predicciones": predicciones_lista,
            "stats_mensuales": stats_mensuales
        })
        
    except Exception as e:
        print("Error:", str(e))  # Para debugging
        return jsonify({"error": "Error interno del servidor"}), 500
