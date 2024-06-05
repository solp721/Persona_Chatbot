import json
import os

# 파일 경로
input_path = "# 파일 경로"
output_path = os.path.join(os.path.expanduser('~'), '# 출력 경로로', 'nlu.yml')

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
    

    story['steps'].append({'action': 'utter_goodbye'})
    
    stories.append(story)


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


with open(output_path, 'w', encoding='utf-8') as f:
    f.write(output)

print("stories.yml 파일이 성공적으로 생성되었습니다. 위치:", output_path)
