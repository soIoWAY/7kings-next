import { prisma } from '@/app/lib/prisma'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const dataPromise = req.json()
	const data = await dataPromise
	const { username, password, enteredPromocode } = data

	const hashedPassword = await bcrypt.hash(password, 10)

	const foundUser = await prisma.user.findUnique({
		where: { username },
	})

	if (foundUser) {
		return NextResponse.json({ msg: 'User already exist' }, { status: 409 })
	}

	try {
		await prisma.user.create({
			data: {
				username,
				hashedPassword,
				enteredPromocode,
			},
		})

		return NextResponse.json({ msg: 'Successful' }, { status: 201 })
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ msg: 'Error during data processing' },
			{ status: 500 }
		)
	}
}
