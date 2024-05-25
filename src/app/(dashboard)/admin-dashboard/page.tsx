'use client'
import AdminAddMoney from '@/components/Dashboard/AdminDashboard/AdminAddMoney'
import AdminBan from '@/components/Dashboard/AdminDashboard/AdminBan'
import AdminSearchUser from '@/components/Dashboard/AdminDashboard/AdminSearchUser'
import Dashboard from '@/components/Dashboard/Dashboard'
import DashboardCard from '@/components/Dashboard/DashboardCard'
import { useEffect, useState } from 'react'

export default function AdminDashboardPage() {
	const [totalUsersGames, setTotalUsersGames] = useState(0)
	const [registeredPlayers, setRegisteredPlayers] = useState(0)
	const [totalMoneyInUsers, setTotalMoneyInUsers] = useState(0)

	const fetchUsersStats = async () => {
		try {
			const res = await fetch('api/admin/usersStats')
			const data = await res.json()
			console.log(data)
			setTotalUsersGames(data.totalGames)
			setRegisteredPlayers(data.registeredPlayers)
			setTotalMoneyInUsers(data.totalMoneyInUsers)
		} catch (error) {
			console.error(error)
		}
	}
	useEffect(() => {
		fetchUsersStats()
	}, [])
	return (
		<div>
			<div className='bg-[#1a1a1a] mt-3 rounded-md p-5'>
				<div className='flex flex-col text-white gap-6'>
					<h2 className='text-red-500 text-2xl font-bold tracking-wide'>
						Admin Dashboard
					</h2>
					<div className='flex flex-col gap-1'>
						<h2 className='text-xl font-bold'>General stats</h2>
						<div className='flex gap-2 flex-wrap'>
							<DashboardCard
								title='Games played'
								textColor='text-white'
								data={String(totalUsersGames)}
							/>
							<DashboardCard
								title='Registered players'
								textColor='text-white'
								data={String(registeredPlayers)}
							/>
							<DashboardCard
								title='Money in Users'
								textColor='text-green-500'
								data={String(totalMoneyInUsers + '$')}
							/>
						</div>
					</div>
					<div className='flex flex-col gap-1'>
						<h2 className='text-xl font-bold'>Set stats</h2>
						<div className='flex flex-col gap-2'>
							<AdminAddMoney />
							<AdminBan />
						</div>
					</div>
					<AdminSearchUser />
				</div>
			</div>
			<Dashboard />
		</div>
	)
}
