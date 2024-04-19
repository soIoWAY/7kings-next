import { prisma } from '@/app/lib/prisma'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const dataPromise = req.json()
	const data = await dataPromise
	const { username, password } = data

	const foundUser = await prisma.user.findUnique({
		where: { username },
	})
	if (!foundUser) {
		return NextResponse.json({ msg: 'User not found!' }, { status: 404 })
	}
	const isMatch = await bcrypt.compare(password, foundUser.hashedPassword)

	if (!isMatch) {
		return NextResponse.json({ msg: 'Passwords dont match' }, { status: 400 })
	}

	const cookieOptions = `HttpOnly; Max-Age=${24 * 60 * 2}; Path=/`
	const userCookie = `user=${encodeURIComponent(
		JSON.stringify({ username: foundUser.username })
	)}; ${cookieOptions}`

	return NextResponse.json(
		{ message: 'Successful login' },
		{ status: 200, headers: { 'Set-Cookie': userCookie } }
	)
}
