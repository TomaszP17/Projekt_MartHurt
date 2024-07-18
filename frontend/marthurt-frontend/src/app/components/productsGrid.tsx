// src/components/ProductsGrid.tsx
'use client'
'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Filter from './filter'
import Sort from './sort' // Import Sort component here
import { Lighting } from '../types'
import SkeletonCard from './skeletonCard'
import { useFilterStore } from '@/store/useFilterStore'
import { useSortStore } from '@/store/useSortStore'
import { Badge } from '@/components/ui/badge'
import dynamic from 'next/dynamic'

const ProductsGrid: React.FC = () => {
	const [products, setProducts] = useState<Lighting[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const { priceFrom, priceTo, selectedSuppliers, filtersApplied } = useFilterStore()
	const { sortBy } = useSortStore()

	useEffect(() => {
		const sortBySplitted = sortBy.split(' ')
		const fetchProducts = async () => {
			setLoading(true)
			try {
				const res = await axios.get('http://localhost:8080/lightings', {
					params: {
						priceFrom,
						priceTo,
						supplierNames: selectedSuppliers.join(','),
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

	const handleRemoveSupplier = (supplier: string) => {
		// Implement removing supplier functionality if needed
	}

	if (loading) {
		return (
			<main className='lg:px-52 px-5'>
				<div className='mb-5 flex justify-between items-center'>
					<Filter />
					<Sort /> {}
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

	//dodać scroll area do badge gdy jestesmy na telefonie
	//Zmienic rozklad filter, sort, badge na telefony

	return (
		<main className='xl:px-52 px-5'>
			<div className='flex flex-col md:flex-row gap-x-5 mb-5 items-center '>
				<input
					type='text'
					placeholder='Szukaj produktów...'
					className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 w-full md:w-auto'
				/>
				<Filter />
				<div className='flex flex-wrap gap-2'>
					<Badge className='bg-gray-100 text-gray-800 hover:bg-gray-300 cursor-pointer'>Cena od: {priceFrom} zł</Badge>
					<Badge className='bg-gray-100 text-gray-800 hover:bg-gray-300 cursor-pointer'>Cena do: {priceTo} zł</Badge>
					{selectedSuppliers.map(supplier => (
						<Badge
							key={supplier}
							className='bg-gray-100 text-gray-800 flex items-center hover:bg-gray-300 cursor-pointer'>
							{supplier}
							<button
								type='button'
								onClick={() => handleRemoveSupplier(supplier)}
								className='ml-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 cursor-pointer'>
								<span className='sr-only'>Remove</span>
								&times;
							</button>
						</Badge>
					))}
				</div>
				<div className='flex-grow' />
				<Sort />
			</div>
			<div className='grid md:grid-cols-3 sm:grid-cols-2 gap-8'>
				{products.map(lighting => (
					<Card
						key={lighting.productId}
						className='drop-shadow-md cursor-pointer transition-transform transform hover:scale-[1.02] duration-400'>
						<CardHeader>
							<div className='relative w-40 h-40 mx-auto'>
								<Image
									layout='fill'
									objectFit='contain'
									loader={() => lighting.urlImages[0]}
									src={lighting.urlImages[0]}
									alt={lighting.productName}
								/>
							</div>
							<CardTitle>{lighting.supplierName}</CardTitle>
							<CardDescription>{lighting.productName}</CardDescription>
						</CardHeader>
						<CardContent>{lighting.productId}</CardContent>
						<div className='flex p-5 gap-x-3'>
							<Link className='w-full' href={`/lightings/${lighting.productId}`}>
								<Button className='w-1/2 md:w-full' variant='outline'>
									Szczegóły
								</Button>
							</Link>
							<Button className='w-1/2 md:w-full'>Kup</Button>
						</div>
					</Card>
				))}
			</div>
		</main>
	)
}

export default dynamic(() => Promise.resolve(ProductsGrid), { ssr: false })
