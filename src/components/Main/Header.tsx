'use client'
import { userStore } from '@/store/user'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { GiMeepleKing } from 'react-icons/gi'
import { PiSwordBold } from 'react-icons/pi'
import { RxHamburgerMenu } from 'react-icons/rx'
const Header = () => {
	const [username, setUsername] = useState('')
	const userBalance = userStore((state: any) => state.balance)
	const getInfoHandler = async () => {
		const response = await fetch('/api/user/info', { credentials: 'include' })
		const data = await response.json()
		if (data) {
			setUsername(data.username)
		}
	}
	useEffect(() => {
		getInfoHandler()
	}, [])
	return (
		<div className='flex justify-between'>
			<div className='flex gap-3 md:gap-6 items-center'>
				<button className='text-2xl text-white block lg:hidden'>
					<RxHamburgerMenu />
				</button>
				<Link
					href='/'
					className='logo text-green-400 text-3xl md:text-4xl flex gap-2 items-center'
				>
					<GiMeepleKing />
					<span className='text-lg md:text-xl text-white'>7Kings</span>
				</Link>
			</div>
			<div className='wallet flex gap-2 items-center'>
				<div className='bg-black rounded-md text-white py-1 md:py-2 px-2 md:px-4'>
					${userBalance ? <span>{userBalance}</span> : <span>0</span>}
				</div>
				<Link
					href='/wallet'
					className='border-2 border-green-400 bg-green-800 text-white rounded-md py-1 px-4 hidden md:block'
				>
					Wallet
				</Link>
			</div>
			<div className='profile flex items-center text-green-400'>
				{username ? (
					<div className='flex items-center gap-2 text-3xl'>
						<span className='text-white text-base tracking-wide underline decoration-green-400'>
							{username}
						</span>
						<PiSwordBold />
					</div>
				) : (
					<Link
						href='/auth/login'
						className='text-white font-semibold bg-green-600 border-2 border-green-400 rounded-md py-1 px-4'
					>
						Login
					</Link>
				)}
			</div>
		</div>
	)
}

export default Header
