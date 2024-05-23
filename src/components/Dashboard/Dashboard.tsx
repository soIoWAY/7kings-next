import { userStore } from '@/store/user'
import { useRouter } from 'next/navigation'
import Ranks from '../Main/Ranks'
import DashboardCard from './DashboardCard'
import DashboardForm from './DashboardForm'
import DashboardTop from './DashboardTop'
import DashboardTransferForm from './DashboardTransferForm'

const Dashboard = () => {
	const username = userStore((state: any) => state.username)
	const userLevel = userStore((state: any) => state.level)
	const userWins = userStore((state: any) => state.wins)
	const userLoses = userStore((state: any) => state.loses)
	const userBalance = userStore((state: any) => state.balance)
	const referrals = userStore((state: any) => state.promocodeUsers)
	const totalUserGames = userWins + userLoses
	const winPercent = (userWins / totalUserGames) * 100
	const formattedWinPercent = winPercent.toFixed(2)
	const promocode = userStore((state: any) => state.promocode)
	const router = useRouter()

	const logoutHandler = async () => {
		try {
			const res = await fetch('/api/auth/logout', {
				method: 'POST',
			})
			if (res.ok) {
				router.push('/')
				window.location.reload()
			}
		} catch (error) {
			console.error('Error during logout', error)
		}
	}
	return (
		<div>
			<Ranks />
			<div className='bg-[#1a1a1a] mt-3 rounded-md p-5 flex justify-between sm:flex-row flex-col gap-3 sm:gap-0 '>
				<div className='flex flex-col text-white gap-6'>
					<div className='flex flex-col gap-1'>
						<h2 className='text-xl font-bold'>User info</h2>
						<div className='flex gap-2'>
							<DashboardCard
								title='Username'
								data={username}
								textColor='text-white'
							/>
							<DashboardCard
								title='Level'
								data={userLevel}
								textColor='text-white'
							/>
							<DashboardCard title='League' data='🚫' textColor='text-white' />
						</div>
					</div>
					<div className='flex flex-col gap-1'>
						<h2 className='text-xl font-bold'>Game stats</h2>
						<div className='flex flex-col sm:flex-row gap-2'>
							<div className='flex gap-2'>
								<DashboardCard
									title='Games played'
									data={totalUserGames}
									textColor='text-white'
								/>
								<DashboardCard
									title='Win games'
									data={userWins}
									textColor='text-green-500'
								/>
								<DashboardCard
									title='Lose games'
									data={userLoses}
									textColor='text-red-500'
								/>
							</div>
							<div className='flex gap-2'>
								<DashboardCard
									title='Win %'
									data={String(formattedWinPercent)}
									textColor={
										winPercent >= 50 ? 'text-green-500' : 'text-red-500'
									}
								/>
								<DashboardCard
									title='Detailed balance'
									data={`${userBalance.toFixed(2)}$`}
									textColor='text-green-500'
								/>
							</div>
						</div>
					</div>
					<div>
						{promocode ? (
							<div className='flex flex-col gap-1'>
								<h2 className='text-xl font-bold'>Promo & referrals</h2>
								<div className='flex gap-2'>
									<DashboardCard
										title='Promo'
										data={`#${promocode}`}
										textColor='text-white'
									/>
									<DashboardCard
										title='Referrals'
										data={referrals}
										textColor='text-white'
									/>
									<DashboardCard
										title='Earn from refs'
										data='127$'
										textColor='text-green-500'
									/>
								</div>
							</div>
						) : (
							<DashboardForm title='Create promocode' userLevel={userLevel} />
						)}
					</div>

					<DashboardTransferForm />
					<div className='flex flex-col gap-1'>
						<h2 className='text-xl font-bold'>Account information</h2>
						<DashboardCard
							title='Register data'
							data='21.04.2024'
							textColor='text-white'
						/>
					</div>
				</div>
				<DashboardTop />
				{/* <div>
					<button className='text-3xl text-green-500' onClick={logoutHandler}>
						<IoLogOut />
					</button>
				</div> */}
			</div>
		</div>
	)
}

export default Dashboard
