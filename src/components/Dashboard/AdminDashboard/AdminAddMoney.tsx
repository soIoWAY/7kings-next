import { adminUserUpdate } from '@/utils/adminUserUpdate'
import { useState } from 'react'

const AdminAddMoney = () => {
	const [username, setUsername] = useState('')
	const [sum, setSum] = useState(0)

	const sendForm = async (e: React.FormEvent) => {
		e.preventDefault()
		adminUserUpdate(username, undefined, undefined, sum)
		setUsername('')
		setSum(0)
	}
	return (
		<form className='flex flex-col gap-2' onSubmit={sendForm}>
			<h2 className='font-bold text-xl'>Add & reset money</h2>
			<div className='flex gap-3 items-center flex-col sm:flex-row'>
				<input
					type='number'
					className='border-green-500 border bg-[#0d0d0d] rounded-md outline-none p-2 text-lg w-1/2 sm:w-1/12'
					placeholder='sum'
					onChange={e => setSum(parseInt(e.target.value))}
					value={sum}
					required
				/>
				<input
					type='text'
					className='border-green-500 border bg-[#0d0d0d] rounded-md outline-none p-2 text-lg w-full sm:w-2/12'
					placeholder='username'
					onChange={e => setUsername(e.target.value)}
					value={username}
					required
				/>
				<input
					type='submit'
					className='bg-green-800 border border-green-400 rounded-md p-2'
					value='Add'
				/>
			</div>
		</form>
	)
}

export default AdminAddMoney
