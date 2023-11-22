import Helper from "@/utils/Helper";
import Lib from "@/utils/Lib";
import { NextResponse } from "next/server";


export async function GET(request) {
  try {
    const token = (request.headers.get('authorization') || '').replace(/bearer\s?/i, '')
    const user = await Lib.getCurrentUser(token)
    return NextResponse.json(user)
  } catch (e) {
    return Helper.handleException(e)
  }

}
