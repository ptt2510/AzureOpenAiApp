import datetime
from kafka import KafkaConsumer
from numpy import asarray
from PIL import Image
import io
import cv2
from openai import AzureOpenAI
import easyocr
deployment_name='GPT35TURBO'
# Fire up the Kafka Consumer
topic = "cam"
s=''
w=''

def listToString(s):
 
    # initialize an empty string
    str1 = ""
 
    # traverse in the string
    for ele in s:
        str1 += ele
 
    # return string
    return str1
reader = easyocr.Reader(['vi','en'],gpu=True)
client = AzureOpenAI(
    api_key='90c5b8bb97c54eaaaaf1322635a5241b',  
    api_version="2023-12-01-preview",
    azure_endpoint = 'https://sunhackathon29.openai.azure.com/'
    )

consumer = KafkaConsumer(
    topic, 
    bootstrap_servers=['localhost:9092'])

for msg in consumer:
    img = Image.open(io.BytesIO(msg.value))
    img.show()
    s = reader.readtext(img,detail=0)
    if s== w:
        continue
    print(s)
    response = client.chat.completions.create(model=deployment_name, messages=[
    {
      "role": "system",
      "content": "You will be provided with a block of vietnamese text, and your task is to extract, explain, give example a list of keywords using vietnamese "
    },
    {
      "role": "user",
      "content": listToString(s)
    }
  ],
  temperature=0.7,
  max_tokens=740,
  top_p=1)
    print("chatbot: "+ response.choices[0].message.content.strip())
    w=s
