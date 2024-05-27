'use client'
import { userStore } from '@/store/user'
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

		if (userLevel < 10) {
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

	let userLevelNumber = 10 // Number(userLevel)
	let style
	let progressStyle
	let shieldStyle
	if (userLevelNumber === 1) {
		style = 'text-white bg-zinc-200 bg-opacity-20 px-2 rounded-md'
		progressStyle = 'bg-zinc-200'
		shieldStyle =
			'text-5xl fill-white bg-zinc-200 bg-opacity-20 rounded-full p-2'
	} else if (userLevelNumber === 2 || userLevelNumber === 3) {
		style = 'text-green-500 bg-green-500 bg-opacity-20 px-2 rounded-md'
		progressStyle = 'bg-green-500'
		shieldStyle =
			'text-5xl fill-green-500 bg-green-500 bg-opacity-20 rounded-full p-2'
	} else if (
		userLevelNumber === 4 ||
		userLevelNumber === 5 ||
		userLevelNumber === 6 ||
		userLevelNumber === 7
	) {
		style = 'text-yellow-500 bg-yellow-500 bg-opacity-20 px-2 rounded-md'
		progressStyle = 'bg-yellow-500'
		shieldStyle =
			'text-5xl fill-yellow-500 bg-yellow-500 bg-opacity-20 rounded-full p-2'
	} else if (userLevelNumber === 8 || userLevelNumber === 9) {
		style = 'text-orange-600 bg-orange-600 bg-opacity-20 px-2 rounded-md'
		progressStyle = 'bg-orange-600'
		shieldStyle =
			'text-5xl fill-orange-600 bg-orange-600 bg-opacity-20 rounded-full p-2'
	} else if (userLevelNumber === 10) {
		style = 'text-red-600 bg-red-600 bg-opacity-20 px-2 rounded-md'
		progressStyle = 'bg-red-600'
		shieldStyle =
			'text-5xl fill-red-600 bg-red-600 bg-opacity-20 rounded-full p-2'
	}

	return (
		<div className='mt-8 bg-[#162A24] rounded-md flex flex-col gap-6 md:flex-row justify-between md:items-center py-6 px-4 lg:py-8 lg:px-6'>
			<div className='flex gap-3 items-start'>
				<MdShield className={shieldStyle} />
				<div className='flex flex-col'>
					<span className='text-white'>{username || 'User'}</span>
					<span className={style}>Level {userLevel}</span>
				</div>
			</div>
			<div className='flex flex-col items-center'>
				<div className='flex justify-between items-center mb-3 w-full'>
					<span className={style}>Lvl {userLevel}</span>
					<div className='flex gap-2'>
						<span className='text-white font-semibold'>
							{winsToNextLevel} wins
						</span>
						<span className='hidden lg:block'>to next level</span>
					</div>
					<span className={style}>Lvl {userLevel + 1 || 0}</span>
				</div>
				<div
					className={`h-1 block w-full lg:w-96 ${progressStyle} bg-opacity-20 rounded-lg overflow-hidden`}
				>
					<div
						className={`h-full ${progressStyle}`}
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
