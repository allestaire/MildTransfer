import Fetch from "@/utils/Fetch";
import { assign, createMachine } from "xstate";


export default createMachine({
  predictableActionArguments: true,
  id: 'Signup',
  initial: 'inactive',
  context: {
    invalid: null
  },
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
  guards: {
    isInvalid(_ctx, event) {
      console.log(event.data)
      return event.data.status === 422
    }
  },
  actions: {
    setInvalid: assign({
      invalid(_ctx, event) {
        return event.data.body
      }
    })
  },
  services: {
    signingup(_ctx, event) {
      return Fetch.post('/api/signup', event.data)
    }
  }
})
