# Persona-based Conversation Simulation System for Improving Conversation Skills

## Dongseo University Capstone Design, Graduation Project

### Overview

This project aims to enhance conversation skills through a persona-based conversation simulation system. The system is developed using a combination of modern web technologies and advanced AI-driven chatbots.

### Technologies Used

- **Frontend**: React
- **Backend**: Flask
- **Chatbot**: Rasa and GPT-3.5 Turbo API

### Training Rasa with an Empathetic Dialogue Dataset

I utilized the empathetic dialogue dataset from [AI Hub](https://aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&dataSetSn=71305) to train Rasa. The training process involved preprocessing the dataset to fit our use case.

#### 1. Data Preprocessing

The dataset was divided into different stories based on the situations described in the data.

#### 2. NLU and Domain Generation

For each situation, I created corresponding Natural Language Understanding (NLU) models and domain files. These domains were designed to recognize and respond to specific empathetic intents.

#### 3. Empathy Categories

The intents within each domain were categorized based on the type of empathy conveyed. Examples include:

- **Agreement**: Expressing concurrence with the user's feelings or opinions.
- **Consolation**: Providing comfort and support to the user.

#### 4. Current Model Training

The current models have been trained on a very small dataset. To improve accuracy, it is necessary to train with a larger dataset.

### Fine-Tuning GPT-3.5 Turbo with Persona and Korean Multisession Dialogue Data

To enhance the conversational abilities and ensure the model accurately reflects the persona characteristics, I utilized datasets from AI Hub, including the [Persona Dialogue Dataset](https://www.aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&dataSetSn=71302) and the [Korean Multisession Dialogue Dataset](https://www.aihub.or.kr/aihubdata/data/view.do?currMenu=115&topMenu=100&dataSetSn=71630).

#### 1. Data Preprocessing

The datasets were first preprocessed to fit the requirements for fine-tuning GPT-3.5 Turbo. This involved:

- **Cleaning and Formatting**: Removing irrelevant data and ensuring consistency in the dialogue format.
- **Segmentation**: Dividing the data into manageable chunks for training, ensuring each segment represented a coherent dialogue session.

#### 2. JSONL Conversion

The preprocessed data was converted into JSONL (JSON Lines) format, which is suitable for fine-tuning with OpenAI's API.

#### 3. Fine-Tuning Process

Using OpenAI's fine-tuning tools, the prepared JSONL data was utilized to fine-tune GPT-3.5 Turbo. The process included:

- **Uploading Data**: The JSONL files were uploaded to the OpenAI fine-tuning platform.
- **Training Configuration**: Configuring the training parameters to optimize performance for Korean language understanding and persona-specific responses.
- **Training Execution**: Running the fine-tuning process, which involved multiple epochs to iteratively improve the model's performance.

#### 4. Model Evaluation

Post-training, the model was evaluated to ensure it accurately reflects the persona traits and can handle various conversational contexts. This involved:

- **Testing Scenarios**: Conducting tests with different dialogue scenarios to check for naturalness and relevance.
- **Performance Metrics**: Measuring key metrics such as response accuracy, empathy levels, and coherence in extended dialogues.

### Results and Future Improvements

The fine-tuned GPT-3.5 Turbo model has shown significant improvements in handling Korean dialogues and maintaining persona consistency. However, further enhancements can be made by:

- **Expanding the Dataset**: Incorporating more diverse and extensive dialogue examples.
- **Continuous Training**: Periodically updating the model with new data to adapt to evolving conversational patterns.

By integrating Rasa and GPT-3.5 Turbo, this system aims to provide a robust platform for improving conversational skills through empathetic and persona-driven interactions.
