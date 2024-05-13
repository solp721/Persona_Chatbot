from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Home page"

@app.route('/send', methods=['POST'])
def send_message_to_rasa():
    user_message = request.json['message']
    headers = {'Content-Type': 'application/json'}
    
    response = requests.post('http://localhost:5005/webhooks/rest/webhook', json={"sender": "user", "message": user_message}, headers=headers)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"message": "Rasa 서버로부터 응답을 받지 못했습니다."})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
