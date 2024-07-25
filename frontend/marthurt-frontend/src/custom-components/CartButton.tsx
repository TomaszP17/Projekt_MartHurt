import React from 'react'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { useCartStore } from '@/store/useCartStore'

interface CartButtonProps {
	toggleCart: () => void
}

export function CartButton({ toggleCart }: CartButtonProps) {
	const { totalItems } = useCartStore()

	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Button
					onClick={toggleCart}
					variant='ghost'
					size='icon'
					className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50'>
					<span className='material-symbols-outlined h-6 w-6'>shopping_bag</span>
					<span className='ml-1'>Koszyk ({totalItems})</span>
				</Button>
			</HoverCardTrigger>
		</HoverCard>
	)
}
