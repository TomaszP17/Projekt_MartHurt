import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Input } from '@/components/ui/input'

export default function Navbar() {
	return (
		<>
			<header className='flex h-20 w-full shrink-0 items-center px-4 md:px-6'>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant='outline' size='icon' className='lg:hidden'>
							<MenuIcon className='h-6 w-6' />
							<span className='sr-only'>Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side='left'>
						<div className='grid gap-2 py-6'>
							<Link href='#' className='flex w-full items-center py-2 text-lg font-semibold' prefetch={false}>
								Strona Główna
							</Link>
							<Link href='#' className='flex w-full items-center py-2 text-lg font-semibold' prefetch={false}>
								O nas
							</Link>
							<Link href='#' className='flex w-full items-center py-2 text-lg font-semibold' prefetch={false}>
								Kontakt
							</Link>
						</div>
					</SheetContent>
				</Sheet>
				<Link href='/' className='mr-6 hidden lg:flex' prefetch={false}>
					<h1 className='text-2xl font-bold text-gray-900'>MART-HURT</h1>
				</Link>
				<nav className='hidden lg:flex lg:items-center lg:gap-6'>
					<Link
						href='#'
						className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'
						prefetch={false}>
						Strona Główna
					</Link>
					<Link
						href='#'
						className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'
						prefetch={false}>
						O nas
					</Link>
					<Link
						href='#'
						className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'
						prefetch={false}>
						Kontakt
					</Link>
				</nav>
				<div className='flex items-center gap-2 ml-auto'>
					<div className='relative'>
						<SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							type='search'
							placeholder='Search...'
							className='w-full rounded-lg bg-background pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary'
						/>
					</div>
					<Button variant='ghost' size='icon' className='rounded-full hover:bg-muted/50 transition-colors'>
						<ShoppingCartIcon className='h-6 w-6' />
						<span className='sr-only'>Shopping Cart</span>
					</Button>
					<Button variant={`outline`} className='px-4 py-2 rounded-md hover:bg-black hover:text-white'>
						Zaloguj się
					</Button>
				</div>
			</header>
			<hr className='border-gray-300' />
		</>
	)
}

function MenuIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<line x1='4' x2='20' y1='12' y2='12' />
			<line x1='4' x2='20' y1='6' y2='6' />
			<line x1='4' x2='20' y1='18' y2='18' />
		</svg>
	)
}

function ShoppingCartIcon(props) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<circle cx='8' cy='21' r='1' />
			<circle cx='19' cy='21' r='1' />
			<path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12' />
		</svg>
	)
}

function SearchIcon(props) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<circle cx='11' cy='11' r='8' />
			<path d='m21 21-4.3-4.3' />
		</svg>
	)
}
