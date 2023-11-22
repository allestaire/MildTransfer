import Fetch from "@/utils/Fetch";
import { createMachine } from "xstate";


export default createMachine({
  id: "App",
  initial: 'inactive',
  on: {
    RESET: 'inactive'
  },
  states: {
    inactive: {
      on: {
        CHECK: 'check'
      }
    },
    check: {
      invoke: {
        src: 'checking',
        onDone: {
          target: 'success'
        },
        onError: 'failure'
      }
    },
    failure: {
      on: {
        CHECK: 'check'
      }
    },
    success: {}
  }
}, {
  services: {
    checking() {
      return Fetch.get('/api/auth/me')
    }
  }
})
