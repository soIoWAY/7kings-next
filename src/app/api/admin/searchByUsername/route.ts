import { prisma } from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams
	const username = searchParams.get('username')

	let user = null
	if (username) {
		user = await prisma.user.findUnique({
			where: {
				username: username,
			},
			select: {
				username: true,
				balance: true,
				wins: true,
				loses: true,
				promocode: true,
				enteredPromocode: true,
				status: true,
				role: true,
				level: true,
			},
		})
	}

	try {
		if (!user) {
			return NextResponse.json({ status: 404, message: 'User not found' })
		} else {
			const username = user.username
			const balance = user.balance
			const wins = user.wins
			const loses = user.loses
			const promocode = user.promocode
			const enteredPromocode = user.enteredPromocode
			const role = user.role
			const status = user.status
			const level = user.level
			return NextResponse.json(
				{
					username,
					balance,
					wins,
					loses,
					promocode,
					enteredPromocode,
					role,
					status,
					level,
				},
				{ status: 200 }
			)
		}
	} catch (error) {
		return NextResponse.json({ status: 500 })
	}
}
