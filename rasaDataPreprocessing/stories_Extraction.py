import json

# 파일 경로
input_path = "C:/Users/NM333-83/Desktop/merged_data.json"
output_path = "C:/Users/NM333-83/Desktop/stories.yml"

# JSON 파일 읽기
with open(input_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

stories = []

# 각 대화 데이터에 대해 stories 생성
for dialogue in data:
    story = {
        'story': f"situation_{dialogue['info']['id']}",
        'steps': []
    }
    
    # situation 추가
    situation_id = f"situation_{dialogue['info']['id']}"
    story['steps'].append({'intent': situation_id})
    story['steps'].append({'action': 'utter_answer'})
    
    # speaker와 listener의 각 발화 추가
    for utterance in dialogue['utterances']:
        if utterance['role'] == 'speaker':
            story['steps'].append({'intent': utterance['utterance_id']})
        elif utterance['role'] == 'listener':
            utterance_id = f"utter_{utterance['utterance_id']}"
            story['steps'].append({'action': utterance_id})
    
    # 마지막에 goodbye action 추가
    story['steps'].append({'action': 'utter_goodbye'})
    
    stories.append(story)

# stories.yml 파일의 내용을 문자열로 생성
output = f"""version: "3.1"

stories:
"""

for story in stories:
    output += f"\n- story: {story['story']}\n  steps:\n"
    for step in story['steps']:
        if 'intent' in step:
            output += f"  - intent: {step['intent']}\n"
        if 'action' in step:
            output += f"  - action: {step['action']}\n"

# stories.yml 파일 저장
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(output)

print("stories.yml 파일이 성공적으로 생성되었습니다.")
