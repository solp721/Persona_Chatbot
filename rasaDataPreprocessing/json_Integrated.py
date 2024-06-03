import os
import json

def collect_json_files(directory, limit=200):
    json_files = []
    count = 0
    for root, _, files in os.walk(directory):
        for file in sorted(files):
            if file.endswith('.json'):
                json_files.append(os.path.join(root, file))
                count += 1
                if count >= limit:
                    break
        if count >= limit:
            break
    return json_files

def merge_json_files(json_files):
    merged_data = []
    for file in json_files:
        with open(file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            merged_data.append(data)
    return merged_data

def save_merged_json(merged_data, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(merged_data, f, ensure_ascii=False, indent=4)

def main():
    directories = [
        "C:/Users/NM333-83/Desktop/046.공감형 대화/01-1.정식개방데이터/Training/02.라벨링데이터",
        "C:/Users/NM333-83/Desktop/046.공감형 대화/01-1.정식개방데이터/Validation/02.라벨링데이터"
    ]
    
    json_files = []
    for directory in directories:
        json_files.extend(collect_json_files(directory))
    
    merged_data = merge_json_files(json_files)
    
    desktop_path = os.path.join(os.path.expanduser('~'), 'Desktop')
    output_file = os.path.join(desktop_path, 'merged_data.json')
    
    save_merged_json(merged_data, output_file)
    print(f"다음 위치에 생성 완료: {output_file}")

if __name__ == "__main__":
    main()
