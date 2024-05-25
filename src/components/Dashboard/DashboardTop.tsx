import { useEffect, useState } from 'react'
import DashboardTopPos from './DashboardTopPos'

interface IDashboardTop {
	username: string
	balance: number
}

async function getUsers(): Promise<IDashboardTop[]> {
	try {
		const urls = `${process.env.NEXT_PUBLIC_URL}/api/users/topUsers`
		const response = await fetch(urls, { next: { revalidate: 0 } })
		const data = await response.json()
		console.log(data.users)
		return data.users
	} catch (error) {
		console.error(error)
		return []
	}
}

export default function DashboardTop() {
	const [topUsersByMoney, setTopUsersByMoney] = useState<IDashboardTop[]>([])

	useEffect(() => {
		async function fetchAndSetUsers() {
			const fetchedUsers = await getUsers()
			setTopUsersByMoney(fetchedUsers)
		}
		fetchAndSetUsers()
	}, [])

	return (
		<div className='bg-black rounded-md px-3 w-full sm:w-3/12 h-fit py-3'>
			<h2 className='text-white font-semibold text-2xl text-center mt-1'>
				Top 10
			</h2>
			<div className='flex flex-col gap-1 border border-green-400 mt-3 rounded-md p-1'>
				{topUsersByMoney.length > 0
					? topUsersByMoney.map((user, index) => (
							<DashboardTopPos
								key={index}
								username={user.username}
								balance={user.balance}
								position={index + 1}
							/>
					  ))
					: 'Loading...'}
			</div>
		</div>
	)
}
