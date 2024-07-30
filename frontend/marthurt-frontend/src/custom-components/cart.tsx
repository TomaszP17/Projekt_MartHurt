'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import api from '@/services/api'
import Image from 'next/image'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Product {
	productId: string
	productName: string
	clientBuyPriceBrutto: string
	quantity: number
	imageUrl: string
	availability: string
}

interface ShoppingCartProductDTO {
	shoppingCartId: number
	createDate: string
	employeeMyUserId: number
	products: Product[]
}

const Cart: React.FC = () => {
	const [cart, setCart] = useState<ShoppingCartProductDTO | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const shoppingCartId = 1 // Example shopping cart ID, change this based on your logic

	useEffect(() => {
		const fetchCartProducts = async () => {
			try {
				setLoading(true)
				const response = await api.get<ShoppingCartProductDTO>(
					`http://localhost:8080/shopping-cart/${shoppingCartId}/products`
				)
				setCart(response.data)
			} catch (err) {
				console.error('Failed to fetch shopping cart:', err)
				setError('Failed to fetch shopping cart')
			} finally {
				setLoading(false)
			}
		}

		fetchCartProducts()
	}, [shoppingCartId])

	if (loading) {
		return <p>Loading...</p>
	}

	if (error) {
		return <p>{error}</p>
	}

	if (!cart || cart.products.length === 0) {
		return <p>Your cart is empty</p>
	}

	const handleQuantityChange = (productId: string, quantity: number) => {
		setCart(prevCart => {
			if (!prevCart) return prevCart
			const updatedProducts = prevCart.products.map(product =>
				product.productId === productId ? { ...product, quantity } : product
			)
			return { ...prevCart, products: updatedProducts }
		})
	}

	const calculateSubtotal = () => {
		return cart.products.reduce((total, product) => {
			const productPrice = parseFloat(product.clientBuyPriceBrutto) || 0
			return total + productPrice * product.quantity
		}, 0)
	}

	return (
		<div className='bg-white'>
			<div className='max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
				<h1 className='text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl'>Shopping Cart</h1>
				<form className='mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16'>
					<section aria-labelledby='cart-heading' className='lg:col-span-7'>
						<h2 id='cart-heading' className='sr-only'>
							Items in your shopping cart
						</h2>

						<ul role='list' className='border-t border-b border-gray-200 divide-y divide-gray-200'>
							{cart.products.map((product, productIdx) => (
								<li key={product.productId} className='flex py-6 sm:py-10'>
									<div className='flex-shrink-0'>
										<Image
											src={product.imageUrl}
											alt={product.productName}
											width={50}
											height={50}
											className='rounded-md object-center object-cover'
											layout='responsive'
											sizes='(max-width: 768px) 24vw, (max-width: 1200px) 48vw, 20vw'
											quality={85}
											priority
										/>
									</div>

									<div className='ml-4 flex-1 flex flex-col justify-between sm:ml-6'>
										<div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
											<div>
												<div className='flex justify-between'>
													<h3 className='text-sm'>
														<a href='#' className='font-medium text-gray-700 hover:text-gray-800'>
															{product.productName}
														</a>
													</h3>
												</div>
												<div className='mt-1 flex items-center'>
													<label htmlFor={`quantity-${productIdx}`} className='text-gray-500 mr-2'>
														Ilość:<span className='ml-2 text-gray-700'>{product.quantity}</span>
													</label>
													<select
														id={`quantity-${productIdx}`}
														name={`quantity-${productIdx}`}
														value={product.quantity}
														onChange={e => handleQuantityChange(product.productId, parseInt(e.target.value))}
														className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'>
														{Array.from({ length: 10 }, (_, i) => (
															<option key={i + 1} value={i + 1}>
																{i + 1}
															</option>
														))}
													</select>
												</div>
												<p className='mt-1 text-sm font-medium text-gray-900'>{product.clientBuyPriceBrutto} zł</p>
											</div>
										</div>

										<p className='mt-4 flex text-sm text-gray-700 space-x-2'>
											{product.availability === 'In stock' ? (
												<CheckIcon className='flex-shrink-0 h-5 w-5 text-green-500' aria-hidden='true' />
											) : (
												<ClockIcon className='flex-shrink-0 h-5 w-5 text-gray-300' aria-hidden='true' />
											)}
											<span>{product.availability}</span>
										</p>
									</div>
								</li>
							))}
						</ul>
					</section>

					{/* Order summary */}
					<section
						aria-labelledby='summary-heading'
						className='mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5'>
						<h2 id='summary-heading' className='text-lg font-medium text-gray-900'>
							Order Summary
						</h2>

						<dl className='mt-6 space-y-4'>
							<div className='flex items-center justify-between'>
								<dt className='text-sm text-gray-600'>Subtotal</dt>
								<dd className='text-sm font-medium text-gray-900'>{calculateSubtotal().toFixed(2)} zł</dd>
							</div>
							<div className='border-t border-gray-200 pt-4 flex items-center justify-between'>
								<dt className='text-base font-medium text-gray-900'>Order total</dt>
								<dd className='text-base font-medium text-gray-900'>{calculateSubtotal().toFixed(2)} zł</dd>
							</div>
						</dl>

						<div className='mt-6'>
							<button
								type='submit'
								className='w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500'>
								Przejdź do wyceny
							</button>
						</div>
					</section>
				</form>
			</div>
		</div>
	)
}

export default Cart
