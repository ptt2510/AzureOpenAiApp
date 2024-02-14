/** @jsxImportSource @emotion/react */


import { Fragment } from "react"
import { Fragment_fd0e7cb8f9fb4669a6805377d925fba0 } from "/utils/stateful_components"
import { Button, ButtonGroup, Center, Heading, Link, VStack } from "@chakra-ui/react"
import "focus-visible/dist/focus-visible"
import NextLink from "next/link"
import NextHead from "next/head"



export default function Component() {

  return (
    <Fragment>
  <Fragment_fd0e7cb8f9fb4669a6805377d925fba0/>
  <VStack>
  <Center sx={{"spacing": "1.5em", "fontSize": "2em", "paddingTop": "2%"}}>
  <Heading sx={{"fontSize": "2em"}}>
  {`WELCOME TO UIT OPENAI APP`}
</Heading>
</Center>
  <Center sx={{"spacing": "1.5em", "fontSize": "2em", "paddingTop": "2%"}}>
  <ButtonGroup>
  <Link as={NextLink} href={`/record`} sx={{"color": "rgb(107,99,246)", "button": true}}>
  <Button>
  {`LESSON SUMMARY`}
</Button>
</Link>
  <Link as={NextLink} href={`/lesson`} sx={{"color": "rgb(107,99,246)", "button": true}}>
  <Button>
  {`LESSON RECORDING`}
</Button>
</Link>
  <Link as={NextLink} href={`/schedule`} sx={{"color": "rgb(107,99,246)", "button": true}}>
  <Button>
  {`SCHEDULE RECOMMENDATION`}
</Button>
</Link>
</ButtonGroup>
</Center>
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
