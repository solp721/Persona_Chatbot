import os


folder_path = "#입력경로"

output_file = os.path.expanduser("#출력경로")

folder_paths = []

for root, dirs, files in os.walk(folder_path):
    for dir_name in dirs:
        full_path = os.path.join(root, dir_name).replace("\\", "/")
        folder_paths.append(f'"{full_path}"')

with open(output_file, 'w') as f:
    f.write(','.join(folder_paths))

print(f"총 {len(folder_paths)}개의 폴더 경로가 '{output_file}'에 저장되었습니다.")
