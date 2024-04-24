const updateUserInfo = async (
	wins?: number,
	loses?: number,
	balance?: number
) => {
	try {
		await fetch('http://localhost:3000/api/user/updateInfo', {
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
