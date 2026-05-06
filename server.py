from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
import os
import sqlite3
import requests
from dotenv import load_dotenv

load_dotenv()

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
DATABASE_PATH = os.path.join(os.path.dirname(__file__), 'club_applications.db')

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # 5 MB

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

BOT_TOKEN = os.getenv('BOT_TOKEN')
CHAT_ID = os.getenv('CHAT_ID')

print(f"Loaded BOT_TOKEN: {BOT_TOKEN[:10] if BOT_TOKEN else 'None'}...")
print(f"Loaded CHAT_ID: {CHAT_ID}")

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def allowed_file(filename):
    extension = filename.rsplit('.', 1)[-1].lower()
    return '.' in filename and extension in ALLOWED_EXTENSIONS


def send_to_telegram(club, name, email, phone, department, year, essay):
    if not BOT_TOKEN or not CHAT_ID:
        print("Telegram credentials not set.")
        return

    message = f"""
New Club Registration:
Club: {club}
Name: {name}
Email: {email}
Phone: {phone}
Department: {department}
Year: {year}
Essay: {essay}
"""

    url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"

    try:
        response = requests.post(url, data={
            "chat_id": CHAT_ID,
            "text": message
        })
        if response.status_code != 200:
            print(f"Telegram API Error: {response.status_code} - {response.text}")
        else:
            print("Telegram message sent successfully.")
    except Exception as e:
        print(f"Failed to send to Telegram: {e}")


def init_db():
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute(
        '''
        CREATE TABLE IF NOT EXISTS applications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            club TEXT NOT NULL,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT NOT NULL,
            department TEXT NOT NULL,
            year TEXT NOT NULL,
            essay TEXT NOT NULL,
            proof_path TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        '''
    )
    conn.commit()
    conn.close()


@app.route('/api/club-join', methods=['POST'])
def club_join():
    if 'payment_proof' not in request.files:
        return jsonify({'error': 'Payment proof is required.'}), 400

    file = request.files['payment_proof']
    if file.filename == '':
        return jsonify({'error': 'No file selected.'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': 'Only JPG and PNG images are allowed.'}), 400

    filename = secure_filename(file.filename)
    save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(save_path)

    club = request.form.get('club', '').strip()
    name = request.form.get('name', '').strip()
    email = request.form.get('email', '').strip()
    phone = request.form.get('phone', '').strip()
    department = request.form.get('department', '').strip()
    year = request.form.get('year', '').strip()
    essay = request.form.get('essay', '').strip()

    # Debugging: Print received fields to terminal
    print(f"Processing application for {name} ({club})")
    
    required_fields = ['club', 'name', 'email', 'phone', 'department', 'year', 'essay']
    missing = [f for f in required_fields if not request.form.get(f, '').strip()]
    if missing:
        print(f"Submission failed: Missing fields {missing}")
        return jsonify({'error': f'Missing fields: {", ".join(missing)}'}), 400

    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute(
        '''
        INSERT INTO applications (club, name, email, phone, department, year, essay, proof_path)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''',
        (club, name, email, phone, department, year, essay, save_path)
    )
    conn.commit()
    conn.close()

    # Send to Telegram
    send_to_telegram(club, name, email, phone, department, year, essay)

    return jsonify({'message': 'Application submitted successfully.'}), 200


@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_file(filename):
    if os.path.isfile(filename):
        return send_from_directory('.', filename)
    else:
        return "File not found", 404


if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)
