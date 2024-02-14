"""Welcome to Reflex! This file outlines the steps to create a basic app."""
from rxconfig import config
from .AppPagesCSS.RecordPageCSS import css
import reflex as rx
from .AppPages.Schedule import schedule
from .AppPages.Lesson import lesson
from .AppPages.Record import record


class State(rx.State):
    """The app state."""

    pass


def index() -> rx.Component:
    return rx.vstack(
        rx.center(
                rx.heading("WELCOME TO UIT OPENAI APP", font_size="2em"),
                spacing="1.5em",
                font_size="2em",
                padding_top="2%",
            
        ),

        rx.center(
            rx.button_group(
                rx.link(
                    rx.button("LESSON SUMMARY"),
                    href="/record",
                    color="rgb(107,99,246)",
                    button=True,
                        ),
                rx.link(
                    rx.button("LESSON RECORDING"),
                    href="/lesson",
                    color="rgb(107,99,246)",
                    button=True,
                        ),
                rx.link(
                    rx.button("SCHEDULE RECOMMENDATION"),
                    href="/schedule",
                    color="rgb(107,99,246)",
                    button=True,
                        )
            ),
            spacing="1.5em",
            font_size="2em",
            padding_top="2%",
        ),

        
    )

# Add state and page to the app.
app = rx.App()
app.add_page(index)
app.add_page(schedule, route="/schedule")
app.add_page(lesson, route="/lesson")
app.add_page(record, route="/record")

