'use client'
import { userStore } from '@/store/user'
import { lvlStyles, shieldStyle } from '@/utils/strStyles'
import { updateUserInfo } from '@/utils/userUpdate'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { MdShield } from 'react-icons/md'
const Ranks = () => {
	const [winsToNextLevel, setWinsToNextLevel] = useState(0)
	const userWins = userStore((state: any) => state.wins)
	const username = userStore((state: any) => state.username)
	const userLevel = userStore((state: any) => state.level)

	const winsNeededForNextLevel = useCallback((level: number) => {
		switch (level) {
			case 1:
				return 25
			case 2:
				return 50
			case 3:
				return 100
			case 4:
				return 250
			case 5:
				return 500
			case 6:
				return 750
			case 7:
				return 1000
			case 8:
				return 1250
			case 9:
				return 1500
			case 10:
				return 0
			default:
				return 0
		}
	}, [])

	useEffect(() => {
		const neededWins = winsNeededForNextLevel(userLevel)

		if (userWins >= neededWins && userLevel < 5) {
			const newLevel = userLevel + 1
			userStore.setState({ level: newLevel })
			updateUserInfo(undefined, undefined, undefined, newLevel)
		}

		if (userLevel < 5) {
			setWinsToNextLevel(neededWins - userWins)
		} else {
			setWinsToNextLevel(0)
		}
	}, [
		userWins,
		userLevel,
		updateUserInfo,
		setWinsToNextLevel,
		winsNeededForNextLevel,
	])

	const userLevelNumber = Number(userLevel)
	const style: string = lvlStyles[userLevelNumber as keyof typeof lvlStyles]
	const shStyle: string =
		shieldStyle[userLevelNumber as keyof typeof shieldStyle]

	return (
		<div className='mt-8 bg-[#162A24] rounded-md flex flex-col gap-6 md:flex-row justify-between md:items-center py-6 px-4 lg:py-8 lg:px-6'>
			<div className='flex gap-3 items-start'>
				<MdShield
					className={`text-5xl ${shStyle} rounded-full bg-${style} bg-opacity-20 p-2`}
				/>
				<div className='flex flex-col'>
					<span className='text-white'>{username || 'User'}</span>
					<div className={`bg-${style} rounded-lg bg-opacity-20 px-2 mt-1`}>
						<span className={`text-${style} bg-clip-text text-transparent`}>
							Level {userLevel}
						</span>
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center'>
				<div className='flex justify-between items-center mb-3 w-full'>
					<div className={`bg-${style} rounded-lg bg-opacity-20 px-2 mt-1`}>
						<span className={`text-${style} bg-clip-text text-transparent`}>
							Lvl {userLevel}
						</span>
					</div>
					<div className='flex gap-2'>
						<span className='text-white font-semibold'>
							{winsToNextLevel} wins
						</span>
						<span className='hidden lg:block'>to next level</span>
					</div>
					<div className={`bg-${style} rounded-lg bg-opacity-20 px-2 mt-1`}>
						<span className={`text-${style} bg-clip-text text-transparent`}>
							Lvl {userLevel + 1 || 0}
						</span>
					</div>
				</div>
				<div
					className={`h-1 block w-full lg:w-96 bg-${style} bg-opacity-20 rounded-lg overflow-hidden`}
				>
					<div
						className={`h-full bg-${style}`}
						style={{
							width: `${(userWins / winsNeededForNextLevel(userLevel)) * 100}%`,
						}}
					></div>
				</div>
			</div>
			<div className=''>
				<Link
					href='/dashboard'
					className='border-2 border-green-400 bg-green-800 text-white rounded-md py-2 px-4 w-full'
				>
					Stats
				</Link>
			</div>
		</div>
	)
}

export default Ranks
