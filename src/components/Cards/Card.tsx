import Image from 'next/image'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'

interface CardProps {
	icon: string
	h1Text: string
	h1Color: string
	h2Text: string
	description: string
	bg: string
}

const Card = ({
	icon,
	h1Text,
	h2Text,
	description,
	h1Color,
	bg,
}: CardProps) => {
	return (
		<div
			className={`flex items-start w-[30%] rounded-md justify-between px-3 py-5 relative ${bg}`}
		>
			<div className='flex flex-col'>
				<h1 className={`${h1Color} text-2xl uppercase font-semibold`}>
					{h1Text}
				</h1>
				<h2 className='text-white text-2xl uppercase font-medium'>{h2Text}</h2>
				<span className='text-sm text-gray-400'>{description}</span>
				<div className='absolute bottom-4'>
					<Link
						href='/referrals'
						className='text-white bg-white bg-opacity-30 rounded-full w-8 h-8 mt-5 flex items-center justify-center'
					>
						<IoIosArrowForward />
					</Link>
				</div>
			</div>
			<Image
				src={icon}
				width={138}
				height={138}
				alt={h1Text}
				className='rotate-12'
			/>
		</div>
	)
}

export default Card
