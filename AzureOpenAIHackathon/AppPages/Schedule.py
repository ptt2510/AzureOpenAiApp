import reflex as rx
from ..AppPagesCSS.RecordPageCSS import css
import pandas as pd
import os
import openai
from .ChatBot import chatBot


client = openai.AzureOpenAI(
    api_key=os.getenv("AZURE_OPENAI_KEY"),  
    api_version="2023-12-01-preview",
    azure_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT"),
)
deployment_name='GPT35TURBO16K'
class ScheduleState(rx.State):
    excelFilesDir: str
    prompt:str
    result:str
    processing = False
    async def handle_generate_schedule(self, files: list[rx.UploadFile]):
       if self.prompt == "":
            rx.window_alert("Prompt Empty")
            return
       self.processing = True
       yield
       for file in files:
            upload_data = await file.read()
            outfile = rx.get_asset_path(file.filename)
            with open(outfile, "wb") as file_object:
                file_object.write(upload_data)
            self.excelFilesDir = outfile
       try:
            tkb=pd.read_excel(os.path.abspath(self.excelFilesDir))
            tkb['TỐ TC']=tkb['TỐ TC'].astype('string')
            tkb['TIẾT']=tkb['TIẾT'].astype('string')
            tkb['combined']=' Mã Lớp: ' + tkb['MÃ LỚP'] + ' Tên môn học: ' + tkb['TÊN MÔN HỌC'] + ' Số Tín Chỉ: '+tkb['TỐ TC'] +' Ngôn ngữ: '+tkb['NGÔN NGỮ'] +' Thứ: '+tkb['THỨ']+' Tiết: '+tkb['TIẾT'] 
            context=tkb['combined'].head().to_json(orient='records')
            response = client.chat.completions.create(model=deployment_name, messages=[
               {
                "role": "system",
                "content": "You will be provided with vietnamese expected timetable for new semester and a user's request, and your task is recommend a timetable which can meet the user's request"
               },
               {
                "role": "user",
                "content": "Context: " + context + "\n\n user's request: " + self.prompt
               }
            ])
            self.result = response.choices[0].message.content.strip()
            self.processing = False
       except FileNotFoundError:
            print("File Not Found")
            print(os.path.abspath(self.excelFilesDir))
            return
       except openai.APITimeoutError:
           self.processing=False
           return
       

color = "rgb(107,99,246)"

def schedule() -> rx.Component:
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
        rx.upload(
            rx.vstack(
                rx.button(
                    "Select File",
                    color=color,
                    bg="white",
                    border=f"1px solid {color}",
                ),
                rx.text(
                    "Drag and drop files here or click to select files"
                ),
            ),
            accept={
               "application/vnd.ms-excel":["xls" ],
               "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":["xlsx"]
            },
            border=f"1px dotted {color}",
            padding="5em",
        ),
        rx.hstack(rx.foreach(rx.selected_files, rx.text)),
        rx.button(
            "Clear",
            on_click=rx.clear_selected_files,
        ),
        rx.text(
           "How do you want your schedule to be made ?",
           margin="5em",
           font_size="20px",
           font_weight="bold",
           ),
        rx.input(
           value=ScheduleState.prompt,
           on_change=ScheduleState.set_prompt,
           width="500px",
           border_color="blue"
        ),
        rx.button(
            "Generate Schedule",
            on_click=lambda: ScheduleState.handle_generate_schedule(rx.upload_files()),
            is_loading= ScheduleState.processing
        ),
        rx.text(
           ScheduleState.result,
           width="1000px",
           text_align="justify",
           white_space="pre-line"
        ),
        chatBot(),
        padding="5cm 5em 5em 5em",
        style=css.get("main")
    )