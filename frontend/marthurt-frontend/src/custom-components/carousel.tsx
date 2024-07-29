'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { LightingNews } from '../types'
import Autoplay from 'embla-carousel-autoplay'
import api from '@/services/api'
import useScreenSize from '@/hooks/useScreenSize'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

// export function CarouselPlugin() {
//   const plugin = React.useRef(
//     Autoplay({ delay: 4000, stopOnInteraction: true })
//   );
// }

const CarouselSection: React.FC = () => {
	const [products, setProducts] = useState<LightingNews[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const { width } = useScreenSize()

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await api.get('/lightings/news')
				console.log(response)
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

	return (
		<section id='newest-products' className='py-12 bg-gray-100'>
			<div className='container mx-auto px-4'>
				<h2 className='text-2xl md:text-3xl font-bold text-center mb-8'>Nowości</h2>
				<Carousel
					opts={{
						align: 'start', // Align carousel items to start
						loop: true, // Enable loop
					}}>
					<CarouselContent>
						{products.map((product, index) => (
							<CarouselItem key={index} className='sm:basis-1/2 md:basis-1/3 lg:basis-1/5'>
								{' '}
								{/* Adjust basis for different screen sizes */}
								<div className='p-4'>
									<Card className='h-80'>
										{' '}
										{/* Set card height */}
										<CardContent className='flex h-3/4 items-center justify-center p-6'>
											{product.imagesUrls ? (
												<div className='relative w-full h-full'>
													<Image layout='fill' objectFit='contain' src={product.imagesUrls} alt={product.imagesNames} />
												</div>
											) : (
												<div className='w-full h-full bg-gray-200 flex items-center justify-center rounded-lg'>
													<span>No Image</span>
												</div>
											)}
										</CardContent>
										<CardFooter>
											<h1 className='text-center font-medium'>{product.imagesNames}</h1>
										</CardFooter>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					{width >= 768 && (
						<>
							<CarouselPrevious />
							<CarouselNext />
						</>
					)}
				</Carousel>
			</div>
		</section>
	)
}

export default CarouselSection
