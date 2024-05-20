const updateUserInfo = async (
	wins?: number,
	loses?: number,
	balance?: number,
	level?: number,
	promocode?: string
) => {
	// https://7kings.vercel.app/
	try {
		await fetch('https://7kings.vercel.app/api/user/updateInfo', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ wins, loses, balance, level, promocode }),
		})
	} catch (error) {
		console.error(error)
	}
}

export { updateUserInfo }
