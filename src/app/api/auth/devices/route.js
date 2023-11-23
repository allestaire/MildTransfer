import Helper from "@/utils/Helper"
import Lib from "@/utils/Lib"
import Prisma from "@/utils/Prisma"
import { NextResponse } from "next/server"


export async function GET(request) {
  try {
    const token = (request.headers.get('authorization') || '').replace(/bearer\s?/i, '')
    const user = await Lib.getCurrentUser(token)
    const users = await Prisma.Client.user.findMany({
      where: {
        id: {
          not: user.id
        },
        login_at: {
          not: null
        },
        verified_at: {
          not: null
        },
        deactivated_at: null
      }
    })
    return NextResponse.json(users)
  } catch (e) {
    return Helper.handleException(e)
  }
}
