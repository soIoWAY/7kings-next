'use client'
import BetPanel from '@/components/BetPanel/BetPanel'
import { userStore } from '@/store/user'
import { fruitsChecker } from '@/utils/fruitsSlot/fruitsSlots'
import { updateUserInfo } from '@/utils/userUpdate'
import { useEffect, useState } from 'react'

export default function FruitsPage() {
	const [fruit1, setFruit1] = useState('🍒')
	const [fruit2, setFruit2] = useState('🍒')
	const [fruit3, setFruit3] = useState('🍒')
	const [disabledBetButton, setDisabledBetButton] = useState(false)
	const userWins = userStore((state: any) => state.wins)
	const userLoses = userStore((state: any) => state.loses)
	const userBalance = userStore((state: any) => state.balance)
	const userLevel = userStore((state: any) => state.level)
	const [isAnimatingCompleted, setIsAnimatingCompleted] = useState(false)
	const [userBet, setUserBet] = useState<number>(1)

	const fruits = ['🍒', '🍏', '🍋', '🍌', '🍇', '💣'] //, '🍏', '🍋', '🍌', '🍇', '💣'
	const randomFruit = () => {
		return Math.floor(Math.random() * fruits.length)
	}
	const updateFruitsHandler = () => {
		const delay = 180
		const decreasedBalance = userBalance - userBet
		if (userBet >= 1) {
			if (decreasedBalance > 0) {
				userStore.setState({ balance: decreasedBalance })
				updateUserInfo(undefined, undefined, decreasedBalance, undefined)
				setIsAnimatingCompleted(false)
				if (decreasedBalance > 0) {
					setDisabledBetButton(true)
					setFruit1(fruits[randomFruit()])
					setTimeout(() => {
						setFruit2(fruits[randomFruit()])
					}, delay)
					setTimeout(() => {
						setFruit3(fruits[randomFruit()])
					}, delay * 2)
					setTimeout(() => {
						setDisabledBetButton(false)
						setIsAnimatingCompleted(true)
					}, delay * 3)
				}
			} else {
				alert('Недостатньо грошей на балансі')
			}
		} else {
			alert('Сума ставки повинна бути більшою за один')
		}
	}

	useEffect(() => {
		if (isAnimatingCompleted) {
			const fruits = [fruit1, fruit2, fruit3]
			fruitsChecker(
				fruits,
				userBalance,
				userBet,
				userLevel,
				userWins,
				userLoses
			)
		}
	}, [fruit1, fruit2, fruit3, isAnimatingCompleted])
	return (
		<div className='bg-[#1a1a1a] m-auto mt-9 sm:mt-24 border border-[#565656] rounded-lg w-full md:w-10/12 flex flex-col sm:flex-row items-center'>
			<div className='w-full sm:w-9/12 flex items-center justify-center mt-4 sm:mt-0 mb-4 sm:mb-0'>
				<div className='border-0 sm:border-4 rounded-sm border-zinc-600 flex gap-2 justify-center w-6/12'>
					<div className='border-l sm:border-l-0 border-r border-zinc-600 w-[90px] sm:w-[130px] text-7xl flex items-center justify-center py-5'>
						{fruit1}
					</div>
					<div className='border-r border-zinc-600 w-[90px] sm:w-[130px] text-7xl flex items-center justify-center'>
						{fruit2}
					</div>
					<div className='border-r border-zinc-600 w-[90px] sm:w-[130px] text-7xl flex items-center justify-center'>
						{fruit3}
					</div>
				</div>
			</div>
			<BetPanel
				updateHandler={updateFruitsHandler}
				disabledBetButton={disabledBetButton}
				setUserBet={setUserBet}
				userBet={userBet}
				userBalance={userBalance}
				interval={1550}
				disabledAuto={true}
			/>
		</div>
	)
}
