import { useState } from 'react'

const AdminSearchUser = () => {
	const [username, setUsername] = useState('')
	const [userUsername, setUserUsername] = useState('')
	const [userStatus, setUserStatus] = useState('')
	const [userRole, setUserRole] = useState('')
	const [userLevel, setUserLevel] = useState('')
	const [userWins, setUserWins] = useState('')
	const [userLoses, setUserLoses] = useState('')
	const [userPromocode, setUserPromocode] = useState('')
	const [userEnteredPromocode, setUserEnteredPromocode] = useState('')
	const [userBalance, setUserBalance] = useState('')
	const totalUserGames = userWins + userLoses
	const winPercent = (parseInt(userWins) / parseInt(totalUserGames)) * 100
	const formattedWinPercent = winPercent.toFixed(2)
	const sendFormHandler = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const response = await fetch(
				`/api/admin/searchByUsername?username=${encodeURIComponent(username)}`
			)
			const data = await response.json()
			setUserUsername(data.username)
			setUserStatus(data.status)
			setUserRole(data.role)
			setUserLevel(data.level)
			setUserWins(data.wins)
			setUserLoses(data.loses)
			setUserPromocode(data.promocode)
			setUserEnteredPromocode(data.enteredPromocode)
			setUserBalance(data.balance)
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<div>
			<form className='flex flex-col gap-2' onSubmit={sendFormHandler}>
				<h2 className='font-bold text-xl'>Search user by username</h2>
				<div className='flex gap-3 items-start sm:items-center flex-col sm:flex-row'>
					<input
						type='text'
						className='border-green-500 border bg-[#0d0d0d] rounded-md outline-none p-2 text-lg w-full sm:w-2/12'
						placeholder='username'
						onChange={e => setUsername(e.target.value)}
						value={username}
					/>
					<input
						type='submit'
						className='bg-green-800 border border-green-400 rounded-md p-2'
						value='Search'
					/>
				</div>
			</form>
			{userUsername ? (
				<div className='mt-2 flex flex-col'>
					<span>Username: {userUsername}</span>
					<span>Role: {userRole}</span>
					<span>Status: {userStatus}</span>
					<span>Level: {userLevel}</span>
					<span>
						Balance: <span className='text-green-500'>{userBalance}$</span>
					</span>
					<span>Total games: {parseInt(userWins) + parseInt(userLoses)}</span>
					<span>
						Wins: <span className='text-green-500'>{userWins}</span>
					</span>
					<span>
						Loses: <span className='text-red-500'>{userLoses}</span>
					</span>
					<span>
						Win percent:{' '}
						<span className='text-green-500'>{formattedWinPercent}%</span>
					</span>
					<span>Promocode: {userPromocode}</span>
					<span>Entered promocode: {userEnteredPromocode}</span>
				</div>
			) : (
				''
			)}
		</div>
	)
}

export default AdminSearchUser
