import Fetch from "@/utils/Fetch";
import { assign, createMachine } from "xstate";

export default createMachine({
  id: 'Device',
  initial: 'inactive',
  context: {
    list: []
  },
  on: {
    RESET: 'inactive'
  },
  states: {
    inactive: {
      on: {
        FETCH: 'fetch'
      }
    },
    fetch: {
      invoke: {
        src: 'fetching',
        onDone: {
          target: 'success',
          actions: ['setList']
        },
        onError: 'failure'
      }
    },
    failure: {
      on: {
        FETCH: 'fetch'
      }
    },
    success: {}
  }
}, {
  actions: {
    setList: assign({
      list(_ctx, event) {
        return event.data.body
      }
    })
  },
  services: {
    fetching() {
      return Fetch.get('/api/auth/devices')
    }
  }
})
