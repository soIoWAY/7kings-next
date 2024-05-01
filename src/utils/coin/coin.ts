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
	if (result === 0) {
		const increasedBalance = userBalance + userBet * multiplier
		const newWins = userWins + 1
		userStore.setState({ wins: newWins, balance: increasedBalance })
		updateUserInfo(newWins, undefined, increasedBalance, undefined)
	} else {
		const decreasedBalance = userBalance - userBet
		const newLoses = userLoses + 1
		userStore.setState({ balance: decreasedBalance, loses: newLoses })
		updateUserInfo(undefined, newLoses, decreasedBalance, undefined)
	}
}

export { coinChecker }
