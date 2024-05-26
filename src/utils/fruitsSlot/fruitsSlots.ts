import { userStore } from '@/store/user'
import { updateUserInfo } from '../userUpdate'

const lvlWinMultipliers: { [key: number]: number } = {
	2: 1.002,
	3: 1.005,
	4: 1.01,
	5: 1.07,
	6: 1.1,
	7: 1.25,
	8: 1.5,
	9: 1.75,
	10: 2.25,
}

const winUpdate = (
	userBalance: number,
	userBet: number,
	x: number,
	multiplier: number,
	userWins: number
) => {
	const increasedBalance = userBalance + userBet * x * multiplier
	const newWins = userWins + 1
	updateUserInfo(newWins, undefined, increasedBalance, undefined)
	userStore.setState({ wins: newWins, balance: increasedBalance })
}

const loseUpdate = (userLoses: number) => {
	const newLoses = userLoses + 1
	userStore.setState({ loses: newLoses })
	updateUserInfo(undefined, newLoses, undefined, undefined)
}

// bomb logic
const fruitsChecker = (
	fruits: string[],
	userBalance: number,
	userBet: number,
	userLevel: number,
	userWins: number,
	userLoses: number
) => {
	const multiplier = lvlWinMultipliers[userLevel] || 1
	const fruitMultipliers: { [key: string]: number } = {
		'🍒': 10,
		'🍏': 8,
		'🍋': 7,
		'🍌': 6,
		'🍇': 5,
	}
	const allEqual = (arr: string[]) => arr.every(fruit => fruit === arr[0])
	const allDifferent = (arr: string[]) =>
		arr[0] !== arr[1] && arr[1] !== arr[2] && arr[0] !== arr[2]
	if (fruits.includes('💣')) {
		loseUpdate(userLoses)
	} else if (allEqual(fruits)) {
		const fruit = fruits[0]
		winUpdate(
			userBalance,
			userBet,
			fruitMultipliers[fruit],
			multiplier,
			userWins
		)
	} else if (
		(fruits[0] === '🍒' && fruits[1] === fruits[0]) ||
		(fruits[1] === '🍒' && fruits[2] === fruits[1])
	) {
		winUpdate(userBalance, userBet, 4, multiplier, userWins)
	} else if (
		(fruits[0] === '🍏' && fruits[1] === fruits[0]) ||
		(fruits[1] === '🍏' && fruits[2] === fruits[1])
	) {
		winUpdate(userBalance, userBet, 3.5, multiplier, userWins)
	} else if (
		(fruits[0] === '🍋' && fruits[1] === fruits[0]) ||
		(fruits[1] === '🍋' && fruits[2] === fruits[1])
	) {
		winUpdate(userBalance, userBet, 3, multiplier, userWins)
	} else if (
		(fruits[0] === '🍌' && fruits[1] === fruits[0]) ||
		(fruits[1] === '🍌' && fruits[2] === fruits[1])
	) {
		winUpdate(userBalance, userBet, 2.5, multiplier, userWins)
	} else if (
		(fruits[0] === '🍇' && fruits[1] === fruits[0]) ||
		(fruits[1] === '🍇' && fruits[2] === fruits[1])
	) {
		winUpdate(userBalance, userBet, 2, multiplier, userWins)
	} else if (allDifferent(fruits)) {
		winUpdate(userBalance, userBet, 1.5, multiplier, userWins)
	} else {
		loseUpdate(userLoses)
	}
}

export { fruitsChecker, lvlWinMultipliers }
