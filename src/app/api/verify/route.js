import Prisma from "@/utils/Prisma";
import Variables from "@/utils/Variables";
import { NextResponse } from "next/server";


export async function GET(request, res) {
  const token = request.nextUrl.searchParams.get('token')

  const user = await Prisma.Client.user.findFirst({
    where: {
      id: token
    }
  })
  if (!user) {
    return NextResponse.json({
      message: 'Token does not exists',
    }, 400)
  }
  if (!user.verified_at) {
    await Prisma.Client.user.update({
      where: {
        id: user.id
      },
      data: {
        verified_at: new Date(),
        updated_at: new Date()
      }
    })
  }
  return NextResponse.redirect(Variables.BASE_URL)
}
