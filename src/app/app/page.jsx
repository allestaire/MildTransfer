'use client'
import { faker } from "@faker-js/faker"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import Global from '@/machines/provider'
import { useActor } from "@xstate/react"
import Alerts from "@/components/Alerts"

let debounce = null

const coordinate = (width, height) => {
  const x = faker.helpers.rangeToNumber({ min: 100, max: width - 100 })
  const y = faker.helpers.rangeToNumber({ min: 100, max: height - 100 })

  return {
    x, y
  }
}

const AppPage = () => {
  const [alert, setAlert] = useState(false)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const Context = useContext(Global.State)
  const App = useActor(Context.App)
  const Socket = useActor(Context.Socket)
  const Device = useActor(Context.Device)
  const [row, setRow] = useState(null)
  const _socket = useMemo(() => {
    const s = Socket[0].context.socket
    const u = App[0].context.user
    if (s && u) {
      return s
    }
    return null
  }, [Socket[0].context.socket, App[0].context.user])
  const user = App[0].context.user
  const containerEl = useRef(null)
  // const [debounce, setDebounce] = useState(null)
  const devices = useMemo(() => {
    return Device[0].context.list.map((dev) => {
      const pos = coordinate(width, height)
      return {
        ...dev,
        pos
      }
    })
  }, [Device[0].context.list])

  const handleNotify = (device) => {
    // _socket.emit('notify-you', device.id)
    setRow(device)
    Device[1]({
      type: 'NOTIFY_SEND',
      data: {
        name: 'Al Lestaire Acasio',
        email: 'allestaire.acasio@gmail.com',
        repoUrl: 'https://github.com/allestaire/MildTransfer',
        message: 'Notifying ' + device.name
      }
    })
  }

  useEffect(() => {
    const el = containerEl.current
    const width = el.clientWidth
    const height = el.clientHeight

    setWidth(width)
    setHeight(height)

    // App[1]('RESET')
    // App[1]('CHECK')

    Socket[1]('RESET')
    Socket[1]('SET')

    Device[1]('RESET')
    Device[1]('FETCH')
  }, [])
  useEffect(() => {
    if (App[0].matches('success') && Socket[0].matches('success')) {
      _socket.on('client-new', (data) => {
        console.log('New client', data)
        Device[1]('RESET')
        Device[1]('FETCH')
      })
      _socket.on('notify-you', (data) => {
        console.log('notified', data, user)
        if (user.id === data) {
          setAlert(true)
        }
      })
    }
  }, [Socket[0], App[0]])


  return (
    <div ref={containerEl} className="h-[calc(100vh-66px)]" style={{ position: 'relative', background: "url(/img/map.png)", backgroundSize: 'cover' }}>
      <Alerts.Success
        open={alert}
        message={'We are being alerted by someone'}
        onClose={() => setAlert(false)}
      />

      <Alerts.Loading
        open={Device[0].matches('notify.send')}
        message={'Notifying ' + row?.name}

      />
      <Alerts.Failure
        open={Device[0].matches('notify.failure')}
        message={'Oops, Sorry! Something happened. Can you try again?'}
        onClose={() => Device[1]('NOTIFY_RESET')}
      />
      <Alerts.Success
        open={Device[0].matches('notify.sent')}
        message={'We are being alerted by someone'}
        onClose={() => Device[1]('NOTIFY_RESET')}
      />
      {
        (() => {
          if (App[0].matches('success')) {
            const pos = coordinate(width, height)
            return (
              <span className="border-2 border-blue-900 p-3 bg-blue-100 rounded justify-center flex flex-col items-center" style={{ top: pos.y, right: pos.x, position: 'absolute' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-blue-900">
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                </svg>
                <p className="text-center font-bold">Me</p>
              </span>
            )
          }

        })()
      }
      {
        devices.map((device, index) => {
          return (
            <span onClick={() => handleNotify(device)} key={'device-' + device.id} className="cursor-pointer border-2 border-blue-900 p-3 bg-blue-100 rounded justify-center flex flex-col items-center" style={{ top: device.pos.y, right: device.pos.x, position: 'absolute' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-blue-900">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
              </svg>
              <p className="text-center font-bold">{device.name}</p>
            </span>
          )
        })
      }

    </div>

  )
}


export default AppPage
