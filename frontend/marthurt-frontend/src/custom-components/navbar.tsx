'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/store/useCartStore'
import { CartButton } from './CartButton'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import Cookies from 'js-cookie'
import { decodeToken, hasRole } from '@/utils/auth'
export default function Navbar() {
	const { totalItems } = useCartStore()
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [isNavOpen, setIsNavOpen] = useState(false)
	const [isEmployee, setIsEmployee] = useState(false)

	useEffect(() => {
		const token = Cookies.get('token')
		const decodedToken = decodeToken(token)
		if (hasRole(decodedToken, 'ROLE_ADMIN')) {
			setIsEmployee(true)
		}
	}, [])

	const toggleCart = () => {
		setIsCartOpen(prev => !prev)
	}

	const toggleNav = () => {
		setIsNavOpen(prev => !prev)
	}

	useEffect(() => {
		const link = document.createElement('link')
		link.href =
			'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
		link.rel = 'stylesheet'
		document.head.appendChild(link)

		return () => {
			document.head.removeChild(link)
		}
	}, [])

	return (
		<>
			<header className='flex h-20 items-center justify-between px-4 flex-wrap lg:flex-nowrap'>
				<div className='flex flex-grow items-center lg:flex-grow-0'>
					<Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
						<SheetTrigger asChild>
							<Button variant='outline' size='icon' className='lg:hidden' onClick={toggleNav}>
								<MenuIcon className='h-6 w-6' />
								<span className='sr-only'>Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='left'>
							<SheetHeader>
								<SheetTitle>Menu</SheetTitle>
							</SheetHeader>
							<div className='grid gap-2 py-6'>
								<Link href='/' className='flex w-full items-center py-2 text-lg font-semibold' prefetch={false}>
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

					<div className='relative flex-grow lg:flex-grow-0 lg:w-auto'>
						<SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
						<Input
							type='search'
							placeholder='Szukaj...'
							className='w-full lg:w-auto rounded-lg bg-background pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary'
						/>
					</div>
				</div>

				<nav className='hidden lg:flex lg:items-center lg:gap-6'>
					<Link
						href='#'
						className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50'>
						Strona Główna
					</Link>
					<Link
						href='#'
						className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50'>
						O nas
					</Link>
					<Link
						href='#'
						className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50'>
						Kontakt
					</Link>
				</nav>

				<div className='flex w-full justify-between lg:ml-auto lg:w-auto lg:flex-row lg:justify-end'>
					{isEmployee && <CartButton toggleCart={toggleCart} />}
					<Link href='/register'>
						<Button variant='outline' className='px-4 py-2 rounded-md hover:bg-black hover:text-white'>
							Zaloguj się
						</Button>
					</Link>
				</div>
			</header>

			<hr className='border-gray-300' />

			<Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
				<SheetContent side='right'>
					<SheetHeader>
						<SheetTitle>Koszyk</SheetTitle>
					</SheetHeader>
					<div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
						<div className='flow-root'>
							<ul role='list' className='-my-6 divide-y divide-gray-200'>
								<li className='flex py-6'>
									<div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
										<img
											src='https://via.placeholder.com/150'
											alt='Product Image'
											className='h-full w-full object-cover object-center'
										/>
									</div>
									<div className='ml-4 flex flex-1 flex-col'>
										<div>
											<div className='flex justify-between text-base font-medium text-gray-900'>
												<h3>
													<a href='#'>Product Name</a>
												</h3>
												<p className='ml-4'>$50.00</p>
											</div>
											<p className='mt-1 text-sm text-gray-500'>Product Color</p>
										</div>
										<div className='flex flex-1 items-end justify-between text-sm'>
											<p className='text-gray-500'>Qty 1</p>
											<div className='flex'>
												<button type='button' className='font-medium text-red-600 hover:text-red-500'>
													usuń
												</button>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
						<div className='flex justify-between text-base font-medium text-gray-900'>
							<p>Wartość łączna</p>
							<p>50.00 zł</p>
						</div>
						<div className='mt-6'>
							<Link href={'/cart'}>
								<Button
									variant='default'
									className='w-full py-3 text-base font-medium text-white'
									onClick={() => setIsCartOpen(false)}>
									przejdź do koszyka
								</Button>
							</Link>
						</div>
						<div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
							<p>
								<button
									type='button'
									className='font-medium text-black-600 hover:text-black-500'
									onClick={() => setIsCartOpen(false)}>
									Kontynuuj Zakupy
									<span aria-hidden='true'> &rarr;</span>
								</button>
							</p>
						</div>
					</div>
				</SheetContent>
			</Sheet>
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

function SearchIcon(props: any) {
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
