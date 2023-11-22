import InvalidCredential from "@/exceptions/InvalidCredential"
import Prisma from "./Prisma"
import Variables from "./Variables"
import bcrypt from 'bcrypt'
import SessionExpired from "@/exceptions/SessionExpired"

const passwordHash = (plain) => {
  return bcrypt.hashSync(plain, parseInt(Variables.PASSWORD_SALT))
}


const passwordCompare = (plain, hash) => {
  return bcrypt.compareSync(plain, hash)
}

const getCurrentUser = async (token) => {
  const user = await Prisma.Client.user.findFirst({
    where: {
      session: {
        access_token: token
      }
    },
    select: {
      id: true,
      name: true,
      email: true,
      deactivated_at: true,
      created_at: true,
      updated_at: true,
      verified_at: true,
    }
  })

  if (!user) {
    throw new SessionExpired()
  }

  return user
}

export default {
  passwordHash,
  passwordCompare,
  getCurrentUser
}
