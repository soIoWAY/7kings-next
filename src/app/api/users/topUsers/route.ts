import { prisma } from '@/app/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const users = await prisma.user.findMany({
			take: 10,
			select: {
				username: true,
				balance: true,
			},
			orderBy: {
				balance: 'desc',
			},
		})
		return NextResponse.json({ users }, { status: 200 })
	} catch (error) {
		1
		console.error(error)
		return NextResponse.json({ status: 500 })
	}
}
