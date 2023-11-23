import Fetch from "@/utils/Fetch";
import Cookies from "js-cookie";
import { assign, createMachine } from "xstate";
import Lang from '@/Lang'


export default createMachine({
  id: "App",
  initial: 'inactive',
  context: {
    user: null
  },
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
          target: 'success',
          actions: ['setUser']
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
          target: 'logout',
        }
      }
    },
    logout: {
      invoke: {
        src: 'loggingout',
        onDone: {
          actions: ['clearToken']
        }
      }
    }
  }
}, {
  actions: {
    setUser: assign({
      user(_ctx, event) {
        return event.data.body
      }
    }),
    clearToken() {
      Cookies.set(Lang.getString('enums.ACCESS_TOKEN'))
    }
  },
  services: {
    checking() {
      return Fetch.get('/api/auth/me')
    },
    loggingout() {
      return Fetch.get('/api/auth/logout')
    }
  }
})
