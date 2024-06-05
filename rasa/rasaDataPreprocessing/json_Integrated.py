import os
import json

def merge_top_1_json_file(input_paths, output_file):
    merged_data = []

    for input_path in input_paths:
        for root, dirs, files in os.walk(input_path):
            if '기쁨' in root:
                continue  

            json_files = [file for file in files if file.endswith('.json')]
            json_files = sorted(json_files)[:1]  

            for json_file in json_files:
                file_path = os.path.join(root, json_file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    merged_data.append(data)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(merged_data, f, ensure_ascii=False, indent=4)

    print("JSON 파일 병합이 완료되었습니다. 출력 파일:", output_file)


input_paths = [
    # 입력 경로
]

desktop_path = os.path.join(os.path.expanduser('~'), '# 출력 파일 경로 설정') 
output_file = os.path.join(desktop_path, '# 출력 파일 경로 설정') 

merge_top_1_json_file(input_paths, output_file)
