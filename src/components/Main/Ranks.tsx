'use client'
import { userStore } from '@/store/user'
import { updateUserInfo } from '@/utils/userUpdate'
import { useEffect, useState } from 'react'
import { MdShield } from 'react-icons/md'
const Ranks = () => {
	const [winsToNextLevel, setWinsToNextLevel] = useState(0)
	const userWins = userStore((state: any) => state.wins)
	const username = userStore((state: any) => state.username)
	const userLevel = userStore((state: any) => state.level)

	// utils
	const winsNeededForNextLevel = () => {
		if (userLevel === 1) {
			return 25
		} else if (userLevel === 2) {
			return 50
		} else if (userLevel === 3) {
			return 100
		} else if (userLevel === 4) {
			return 250
		} else {
			return 0
		}
	}

	const updateUserLvl = () => {
		userStore.setState({ level: userLevel + 1 })
		updateUserInfo(userLevel + 1)
	}

	// utils
	useEffect(() => {
		if (userWins <= 25) {
			setWinsToNextLevel(25 - userWins)
		} else if (userWins >= 25 && userWins < 50) {
			updateUserLvl()
			setWinsToNextLevel(50 - userWins)
		} else if (userWins >= 50 && userWins < 100) {
			updateUserLvl()
			setWinsToNextLevel(100 - userWins)
		} else if (userWins >= 100 && userWins < 250) {
			updateUserLvl()
			setWinsToNextLevel(250 - userWins)
		} else if (userWins >= 250) {
			updateUserLvl()
			setWinsToNextLevel(0)
		}
	}, [userWins])

	return (
		<div className='mt-8 bg-[#162A24] rounded-md flex flex-col gap-6 md:flex-row justify-between md:items-center py-6 px-4 lg:py-8 lg:px-6'>
			<div className='flex gap-3 items-start'>
				<MdShield className='text-5xl fill-yellow-400 rounded-full bg-yellow-400 bg-opacity-20 p-2' />
				<div className='flex flex-col'>
					<span className='text-white'>{username || 'User'}</span>
					<div className='bg-yellow-400 rounded-lg bg-opacity-20 px-2 mt-1'>
						<span className='bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent'>
							Level {userLevel}
						</span>
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center'>
				<div className='flex justify-between items-center mb-3 w-full'>
					<div className='bg-yellow-400 rounded-lg bg-opacity-20 px-2 mt-1'>
						<span className='bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent'>
							Lvl {userLevel}
						</span>
					</div>
					<div className='flex gap-2'>
						<span className='text-white font-semibold'>
							{winsToNextLevel} wins
						</span>
						<span className='hidden lg:block'>to next level</span>
					</div>
					<div className='bg-yellow-400 rounded-lg bg-opacity-20 px-2 mt-1'>
						<span className='bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent'>
							Lvl {userLevel + 1 || 0}
						</span>
					</div>
				</div>
				<div className='h-1 block w-full lg:w-96 bg-yellow-400 bg-opacity-20 rounded-lg overflow-hidden'>
					<div
						className='h-full bg-yellow-500'
						style={{ width: `${(userWins / winsNeededForNextLevel()) * 100}%` }}
					></div>
				</div>
			</div>
			<div className=''>
				<button className='border-2 border-green-400 bg-green-800 text-white rounded-md py-2 px-4 w-full'>
					Stats
				</button>
			</div>
		</div>
	)
}

export default Ranks
