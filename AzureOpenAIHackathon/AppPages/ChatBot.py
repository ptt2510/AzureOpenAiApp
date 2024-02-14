# chatapp.py
import reflex as rx
import openai
import os
from pymongo import MongoClient
client = MongoClient('localhost:27017')
chatt = client.test.chat_text
key=client.test.key_record
from ..AppPagesCSS.ChatbotStyle import *


client = openai.AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_KEY"),  
    api_version="2023-12-01-preview",
    azure_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT"),
         )
deployment_name='GPT35TURBO16K'

class ChatbotState(rx.State):
    question: str
    isVisible: bool = False
    chat_history: list[tuple[str, str]]


    def toggleVisible(self):
        self.isVisible= not (self.isVisible)

    async def answer(self):
        chatt.insert_one({'user1':9999,'chatbot text':self.question})
        print('dbokchat')
        botResponse = client.chat.completions.create(
            model=deployment_name,
            messages=[
                {"role": "user", "content": self.question}
            ],
            stop=None,
            temperature=0.7,
            stream=True,
        )
        answer = ""
        self.chat_history.append((self.question, answer))
        self.question = ""
        yield
        try:
            for item in botResponse:
                if len(item.choices) != 0:
                    if item.choices[0].delta.content is not None:
                        answer += item.choices[0].delta.content
                        self.chat_history[-1] = (
                            self.chat_history[-1][0],
                            answer,
                    )
                yield
        except Exception as e:
            print(f"\nAn error occurred: {e}")
def qa(question: str, answer: str) -> rx.Component:
    return rx.box(
        rx.box(
            rx.text(question, text_align="right", font_size="15px"),
            style=question_style,
        ),
        rx.box(
            rx.text(answer, text_align="left", font_size="15px"),
            style=answer_style,
        ),
        margin_y="1em",
    )


def chat() -> rx.Component:
    return rx.box(
        rx.foreach(
            ChatbotState.chat_history,
            lambda messages: qa(messages[0], messages[1]),
        ),
        height="500px",
        border="lightgray solid 1px",
        overflow_y="scroll",
        padding="20px",
        background_color="white"
    )


def action_bar() -> rx.Component:
    return rx.hstack(
        rx.input(
            value=ChatbotState.question,
            placeholder="Ask a question",
            on_change=ChatbotState.set_question,
            style=input_style,
        ),
        rx.button(
            "Ask",
            on_click=ChatbotState.answer,
            style=button_style,
        ),
        margin_y="20px"
    )


def chatBot() -> rx.Component:
    return rx.container(
        rx.cond(
            ChatbotState.isVisible,
            rx.container(
                rx.text("CHAT HERE", text_align="center", font_weight="bold", font_size="25px", margin_y="10px"),
                chat(),
                action_bar(),
                border="lightgray solid 1px",
                width="500px",
                border_radius="30px",
                position="fixed",
                right="10px",
                bottom="100px",
                background_color="lightgray"
        ),
            rx.Fragment(),
        ),
        rx.text(
            "CHAT", 
            text_align="center", 
            font_weight="bold", 
            font_size="20px",
            border="black solid 1px",
            border_radius="50px",
            position="fixed",
            right="20px",
            bottom="20px",
            padding="10px",
            background_color="blue",
            color="white",
            on_click=ChatbotState.toggleVisible,
            _hover={"cursor":"pointer", "background-color": "#0303c5"},
            _active={"background-color":"#0c0cec"}
        ),
    )


