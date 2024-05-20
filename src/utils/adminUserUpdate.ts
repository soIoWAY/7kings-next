const adminUserUpdate = async (
	username: string,
	wins?: number,
	loses?: number,
	balance?: number,
	status?: string
) => {
	try {
		await fetch('http://localhost:3000/api/admin/updateUserStats', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ username, wins, loses, balance, status }),
		})
	} catch (error) {
		console.error(error)
	}
}

export { adminUserUpdate }
