const { useInterpret } = require("@xstate/react");
const { createContext } = require("react");
import signup from './signup'
import login from './login'


const State = createContext({})


const Provider = ({
  children
}) => {

  return (
    <State.Provider
      value={{
        Signup: useInterpret(signup),
        Login: useInterpret(login)
      }}
    >
      {children}
    </State.Provider>
  )
}


export default {
  State, Provider
}
