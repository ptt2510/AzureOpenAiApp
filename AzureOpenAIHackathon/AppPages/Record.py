import reflex as rx
from reflex import Component
from ..AppPagesCSS.RecordPageCSS import css
from .ChatBot import chatBot
WIDTH: list[str] = ["90%", "80%", "70%", "60%", "55%"]
from pymongo import MongoClient
client = MongoClient('localhost:27017')
chat = client.test.chat_text
keyy=client.test.key_record
texti=[]
import os
from openai import AzureOpenAI
import asyncio   
client = AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_KEY"),  
    api_version="2023-12-01-preview",
    azure_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT"),
    )
import speech_recognition as sr
time_limit=10000000000000
def get_audio():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Tôi: ", end='')
        audio = r.listen(source, phrase_time_limit=10000000000000)
        try:
            text = r.recognize_google(audio, language="vi-VN")
            print(text)
            return text
        except:
            print("...")
            return 0 
def listToString(s):
 
    # initialize an empty string
    str1 = ""
 
    # traverse in the string
    for ele in s:
        str1 =str1+' '+ ele
 
    # return string
    return str1
deployment_name='GPT35TURBO'

class background_color_change(rx.State):
    background_color = "FFFFFF"

    def change_color(self):
        if self.background_color == "FFFFFF":
            self.background_color = "#FAE7F3"
        else:
            self.background_color = "FFFFFF"

class Text_Record(rx.State):
    text_value: str = "Waiting"
    def change_text(self):
            if self.text_value == "Waiting" or self.text_value == "Recorded":
                self.text_value = "Recording"
            elif self.text_value == "Recording":
                self.text_value = "Recorded"
                
   
class Button_Record(rx.State):
    kq: str ='' 
    button_text: str = "Play"
    bg = "#ecfdf5"
    running: bool=False
    
    def change_button(self):
        if self.button_text == "Play":
            self.button_text = "Stop"
            self.bg = "#fef2f2"
            self.running=True
            return Button_Record.run
        if self.button_text == "Stop":
            self.button_text = "Play"
            self.bg = "#ecfdf5"
            self.running=False
            return Button_Record.run
    @rx.background
    async def run(self):   
        while 1:
            async with self:
                await asyncio.sleep(0.3)
                print(self.running)
                if self.running==True:
                    if(self.running)==True:
                        text = get_audio()
                        if text:
                            global texti
                            texti.append(text+' ')
                else:
                    response = client.chat.completions.create(model=deployment_name, messages=[
        {
        "role": "system",
        "content": "You will be provided with vietnamese text, and your task is to summarize it by vietnamese."
        },
        {
        "role": "user",
        "content": listToString(texti)
        }
    ],
    temperature=0.7,
    max_tokens=740,
    top_p=1)
                    
                    self.kq= "Bản tóm tắt: "+ response.choices[0].message.content.strip()
                    responsei = client.chat.completions.create(model=deployment_name, messages=[
        {
        "role": "system",
        "content": "You will be provided with vietnamese text, and your task is find keywords on this text"
        },
        {
        "role": "user",
        "content": self.kq
        }
    ],
    temperature=0.7,
    max_tokens=740,
    top_p=1)
                    texti=[]
                    key=responsei.choices[0].message.content.strip()
                    key.insert_one({'user':9999,'keyword':key})
                    print('dbok')
                    return
def record() -> rx.Component:
    return rx.vstack(
    rx.center(
            rx.button_group(
                rx.link(
                    rx.button(
                    "LESSON SUMMARY", style=css.get("direct-button"),
                ),
                href="/record"
                ),
                rx.link(
                    rx.button(
                    "LESSON RECORDING", style=css.get("direct-button"),
                ),
                href="/lesson"
                ),
                rx.link(
                    rx.button(
                    "SCHEDULE RECOMMENDATION", style=css.get("direct-button"),
                ),
                href="/schedule"
                ),
            ),
            position="absolute",
            top="0"
        ),
        rx.center(
                rx.heading(
                    Text_Record.text_value,
                    font_size="4em",
                    padding_x="1em",
                    margin_top="390px"
            ),
        ),
        rx.center(
            rx.button(
                Button_Record.button_text,
                bg=Button_Record.bg,
                border_radius="100%",
                width="70px",
                height="70px",
                padding="10px",
                on_click=[
                    Button_Record.change_button,
                    Text_Record.change_text,
                ]
            ),
        ),
        rx.hstack(
                rx.tooltip(
                    rx.text(
                    Button_Record.kq, variant="solid", color_scheme="green"
                    ),
                    label="Bảng tóm tắt cuộc họp",
                )
        ),
        chatBot(),
        bg=background_color_change.background_color,
        style=css.get("main")
    )


# app = rx.App()
# app.add_page(record, title="reflex:DALL·E")
