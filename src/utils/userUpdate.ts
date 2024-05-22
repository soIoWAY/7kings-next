const updateUserInfo = async (
	wins?: number,
	loses?: number,
	balance?: number,
	level?: number,
	promocode?: string
) => {
	try {
		await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/updateInfo`, {
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
