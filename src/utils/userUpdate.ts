const updateUserInfo = async (
	wins?: number,
	loses?: number,
	balance?: number,
	level?: number
) => {
	// https://7kings.vercel.app/
	try {
		await fetch('http://localhost:3000/api/user/updateInfo', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ wins, loses, balance, level }),
		})
	} catch (error) {
		console.error(error)
	}
}

export { updateUserInfo }
