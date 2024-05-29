import Aside from '@/components/Main/Aside'
import Header from '@/components/Main/Header'
import { ReactNode } from 'react'

interface ICSoonLayout {
	children: ReactNode
}

export default function CSoonLayout({ children }: ICSoonLayout) {
	return (
		<div className='w-full flex'>
			<aside className='w-[13%] fixed'>
				<Aside />
			</aside>
			<div className='flex-1 py-6 px-5 lg:ml-[13%]'>
				<header>
					<Header />
				</header>
				<main>{children}</main>
			</div>
		</div>
	)
}
