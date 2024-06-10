import os
import json

input_paths = [
# 입력 경로
]

desktop_path = os.path.join(os.path.expanduser('~'), '# 저장 위치')
merged_output_file = os.path.join(desktop_path, '# 저장 파일 이름')

def merge_and_convert_to_chat_format(input_path, output_file):
    merged_data = []
    line_count = 0

    for root, _, files in os.walk(input_path):
        for file in files:
            if file.endswith('.json'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    utterances = data.get("utterances", [])
                    for i in range(len(utterances) - 1):
                        user_message = utterances[i].get("text", "")
                        assistant_message = utterances[i + 1].get("text", "")
                        merged_data.append({
                            "messages": [
                                {"role": "user", "content": user_message},
                                {"role": "assistant", "content": assistant_message}
                            ]
                        })
                        line_count += 1
                        if line_count >= 62:
                            break
                if line_count >= 62:
                    break

    with open(output_file, 'w', encoding='utf-8') as f:
        for entry in merged_data:
            f.write(json.dumps(entry, ensure_ascii=False) + '\n')

temp_jsonl_files = []
for i, input_path in enumerate(input_paths):
    temp_output_file = os.path.join(desktop_path, f'temp_output_{i}.jsonl')
    merge_and_convert_to_chat_format(input_path, temp_output_file)
    temp_jsonl_files.append(temp_output_file)

with open(merged_output_file, 'w', encoding='utf-8') as outfile:
    line_count = 0
    for fname in temp_jsonl_files:
        with open(fname, 'r', encoding='utf-8') as infile:
            for line in infile:
                outfile.write(line)
                line_count += 1
                if line_count >= 2500:
                    break
        if line_count >= 2500:
            break

print(f"최종 JSONL 파일이 성공적으로 생성되었습니다. 위치: {merged_output_file}")
