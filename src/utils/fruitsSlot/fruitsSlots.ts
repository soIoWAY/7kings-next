import { userStore } from '@/store/user'
import { updateUserInfo } from '../userUpdate'

const lvlWinMultipliers: { [key: number]: number } = {
	2: 1.002,
	3: 1.005,
	4: 1.01,
	5: 1.07,
}

const fruitsChecker = (
	fruits: string[],
	userBalance: number,
	userBet: number,
	userLevel: number,
	userWins: number,
	userLoses: number
) => {
	const multiplier = lvlWinMultipliers[userLevel] || 1
	if (fruits[0] === fruits[1] && fruits[1] === fruits[2]) {
		const increasedBalance = userBalance + userBet * 5 * multiplier
		const newWins = userWins + 1
		updateUserInfo(newWins, undefined, increasedBalance, undefined)
		userStore.setState({ wins: newWins, balance: increasedBalance })
	} else if (fruits[0] === fruits[1] || fruits[1] === fruits[2]) {
		const newWins = userWins + 1
		const increasedBalance = userBalance + userBet * 2 * multiplier
		updateUserInfo(newWins, undefined, increasedBalance, undefined)
		userStore.setState({ wins: newWins, balance: increasedBalance })
	} else {
		const decreasedBalance = userBalance - userBet
		userStore.setState({ balance: decreasedBalance })
		updateUserInfo(undefined, undefined, decreasedBalance, undefined)
		const newLoses = userLoses + 1
		userStore.setState({ loses: userLoses + 1 })
		updateUserInfo(undefined, newLoses, undefined, undefined)
	}
}

export { fruitsChecker, lvlWinMultipliers }
