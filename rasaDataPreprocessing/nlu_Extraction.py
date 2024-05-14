import json

# 파일 경로
input_path = "입력경로"
output_path = "출력경로"

# JSON 파일 읽기
with open(input_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

nlu_data = []

# 각 대화 데이터에 대해 NLU 데이터 생성
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

# NLU 데이터 YAML 형식으로 변환
output = "version: \"3.1\"\n\nnlu:\n"
for entry in nlu_data:
    output += f"\n- intent: {entry['intent']}\n  examples: |\n    {entry['examples']}\n"

# YAML 파일 저장
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(output)

print("NLU 파일이 성공적으로 생성되었습니다.")
