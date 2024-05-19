import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		console.log('Fetching data from the database at:', new Date().toISOString())
		const players = await prisma.user.findMany({
			select: {
				id: true,
				username: true,
				wins: true,
				loses: true,
				balance: true,
			},
		})
		const totalWins = players.reduce((acc, player) => acc + player.wins, 0)
		const totalLoses = players.reduce((acc, player) => acc + player.loses, 0)
		const totalMoneyInUsers = players.reduce(
			(acc, player) => acc + player.balance,
			0
		)
		const registeredPlayers = players.length
		const totalGames = totalWins + totalLoses
		return NextResponse.json(
			{ totalGames, registeredPlayers, totalMoneyInUsers },
			{ status: 200 }
		)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ status: 500 })
	}
}
