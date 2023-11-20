import Fetch from "@/utils/Fetch";
import { createMachine } from "xstate";


export default createMachine({
  id: 'Signup',
  initial: 'inactive',
  on: {
    RESET: '.inactive'
  },
  states: {
    inactive: {
      on: {
        SUBMIT: 'process'
      }
    },
    process: {
      invoke: {
        src: 'signingup',
        onDone: 'success',
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
      },
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
  actions: {

  },
  services: {
    signingup(_ctx, event) {
      return Fetch.post('/signup', event.data)
    }
  }
})
