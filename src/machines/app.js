import { createMachine } from "xstate";


export default createMachine({
  id: "App",
  initial: 'inactive'
  on: {
    RESET: 'inactive'
  },
  states: {
    inactive: {}
  }
})
