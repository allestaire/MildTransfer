import Fetch from "@/utils/Fetch";
import { assign, createMachine } from "xstate";
import Cookies from "js-cookie";
import Lang from '@/Lang'
import Variables from "@/utils/Variables";


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
      console.log(event.data)
      const data = event.data.body
      // Cookies.set(Lang.getString('enums.ACCESS_TOKEN'), data.access_token)
      Cookies.set(Lang.getString('enums.ACCESS_TOKEN'), data)
    }
  },
  services: {
    loggingin(_ctx, event) {
      // return Fetch.post('/api/login', event.data)
      return Fetch.post('login', event.data)
    }
  }
})
