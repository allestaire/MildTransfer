import Variables from "./Variables"
import bcrypt from 'bcrypt'

const passwordHash = (plain) => {
  return bcrypt.hashSync(plain, parseInt(Variables.PASSWORD_SALT))
}

export default {
  passwordHash
}
