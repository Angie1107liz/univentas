from flask import Flask, request, jsonify
import mysql.connector
from werkzeug.security import generate_password_hash

app = Flask(__name__)

# Conectar a la base de datos
try:
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="login_univentas"
    )
    print("✅ Conexión exitosa a la base de datos")
except mysql.connector.Error as err:
    print(f"❌ Error conectando a MySQL: {err}")
    exit(1)  # Cierra la app si la conexión falla


@app.route('/register', methods=['POST'])
def registrar_usuario():
    data = request.json  # Recibir datos del frontend en formato JSON
    
    nombre_usuario = data['nombre_usuario']
    correo_electronico = data['correo_electronico']
    tipo_identificacion = data['tipo_identificacion']
    numero_identificacion = data['numero_identificacion']
    contrasena = generate_password_hash(data['contrasena'])  # Cifrar contraseña

    cursor = db.cursor()
    try:
        cursor.execute("""
            INSERT INTO usuarios (nombre_usuario, correo_electronico, tipo_identificacion, numero_identificacion, contrasena)
            VALUES (%s, %s, %s, %s, %s)
        """, (nombre_usuario, correo_electronico, tipo_identificacion, numero_identificacion, contrasena))
        db.commit()
        return jsonify({"mensaje": "Usuario registrado con éxito"}), 201
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 400
    finally:
        cursor.close()

if __name__ == '__main__':
    app.run(debug=True)
