// src/components/ProductsGrid.tsx
'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Filter from './filter'
import Sort from './sort'
import { Lighting } from '../types'
import SkeletonCard from './skeletonCard'
import { useFilterStore } from '@/store/useFilterStore'
import { useSortStore } from '@/store/useSortStore'
import { useSearchStore } from '@/store/useSearchStore'
import { Badge } from '@/components/ui/badge'
import dynamic from 'next/dynamic'
import { Input } from '@/components/ui/input'
import api from '@/services/api'

const ProductsGrid: React.FC = () => {
	const [products, setProducts] = useState<Lighting[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const {
		priceFrom,
		priceTo,
		selectedSize,
		selectedColors,
		selectedFinish,
		setSelectedSize,
		setSelectedColor,
		setSelectedFinish,
		filtersApplied,
		applyFilters,
	} = useFilterStore()
	const { sortBy } = useSortStore()

	useEffect(() => {
		const sortBySplitted = sortBy.split(' ')
		const fetchProducts = async () => {
			setLoading(true)
			try {
				const res = await api.get('http://localhost:8080/lightings', {
					params: {
						priceFrom,
						priceTo,
						size: selectedSize.join(','),
						color: selectedColors.join(','),
						finish: selectedFinish.join(','),
						sortBy: sortBySplitted[0],
						sortOrder: sortBySplitted[1],
					},
				})
				setProducts(res.data)
			} catch (err) {
				console.error('Error fetching products:', err)
				setError('Failed to fetch products')
			} finally {
				setLoading(false)
			}
		}

		fetchProducts()
	}, [filtersApplied, sortBy])

	const handleAddToCart = async (productId: string) => {
		const shoppingCartId = 1 // Replace with actual cart ID logic
		try {
			await api.post(`http://localhost:8080/shopping-cart/${shoppingCartId}/products`, { productId, quantity: 1 })
			alert('Product added to cart!')
		} catch (err) {
			console.error('Failed to add product to cart:', err)
			alert('Failed to add product to cart.')
		}
	}

	const handleRemoveSize = (size: string) => {
		setSelectedSize(prevSelected => prevSelected.filter(s => s !== size))
		applyFilters()
	}

	const handleRemoveColor = (color: string) => {
		setSelectedColor(prevSelected => prevSelected.filter(s => s !== color))
		applyFilters()
	}

	const handleRemoveFinish = (finish: string) => {
		setSelectedFinish(prevSelected => prevSelected.filter(f => f !== finish))
		applyFilters()
	}

	if (loading) {
		return (
			<main className='lg:px-52 px-5'>
				<div className='mb-5 flex justify-between items-center'>
					<div>
						<Filter />
					</div>
					<div className='flex-grow' />
					<div>
						<Sort />
					</div>
				</div>
				<div className='grid md:grid-cols-3 gap-8'>
					{Array.from({ length: 6 }).map((_, index) => (
						<SkeletonCard key={index} />
					))}
				</div>
			</main>
		)
	}

	if (error) {
		return <p>{error}</p>
	}

	if (!products || products.length === 0) {
		return <p>No products available</p>
	}

	return (
		<main className='xl:px-52 px-5'>
			<div className='flex flex-col md:flex-row gap-x-5 mb-5 items-center gap-y-2 md:gap-y-0 mt-5'>
				<div className='w-full md:w-auto'>
					<Filter />
				</div>
				<div className='flex flex-wrap w-full justify-start gap-2 md:order-2 order-3'>
					<Badge className='bg-gray-100 text-gray-800 hover:bg-gray-300 cursor-pointer'>Cena od: {priceFrom} zł</Badge>
					<Badge className='bg-gray-100 text-gray-800 hover:bg-gray-300 cursor-pointer'>Cena do: {priceTo} zł</Badge>
					{selectedSize.map(size => (
						<Badge
							key={size}
							className='bg-gray-100 text-gray-800 flex items-center hover:bg-gray-300 cursor-pointer'
							onClick={() => handleRemoveSize(size)}>
							{size} &times;
							{/* <button
                type="button"
                onClick={() => handleRemoveSupplier(supplier)}
                className="ml-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 cursor-pointer"
              >
                <span className="sr-only">Remove</span>
                &times;
              </button> */}
						</Badge>
					))}
					{selectedFinish.map(finish => (
						<Badge
							key={finish}
							className='bg-gray-100 text-gray-800 flex items-center hover:bg-gray-300 cursor-pointer'
							onClick={() => handleRemoveFinish(finish)}>
							{finish} &times;
						</Badge>
					))}
					{selectedColors.map(color => (
						<Badge
							key={color}
							className='bg-gray-100 text-gray-800 flex items-center hover:bg-gray-300 cursor-pointer'
							onClick={() => handleRemoveColor(color)}>
							{color} &times;
						</Badge>
					))}
				</div>
				<div className='flex-grow order-3 hidden md:block' />
				<div className='w-full md:w-auto order-2 md:order-4'>
					<Sort />
				</div>
			</div>
			<div className='grid md:grid-cols-3 sm:grid-cols-2 gap-8'>
				{products.map((lighting, index) => (
					<Card
						key={lighting.productId}
						className='drop-shadow-md cursor-pointer transition-transform transform hover:scale-[1.02] duration-400'>
						<CardHeader>
							<div className='relative w-40 h-40 mx-auto'>
								<Image
									fill
									sizes='(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw'
									priority={index < 3}
									src={lighting.urlImages[0]}
									alt={lighting.productName}
									className='object-contain'
								/>
							</div>
							<CardTitle>{lighting.supplierName}</CardTitle>
							<CardDescription>{lighting.productName}</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='flex flex-col'>
								<p className='text-md font-semibold'>ID: {lighting.productId}</p>
								<p className='text-md font-semibold'>Cena: {lighting.bruttoClientBuyPrice} zł</p>
								<p className='text-md'>Dostępność: {lighting.dateAdded}</p>
							</div>
						</CardContent>
						<div className='flex flex-col p-5 gap-x-3 md:flex-row gap-y-2'>
							<Link className='w-full' href={`/lightings/${lighting.productId}`}>
								<Button className='w-full' variant='outline'>
									Szczegóły
								</Button>
							</Link>
							<Button className='w-full' onClick={() => handleAddToCart(lighting.productId)}>
								Kup
							</Button>
						</div>
					</Card>
				))}
			</div>
		</main>
	)
}

export default dynamic(() => Promise.resolve(ProductsGrid), { ssr: false })
