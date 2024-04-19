'use client'
import BetPanel from '@/components/GamesList/BetPanel'
import { userStore } from '@/store/user'
import { useEffect, useState } from 'react'

export default function FruitsPage() {
	const [fruit1, setFruit1] = useState('🍒')
	const [fruit2, setFruit2] = useState('🍒')
	const [fruit3, setFruit3] = useState('🍒')
	const [disabledBetButton, setDisabledBetButton] = useState(false)
	const userWins = userStore((state: any) => state.wins)
	const userLoses = userStore((state: any) => state.loses)
	const userBalance = userStore((state: any) => state.balance)
	const [isAnimatingCompleted, setAnimatingCompleted] = useState(false)
	const [userBet, setUserBet] = useState<number>(1)
	const fruits = ['🍒', '🍏', '🍋', '🍌', '🍇', '💣']
	const randomFruit = () => {
		return Math.floor(Math.random() * fruits.length)
	}
	const updateUserInfo = async (
		wins?: number,
		loses?: number,
		balance?: number
	) => {
		try {
			await fetch('http://localhost:3000/api/user/updateInfo', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ wins, loses, balance }),
			})
		} catch (error) {
			console.error(error)
		}
	}
	const updateFruitsHandler = () => {
		const delay = 180
		const decreasedBalance = userBalance - userBet
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
			}, delay * 3)
		} else {
			alert('недостатньо грошей на балансі')
		}
	}

	useEffect(() => {
		console.log(fruit1, fruit2, fruit3)
	}, [fruit1, fruit2, fruit3])
	return (
		<div className='bg-[#1a1a1a] m-auto mt-24 border border-[#565656] rounded-lg w-10/12 flex'>
			<BetPanel
				updateHandler={updateFruitsHandler}
				disabledBetButton={disabledBetButton}
				setUserBet={setUserBet}
				userBet={userBet}
			/>
			<div className='w-9/12 flex items-center justify-center'>
				<div className='border-4 rounded-sm border-zinc-600 flex gap-2 justify-center w-6/12'>
					<div className='border-r border-zinc-600 w-[130px] text-7xl flex items-center justify-center py-5'>
						{fruit1}
					</div>
					<div className='border-r border-zinc-600 w-[130px] text-7xl flex items-center justify-center'>
						{fruit2}
					</div>
					<div className='w-[130px] text-7xl flex items-center justify-center'>
						{fruit3}
					</div>
				</div>
			</div>
		</div>
	)
}
