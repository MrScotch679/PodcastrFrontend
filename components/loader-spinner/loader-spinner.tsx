import { Loader } from 'lucide-react'

export function LoaderSpinner() {
	return (
		<div className='flex items-center justify-center h-screen'>
			<Loader className='animate-spin text-orange-1' size={30} />
		</div>
	)
}
