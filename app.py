import os
import secrets
import smtplib
import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS  
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from flask import render_template
from email.message import EmailMessage

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://192.168.1.122:5002"}})

# 🔹 Configurar SMTP para enviar correos
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT", 465))  # Convertir a entero
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


# 🔹 Función para enviar correos electrónicos
def enviar_correo(destinatario, asunto, contenido):
    """ Envía un correo con los datos proporcionados """
    try:
        mensaje = EmailMessage()
        mensaje["From"] = SMTP_USER
        mensaje["To"] = destinatario
        mensaje["Subject"] = asunto
        mensaje.set_content(contenido, subtype="html")

        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as servidor:
            servidor.login(SMTP_USER, SMTP_PASSWORD)
            servidor.send_message(mensaje)

        print("✅ Correo enviado correctamente")
    except Exception as e:
        print(f"❌ Error al enviar correo: {e}")


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


# 🔹 Ruta para recuperar contraseña
@app.route('/recuperarContrasena', methods=['POST'])
def recuperar_contrasena():
    data = request.json
    correo = data.get("correo_electronico")

    if not correo:
        return jsonify({"error": "Correo electrónico es obligatorio"}), 400

    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios WHERE correo_electronico = %s", (correo,))
    usuario = cursor.fetchone()

    if not usuario:
        return jsonify({"error": "El correo no está registrado"}), 404

    # 🔹 Generar un token de recuperación
    token = secrets.token_urlsafe(16)

    # Guardar el token en la base de datos
    cursor.execute("UPDATE usuarios SET token_recuperacion = %s WHERE correo_electronico = %s", (token, correo))
    db.commit()
    cursor.close()

    # 🔹 Construir el enlace de recuperación
    enlace = f"http://192.168.1.122:5002/template/restablecerContrasena.html?token={token}"
    asunto = "Recuperación de contraseña"
    contenido = f"""
    <p>Hola, {usuario['nombre_usuario']}</p>
    <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
    <p><a href="{enlace}">{enlace}</a></p>
    <p>Si no solicitaste esto, ignora este mensaje.</p>
    """

    # Enviar el correo
    enviar_correo(correo, asunto, contenido)

    return jsonify({"mensaje": "Correo de recuperación enviado"}), 200


# 🔹 Ruta para restablecer contraseña
@app.route('/restablecer-contrasena', methods=['POST'])
def restablecer_contrasena():
    data = request.json
    token = data.get('token')
    nueva_contrasena = data.get('nueva_contrasena')

    if not token or not nueva_contrasena:
        return jsonify({"error": "Token y nueva contraseña son obligatorios"}), 400

    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios WHERE token_recuperacion = %s", (token,))
    usuario = cursor.fetchone()

    if not usuario:
        return jsonify({"error": "Token inválido o expirado"}), 400

    nueva_contrasena_hash = generate_password_hash(nueva_contrasena)

    # Actualizar contraseña y eliminar el token
    cursor.execute("UPDATE usuarios SET contrasena = %s, token_recuperacion = NULL WHERE token_recuperacion = %s",
        (nueva_contrasena_hash, token))
    db.commit()
    cursor.close()

    return jsonify({"mensaje": "Contraseña actualizada con éxito"}), 200


# 🔹 Iniciar la aplicación
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
