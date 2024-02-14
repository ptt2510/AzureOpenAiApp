import { createContext, useContext, useMemo, useReducer, useState } from "react"
import { applyDelta, Event, hydrateClientStorage, useEventLoop, refs } from "/utils/state.js"

export const initialState = {"state": {"is_hydrated": false, "router": {"session": {"client_token": "", "client_ip": "", "session_id": ""}, "headers": {"host": "", "origin": "", "upgrade": "", "connection": "", "pragma": "", "cache_control": "", "user_agent": "", "sec_websocket_version": "", "sec_websocket_key": "", "sec_websocket_extensions": "", "accept_encoding": "", "accept_language": ""}, "page": {"host": "", "path": "", "raw_path": "", "full_path": "", "full_raw_path": "", "params": {}}}}, "state.button__record": {"bg": "#ecfdf5", "button_text": "Play", "kq": "", "running": false}, "state.text__record": {"text_value": "Waiting"}, "state.background_color_change": {"background_color": "FFFFFF"}, "state.lesson_state": {}, "state.schedule_state": {"excelFilesDir": "", "processing": false, "prompt": "", "result": ""}, "state.chatbot_state": {"chat_history": [], "isVisible": false, "question": ""}, "state.state": {}}

export const ColorModeContext = createContext(null);
export const UploadFilesContext = createContext(null);
export const DispatchContext = createContext(null);
export const StateContexts = {
  state: createContext(null),
  state__button__record: createContext(null),
  state__text__record: createContext(null),
  state__background_color_change: createContext(null),
  state__lesson_state: createContext(null),
  state__schedule_state: createContext(null),
  state__chatbot_state: createContext(null),
  state__state: createContext(null),
}
export const EventLoopContext = createContext(null);
export const clientStorage = {"cookies": {}, "local_storage": {}}

export const onLoadInternalEvent = () => [Event('state.on_load_internal')]

export const initialEvents = () => [
    Event('state.hydrate', hydrateClientStorage(clientStorage)),
    ...onLoadInternalEvent()
]

export const isDevMode = true

export function UploadFilesProvider({ children }) {
  const [filesById, setFilesById] = useState({})
  refs["__clear_selected_files"] = (id) => setFilesById(filesById => {
    const newFilesById = {...filesById}
    delete newFilesById[id]
    return newFilesById
  })
  return (
    <UploadFilesContext.Provider value={[filesById, setFilesById]}>
      {children}
    </UploadFilesContext.Provider>
  )
}

export function EventLoopProvider({ children }) {
  const dispatch = useContext(DispatchContext)
  const [addEvents, connectError] = useEventLoop(
    dispatch,
    initialEvents,
    clientStorage,
  )
  return (
    <EventLoopContext.Provider value={[addEvents, connectError]}>
      {children}
    </EventLoopContext.Provider>
  )
}

export function StateProvider({ children }) {
  const [state, dispatch_state] = useReducer(applyDelta, initialState["state"])
  const [state__button__record, dispatch_state__button__record] = useReducer(applyDelta, initialState["state.button__record"])
  const [state__text__record, dispatch_state__text__record] = useReducer(applyDelta, initialState["state.text__record"])
  const [state__background_color_change, dispatch_state__background_color_change] = useReducer(applyDelta, initialState["state.background_color_change"])
  const [state__lesson_state, dispatch_state__lesson_state] = useReducer(applyDelta, initialState["state.lesson_state"])
  const [state__schedule_state, dispatch_state__schedule_state] = useReducer(applyDelta, initialState["state.schedule_state"])
  const [state__chatbot_state, dispatch_state__chatbot_state] = useReducer(applyDelta, initialState["state.chatbot_state"])
  const [state__state, dispatch_state__state] = useReducer(applyDelta, initialState["state.state"])
  const dispatchers = useMemo(() => {
    return {
      "state": dispatch_state,
      "state.button__record": dispatch_state__button__record,
      "state.text__record": dispatch_state__text__record,
      "state.background_color_change": dispatch_state__background_color_change,
      "state.lesson_state": dispatch_state__lesson_state,
      "state.schedule_state": dispatch_state__schedule_state,
      "state.chatbot_state": dispatch_state__chatbot_state,
      "state.state": dispatch_state__state,
    }
  }, [])

  return (
    <StateContexts.state.Provider value={ state }>
    <StateContexts.state__button__record.Provider value={ state__button__record }>
    <StateContexts.state__text__record.Provider value={ state__text__record }>
    <StateContexts.state__background_color_change.Provider value={ state__background_color_change }>
    <StateContexts.state__lesson_state.Provider value={ state__lesson_state }>
    <StateContexts.state__schedule_state.Provider value={ state__schedule_state }>
    <StateContexts.state__chatbot_state.Provider value={ state__chatbot_state }>
    <StateContexts.state__state.Provider value={ state__state }>
      <DispatchContext.Provider value={dispatchers}>
        {children}
      </DispatchContext.Provider>
    </StateContexts.state__state.Provider>
    </StateContexts.state__chatbot_state.Provider>
    </StateContexts.state__schedule_state.Provider>
    </StateContexts.state__lesson_state.Provider>
    </StateContexts.state__background_color_change.Provider>
    </StateContexts.state__text__record.Provider>
    </StateContexts.state__button__record.Provider>
    </StateContexts.state.Provider>
  )
}