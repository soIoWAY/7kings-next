import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
	const userCookieObject = req.cookies.get('user')
	const userCookie = userCookieObject ? userCookieObject.value : null
	let url = req.url

	if (!userCookie && url?.includes('/games')) {
		return NextResponse.redirect('http://localhost:3000/auth/login')
	}
}
