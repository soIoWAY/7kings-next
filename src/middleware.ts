import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
	const userCookieObject = req.cookies.get('user')
	const userCookie = userCookieObject ? userCookieObject.value : null
	let url = req.url
	const siteUrl = 'https://7kings.vercel.app/'

	if (!userCookie && (url?.includes('/games') || url?.includes('/wallet'))) {
		return NextResponse.redirect(`${siteUrl}/auth/login`)
	}
}
