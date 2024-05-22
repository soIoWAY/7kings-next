'use client'
import { userStore } from '@/store/user'
import { updateUserInfo } from '@/utils/userUpdate'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { CiLock } from 'react-icons/ci'
import * as Yup from 'yup'
export default function WalletPage() {
	const inputStyle =
		'outline-none bg-transparent border-green-500 border rounded-md py-2 px-2 w-full'
	const userBalance = userStore((state: any) => state.balance)
	const navigate = useRouter()
	const DepositSchema = Yup.object().shape({
		cardNumber: Yup.string()
			.max(16, 'Too long!')
			.min(16, 'Too short!')
			.required(),
		exData: Yup.string().required(),
		cvv: Yup.string().required(),
		sum: Yup.number().required(),
	})

	const sendFormHandler = async (values: {
		cardNumber: string
		exData: string
		cvv: string
		sum: number
	}) => {
		if (values.sum > 1000) {
			alert('Max deposit sum is 1000')
		} else {
			const newBalance = userBalance + values.sum
			userStore.setState({ balance: newBalance })
			updateUserInfo(undefined, undefined, newBalance)
			navigate.push('/')
		}
	}
	return (
		<div className='bg-[#1a1a1a] w-full sm:4/6 md:w-3/6 lg:2/6 px-8 py-6 rounded-md m-auto mt-24 text-white flex flex-col gap-3'>
			<div>
				<h1 className=' font-bold text-xl tracking-wide'>Payment Method</h1>
				<p className=' text-sm mt-1'>
					Complete your purchase by providing your payment details
				</p>
			</div>
			<Formik
				initialValues={{ cardNumber: '', exData: '', cvv: '', sum: 0 }}
				validationSchema={DepositSchema}
				validateOnChange={true}
				validateOnBlur={false}
				onSubmit={sendFormHandler}
			>
				<Form className='w-full flex flex-col gap-3'>
					<div className='flex flex-col gap-1 w-full'>
						<label htmlFor='cardNumber' className='font-semibold'>
							Card number
						</label>
						<Field
							id='cardNumber'
							name='cardNumber'
							type='text'
							placeholder='0000 0000 0000 0000'
							maxLength={16}
							className={inputStyle}
						/>
						<ErrorMessage
							name='cardNumber'
							component='div'
							className='text-red-500 text-sm'
						/>
					</div>
					<div className='flex w-full gap-[4%]'>
						<div className='flex flex-col w-[48%] gap-1'>
							<label htmlFor='exData' className='font-semibold'>
								Expire data
							</label>
							<Field
								id='exData'
								name='exData'
								type='text'
								placeholder='MM/YY'
								className={inputStyle}
								maxLength={4}
							/>
							<ErrorMessage
								name='exData'
								component='div'
								className='text-red-500 text-sm'
							/>
						</div>
						<div className='flex flex-col w-[48%] gap-1'>
							<label htmlFor='cvv' className='font-semibold'>
								CVC/CVV
							</label>
							<Field
								id='cvv'
								name='cvv'
								type='text'
								placeholder='000'
								className={inputStyle}
								maxLength={3}
							/>
							<ErrorMessage
								name='cvv'
								component='div'
								className='text-red-500 text-sm'
							/>
						</div>
					</div>
					<div className='flex flex-col w-full gap-1'>
						<label htmlFor='sum' className='font-semibold'>
							Sum of deposit
						</label>
						<Field
							id='sum'
							name='sum'
							type='number'
							className={inputStyle}
							placeholder='100'
							maxLength={3}
						/>
						<ErrorMessage
							name='cardNumber'
							component='div'
							className='text-red-500 text-sm'
						/>
					</div>
					<div className='flex items-center gap-1'>
						<CiLock />
						<p className='text-xs text-bold text-gray-200'>
							Your transaction is secured with SSL encryption
						</p>
					</div>
					<input
						className='bg-green-500 w-full rounded-md font-semibold tracking-wide text-md py-1'
						type='submit'
						value='Confirm'
						disabled
					/>

					<button className='text-center text-sm text-gray-200' disabled>
						Have a promocode?
					</button>
				</Form>
			</Formik>
		</div>
	)
}
