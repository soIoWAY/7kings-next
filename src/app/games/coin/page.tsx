'use client'
import BetPanel from '@/components/GamesList/BetPanel'
import { userStore } from '@/store/user'
import Image from 'next/image'
import { useState } from 'react'
import styles from './CoinPage.module.css'

const CoinPage = () => {
	const [isCoinFlipping, setIsCoinFlipping] = useState(false)
	const [result, setResult] = useState<number | null>(null)
	const [disabledBetButton, setDisabledBetButton] = useState(false)
	const userWins = userStore((state: any) => state.wins)
	const userLoses = userStore((state: any) => state.loses)
	const userBalance = userStore((state: any) => state.balance)
	const [userBet, setUserBet] = useState<number>(1)
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
	const flipCoinHandler = () => {
		const decreasedBalance = userBalance - userBet
		if (decreasedBalance > 0) {
			userStore.setState({ balance: decreasedBalance })
			updateUserInfo(undefined, undefined, decreasedBalance)
			setIsCoinFlipping(true)
			setDisabledBetButton(true)
			const randomResult = Math.round(Math.random())
			setResult(randomResult)
			setTimeout(() => {
				setIsCoinFlipping(false)
				setDisabledBetButton(false)
				if (randomResult === 0) {
					const increasedBalance = userBalance + userBet
					const newWins = userWins + 1
					userStore.setState({ wins: newWins, balance: increasedBalance })
					updateUserInfo(newWins, undefined, increasedBalance)
				} else {
					const newLoses = userLoses + 1
					userStore.setState({ loses: userLoses + 1 })
					updateUserInfo(undefined, newLoses)
				}
			}, 2000)
		} else {
			alert('Недостатньо грошей на балансі')
		}
	}
	return (
		<div className='bg-[#1a1a1a] m-auto mt-24 border border-[#565656] rounded-lg w-10/12 flex'>
			<BetPanel
				updateHandler={flipCoinHandler}
				disabledBetButton={disabledBetButton}
				setUserBet={setUserBet}
				userBet={userBet}
			/>
			<div className='w-9/12 flex flex-col items-center justify-center'>
				<div className='border-4 rounded-sm border-zinc-600 relative flex justify-center items-center w-6/12 py-5'>
					<div
						className={`${styles.coin} ${
							isCoinFlipping ? styles.flipping : ''
						}`}
					>
						<Image
							src={result === 0 ? '/heads.svg' : '/tails.svg'}
							alt={result === 0 ? 'heads' : 'tail'}
							width={138}
							height={138}
							className={styles.heads}
						/>
						<Image
							src={result === 0 ? '/tails.svg' : '/heads.svg'}
							alt={result === 0 ? 'tails' : 'head'}
							width={138}
							height={138}
							className={styles.tails}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CoinPage
