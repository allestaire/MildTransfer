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
          target: 'notify',
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
    notify: {
      id: 'Success',
      initial: 'inactive',
      on: {
        NOTIFY_RESET: '.inactive'
      },
      states: {
        inactive: {
          on: {
            NOTIFY_SEND: 'send'
          }
        },
        send: {
          invoke: {
            src: 'sending',
            onDone: {
              target: 'sent'
            },
            onError: 'failure'
          }
        },
        sent: {
          on: {
            NOTIFY_SEND: 'send'
          }
        },
        failure: {
          on: {
            NOTIFY_SEND: 'send'
          }
        }
      }
    }
  }
}, {
  actions: {
    setList: assign({
      list(_ctx, event) {
        return event.data.body.devices
      }
    })
  },
  services: {
    fetching() {
      // return Fetch.get('/api/auth/devices')
      return Fetch.get('devices')
    },
    sending(_ctx, event) {
      return Fetch.post('notify', event.data)
    }
  }
})
