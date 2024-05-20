interface IDashboardCard {
	title: string
	data: string
	textColor: string
}

const DashboardCard = ({ title, data, textColor }: IDashboardCard) => {
	const dataStyles = `text-xl font-bold ${textColor}`
	return (
		<div className='bg-[#0d0d0d] rounded-md max-w-fit py-2 px-4 flex flex-col'>
			<span className='text-sm'>{title}</span>
			<span className={dataStyles}>{data}</span>
		</div>
	)
}

export default DashboardCard
