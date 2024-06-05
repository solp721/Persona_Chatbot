import json
import os

input_path = "# 파일 경로"
output_path = os.path.join(os.path.expanduser('~'), '# 출력 경로로', 'nlu.yml')


with open(input_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

nlu_data = []


for dialogue in data:
    # 상황(intent: situation_id) 추가
    situation = dialogue['info']['situation']
    situation_id = f"situation_{dialogue['info']['id']}"
    nlu_data.append({
        'intent': situation_id,
        'examples': f'- {situation}'
    })
    
    # speaker의 각 발화(intent) 추가
    for utterance in dialogue['utterances']:
        if utterance['role'] == 'speaker':
            text = utterance['text']
            utterance_id = utterance['utterance_id']
            nlu_data.append({
                'intent': utterance_id,
                'examples': f'- {text}'
            })



output = "version: \"3.1\"\n\nnlu:\n"
for entry in nlu_data:
    output += f"\n- intent: {entry['intent']}\n  examples: |\n    {entry['examples']}\n"

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(output)

print("nlu.yml 파일이 성공적으로 생성되었습니다. 위치:", output_path)
