import { create } from 'zustand'
export const userStore = create(async set => {
	const response = await fetch('http://localhost:3000/api/user/info', {
		credentials: 'include',
	})
	const data = await response.json()

	set({
		wins: data.wins || 0,
		loses: data.loses !== undefined ? data.loses : 0,
		balance: data.balance || 0,
	})
})
