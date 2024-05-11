import { userStore } from '@/store/user'
import { lvlWinMultipliers } from '../fruitsSlot/fruitsSlots'
import { updateUserInfo } from '../userUpdate'

const coinChecker: any = (
	result: number | null,
	userBalance: number,
	userBet: number,
	userWins: number,
	userLoses: number,
	userLevel: number
) => {
	const multiplier = lvlWinMultipliers[userLevel] || 1
	// const decreasedBalance = userBalance - userBet
	if (result === 0) {
		const increasedBalance = userBalance + userBet * 2 * multiplier
		const newWins = userWins + 1
		userStore.setState({ wins: newWins, balance: increasedBalance })
		updateUserInfo(newWins, undefined, increasedBalance, undefined)
	} else {
		const newLoses = userLoses + 1
		userStore.setState({ loses: newLoses })
		updateUserInfo(undefined, newLoses, undefined, undefined)
	}
}

export { coinChecker }
