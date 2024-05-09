interface IDashboardForm {
	title: string
}

const DashboardForm = ({ title }: IDashboardForm) => {
	return (
		<div>
			<h2 className='font-bold text-xl'>{title}</h2>
			<div className='flex gap-3 items-center'>
				<input
					type='text'
					className='border-green-500 border bg-[#0d0d0d] rounded-md outline-none p-2 text-lg w-2/12'
				/>
				<button className='bg-green-800 border border-green-400 rounded-md p-2'>
					{title}
				</button>
			</div>
		</div>
	)
}

export default DashboardForm
