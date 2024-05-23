'use client'
import { userStore } from '@/store/user'
import { formattedBalanceToK } from '@/utils/formattedBalanceToK'
import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineStock } from 'react-icons/ai'
import { BsCoin } from 'react-icons/bs'
import { FaDice, FaDiscord } from 'react-icons/fa'
import { GiMeepleKing } from 'react-icons/gi'
import { IoPerson } from 'react-icons/io5'
import { MdContactSupport } from 'react-icons/md'
import { PiNumberSquareSevenFill, PiSwordBold } from 'react-icons/pi'
import { RxHamburgerMenu } from 'react-icons/rx'
const Header = () => {
	const [isAsideOpen, setIsAsideOpen] = useState(false)
	const userBalance = userStore((state: any) => state.balance)
	const username = userStore((state: any) => state.username)
	const liStyle =
		'flex items-center text-xl gap-3 hover:text-green-400 transition-all tracking-widest'
	const linkStyle = 'hover:text-white transition-all flex-1'

	return (
		<div className='flex justify-between'>
			<div className='flex gap-3 md:gap-6 items-center'>
				<button
					className='text-2xl text-white block lg:hidden'
					onClick={() => setIsAsideOpen(!isAsideOpen)}
				>
					<RxHamburgerMenu />
				</button>
				<Link
					href='/'
					className='logo text-green-400 text-3xl md:text-4xl flex gap-2 items-center'
				>
					<GiMeepleKing />
					<span className='text-lg md:text-xl text-white font-normal sm:font-bold tracking-wide'>
						7Kings
					</span>
				</Link>
			</div>
			<div className='wallet flex gap-2 items-center'>
				<Link
					href='/wallet'
					className='bg-black rounded-md text-white py-1 md:py-2 px-2 md:px-4 text-center'
				>
					$
					{userBalance ? (
						<span>{formattedBalanceToK(userBalance)}</span>
					) : (
						<span>0</span>
					)}
				</Link>
				<Link
					href='/wallet'
					className='border-2 border-green-400 bg-green-800 text-white rounded-md py-1 px-4 hidden md:block'
				>
					Wallet
				</Link>
			</div>
			<div className='profile flex items-center text-green-400'>
				{username ? (
					<Link href='/dashboard' className='flex items-center gap-2 text-3xl'>
						<span className='text-white text-base tracking-wide underline decoration-green-400'>
							{username}
						</span>
						<PiSwordBold />
					</Link>
				) : (
					<Link
						href='/auth/login'
						className='text-white font-semibold bg-green-600 border-2 border-green-400 rounded-md py-1 px-4'
					>
						Login
					</Link>
				)}
			</div>
			<div
				className={`fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-95 z-50 ${
					isAsideOpen ? 'block' : 'hidden'
				}`}
			>
				<div className='flex justify-end pt-3 pr-4 text-white'>
					<button
						className='border px-2 rounded-md'
						onClick={() => setIsAsideOpen(!isAsideOpen)}
					>
						X
					</button>
				</div>
				<div className='text-white flex flex-col text-left items-center mt-10'>
					<ul className='flex items-start flex-col gap-4'>
						<li className={liStyle}>
							<AiOutlineStock />
							<Link href='/crash' className={linkStyle}>
								Crash
							</Link>
						</li>
						<li className={liStyle}>
							<PiNumberSquareSevenFill />
							<Link href='/#slots' className={linkStyle}>
								Slots
							</Link>
						</li>
						<li className={liStyle}>
							<FaDice />
							<Link href='/dice' className={linkStyle}>
								Dice
							</Link>
						</li>
						<li className={liStyle}>
							<BsCoin />
							<Link href='games/coin' className={linkStyle}>
								Coin
							</Link>
						</li>
						<li className={liStyle}>
							<IoPerson className='' />
							<Link href='/referrals' className={linkStyle}>
								Referrals
							</Link>
						</li>
						<li className={liStyle}>
							<MdContactSupport />
							<Link href='/support' className={linkStyle}>
								Support
							</Link>
						</li>
					</ul>

					<button className='flex items-center justify-center gap-2 border-[#5663EE] border-2 text-[#5663EE] rounded-md py-2 hover:bg-[#5663EE] hover:text-white transition-all w-48 mt-5'>
						<FaDiscord />
						Discord
					</button>
				</div>
			</div>
		</div>
	)
}

export default Header
