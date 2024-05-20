import { userStore } from '@/store/user'
import { updateUserInfo } from '@/utils/userUpdate'
import { useState } from 'react'

interface IDashboardForm {
	title: string
	userLevel: string
}

const DashboardForm = ({ title, userLevel }: IDashboardForm) => {
	const [promocode, setPromocode] = useState('')
	const userLevelToNumber = parseInt(userLevel)
	const sendFormHandler = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			updateUserInfo(undefined, undefined, undefined, undefined, promocode)
			userStore.setState({ promocode: promocode })
		} catch (error) {
			console.error(error)
		}
		setPromocode('')
	}
	const buttonStyles = 'border rounded-md p-2 bg-green-800 border-green-400'
	const disabledButtonStyles = 'border rounded-md p-2 bg-red-500 border-red-400'
	return (
		<div className='flex flex-col gap-2'>
			<h2 className='font-bold text-xl'>
				{`${title}`} (
				<span className='underline'>
					min lvl <span className='text-green-500'>3</span>
				</span>
				)
			</h2>
			<form
				className='flex gap-3 items-center flex-col sm:flex-row'
				onSubmit={sendFormHandler}
			>
				<input
					type='text'
					className='border-green-500 border bg-[#0d0d0d] rounded-md outline-none p-1 sm:p-2 text-lg w-full sm:w-2/12'
					maxLength={12}
					value={promocode}
					onChange={e => setPromocode(e.target.value)}
				/>
				<input
					type='submit'
					className={
						userLevelToNumber >= 3 ? buttonStyles : disabledButtonStyles
					}
					value={title}
					disabled={userLevelToNumber >= 3 ? false : true}
				/>
			</form>
		</div>
	)
}

export default DashboardForm
