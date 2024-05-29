import Link from 'next/link'

export default function HelpPage() {
	return (
		<div className='container mt-12 p-4 text-white'>
			<h1 className='text-white text-4xl font-bold tracking-wide text-center mb-8'>
				Help
			</h1>
			<nav className='flex flex-wrap justify-center space-x-4 mb-8 mt-6'>
				{['About', 'Games', 'Fruits', 'Coin', 'Levels', 'Support'].map(
					(section, index) => (
						<li key={index} className='list-none'>
							<Link
								href={`/help#${section.toLowerCase()}`}
								className='hover:text-green-400 transition-all'
							>
								{section}
							</Link>
						</li>
					)
				)}
			</nav>
			<div className='mx-auto space-y-12 w-3/4'>
				<section id='about'>
					<h2 className='text-3xl font-semibold mb-2'>1. What is our casino</h2>
					<p className='leading-relaxed'>
						Our crypto casino is an online platform where you can play various
						gambling games while earning{' '}
						<span className='text-green-400'>in-game currency</span>. In the
						future, this game currency can be withdrawn into{' '}
						<span className='text-green-400'>real cryptocurrency</span>.
					</p>
				</section>
				<section id='games'>
					<h2 className='text-3xl font-semibold mb-2'>2. Casino games</h2>
					<ul className='list-decimal pl-6 space-y-1'>
						<li>Select a game from the list of available games.</li>
						<li>Set the bet size.</li>
						<li>Click Play.</li>
						<li>
							If you win, your winnings will be automatically credited to your
							balance as in-game currency.
						</li>
					</ul>
				</section>
				<section id='fruits'>
					<h2 className='text-3xl font-semibold mb-2'>2.1 Fruits slot</h2>
					<p className='leading-relaxed'>
						The fruit slot has only{' '}
						<span className='text-green-400'>three lines</span>, which
						significantly increases the chance of winning. The slot has the
						following <span className='text-green-500'>combinations</span>:
					</p>
					<ul className='list-disc pl-6 space-y-1'>
						<li>💣💣💣 - x0</li>
						<li>🍒🍒🍒 - x10</li>
						<li>🍏🍏🍏 - x8</li>
						<li>🍋🍋🍋 - x7</li>
						<li>🍌🍌🍌 - x6</li>
						<li>🍇🍇🍇 - x5</li>
						<li>🍒🍒◽️ - x4</li>
						<li>🍏🍏◽️ - 3.5x</li>
						<li>🍋🍋◽️ - 3x</li>
						<li>🍌🍌◽️ - 2.5x</li>
						<li>🍇🍇◽️ - 2x</li>
						<li>🍒🍇🍌 - 1.5x</li>
						<li>💣◽️◽️ - 0x</li>
					</ul>
				</section>
				<section id='coin'>
					<h2 className='text-3xl font-semibold mb-2'>2.2 Toss a coin</h2>
					<p className='leading-relaxed'>
						Everything is extremely{' '}
						<span className='text-green-400'>simple</span>, eagle and you{' '}
						<span className='text-green-400'>won</span>, tail and you{' '}
						<span className='text-green-400'>lost</span>. In case of victory,
						the bet is multiplied by <span className='text-green-400'>2</span>.
					</p>
				</section>
				<section id='levels'>
					<h2 className='text-3xl font-semibold mb-2'>Level system</h2>
					<p className='leading-relaxed'>
						There are <span className='text-green-500'>ten levels</span> in
						total. At each of the levels, the user{' '}
						<span className='text-green-500'>receives</span> a bonus to his bet
						in the event of a win.
					</p>
					<ul className='list-disc pl-6 space-y-1 mt-2'>
						<li className='text-zinc-200'>Lvl 1 - 0%</li>
						<li className='text-green-500'>Lvl 2 - 3%</li>
						<li className='text-green-500'>Lvl 3 - 5%</li>
						<li className='text-yellow-500'>Lvl 4 - 7%</li>
						<li className='text-yellow-500'>Lvl 5 - 10%</li>
						<li className='text-yellow-500'>Lvl 6 - 15%</li>
						<li className='text-yellow-500'>Lvl 7 - 25%</li>
						<li className='text-orange-600'>Lvl 8 - 50%</li>
						<li className='text-orange-600'>Lvl 9 - 75%</li>
						<li className='text-red-600'>Lvl 10 - 100%</li>
					</ul>
				</section>
				<section id='support'>
					<h2 className='text-3xl font-semibold mb-2'>Support</h2>
					<p className='leading-relaxed'>
						If you have any questions or problems, please contact our support
						team. Write to us at{' '}
						<span className='text-green-400'>support@7kings.com</span>. Our
						support is <span className='text-green-400'>available 24/7 </span>
						and ready to help you at any time.
					</p>
				</section>
			</div>
		</div>
	)
}
