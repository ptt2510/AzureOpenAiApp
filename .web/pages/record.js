/** @jsxImportSource @emotion/react */


import { Fragment, useCallback, useContext } from "react"
import { Fragment_fd0e7cb8f9fb4669a6805377d925fba0, Text_e87e4bf2670eea97a8355f75d85b5bd5 } from "/utils/stateful_components"
import { Box, Button, Center, Container, Heading, HStack, Input, Text, Tooltip, VStack } from "@chakra-ui/react"
import { EventLoopContext, StateContexts } from "/utils/context"
import "@radix-ui/themes/styles.css"
import "focus-visible/dist/focus-visible"
import { Event, isTrue, set_val } from "/utils/state"
import { Theme as RadixThemesTheme } from "@radix-ui/themes"
import { DebounceInput } from "react-debounce-input"
import NextHead from "next/head"



export function Button_08587b62e5bab936f84f076ff79c0f45 () {
  const state__button__record = useContext(StateContexts.state__button__record)
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_8b5eec9d3d2c97c2347cdb6fd03f4c35 = useCallback((_e) => addEvents([Event("state.button__record.change_button", {}),Event("state.text__record.change_text", {})], (_e), {}), [addEvents, Event])

  return (
    <Button onClick={on_click_8b5eec9d3d2c97c2347cdb6fd03f4c35} sx={{"bg": state__button__record.bg, "borderRadius": "100%", "width": "70px", "height": "70px", "padding": "10px"}}>
  {state__button__record.button_text}
</Button>
  )
}

export function Text_57b9cfef07d92a24b033fd0eeaaadd8e () {
  const state__button__record = useContext(StateContexts.state__button__record)


  return (
    <Text sx={{"variant": "solid", "colorScheme": "green"}}>
  {state__button__record.kq}
</Text>
  )
}

export function Heading_22b237ae717f15d943db0783ca2fb413 () {
  const state__text__record = useContext(StateContexts.state__text__record)


  return (
    <Heading sx={{"fontSize": "4em", "paddingX": "1em", "marginTop": "390px"}}>
  {state__text__record.text_value}
</Heading>
  )
}

export function Fragment_d71fe753a66dd7bbd7dd7ad5b0e07b21 () {
  const state__chatbot_state = useContext(StateContexts.state__chatbot_state)
  const [addEvents, connectError] = useContext(EventLoopContext);


  return (
    <Fragment>
  {isTrue(state__chatbot_state.isVisible) ? (
  <Fragment>
  <Container sx={{"border": "lightgray solid 1px", "width": "500px", "borderRadius": "30px", "position": "fixed", "right": "10px", "bottom": "100px", "backgroundColor": "lightgray"}}>
  <Text sx={{"textAlign": "center", "fontWeight": "bold", "fontSize": "25px", "marginY": "10px"}}>
  {`CHAT HERE`}
</Text>
  <Box sx={{"height": "500px", "border": "lightgray solid 1px", "overflowY": "scroll", "padding": "20px", "backgroundColor": "white"}}>
  {state__chatbot_state.chat_history.map((messages, index_e4b1fbfd30c176f12abf4a9409a1a397) => (
  <Box key={index_e4b1fbfd30c176f12abf4a9409a1a397} sx={{"marginY": "1em"}}>
  <Box sx={{"padding": "1em", "borderRadius": "5px", "marginY": "0.5em", "boxShadow": "rgba(0, 0, 0, 0.15) 0px 2px 8px", "bg": "#F5EFFE", "marginLeft": "50%"}}>
  <Text sx={{"textAlign": "right", "fontSize": "15px"}}>
  {messages.at(0)}
</Text>
</Box>
  <Box sx={{"padding": "1em", "borderRadius": "5px", "marginY": "0.5em", "boxShadow": "rgba(0, 0, 0, 0.15) 0px 2px 8px", "bg": "#DEEAFD", "marginRight": "20%"}}>
  <Text sx={{"textAlign": "left", "fontSize": "15px"}}>
  {messages.at(1)}
</Text>
</Box>
</Box>
))}
</Box>
  <HStack sx={{"marginY": "20px"}}>
  <DebounceInput debounceTimeout={50} element={Input} onChange={(_e0) => addEvents([Event("state.chatbot_state.set_question", {value:_e0.target.value})], (_e0), {})} placeholder={`Ask a question`} sx={{"borderWidth": "1px", "padding": "1em", "boxShadow": "rgba(0, 0, 0, 0.15) 0px 2px 8px", "backgroundColor": "white"}} type={`text`} value={state__chatbot_state.question}/>
  <Button onClick={(_e) => addEvents([Event("state.chatbot_state.answer", {})], (_e), {})} sx={{"bg": "#CEFFEE", "boxShadow": "rgba(0, 0, 0, 0.15) 0px 2px 8px"}}>
  {`Ask`}
</Button>
</HStack>
</Container>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  )
}

export function Vstack_c48811ab9bdbeee81cc874eb94c4179c () {
  const state__background_color_change = useContext(StateContexts.state__background_color_change)


  return (
    <VStack sx={{"width": "100%", "height": "100%", "bg": state__background_color_change.background_color}}>
  <Center>
  <Heading_22b237ae717f15d943db0783ca2fb413/>
</Center>
  <Center>
  <Button_08587b62e5bab936f84f076ff79c0f45/>
</Center>
  <HStack>
  <Tooltip label={`Bảng tóm tắt cuộc họp`}>
  <Text_57b9cfef07d92a24b033fd0eeaaadd8e/>
</Tooltip>
</HStack>
  <Container>
  <Fragment_d71fe753a66dd7bbd7dd7ad5b0e07b21/>
  <Text_e87e4bf2670eea97a8355f75d85b5bd5/>
</Container>
</VStack>
  )
}

export default function Component() {

  return (
    <Fragment>
  <Fragment_fd0e7cb8f9fb4669a6805377d925fba0/>
  <Vstack_c48811ab9bdbeee81cc874eb94c4179c/>
  <NextHead>
  <title>
  {`Reflex App`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
</NextHead>
</Fragment>
  )
}
