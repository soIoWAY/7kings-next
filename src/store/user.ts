import { create } from 'zustand'
export const userStore = create(async set => {
	// http://localhost:3000
	// https://7kings.vercel.app
	const url = 'https://7kings.vercel.app'
	const response = await fetch(`${url}/api/user/info`, {
		credentials: 'include',
	})
	const data = await response.json()

	set({
		wins: data.wins || 0,
		loses: data.loses !== undefined ? data.loses : 0,
		balance: data.balance || 0,
		username: data.username || '',
		level: data.level || 0,
		promocode: data.promocode || '',
		promocodeUsers: data.promocodeUsers || 0,
	})
})
