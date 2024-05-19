import { NextResponse } from 'next/server'

export async function POST() {
	try {
		const res = NextResponse.json({ message: 'Logged out successfully' })
		res.cookies.set('user', '', {
			httpOnly: true,
			maxAge: -1,
			path: '/',
		})
		return res
	} catch (error) {
		console.error(error)
		return NextResponse.json({ message: 'Error logging out' }, { status: 500 })
	}
}
