'use client'
import BetPanel from '@/components/BetPanel/BetPanel'
import { userStore } from '@/store/user'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { coinChecker } from '@/utils/coin/coin'
import { updateUserInfo } from '@/utils/userUpdate'
import styles from './CoinPage.module.css'
const CoinPage = () => {
	const [isCoinFlipping, setIsCoinFlipping] = useState(false)
	const [isAnimatingCompleted, setIsAnimatingCompleted] = useState(false)
	const [result, setResult] = useState<number | null>(null)
	const [disabledBetButton, setDisabledBetButton] = useState(false)
	const userWins = userStore((state: any) => state.wins)
	const userLoses = userStore((state: any) => state.loses)
	const userBalance = userStore((state: any) => state.balance)
	const userLevel = userStore((state: any) => state.level)

	const [userBet, setUserBet] = useState<number>(1)

	const flipCoinHandler = () => {
		const decreasedBalance = userBalance - userBet
		updateUserInfo(undefined, undefined, decreasedBalance, undefined)
		if (userBet > 0) {
			if (decreasedBalance > 0) {
				userStore.setState({ balance: decreasedBalance })
				setIsAnimatingCompleted(false)
				setIsCoinFlipping(true)
				setDisabledBetButton(true)
				const randomResult = Math.round(Math.random())
				setResult(randomResult)
				setTimeout(() => {
					setIsCoinFlipping(false)
					setDisabledBetButton(false)
					setIsAnimatingCompleted(true)
				}, 2000)
			} else {
				alert('Недостатньо грошей на балансі')
			}
		} else {
			alert('Сума ставки повинна бути більшою за 1')
		}
	}

	useEffect(() => {
		if (isAnimatingCompleted) {
			coinChecker(result, userBalance, userBet, userWins, userLoses, userLevel)
		}
	}, [result, isAnimatingCompleted])

	return (
		<div className='bg-[#1a1a1a] m-auto mt-9 sm:mt-24 border border-[#565656] rounded-lg w-full md:w-10/12 flex flex-col sm:flex-row items-center'>
			<BetPanel
				updateHandler={flipCoinHandler}
				disabledBetButton={disabledBetButton}
				setUserBet={setUserBet}
				userBet={userBet}
				interval={2000}
				disabledAuto={true}
			/>

			<div className='w-full sm:w-9/12 flex flex-col items-center justify-center mt-2 sm:mt-0'>
				<div className='border-0 sm:border-4 rounded-sm border-zinc-600 relative flex justify-center items-center w-8/12 sm:w-6/12 py-3 sm:py-5'>
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
