const { useInterpret } = require("@xstate/react");
const { createContext } = require("react");
import signup from './signup'
import login from './login'
import app from './app';
import socket from './socket';
import device from './device';


const State = createContext({})


const Provider = ({
  children
}) => {

  return (
    <State.Provider
      value={{
        Signup: useInterpret(signup),
        Login: useInterpret(login),
        App: useInterpret(app),
        Socket: useInterpret(socket),
        Device: useInterpret(device)
      }}
    >
      {children}
    </State.Provider>
  )
}


export default {
  State, Provider
}
