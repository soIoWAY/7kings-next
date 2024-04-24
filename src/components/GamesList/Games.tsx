import { MdGames } from 'react-icons/md'
import Game from './Game'
import Slots from './Slots'
const Games = () => {
	return (
		<div className='mt-5 flex flex-col gap-3'>
			<h3 className='flex gap-3 items-center text-lg text-white font-semibold tracking-wide'>
				<MdGames className='fill-green-400' />
				House Games
			</h3>
			<div className='flex flex-wrap gap-4'>
				<Game
					icon={'/rocket.svg'}
					bg='bg-gradient-to-tr from-indigo-800 to-fuchsia-500'
					name='CRASH'
				/>
				<Game
					icon={'/dice.svg'}
					bg='bg-gradient-to-tr from-indigo-700 to-orange-600'
					name='DICE'
				/>
				<Game
					icon='/coin.svg'
					bg='bg-gradient-to-tr from-amber-600 to-red-700'
					name='COIN'
				/>
			</div>
			<div className=''>
				<Slots />
			</div>
		</div>
	)
}

export default Games
