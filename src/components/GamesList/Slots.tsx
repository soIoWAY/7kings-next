import Image from 'next/image'
import Link from 'next/link'
import { IoLogoGameControllerB } from 'react-icons/io'
const Slots = () => {
	return (
		<div className='flex flex-col gap-3'>
			<h3 className='flex gap-3 items-center text-lg text-white font-semibold tracking-wide'>
				<IoLogoGameControllerB className='fill-indigo-500 text-xl' />
				Slots
			</h3>
			<div className='flex gap-4'>
				<Link
					href='games/fruits'
					className={`bg-gradient-to-tr from-red-700 to-slate-900 w-2/12 h-64 flex flex-col gap-4 items-center justify-center rounded-md`}
				>
					<Image src='/cherry.svg' width={128} height={128} alt='Cherry' />
					<h2 className='text-white text-2xl font-semibold'>Fruits</h2>
				</Link>
				<div
					className={`bg-gradient-to-tr from-teal-600 to-stone-900 w-2/12 h-64 flex flex-col gap-4 items-center justify-center rounded-md`}
				>
					<Image src='/diamond.svg' width={128} height={128} alt='Cherry' />
					<h2 className='text-white text-2xl font-semibold'>Diamonds</h2>
				</div>
			</div>
		</div>
	)
}

export default Slots
