import Card from './Card'

const Cards = () => {
	return (
		<div className='mt-5 flex flex-col gap-5 lg:gap-0 lg:flex-row justify-between'>
			<Card
				icon='/trophy.svg'
				h1Text='Participate'
				h2Text='In contests'
				description='and win cool prizes'
				h1Color='text-yellow-500'
				bg='bg-gradient-to-br from-yellow-600 to-zinc-900'
			/>
			<Card
				icon='/cash.svg'
				h1Text='Referral'
				h2Text='System'
				description='Invite your friends and earn extra income'
				h1Color='text-green-500'
				bg='bg-gradient-to-tl from-green-900 to-emerald-700'
			/>
			<Card
				icon='/support.svg'
				h1Text='Friendly'
				h2Text='support'
				description='Fast and friendly answer'
				h1Color='text-teal-400'
				bg='bg-gradient-to-br from-teal-600 to-cyan-900'
			/>
		</div>
	)
}

export default Cards
