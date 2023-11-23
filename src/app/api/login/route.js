import Helper from "@/utils/Helper";
import Lib from "@/utils/Lib";
import Prisma from "@/utils/Prisma";
import { faker } from "@faker-js/faker";
import moment from "moment";
import { NextResponse } from "next/server";
import * as Yup from 'yup'

export async function POST(request) {
  try {
    const payload = await request.json()
    const user = await Prisma.Client.user.findFirst({
      where: {
        email: payload.email
      }
    })
    const schema = Yup.object({
      email: Yup.string().required()
        .test(
          'is-exist',
          () => 'Invalid credentials.',
          (_value) => {
            if (!user) {
              return false
            }
            if (!user.verified_at) {
              return false
            }
            if (user.deactivated_at) {
              return false
            }
            return Lib.passwordCompare(payload.password, user.password)
          }),
      //.test(
      //   'is-verified',
      //   () => 'Account is unverified.',
      //   (_value) => {
      //     return Boolean(user?.verified_at)
      //   })
      // .test(
      //   'is-active',
      //   () => 'Account is suspended.',
      //   (_value) => {
      //     return !Boolean(user?.deactivated_at)
      //   }
      // ),
      password: Yup.string().required()

    })

    await schema.validate(payload, { abortEarly: false })
    const token = faker.helpers.fromRegExp(/[A-Z]{40}/i)
    const resetToken = faker.helpers.fromRegExp(/[A-Z]{40}/i)
    const data = {
      access_token: token,
      reset_token: resetToken,
      token_expires_at: moment().add(1, 'd')
    }
    if (user.session) {
      await Prisma.Client.session.create({
        data: {
          user_id: user.id,
          ...data
        }
      })
    } else {
      await Prisma.Client.session.update({
        where: {
          user_id: user.id,
        },
        data
      })
    }

    return NextResponse.json({
      access_token: token,
      reset_token: resetToken
    })
  } catch (e) {
    return Helper.handleException(e)
  }
}
