/** @jsxImportSource @emotion/react */


import { Fragment, useContext } from "react"
import { Fragment_fd0e7cb8f9fb4669a6805377d925fba0, Text_e87e4bf2670eea97a8355f75d85b5bd5 } from "/utils/stateful_components"
import { Box, Button, ButtonGroup, Center, Container, HStack, Input, Link, Text, VStack } from "@chakra-ui/react"
import NextLink from "next/link"
import "@radix-ui/themes/styles.css"
import "focus-visible/dist/focus-visible"
import { EventLoopContext, StateContexts } from "/utils/context"
import { Event, isTrue, set_val } from "/utils/state"
import { Theme as RadixThemesTheme } from "@radix-ui/themes"
import { DebounceInput } from "react-debounce-input"
import NextHead from "next/head"



export function Fragment_998a5e297f6a885973b0894d3ddbafc9 () {
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

export default function Component() {

  return (
    <Fragment>
  <Fragment_fd0e7cb8f9fb4669a6805377d925fba0/>
  <VStack sx={{"width": "100%", "height": "100%"}}>
  <Center sx={{"position": "absolute", "top": "0"}}>
  <ButtonGroup>
  <Link as={NextLink} href={`/record`}>
  <Button sx={{"bg": "#DCA0D6", "color": "black", "size": "sm", "marginTop": "50px", "width": "240px", "height": "70px", "boxShadow": "0px 8px 16px 0px rgba(0,0,0,0.25)"}}>
  {`LESSON SUMMARY`}
</Button>
</Link>
  <Link as={NextLink} href={`/lesson`}>
  <Button sx={{"bg": "#DCA0D6", "color": "black", "size": "sm", "marginTop": "50px", "width": "240px", "height": "70px", "boxShadow": "0px 8px 16px 0px rgba(0,0,0,0.25)"}}>
  {`LESSON RECORDING`}
</Button>
</Link>
  <Link as={NextLink} href={`/schedule`}>
  <Button sx={{"bg": "#DCA0D6", "color": "black", "size": "sm", "marginTop": "50px", "width": "240px", "height": "70px", "boxShadow": "0px 8px 16px 0px rgba(0,0,0,0.25)"}}>
  {`SCHEDULE RECOMMENDATION`}
</Button>
</Link>
</ButtonGroup>
</Center>
  <HStack alignItems={`center`} justifyContent={`center`} sx={{"display": "flex", "flexDirection": "column", "overflow": "hidden"}}>
  <Text sx={{"fontSize": "50px", "textAlign": "bold", "fontWeight": "bold", "marginTop": "10%"}}>
  {`TRACK THE LESSON`}
</Text>
  <HStack alignItems={`center`} justifyContent={`center`} sx={{"width": "100%", "height": "100%", "display": "flex", "flexDirection": "row", "padding": "5%", "overflow": "hidden"}}>
  <HStack alignItems={`center`} justifyContent={`center`} sx={{"bg": "lightblue", "w": "1000px", "h": "562.5px", "display": "flex", "fontSize": "50px", "marginLeft": "0%"}}>
  <Text>
  {`IMAGE`}
</Text>
</HStack>
  <HStack alignItems={`center`} justifyContent={`center`} sx={{"fontSize": "50px", "bg": "lightblue", "w": "1000px", "h": "562.5px", "display": "flex"}}>
  <Text>
  {`EXPLAIN`}
</Text>
</HStack>
</HStack>
  <HStack sx={{"display": "flex"}}>
  <Button sx={{"w": "300px", "h": "100px", "bg": "blue", "color": "white", "fontSize": "30px"}}>
  {`Pause`}
</Button>
</HStack>
</HStack>
  <Container>
  <Fragment_998a5e297f6a885973b0894d3ddbafc9/>
  <Text_e87e4bf2670eea97a8355f75d85b5bd5/>
</Container>
</VStack>
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
