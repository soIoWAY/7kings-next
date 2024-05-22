'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import * as Yup from 'yup'

const SignUpSchema = Yup.object().shape({
	username: Yup.string().min(3, 'Too Short!').max(18, 'Too Long!').required(),
	password: Yup.string().min(6, 'Too Short!').required(),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password'), undefined], 'Password must match')
		.required(),
})

export default function RegisterPage() {
	const [errorMessage, setErrorMessage] = useState('')
	const navigation = useRouter()
	const submitHandler = async (values: {
		username: string
		password: string
		enteredPromocode: string
	}) => {
		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			})
			if (response.ok) {
				navigation.push('/auth/login')
			} else {
				const errorMsg = await response.json()
				setErrorMessage(errorMsg.msg)
			}
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<div className='flex h-screen flex-col items-center justify-center'>
			<h1 className='text-white text-5xl font-bold tracking-wider mb-9'>
				REGISTER
			</h1>
			<Formik
				initialValues={{ username: '', password: '', enteredPromocode: '' }}
				validationSchema={SignUpSchema}
				validateOnChange={true}
				validateOnBlur={false}
				onSubmit={submitHandler}
			>
				<Form className='flex flex-col gap-4 w-7/12 sm:w-5/12 md:w-4/12 lg:w-3/12 text-white'>
					<div className='flex flex-col'>
						<label htmlFor='username' className='text-gray-300 text-sm'>
							Username
						</label>
						<Field
							id='username'
							name='username'
							type='text'
							className='bg-transparent border border-green-400 outline-none py-2 px-2'
							placeholder='Username'
						/>
						<ErrorMessage
							name='username'
							component='div'
							className='text-red-500 text-sm'
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<label htmlFor='password' className='text-gray-300 text-sm'>
							Password
						</label>
						<Field
							id='password'
							name='password'
							type='password'
							className='bg-transparent border border-green-400 outline-none py-2 px-2'
							placeholder='Password'
						/>
						<ErrorMessage
							name='password'
							component='div'
							className='text-red-500 text-sm'
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<label htmlFor='confirmPassword' className='text-gray-300 text-sm'>
							Confirm Password
						</label>
						<Field
							id='confirmPassword'
							name='confirmPassword'
							type='password'
							className='bg-transparent border border-green-400 outline-none py-2 px-2'
							placeholder='Confirm Password'
						/>
						<ErrorMessage
							name='confirmPassword'
							component='div'
							className='text-red-500 text-sm'
						/>
					</div>
					<div className='flex flex-col gap-1'>
						<label htmlFor='confirmPassword' className='text-gray-300 text-sm'>
							Promocode (not necessarily)
						</label>
						<Field
							id='enteredPromocode'
							name='enteredPromocode'
							type='text'
							className='bg-transparent border border-green-400 outline-none py-2 px-2'
							placeholder='Promocode'
						/>
						<ErrorMessage
							name='confirmPassword'
							component='div'
							className='text-red-500 text-sm'
						/>
					</div>
					{errorMessage ? (
						<span className='text-center text-red-500'>{errorMessage}</span>
					) : null}
					<button
						type='submit'
						className='bg-green-400 py-2 rounded-sm text-[#0d0d0d] font-semibold'
					>
						REGISTER
					</button>
					<span className='text-center text-gray-300'>
						Already have an account?{' '}
						<Link
							href='/auth/login'
							className='text-green-400 font-bold tracking-tight'
						>
							LOGIN
						</Link>
					</span>
				</Form>
			</Formik>
		</div>
	)
}
