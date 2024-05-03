import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    console.log(searchParams)

    return NextResponse.redirect(new URL('/dashboard', request.url))
}