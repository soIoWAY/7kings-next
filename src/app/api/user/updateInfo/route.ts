import { prisma } from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface UpdateData {
	wins?: number
	loses?: number
	balance?: number
}

export async function PATCH(req: NextRequest) {
	const dataPromise = req.json()
	const data = await dataPromise
	const { wins, loses, balance } = data
	const userCookieObject = req.cookies.get('user')
	const userCookie = userCookieObject ? userCookieObject.value : null
	let username = null
	try {
		if (userCookie) {
			const decodedCookie = decodeURIComponent(userCookie)
			const userData = JSON.parse(decodedCookie)
			username = userData.username
		}

		if (username) {
			const updateData: UpdateData = {}
			if (wins !== undefined) {
				updateData.wins = wins
			}
			if (loses !== undefined) {
				updateData.loses = loses
			}
			if (balance !== undefined) {
				updateData.balance = balance
			}

			await prisma.user.update({
				where: { username: username },
				data: updateData,
			})
		}

		return NextResponse.json({ status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ status: 500 })
	}
}
