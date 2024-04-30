import { create } from 'zustand'
export const userStore = create(async set => {
	// http://localhost:3000
	// https://7kings.vercel.app
	const url = 'http://localhost:3000'
	const response = await fetch(`${url}/api/user/info`, {
		credentials: 'include',
	})
	const data = await response.json()
	console.log(data)

	set({
		wins: data.wins || 0,
		loses: data.loses !== undefined ? data.loses : 0,
		balance: data.balance || 0,
		username: data.username || '',
	})
})
