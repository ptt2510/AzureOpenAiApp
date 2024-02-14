/** @jsxImportSource @emotion/react */


import { Fragment, useCallback, useContext, useRef } from "react"
import { Fragment_fd0e7cb8f9fb4669a6805377d925fba0, Text_e87e4bf2670eea97a8355f75d85b5bd5 } from "/utils/stateful_components"
import { Box, Button, ButtonGroup, Center, Container, HStack, Input, Link, Text, VStack } from "@chakra-ui/react"
import NextLink from "next/link"
import "@radix-ui/themes/styles.css"
import "focus-visible/dist/focus-visible"
import { Event, isTrue, refs, set_val } from "/utils/state"
import ReactDropzone from "react-dropzone"
import { EventLoopContext, StateContexts, UploadFilesContext } from "/utils/context"
import { Theme as RadixThemesTheme } from "@radix-ui/themes"
import { DebounceInput } from "react-debounce-input"
import NextHead from "next/head"



export function Reactdropzone_bc3f6eaf17164b12ff3499d0f8476c45 () {
  const [addEvents, connectError] = useContext(EventLoopContext);
  const ref_default = useRef(null); refs['ref_default'] = ref_default;
  const [filesById, setFilesById] = useContext(UploadFilesContext);

  const on_drop_65dafcf47af23567d698a117f4553801 = useCallback(e => setFilesById(filesById => ({...filesById, default: e})), [addEvents, Event, filesById, setFilesById])

  return (
    <ReactDropzone accept={{"application/vnd.ms-excel": ["xls"], "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"]}} id={`default`} multiple={true} onDrop={on_drop_65dafcf47af23567d698a117f4553801} ref={ref_default}>
  {({ getRootProps, getInputProps }) => (
    <Box sx={{"border": "1px dotted rgb(107,99,246)", "padding": "5em"}} {...getRootProps()}>
    <Input type={`file`} {...getInputProps()}/>
    <VStack>
    <Button sx={{"color": "rgb(107,99,246)", "bg": "white", "border": "1px solid rgb(107,99,246)"}}>
    {`Select File`}
  </Button>
    <Text>
    {`Drag and drop files here or click to select files`}
  </Text>
  </VStack>
  </Box>
  )}
</ReactDropzone>
  )
}

export function Button_4f4eb6d4ec36548da57c521e344623ac () {
  const state__schedule_state = useContext(StateContexts.state__schedule_state)
  const [addEvents, connectError] = useContext(EventLoopContext);
  const [filesById, setFilesById] = useContext(UploadFilesContext);

  const on_click_ce016fb830106f85341fe30a5a9b9bc9 = useCallback((_e) => addEvents([Event("state.schedule_state.handle_generate_schedule", {files:filesById.default,upload_id:`default`}, "uploadFiles")], (_e), {}), [addEvents, Event, filesById, setFilesById])

  return (
    <Button isLoading={state__schedule_state.processing} onClick={on_click_ce016fb830106f85341fe30a5a9b9bc9}>
  {`Generate Schedule`}
</Button>
  )
}

export function Hstack_040a440d1855a45c79a7a669348f3e5a () {
  const [filesById, setFilesById] = useContext(UploadFilesContext);


  return (
    <HStack>
  {(filesById.default ? filesById.default.map((f) => (f.path || f.name)) : []).map((children, props) => (
  <Text key={props}>
  {children}
</Text>
))}
</HStack>
  )
}

export function Debounceinput_f183a6d771bb734267d0ab126b02000b () {
  const [addEvents, connectError] = useContext(EventLoopContext);
  const state__schedule_state = useContext(StateContexts.state__schedule_state)

  const on_change_b7f1f9ed03f7c04c0e025c238551b664 = useCallback((_e0) => addEvents([Event("state.schedule_state.set_prompt", {value:_e0.target.value})], (_e0), {}), [addEvents, Event])

  return (
    <DebounceInput debounceTimeout={50} element={Input} onChange={on_change_b7f1f9ed03f7c04c0e025c238551b664} sx={{"width": "500px", "borderColor": "blue"}} type={`text`} value={state__schedule_state.prompt}/>
  )
}

export function Fragment_7f022b77fb970ea8cd1f2b8230bd0763 () {
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

export function Button_4cb5b1b697e13a2acead2921040b403e () {
  const [addEvents, connectError] = useContext(EventLoopContext);

  const on_click_44ea287a5fe43aff33d47baeab2ad68c = useCallback((_e) => addEvents([Event("_call_script", {javascript_code:`refs['__clear_selected_files']('default')`})], (_e), {}), [addEvents, Event])

  return (
    <Button onClick={on_click_44ea287a5fe43aff33d47baeab2ad68c}>
  {`Clear`}
</Button>
  )
}

export function Text_a3b4ff7d92e3f7cccae4c0e4182a47a6 () {
  const state__schedule_state = useContext(StateContexts.state__schedule_state)


  return (
    <Text sx={{"width": "1000px", "textAlign": "justify", "whiteSpace": "pre-line"}}>
  {state__schedule_state.result}
</Text>
  )
}

export default function Component() {

  return (
    <Fragment>
  <Fragment_fd0e7cb8f9fb4669a6805377d925fba0/>
  <VStack sx={{"width": "100%", "height": "100%", "padding": "5cm 5em 5em 5em"}}>
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
  <Reactdropzone_bc3f6eaf17164b12ff3499d0f8476c45/>
  <Hstack_040a440d1855a45c79a7a669348f3e5a/>
  <Button_4cb5b1b697e13a2acead2921040b403e/>
  <Text sx={{"margin": "5em", "fontSize": "20px", "fontWeight": "bold"}}>
  {`How do you want your schedule to be made ?`}
</Text>
  <Debounceinput_f183a6d771bb734267d0ab126b02000b/>
  <Button_4f4eb6d4ec36548da57c521e344623ac/>
  <Text_a3b4ff7d92e3f7cccae4c0e4182a47a6/>
  <Container>
  <Fragment_7f022b77fb970ea8cd1f2b8230bd0763/>
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
