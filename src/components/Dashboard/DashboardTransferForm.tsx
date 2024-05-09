const DashboardTransferForm = () => {
	return (
		<div>
			<h2 className='font-bold text-xl'>Transfer money to player</h2>
			<div className='flex gap-3 items-center'>
				<input
					type='text'
					className='border-green-500 border bg-[#0d0d0d] rounded-md outline-none p-2 text-lg w-1/12'
					placeholder='sum'
				/>
				<input
					type='text'
					className='border-green-500 border bg-[#0d0d0d] rounded-md outline-none p-2 text-lg w-2/12'
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
