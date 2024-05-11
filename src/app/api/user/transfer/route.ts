import { prisma } from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
	const dataPromise = req.json()
	const data = await dataPromise
	const { transferUsername, transferSum } = data

	const userCookieObject = req.cookies.get('user')
	const userCookie = userCookieObject ? userCookieObject.value : null
	let username = null

	const user = await prisma.user.findUnique({
		where: { username: transferUsername },
	})

	if (!user) {
		return NextResponse.json({ status: 404, msg: 'User not found' })
	}

	try {
		if (userCookie) {
			const decodedCookie = decodeURIComponent(userCookie)
			const userData = JSON.parse(decodedCookie)
			username = userData.username
		}

		await prisma.user.update({
			where: { username: username },
			data: {
				balance: {
					decrement: transferSum,
				},
			},
		})

		await prisma.user.update({
			where: { username: transferUsername },
			data: {
				balance: {
					increment: transferSum,
				},
			},
		})

		return NextResponse.json({ status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ status: 500 })
	}
}
