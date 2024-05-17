import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
	const userCookieObject = req.cookies.get('user')
	const userCookie = userCookieObject ? userCookieObject.value : null
	let url = req.url
	let userRole = null
	let userStatus = null
	const siteUrl = 'https://7kings.vercel.app/'

	if (userCookie) {
		const decodedCookie = decodeURIComponent(userCookie)
		const userData = JSON.parse(decodedCookie)
		userRole = userData.role
		userStatus = userData.status
	}

	if (
		!userCookie &&
		(url?.includes('/games') ||
			url?.includes('/wallet') ||
			url?.includes('/dashboard') ||
			url?.includes('/admin'))
	) {
		return NextResponse.redirect(`${siteUrl}/auth/login`)
	}

	if (userRole !== 'admin' && url?.includes('/admin')) {
		return NextResponse.redirect(`${siteUrl}`)
	}

	if (userRole === 'admin' && url?.includes('/dashboard')) {
		return NextResponse.redirect(`${siteUrl}/admin-dashboard`)
	}

	if (userStatus === 'ban') {
		return NextResponse.redirect(`${siteUrl}/ban`)
	}
}
