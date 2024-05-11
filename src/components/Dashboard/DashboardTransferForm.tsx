import { userStore } from '@/store/user'
import { useState } from 'react'

const DashboardTransferForm = () => {
	const [transferUsername, setTransferUsername] = useState('')
	const [transferSum, setTransferSum] = useState(0)

	const userBalance = userStore((state: any) => state.balance)

	const sendForm = async (e: React.FormEvent) => {
		e.preventDefault()
		if (userBalance - transferSum > 0) {
			userStore.setState({ balance: userBalance - transferSum })
			try {
				await fetch('api/user/transfer', {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
					body: JSON.stringify({ transferUsername, transferSum }),
				})
			} catch (error) {
				console.error(error)
			}
		} else {
			alert('Not enough money for the operation')
		}
		setTransferUsername('')
		setTransferSum(0)
	}
	return (
		<form className='flex flex-col gap-2' onSubmit={sendForm}>
			<h2 className='font-bold text-xl'>Transfer money to player</h2>
			<div className='flex gap-3 items-center flex-col sm:flex-row'>
				<input
					type='number'
					max={999}
					min={1}
					className='border-green-500 border bg-[#0d0d0d] rounded-md outline-none p-2 text-lg w-1/2 sm:w-1/12'
					placeholder='sum'
					onChange={e => setTransferSum(parseInt(e.target.value))}
					value={transferSum}
					required
				/>
				<input
					type='text'
					className='border-green-500 border bg-[#0d0d0d] rounded-md outline-none p-2 text-lg w-full sm:w-2/12'
					placeholder='username'
					onChange={e => setTransferUsername(e.target.value)}
					value={transferUsername}
					required
				/>
				<input
					type='submit'
					className='bg-green-800 border border-green-400 rounded-md p-2'
					value='Transfer'
				/>
			</div>
		</form>
	)
}

export default DashboardTransferForm
