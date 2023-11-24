import Helper from "@/utils/Helper";
import Lib from "@/utils/Lib";
import Prisma from "@/utils/Prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    const token = (request.headers.get('authorization') || '').replace(/bearer\s?/i, '')
    const user = await Lib.getCurrentUser(token)
    await Prisma.Client.user.update({
      where: {
        id: user.id
      },
      data: {
        login_at: null,
        updated_at: new Date()
      }
    })
    return NextResponse.json('Ok')
  } catch (e) {
    return Helper.handleException(e)
  }
}
