from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import openai

app = Flask(__name__)
CORS(app)

openai.api_key = 'apikey'

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

@app.route('/chatgpt', methods=['POST'])
def chat_with_gpt():
    user_message = request.json['message']
    
    try:
        # GPT-3.5 Turbo API 호출
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message}
            ]
        )
        
        # GPT-3.5 Turbo 응답 반환
        gpt_message = response['choices'][0]['message']['content']
        return jsonify({"message": gpt_message})
    
    except Exception as e:
        return jsonify({"message": "GPT-3.5 Turbo API 호출 중 오류가 발생했습니다.", "error": str(e)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
