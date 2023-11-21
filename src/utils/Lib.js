import Variables from "./Variables"
import bcrypt from 'bcrypt'

const passwordHash = (plain) => {
  return bcrypt.hashSync(plain, parseInt(Variables.PASSWORD_SALT))
}


const passwordCompare = (plain, hash) => {
  return bcrypt.compareSync(plain, hash)
}

export default {
  passwordHash,
  passwordCompare
}
