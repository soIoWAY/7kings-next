import { userStore } from '@/store/user'
import { updateUserInfo } from '../userUpdate'

const lvlWinMultipliers: { [key: number]: number } = {
	2: 1.002,
	3: 1.005,
	4: 1.01,
	5: 1.07,
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
	const fruitMultipliers = {
		'🍒': 10,
		'🍏': 8,
		'🍋': 7,
		'🍌': 6,
		'🍇': 5,
	}
	if (fruits.every(fruit => fruit === '🍒')) {
		winUpdate(userBalance, userBet, 10, multiplier, userWins)
	} else if (fruits.every(fruit => fruit === '🍏')) {
		winUpdate(userBalance, userBet, 8, multiplier, userWins)
	} else if (fruits.every(fruit => fruit === '🍋')) {
		winUpdate(userBalance, userBet, 7, multiplier, userWins)
	} else if (fruits.every(fruit => fruit === '🍌')) {
		winUpdate(userBalance, userBet, 6, multiplier, userWins)
	} else if (fruits.every(fruit => fruit === '🍇')) {
		winUpdate(userBalance, userBet, 5, multiplier, userWins)
	} else if (fruits[0] === '💣' || fruits[1] === '💣' || fruits[2] === '💣') {
		loseUpdate(userLoses) // lose
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
	} else if (
		fruits[0] !== fruits[1] &&
		fruits[1] !== fruits[2] &&
		fruits[0] !== fruits[2]
	) {
		winUpdate(userBalance, userBet, 1.5, multiplier, userWins)
	} else {
		const newLoses = userLoses + 1
		userStore.setState({ loses: newLoses })
		updateUserInfo(undefined, newLoses, undefined, undefined)
	}
}

export { fruitsChecker, lvlWinMultipliers }
