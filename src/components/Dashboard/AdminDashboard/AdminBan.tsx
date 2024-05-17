import { adminUserUpdate } from '@/utils/adminUserUpdate'
import { useState } from 'react'

const AdminBan = () => {
	const [username, setUsername] = useState('')
	const [banValue, setBanValue] = useState('')

	const sendForm = async (e: React.FormEvent) => {
		e.preventDefault()
		adminUserUpdate(username, undefined, undefined, undefined, banValue)
		setUsername('')
		setBanValue('')
	}
	return (
		<form className='flex flex-col gap-2' onSubmit={sendForm}>
			<h2 className='font-bold text-xl'>Ban/Unban</h2>
			<div className='flex gap-3 items-center flex-col sm:flex-row'>
				<input
					type='text'
					className='border-red-500 border bg-[#0d0d0d] rounded-md outline-none p-2 text-lg w-full sm:w-2/12'
					placeholder='username'
					onChange={e => setUsername(e.target.value)}
					value={username}
					required
				/>
				<input
					type='text'
					className='border-red-500 border bg-[#0d0d0d] rounded-md outline-none p-2 text-lg w-full sm:w-2/12'
					placeholder='ban/unban'
					onChange={e => setBanValue(e.target.value)}
					value={banValue}
					required
				/>
				<input
					type='submit'
					className='bg-red-500 border border-red-400 rounded-md p-2'
					value='Ban/Unban'
				/>
			</div>
		</form>
	)
}

export default AdminBan
