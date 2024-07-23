'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CarouselDemo } from './CarouselDemo'
import Link from 'next/link'

const Hero = () => {
	const carouselRef = useRef<HTMLElement>(null)

	const scrollToCarousel = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<>
			<section className='relative h-screen flex items-center justify-center bg-black bg-opacity-50 m-0 p-0'>
				<Image
					src='/images/italux.jpg'
					alt='Hero Background'
					layout='fill'
					objectFit='cover'
					objectPosition='center'
					quality={100}
					style={{ zIndex: -1 }}
					className='absolute inset-0 w-full h-full object-cover z-[-1]'
				/>
				<div className='text-center'>
					<h1 className='text-3xl md:text-7xl font-bold text-white'>MART HURT</h1>

					<Button
						className='mt-6 px-6 py-3 bg-white text-black text-lg font-semibold rounded-lg shadow-md hover:bg-gray-200 hover:text-gray-900 transition duration-300'
						onClick={scrollToCarousel}>
						zobacz nowości
					</Button>
				</div>
			</section>
			<CarouselDemo ref={carouselRef} />
		</>
	)
}

export default Hero
