import { prisma } from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const userCookieObject = req.cookies.get('user')
	const userCookie = userCookieObject ? userCookieObject.value : null
	let username = null

	try {
		if (userCookie) {
			const decodedCookie = decodeURIComponent(userCookie)
			const userData = JSON.parse(decodedCookie)
			username = userData.username
		}

		let user = null
		if (username !== null) {
			user = await prisma.user.findUnique({
				where: {
					username: username,
				},
				select: {
					balance: true,
					wins: true,
					loses: true,
				},
			})
		}
		const balance = user?.balance ?? 0
		const wins = user?.wins ?? 0
		const loses = user?.loses ?? 0
		return NextResponse.json(
			{ balance, username, wins, loses },
			{ status: 200 }
		)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ status: 500 })
	}
}
