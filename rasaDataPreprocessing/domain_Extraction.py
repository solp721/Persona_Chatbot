import json
import os

# 파일 경로
input_path = "C:/Users/NM333-83/Desktop/new_merged_data.json"
output_path = os.path.join(os.path.expanduser('~'), 'Desktop', 'domain.yml')

# JSON 파일 읽기
with open(input_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

intents = []
responses = {
    "utter_answer": [{"text": "상황 설정 완료"}],
    "utter_goodbye": [{"text": "대화가 종료되었습니다."}]
}
actions = ["utter_answer"]

# 각 대화 데이터에 대해 intents와 responses 생성
for dialogue in data:
    # situation 추가
    situation_id = f"situation_{dialogue['info']['id']}"
    intents.append(situation_id)
    
    # speaker의 각 발화 intent 추가
    for utterance in dialogue['utterances']:
        if utterance['role'] == 'speaker':
            intents.append(utterance['utterance_id'])
    
    # listener의 각 발화 response 추가
    for utterance in dialogue['utterances']:
        if utterance['role'] == 'listener':
            empathy = utterance.get('listener_empathy', [])
            text = utterance['text']
            utterance_id = f"utter_{utterance['utterance_id']}"
            
            empathy_prefix = ""
            if empathy:
                empathy_prefix = ", ".join(empathy) + ": "
                
            responses[utterance_id] = [{"text": f"{empathy_prefix}{text}"}]
            actions.append(utterance_id)

# domain.yml 파일의 내용을 문자열로 생성
output = f"""version: "3.1"

intents:
"""

for intent in intents:
    output += f"  - {intent}\n"

output += "\nresponses:\n"

for response, texts in responses.items():
    output += f"  {response}:\n"
    for text in texts:
        output += f"    - text: \"{text['text']}\"\n"

output += "\nactions:\n"

for action in actions:
    output += f"  - {action}\n"

output += """
session_config:
  session_expiration_time: 60
  carry_over_slots_to_new_session: true
"""

# domain.yml 파일 저장
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(output)

print("domain.yml 파일이 성공적으로 생성되었습니다. 위치:", output_path)
