'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { useCartStore } from '@/store/useCartStore'
import { CartButton } from './CartButton'
import { CartSheet } from './cartSlide'
import Cookies from 'js-cookie'
import { decodeToken, hasRole } from '@/utils/auth'
import api from '@/services/api'
import Image from 'next/image'

export default function Navbar() {
	const { totalItems } = useCartStore()
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [isNavOpen, setIsNavOpen] = useState(false)
	const [isEmployee, setIsEmployee] = useState(false)
	const [cart, setCart] = useState<Product[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const shoppingCartId = 1

	interface Product {
		productId: string
		productName: string
		clientBuyPriceBrutto: string
		quantity: number
		imageUrl: string
		availability: string
	}

	useEffect(() => {
		const token = Cookies.get('token')
		const decodedToken = decodeToken(token)
		if (hasRole(decodedToken, 'ROLE_ADMIN')) {
			setIsEmployee(true)
		}
	}, [])

	useEffect(() => {
		const fetchCartProducts = async () => {
			try {
				setIsLoading(true)
				const response = await api.get<{ products: Product[] }>(
					`http://localhost:8080/shopping-cart/${shoppingCartId}/products`
				)
				setCart(response.data.products)
			} catch (err) {
				console.error('Failed to fetch shopping cart:', err)
				setError('Failed to fetch shopping cart')
			} finally {
				setIsLoading(false)
			}
		}

		fetchCartProducts()
	}, [])

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

	const toggleCart = () => {
		setIsCartOpen(prev => !prev)
	}

	const toggleNav = () => {
		setIsNavOpen(prev => !prev)
	}

	const calculateSubtotal = () => {
		return cart.reduce((total, product) => {
			const productPrice = parseFloat(product.clientBuyPriceBrutto) || 0
			return total + productPrice * product.quantity
		}, 0)
	}

	return (
		<>
			<header className='flex h-20 items-center justify-between px-4 flex-wrap lg:flex-nowrap'>
				<div className='flex flex-grow items-center lg:flex-grow-0'>
					<Button variant='outline' size='icon' className='lg:hidden' onClick={toggleNav}>
						<MenuIcon className='h-6 w-6' />
						<span className='sr-only'>Toggle navigation menu</span>
					</Button>

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

			<CartSheet
				isOpen={isCartOpen}
				onClose={() => setIsCartOpen(false)}
				products={cart}
				totalAmount={calculateSubtotal()}
				isLoading={isLoading}
				error={error}
			/>
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
