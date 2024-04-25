const updateUserInfo = async (
	wins?: number,
	loses?: number,
	balance?: number
) => {
	try {
		await fetch('https://7kings.vercel.app/api/user/updateInfo', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ wins, loses, balance }),
		})
	} catch (error) {
		console.error(error)
	}
}

export { updateUserInfo }
