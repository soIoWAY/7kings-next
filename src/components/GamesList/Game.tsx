import Image from 'next/image'
import Link from 'next/link'

interface Game {
	icon: string
	bg: string
	name: string
}
const Game = ({ icon, bg, name }: Game) => {
	return (
		<Link
			href='games/coin'
			className={`${bg} w-2/12 h-64 flex flex-col gap-4 items-center justify-center rounded-md`}
		>
			<Image src={icon} width={128} height={128} alt={name} />
			<h2 className='text-white text-2xl font-semibold uppercase'>{name}</h2>
		</Link>
	)
}

export default Game
