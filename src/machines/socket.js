import Helper from "@/utils/Helper";
import { createMachine, assign } from "xstate";

export default createMachine({
  id: 'Socket',
  initial: 'inactive',
  context: {
    socket: null
  },
  on: {
    RESET: 'inactive'
  },
  states: {
    inactive: {
      on: {
        SET: 'set'
      }
    },
    set: {
      invoke: {
        src: 'settingsocket',
        onDone: {
          target: 'success',
          actions: ['setSocket']
        },
        onError: 'failure'
      }
    },
    failure: {
      on: {
        SET: 'set'
      }
    },
    success: {
      on: {
        DISCONNECT: {
          actions: ['disconnect']
        }
      }
    },
  }
}, {
  actions: {
    setSocket: assign({
      socket(_ctx, event) {
        console.log(event.data)
        return null
      }
    }),
    disconnect(ctx) {
      console.log(ctx)
    }
  },
  services: {
    settingsocket: async (ctx) => {
      if (ctx.socker) {
        return socket
      }
      const socket = await Helper.socket(3003)
      return socket
    }
  }
})
