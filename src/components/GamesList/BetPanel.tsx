import { userStore } from '@/store/user'
import { useState } from 'react'
//@ts-ignore
import useSound from 'use-sound'

interface BetPanel {
	updateHandler: () => void
	disabledBetButton: boolean
	setUserBet: (value: number) => void
	userBet: number
}

const BetPanel = ({
	updateHandler,
	disabledBetButton,
	setUserBet,
	userBet,
}: BetPanel) => {
	const userWins = userStore((state: any) => state.wins)
	const userLoses = userStore((state: any) => state.loses)
	const [userProfit, setUserProfit] = useState<number>(userBet * 2)
	const betChooseButtons =
		'text-white py-2 w-1/2 hover:bg-zinc-700 transition-all'
	const [isManual, setIsManual] = useState(true)
	const [butClick] = useSound('/butClick.mp3', { volume: 0.55 })
	const betPanelStartManualHandler = () => {
		butClick()
		updateHandler()
	}
	return (
		<div className='w-full md:w-3/12 sm:border-r border-[#565656] p-2 md:p-5'>
			<div className='flex justify-between mb-2 text-white border-b border-zinc-600'>
				<span>
					<span className='text-green-500'>Wins:</span> {userWins}
				</span>
				<span>
					<span className='text-red-500'>Loses:</span> {userLoses}
				</span>
			</div>
			<div>
				<button
					className={`${betChooseButtons} rounded-l-md ${
						isManual ? 'bg-zinc-700' : 'bg-zinc-600'
					}`}
				>
					Manual
				</button>
				<button
					className={`${betChooseButtons} rounded-r-md ${
						!isManual ? 'bg-zinc-700' : 'bg-zinc-600'
					}`}
				>
					Auto
				</button>
			</div>
			<div>
				<button
					className='bg-green-400 w-full text-black mt-4 rounded-md py-2 font-bold hover:bg-green-500 transition-all text-center cursor-pointer'
					onClick={betPanelStartManualHandler}
					disabled={disabledBetButton}
				>
					BET
				</button>
				<div className='mt-3'>
					<label className='text-sm font-semibold'>Bet Amount</label>
					<input
						type='number'
						className='rounded-t-md border-[#565656] border-t border-r border-l outline-none mt-1 bg-zinc-800 py-1 px-2 w-full caret-transparent text-white font-semibold text-lg'
						value={userBet}
						onChange={e => {
							const roundedValue = Math.round(parseInt(e.target.value))
							roundedValue > 900 || roundedValue <= 0
								? setUserBet(0)
								: setUserBet(parseInt(e.target.value))
						}}
						min={1}
						max={100}
					/>
					<div className='mb-1'>
						<button
							className={`${betChooseButtons} rounded-bl-md border-r border-r-[#1a1a1a] bg-zinc-600`}
							onClick={() => setUserBet(userBet / 2)}
						>
							1/2
						</button>
						<button
							className={`${betChooseButtons}  rounded-br-md bg-zinc-600`}
							onClick={() => setUserBet(userBet * 2)}
						>
							x2
						</button>
					</div>
					<label className='text-sm font-semibold'>Profit On Win</label>
					<input
						type='text'
						className='rounded border border-[#565656] outline-none mt-1 bg-zinc-800 py-1 px-2 w-full caret-transparent text-white font-semibold text-lg'
						defaultValue={userProfit}
					/>
				</div>
			</div>
		</div>
	)
}

export default BetPanel
