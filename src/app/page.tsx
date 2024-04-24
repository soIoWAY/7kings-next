import Cards from '@/components/Cards/Cards'
import Games from '@/components/GamesList/Games'
import Aside from '@/components/Main/Aside'

import Header from '@/components/Main/Header'
import Ranks from '@/components/Main/Ranks'

export default function Home() {
	return (
		<div className='w-full flex'>
			<aside className='w-[13%] fixed'>
				<Aside />
			</aside>
			<div className='flex-1 py-6 px-5 lg:ml-[13%]'>
				<header>
					<Header />
				</header>
				<Ranks />
				<Cards />
				<main>
					<Games />
				</main>
			</div>
		</div>
	)
}
