import { prisma } from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface UpdateData {
	wins?: number
	loses?: number
	balance?: number | { increment: number } | { set: number }
	status?: string
}

export async function PATCH(req: NextRequest) {
	const dataPromise = req.json()
	const data = await dataPromise
	const { username, wins, loses, balance, status } = data

	const user = await prisma.user.findUnique({
		where: { username: username },
	})

	if (!user) {
		return NextResponse.json({ status: 404, msg: 'User not found' })
	}

	try {
		const updateData: UpdateData = {}
		if (wins !== undefined) {
			updateData.wins = wins
		}
		if (loses !== undefined) {
			updateData.loses = loses
		}
		if (balance !== undefined) {
			if (balance === 0) {
				updateData.balance = {
					set: 0,
				}
			} else {
				updateData.balance = {
					increment: balance,
				}
			}
		}
		if (status !== undefined) {
			updateData.status = status
		}

		await prisma.user.update({
			where: {
				username: username,
			},
			data: updateData,
		})

		return NextResponse.json({ status: 200 })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ status: 500 })
	}
}
