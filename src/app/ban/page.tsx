'use client'
import { useRouter } from 'next/navigation'
import { GiMeepleKing } from 'react-icons/gi'

export default function BanPage() {
	const router = useRouter()
	const logoutHandler = async () => {
		try {
			const res = await fetch('/api/logout', {
				method: 'POST',
			})
			if (res.ok) {
				router.push('/')
			}
		} catch (error) {
			console.error('Error during logout', error)
		}
	}
	return (
		<div className='text-white h-screen flex flex-col justify-center items-center'>
			<div className='flex flex-col items-center'>
				<div className='text-7xl text-green-400'>
					<GiMeepleKing />
				</div>
				<h1 className='text-3xl'>7Kings</h1>
			</div>
			<div className='text-center mt-2'>
				<h2 className='text-2xl'>
					Hello, <span className='font-semibold text-green-400'>Vet</span>
				</h2>
				<p className='text-red-500 font-semibold'>
					You`re banned by administration
				</p>
				<p>
					You have
					<span className='text-green-400 font-bold underline'> 7 days</span> to
					bet ban
				</p>
				<p className='tracking-wide font-semibold'>7kingsupport@gmail.com</p>
				<button
					onClick={logoutHandler}
					className='bg-green-400 text-white rounded-md px-3 py-1'
				>
					Logout
				</button>
			</div>
		</div>
	)
}
