import os
import secrets
import smtplib
import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS  
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from email.message import EmailMessage

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)
CORS(app)  # 🔹 Permitir solicitudes desde cualquier origen

# 🔹 Configurar SMTP para enviar correos
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = os.getenv("SMTP_PORT")
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")

# 🔹 Conectar a la base de datos
try:
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="login_univentas"
    )
    db.autocommit = True  
    print("✅ Conexión exitosa a la base de datos")
except mysql.connector.Error as err:
    print(f"❌ Error conectando a MySQL: {err}")
    exit(1)  # Cierra la app si la conexión falla

# 🔹 Ruta para registrar usuario
@app.route('/register', methods=['POST'])
def registrar_usuario():
    data = request.json  
    if not data:
        return jsonify({"error": "No se recibieron datos"}), 400

    nombre_usuario = data.get('nombre_usuario')
    correo_electronico = data.get('correo_electronico')
    tipo_identificacion = data.get('tipo_identificacion')
    numero_identificacion = data.get('numero_identificacion')
    contrasena = data.get('contrasena')

    if not all([nombre_usuario, correo_electronico, tipo_identificacion, numero_identificacion, contrasena]):
        return jsonify({"error": "Todos los campos son obligatorios"}), 400

    contrasena_hash = generate_password_hash(contrasena)

    cursor = db.cursor()
    try:
        cursor.execute("""
            INSERT INTO usuarios (nombre_usuario, correo_electronico, tipo_identificacion, numero_identificacion, contrasena)
            VALUES (%s, %s, %s, %s, %s)
        """, (nombre_usuario, correo_electronico, tipo_identificacion, numero_identificacion, contrasena_hash))
        db.commit()
        return jsonify({"mensaje": "Usuario registrado con éxito"}), 201
    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 400
    finally:
        cursor.close()

# 🔹 Ruta para iniciar sesión
@app.route('/login', methods=['POST'])
def login_usuario():
    data = request.json
    correo = data.get('correo_electronico')
    contrasena = data.get('contrasena')

    if not correo or not contrasena:
        return jsonify({"error": "Correo y contraseña son obligatorios"}), 400

    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios WHERE correo_electronico = %s", (correo,))
    usuario = cursor.fetchone()
    cursor.close()

    if usuario and check_password_hash(usuario['contrasena'], contrasena):
        return jsonify({"mensaje": "Login exitoso", "usuario": usuario['nombre_usuario']}), 200
    else:
        return jsonify({"error": "Correo o contraseña incorrectos"}), 401

# 🔹 Iniciar la aplicación
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
