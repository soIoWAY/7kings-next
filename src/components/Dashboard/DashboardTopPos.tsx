import { formattedBalanceToK } from '@/utils/formattedBalanceToK'

interface IDashboardTopPos {
	position: number
	username: string
	balance: number
}

const DashboardTopPos = ({ position, balance, username }: IDashboardTopPos) => {
	return (
		<div className='flex justify-between'>
			<div className='flex gap-1 text-white'>
				<span>{position}.</span>
				<span>{username}</span>
			</div>
			<div className='text-green-500'>
				<span>{formattedBalanceToK(balance)}$</span>
			</div>
		</div>
	)
}

export default DashboardTopPos
