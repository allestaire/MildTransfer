import Fetch from "@/utils/Fetch";
import Cookies from "js-cookie";
import { createMachine } from "xstate";
import Lang from '@/Lang'


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
    success: {
      on: {
        LOGOUT: {
          actions: ['clearToken']
        }
      }
    }
  }
}, {
  actions: {
    clearToken() {
      Cookies.set(Lang.getString('enums.ACCESS_TOKEN'))
    }
  },
  services: {
    checking() {
      return Fetch.get('/api/auth/me')
    }
  }
})
