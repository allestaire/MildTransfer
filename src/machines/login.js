import Fetch from "@/utils/Fetch";
import { assign, createMachine } from "xstate";


export default createMachine({
  id: 'Login',
  context: {
    invalid: null
  },
  on: {
    RESET: 'inactive'
  },
  states: {
    inactive: {
      on: {
        SUBMIT: 'process'
      }
    },
    process: {
      invoke: {
        src: 'loggingin',
        onDone: {
          target: 'success',
          actions: ['setToken']
        },
        onError: [
          {
            cond: 'isInvalid',
            target: 'invalid',
            actions: ['setInvalid']
          },
          {
            target: 'failure'
          }
        ]
      }
    },
    invalid: {
      on: {
        SUBMIT: 'process'
      }
    },
    failure: {
      on: {
        SUBMIT: 'process'
      }
    },
    success: {}
  }
}, {
  guards: {
    isInvalid(_ctx, event) {
      return event.data.status === 422
    }
  },
  actions: {
    setInvalid: assign({
      invalid(_ctx, event) {
        return event.data.body
      }
    }),
    setToken(_ctx, event) {
      const data = event.data
      console.log(data)
    }
  },
  services: {
    loggingin(_ctx, event) {
      return Fetch.post('/api/login', event.data)
    }
  }
})
