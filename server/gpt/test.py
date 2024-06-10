import openai

openai.api_key = '# API KEY'

fine_tuned_model = '# 모델이름'

response = openai.ChatCompletion.create(
    model=fine_tuned_model,
    messages=[
        {"role": "user", "content": "안녕하세요. 오늘 날씨는 어떤가요?"}
    ]
)

print(response['choices'][0]['message']['content'])
