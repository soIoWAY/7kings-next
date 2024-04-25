import { create } from 'zustand'
export const userStore = create(async set => {
	const response = await fetch('https://7kings.vercel.app/api/user/info', {
		credentials: 'include',
	})
	const data = await response.json()
	console.log(data)

	set({
		wins: data.wins || 0,
		loses: data.loses !== undefined ? data.loses : 0,
		balance: data.balance || 0,
	})
})
