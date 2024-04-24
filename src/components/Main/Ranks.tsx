import { MdShield } from 'react-icons/md'
const Ranks = () => {
	return (
		<div className='mt-8 bg-[#162A24] rounded-md flex flex-col gap-6 md:flex-row justify-between md:items-center py-6 px-4 lg:py-8 lg:px-6'>
			<div className='flex gap-3 items-start'>
				<MdShield className='text-5xl fill-yellow-400 rounded-full bg-yellow-400 bg-opacity-20 p-2' />
				<div className='flex flex-col'>
					<span className='text-white'>kalist0</span>
					<div className='bg-yellow-400 rounded-lg bg-opacity-20 px-2 mt-1'>
						<span className='bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent'>
							Level 1
						</span>
					</div>
				</div>
			</div>
			<div className='flex flex-col items-center'>
				<div className='flex justify-between items-center mb-3 w-full'>
					<div className='bg-yellow-400 rounded-lg bg-opacity-20 px-2 mt-1'>
						<span className='bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent'>
							Lvl 1
						</span>
					</div>
					<div className='flex gap-2'>
						<span className='text-white font-semibold'>7 wins</span>
						<span className='hidden lg:block'>to next level</span>
					</div>
					<div className='bg-yellow-400 rounded-lg bg-opacity-20 px-2 mt-1'>
						<span className='bg-gradient-to-r from-yellow-300 to-amber-500 bg-clip-text text-transparent'>
							Lvl 2
						</span>
					</div>
				</div>
				<div className='h-1 block w-full lg:w-96 bg-yellow-400 bg-opacity-20 rounded-lg overflow-hidden'>
					<div className='h-full bg-yellow-500' style={{ width: '75%' }}></div>
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
