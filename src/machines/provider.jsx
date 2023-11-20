const { useInterpret } = require("@xstate/react");
const { createContext } = require("react");
import signup from './signup'


const State = createContext({})


const Provider = ({
  children
}) => {

  return (
    <State.Provider
      value={{
        Signup: useInterpret(signup)
      }}
    >
      {children}
    </State.Provider>
  )
}


export default {
  State, Provider
}
