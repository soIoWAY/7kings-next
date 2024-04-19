import Aside from '@/components/Main/Aside'
import Header from '@/components/Main/Header'

interface GamesLayout {
	children: React.ReactNode
}
export default function GamesLayout({ children }: GamesLayout) {
	return (
		<div className='w-full flex'>
			<aside className='w-[13%] fixed'>
				<Aside />
			</aside>
			<div className='flex-1 py-6 px-5 ml-[13%]'>
				<Header />
				{children}
			</div>
		</div>
	)
}
