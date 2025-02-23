import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
	return (
		<div className='flex-center glassmorphism-auth h-screen w-full'>
			<SignUp path='/sign-up' routing='path' />
		</div>
	)
}
