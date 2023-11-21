import Helper from '@/utils/Helper'
import Lib from '@/utils/Lib'
import Mail from '@/utils/Mail'
import Prisma from '@/utils/Prisma'
import Variables from '@/utils/Variables'
import { NextResponse } from 'next/server'
import * as Yup from 'yup'

export async function POST(request) {

  try {
    const payload = await request.json()
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email()
        .test(
          'is-unique',
          ({ label }) => 'The email already taken.',
          async (value) => {
            const count = await Prisma.Client.user.count({
              where: {
                email: value
              }
            })

            return count === 0
          }
        ),
      password: Yup.string().required()
        .test(
          'is-strong',
          ({ label }) => 'The password field is not strong.',
          (value) => {
            return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(value)
          }
        ),
      confirmpassword: Yup.string().required()
        .test(
          'is-matched',
          ({ label }) => 'The password field does not match',
          (value) => {
            return value === payload.password
          }
        )
    })
    await schema.validate(payload, { abortEarly: false })
    const newUser = await Prisma.Client.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: Lib.passwordHash(payload.password)
      }
    })
    await Mail.send(
      payload.email,
      'mild@transfer.com',
      'Account verification',
      `
Please click to verify your account for MildTransfer. Click <a href="${Variables.BASE_URL}/api/verify?token=${newUser.id}">here</a>
      `
    )
    return NextResponse.json('Created')
  } catch (e) {
    return Helper.handleException(e)
  }
}
