export const formattedBalanceToK = (balance: number) => {
	if (balance < 1000) {
		return balance.toFixed(2)
	} else if (balance < 1000000) {
		return (balance / 1000).toFixed(1) + 'k'
	} else {
		return (balance / 1000000).toFixed(1) + 'kk'
	}
}
