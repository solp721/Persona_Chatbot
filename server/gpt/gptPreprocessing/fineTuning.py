import openai
import json

# OpenAI API 키 설정
openai.api_key = '# API key'

# 파인튜닝 데이터 파일 경로
persona_merge_data_path = '#입력경로1'
korean_merged_data_path = '#입력경로2'

def upload_file(file_path, purpose='fine-tune'):
    response = openai.File.create(
        file=open(file_path, 'rb'),
        purpose=purpose
    )
    return response['id']

# 파일 업로드
persona_merge_file_id = upload_file(persona_merge_data_path)
korean_merged_file_id = upload_file(korean_merged_data_path)

# 파인튜닝 작업 생성
fine_tune_response = openai.FineTuningJob.create(
    model="gpt-3.5-turbo-0125",
    training_file=persona_merge_file_id,
    validation_file=korean_merged_file_id,
    hyperparameters={
        "n_epochs": 3
    }
)

# 파인튜닝 작업 ID 출력
print("Fine-tuning job ID:", fine_tune_response['id'])

# 파인튜닝 작업 상태 모니터링
def get_fine_tuning_status(job_id):
    response = openai.FineTuningJob.retrieve(id=job_id)
    return response

job_id = fine_tune_response['id']
status_response = get_fine_tuning_status(job_id)
print("Fine-tuning status:", status_response['status'])
