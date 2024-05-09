interface IDashboardCard {
	title: string
	data: string
}

const DashboardCard = ({ title, data }: IDashboardCard) => {
	return (
		<div className='bg-[#0d0d0d] rounded-md max-w-fit py-2 px-4 flex flex-col'>
			<span className='text-sm'>{title}</span>
			<span className='text-xl font-bold'>{data}</span>
		</div>
	)
}

export default DashboardCard
