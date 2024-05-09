'use client'
import DashboardCard from '@/components/Dashboard/DashboardCard'
import DashboardForm from '@/components/Dashboard/DashboardForm'
import DashboardTransferForm from '@/components/Dashboard/DashboardTransferForm'
import Ranks from '@/components/Main/Ranks'
import { userStore } from '@/store/user'
export default function DashboardPage() {
	// only 2 or 3 lvl can create promos
	// base info league top-10-25-50-100
	// top-10 table
	const username = userStore((state: any) => state.username)
	const userLevel = userStore((state: any) => state.level)
	const userWins = userStore((state: any) => state.wins)
	const userLoses = userStore((state: any) => state.loses)
	const totalUserGames = userWins + userLoses
	return (
		<div>
			<Ranks />
			<div className='bg-[#1a1a1a] mt-3 rounded-md p-5'>
				<div className='flex flex-col text-white gap-6'>
					<div>
						<h2 className='text-xl font-bold'>User info</h2>
						<div className='flex gap-2'>
							<DashboardCard title='Username' data={username} />
							<DashboardCard title='Level' data={userLevel} />
							<DashboardCard title='League' data='🚫' />
						</div>
					</div>
					<div>
						<h2 className='text-xl font-bold'>Game stats</h2>
						<div className='flex gap-2'>
							<DashboardCard title='Games played' data={totalUserGames} />
							<DashboardCard title='Win games' data={userWins} />
							<DashboardCard title='Lose games' data={userLoses} />
						</div>
					</div>
					<div>
						<h2 className='text-xl font-bold'>Promo & referrals</h2>
						<div className='flex gap-2'>
							<DashboardCard title='Promo' data='#vet7' />
							<DashboardCard title='Referrals' data='24' />
							<DashboardCard title='Earn from refs' data='127$' />
						</div>
					</div>

					<DashboardForm title='Create promocode' />

					<DashboardTransferForm />
					<div>
						<h2 className='text-xl font-bold'>Account information</h2>
						<DashboardCard title='Register data' data='21.04.2024' />
					</div>
				</div>
			</div>
		</div>
	)
}
