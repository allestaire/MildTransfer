'use client'
import { faker } from "@faker-js/faker"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import Global from '@/machines/provider'
import { useActor } from "@xstate/react"

let debounce = null

const coordinate = (width, height) => {
  const x = faker.helpers.rangeToNumber({ min: 100, max: width - 100 })
  const y = faker.helpers.rangeToNumber({ min: 100, max: height - 100 })

  return {
    x, y
  }
}

const AppPage = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const Context = useContext(Global.State)
  const App = useActor(Context.App)
  const Socket = useActor(Context.Socket)
  const Device = useActor(Context.Device)
  const _socket = Socket[0].context.socket
  const containerEl = useRef(null)
  // const [debounce, setDebounce] = useState(null)
  const devices = useMemo(() => {
    return Device[0].context.list
  }, [Device[0].context.list])

  useEffect(() => {
    const el = containerEl.current
    const width = el.clientWidth
    const height = el.clientHeight

    setWidth(width)
    setHeight(height)

    App[1]('RESET')
    App[1]('CHECK')

    Socket[1]('RESET')
    Socket[1]('SET')
  }, [])
  useEffect(() => {
    if (Socket[0].matches('success')) {
      _socket.emit('client-new', 'trigger')
      _socket.on('client-new', (data) => {
        if (debounce) {
          clearTimeout(debounce)
        }

        debounce = setTimeout(() => {
          Device[1]('RESET')
          Device[1]('FETCH')
        }, 1000)

      })
    }
  }, [Socket[0]])
  return (
    <div ref={containerEl} className="h-[calc(100vh-66px)]" style={{ position: 'relative', background: "url(/img/map.png)", backgroundSize: 'cover' }}>
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
          const pos = coordinate(width, height)
          return (
            <span key={'device-' + device.id} className="border-2 border-blue-900 p-3 bg-blue-100 rounded justify-center flex flex-col items-center" style={{ top: pos.y, right: pos.x, position: 'absolute' }}>
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
