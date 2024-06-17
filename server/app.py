from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

openai_api_key = # key

@app.route('/')
def home():
    return "Home page"

@app.route('/send', methods=['POST'])
def send_message_to_gpt():
    try:
        user_message = request.json['message']
        chat_history = request.json['chat_history']
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {openai_api_key}'
        }
        
 # model
        
        response = requests.post('https://api.openai.com/v1/chat/completions', headers=headers, json=data)
        
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({"message": "OpenAI 서버로부터 응답을 받지 못했습니다.", "status_code": response.status_code, "error": response.text})
    except Exception as e:
        return jsonify({"message": "서버에서 에러가 발생했습니다.", "error": str(e)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
