import Link from 'next/link'
import { AiOutlineStock } from 'react-icons/ai'
import { BsCoin } from 'react-icons/bs'
import { FaDice, FaDiscord } from 'react-icons/fa'
import { IoPerson } from 'react-icons/io5'
import { MdContactSupport } from 'react-icons/md'
import { PiNumberSquareSevenFill } from 'react-icons/pi'
const Aside = () => {
	const liStyle = 'flex items-center gap-3 hover:text-green-400 transition-all'
	const linkStyle = 'hover:text-white transition-all flex-1'
	return (
		<div
			className={`bg-black py-6 px-4 h-screen hidden lg:flex flex-col justify-between`}
		>
			<div>
				<ul className='flex flex-col gap-4'>
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
				</ul>
				<ul className='flex flex-col gap-4 pt-4 mt-4 border-t border-gray-400'>
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
			</div>
			<button className='flex items-center justify-center gap-2 border-[#5663EE] border-2 text-[#5663EE] rounded-md py-2 hover:bg-[#5663EE] hover:text-white transition-all'>
				<FaDiscord />
				Discord
			</button>
		</div>
	)
}

export default Aside
