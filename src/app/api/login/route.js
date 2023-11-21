import Helper from "@/utils/Helper";
import Lib from "@/utils/Lib";
import Prisma from "@/utils/Prisma";
import * as Yup from 'yup'

export async function POST(request) {
  try {
    const payload = await request.json()
    const schema = Yup.object({
      email: Yup.string().required()
        .test(
          'is-exist',
          ({ label }) => 'Invalid credentials.',
          async (value) => {
            const user = await Prisma.Client.user.findFirst({
              where: {
                email: value
              }
            })

            if (!Boolean(user)) {
              return false
            }

            return Lib.passwordCompare(payload.password, user.password)
          }
        ),
      password: Yup.string().required()

    })

    await schema.validate(payload, { abortEarly: false })
  } catch (e) {
    return Helper.handleException(e)
  }
}
