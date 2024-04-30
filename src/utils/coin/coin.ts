import { userStore } from '@/store/user'
import { lvlWinMultipliers } from '../fruitsSlot/fruitsSlots'
import { updateUserInfo } from '../userUpdate'

const coinChecker = (
	result: number | null,
	userBalance: number,
	userBet: number,
	userWins: number,
	userLoses: number,
	userLevel: number
) => {
	const multiplier = lvlWinMultipliers[userLevel] || 1
	if (result === 0) {
		const increasedBalance = userBalance + userBet * multiplier
		const newWins = userWins + 1
		userStore.setState({ wins: newWins, balance: increasedBalance })
		updateUserInfo(newWins, undefined, increasedBalance)
	} else {
		const decreasedBalance = userBalance - userBet
		userStore.setState({ balance: decreasedBalance })
		updateUserInfo(undefined, undefined, decreasedBalance)
		const newLoses = userLoses + 1
		userStore.setState({ loses: userLoses + 1 })
		updateUserInfo(undefined, newLoses)
	}
}

export { coinChecker }
