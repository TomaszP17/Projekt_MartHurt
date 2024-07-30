import React from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
	productId: string
	productName: string
	clientBuyPriceBrutto: string
	quantity: number
	imageUrl: string
	availability: string
}

interface CartSheetProps {
	isOpen: boolean
	onClose: () => void
	products: Product[]
	totalAmount: number
	isLoading: boolean
	error: string | null
}

export const CartSheet: React.FC<CartSheetProps> = ({ isOpen, onClose, products, totalAmount, isLoading, error }) => {
	if (isLoading) {
		return (
			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent side='right'>
					<SheetHeader>
						<SheetTitle>Koszyk</SheetTitle>
					</SheetHeader>
					<div className='flex justify-center items-center h-64'>
						<p>Loading...</p>
					</div>
				</SheetContent>
			</Sheet>
		)
	}

	if (error) {
		return (
			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent side='right'>
					<SheetHeader>
						<SheetTitle>Koszyk</SheetTitle>
					</SheetHeader>
					<div className='flex justify-center items-center h-64'>
						<p>{error}</p>
					</div>
				</SheetContent>
			</Sheet>
		)
	}

	if (products.length === 0) {
		return (
			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent side='right'>
					<SheetHeader>
						<SheetTitle>Koszyk</SheetTitle>
					</SheetHeader>
					<div className='flex justify-center items-center h-64'>
						<p>Twój koszyk jest pusty</p>
					</div>
				</SheetContent>
			</Sheet>
		)
	}

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent side='right'>
				<SheetHeader>
					<SheetTitle>Koszyk</SheetTitle>
				</SheetHeader>
				<div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
					<div className='flow-root'>
						<ul role='list' className='-my-6 divide-y divide-gray-200'>
							{products.map(product => (
								<li key={product.productId} className='flex py-6'>
									<div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
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
									<div className='ml-4 flex flex-1 flex-col'>
										<div>
											<div className='flex justify-between text-base font-medium text-gray-900'>
												<h3>
													<a href='#'>{product.productName}</a>
												</h3>
												<p className='ml-4'>{product.clientBuyPriceBrutto}</p>
											</div>
											<p className='mt-1 text-sm text-gray-500'>Product Color</p>
										</div>
										<div className='flex flex-1 items-end justify-between text-sm'>
											<p className='text-gray-500'>Qty {product.quantity}</p>
											<div className='flex'>
												<button type='button' className='font-medium text-red-600 hover:text-red-500'>
													usuń
												</button>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
					<div className='flex justify-between text-base font-medium text-gray-900'>
						<p>Subtotal</p>
						<p>{totalAmount.toFixed(2)} zł</p>
					</div>
					<p className='mt-0.5 text-sm text-gray-500'>Shipping and taxes calculated at checkout.</p>
					<div className='mt-6'>
						<Link href={'/cart'}>
							<Button variant='default' className='w-full py-3 text-base font-medium text-white' onClick={onClose}>
								przejdź do koszyka
							</Button>
						</Link>
					</div>
					<div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
						<p>
							or
							<button type='button' className='font-medium text-indigo-600 hover:text-indigo-500' onClick={onClose}>
								Continue Shopping
								<span aria-hidden='true'> &rarr;</span>
							</button>
						</p>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}
