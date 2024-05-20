import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
	const userCookieObject = req.cookies.get('user')
	const userCookie = userCookieObject ? userCookieObject.value : null
	let url = req.url
	let userRole = null
	let userStatus = null
	//https://7kings.vercel.app/
	const siteUrl = 'http://localhost:3000'

	if (userCookie) {
		try {
			const decodedCookie = decodeURIComponent(userCookie)
			const userData = JSON.parse(decodedCookie)
			userRole = userData.role
			userStatus = userData.status
		} catch (error) {
			console.error('Error decoding or parsing cookie:', error)
		}
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

	if (
		userStatus === 'ban' &&
		(url?.includes('/games') ||
			url?.includes('/wallet') ||
			url?.includes('/dashboard') ||
			url?.includes('/admin'))
	) {
		return NextResponse.redirect(`${siteUrl}/ban`)
	}

	if (userRole === 'admin' && url?.includes('/dashboard')) {
		return NextResponse.redirect(`${siteUrl}/admin-dashboard`)
	}

	if (userRole !== 'admin' && url?.includes('/admin')) {
		return NextResponse.redirect(`${siteUrl}`)
	}
}
