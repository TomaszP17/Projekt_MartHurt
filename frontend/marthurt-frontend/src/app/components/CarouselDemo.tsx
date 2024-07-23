'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { LightingNews } from '../types'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

export function CarouselDemo() {
	const [products, setProducts] = useState<LightingNews[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.get('http://localhost:8080/lightings/news')
				setProducts(response.data)
			} catch (err) {
				setError('Failed to fetch products')
			} finally {
				setLoading(false)
			}
		}

		fetchProducts()
	}, [])

	if (loading) {
		return <p>Loading...</p>
	}

	if (error) {
		return <p>{error}</p>
	}
	const productsPerPage = 3
	const groupedProducts = []
	for (let i = 0; i < products.length; i += productsPerPage) {
		groupedProducts.push(products.slice(i, i + productsPerPage))
	}

	return (
		<section className='py-12 bg-gray-100'>
			<div className='container mx-auto px-4'>
				<h2 className='text-2xl md:text-3xl font-bold text-center mb-8'>Nowości</h2>
				<Carousel className='w-full max-w-screen-lg mx-auto'>
					<CarouselContent>
						{groupedProducts.map((group, index) => (
							<CarouselItem key={index}>
								<div className='flex space-x-4'>
									{group.map(product => (
										<Card
											key={product.id}
											className='flex-1 flex flex-col items-center p-4 bg-white shadow-lg rounded-lg'>
											<div className='relative w-64 h-64 mb-4'>
												{product.imagesUrls ? (
													<Image
														layout='fill'
														objectFit='contain'
														src={product.imagesUrls}
														alt={product.imagesNames}
														className='rounded-lg'
													/>
												) : (
													<div className='w-full h-full bg-gray-200 flex items-center justify-center rounded-lg'>
														<span>No Image</span>
													</div>
												)}
											</div>
											<CardContent className='text-center'>
												<span className='text-lg font-semibold'>{product.imagesNames}</span>
											</CardContent>
										</Card>
									))}
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className='absolute left-0 top-1/2 transform -translate-y-1/2' />
					<CarouselNext className='absolute right-0 top-1/2 transform -translate-y-1/2' />
				</Carousel>
			</div>
		</section>
	)
}
