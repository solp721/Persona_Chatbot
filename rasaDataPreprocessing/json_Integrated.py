import os
import json

def collect_json_files(directory):
    json_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.json'):
                json_files.append(os.path.join(root, file))
    return json_files

def merge_json_files(json_files):
    merged_data = []
    for file in json_files:
        with open(file, 'r', encoding='utf-8')  as f:
            data = json.load(f)
            merged_data.append(data)
    return merged_data

def save_merged_json(merged_data, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(merged_data, f, ensure_ascii=False, indent=4)

def main():
    directories = [
        # 데이터 경로
    ]
    
    json_files = []
    for directory in directories:
        json_files.extend(collect_json_files(directory))
    
    merged_data = merge_json_files(json_files)
    
    desktop_path = os.path.join(os.path.expanduser('~'), '#저장경로')
    output_file = os.path.join(desktop_path, 'merged_data.json') 
    
    save_merged_json(merged_data, output_file)
    print(f"다음 위치에 생성 완료: {output_file}")

if __name__ == "__main__":
    main()
