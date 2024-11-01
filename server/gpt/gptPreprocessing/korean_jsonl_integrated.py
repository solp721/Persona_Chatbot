import os
import json

input_paths = [
# 입력 경로
]

desktop_path = os.path.join(os.path.expanduser('~'), '# 저장 위치')
merged_output_file = os.path.join(desktop_path, '# 저장 파일 이름')

def merge_and_convert_to_chat_format(input_path, output_file):
    merged_data = []

    for root, _, files in os.walk(input_path):
        for file in files:
            if file.endswith('.json'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    for session in data.get("sessionInfo", []):
                        dialog = session.get("dialog", [])
                        for i in range(len(dialog) - 1):
                            user_message = dialog[i].get("utterance", "")
                            assistant_message = dialog[i + 1].get("utterance", "")
                            merged_data.append({
                                "messages": [
                                    {"role": "user", "content": user_message},
                                    {"role": "assistant", "content": assistant_message}
                                ]
                            })

    with open(output_file, 'w', encoding='utf-8') as f:
        for entry in merged_data[:415]:
            f.write(json.dumps(entry, ensure_ascii=False) + '\n')

temp_jsonl_files = []
for input_path in input_paths:
    temp_output_file = os.path.join(desktop_path, os.path.basename(input_path) + '.jsonl')
    merge_and_convert_to_chat_format(input_path, temp_output_file)
    temp_jsonl_files.append(temp_output_file)

with open(merged_output_file, 'w', encoding='utf-8') as outfile:
    for fname in temp_jsonl_files:
        with open(fname, 'r', encoding='utf-8') as infile:
            for line in infile:
                outfile.write(line)

print(f"최종 JSONL 파일이 성공적으로 생성되었습니다. 위치: {merged_output_file}")


