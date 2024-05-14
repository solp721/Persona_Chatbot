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

1. **Data Preprocessing**: The dataset was divided into different stories based on the situations described in the data.
2. **NLU and Domain Generation**: For each situation, I created corresponding Natural Language Understanding (NLU) models and domain files. These domains were designed to recognize and respond to specific empathetic intents.
3. **Empathy Categories**: The intents within each domain were categorized based on the type of empathy conveyed, such as:
   - **Agreement**: Expressing concurrence with the user's feelings or opinions.
   - **Consolation**: Providing comfort and support to the user.
