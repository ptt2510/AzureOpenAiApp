
import reflex as rx
from ..AppPagesCSS.RecordPageCSS import css
from .ChatBot import chatBot
class LessonState(rx.State):
  
  pass

def lesson() -> rx.Component:
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
    rx.hstack(
    rx.text(
      'TRACK THE LESSON',
      font_size='50px',
      text_align='bold',
      font_weight='bold',
      margin_top='10%',
    ),
    rx.hstack(
       rx.hstack(
      rx.text('IMAGE'),
      bg='lightblue',
      w='1000px',
      h='562.5px',
      justify_content='center',  
      align_items='center', 
      display='flex',
      font_size='50px',
      margin_left='0%'
    
    ),
      rx.hstack(
      rx.text('EXPLAIN'),
      font_size='50px',
      bg='lightblue',
      w='1000px',
      h='562.5px',
      justify_content='center',  
      align_items='center', 
      display='flex',  
     ),
      width='100%', 
      height='100%',
      display='flex',
      flex_direction='row',
   
      justify_content='center',  
      align_items='center', 
      padding='5%',
      overflow='hidden',
    ),
    rx.hstack(
      rx.button(  
        "Pause",
        w='300px', 
        h='100px',  
        bg='blue',
        color='white',
        font_size='30px',
    ),
    display='flex',
     
        
    ),
     display='flex',
      flex_direction='column',
   
      justify_content='center',
      align_items='center', 
     
      overflow='hidden',
  ),
  chatBot(),
  style=css.get("main")
  )
  
