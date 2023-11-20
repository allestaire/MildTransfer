import Helper from '@/utils/Helper'
import { NextResponse } from 'next/server'
import * as Yup from 'yup'

export async function POST(request) {

  try {
    const payload = await request.json()
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
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
    return NextResponse.json('Created')
  } catch (e) {
    return Helper.handleException(e)
  }
}
