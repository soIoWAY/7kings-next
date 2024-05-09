const DashboardTransferForm = () => {
	return (
		<div className='flex flex-col gap-2'>
			<h2 className='font-bold text-xl'>Transfer money to player</h2>
			<div className='flex gap-3 items-center flex-col sm:flex-row'>
				<input
					type='text'
					className='border-green-500 border bg-[#0d0d0d] rounded-md outline-none p-2 text-lg w-1/2 sm:w-1/12'
					placeholder='sum'
				/>
				<input
					type='text'
					className='border-green-500 border bg-[#0d0d0d] rounded-md outline-none p-2 text-lg w-full sm:w-2/12'
					placeholder='username'
				/>
				<button className='bg-green-800 border border-green-400 rounded-md p-2'>
					Transfer
				</button>
			</div>
		</div>
	)
}

export default DashboardTransferForm
