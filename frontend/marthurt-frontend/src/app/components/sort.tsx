// src/components/Sort.tsx
'use client'
import React from 'react'
import { useSortStore } from '@/store/useFilterStore'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'

const Sort: React.FC = () => {
	const { sortBy, setSortBy } = useSortStore()

	const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSortBy(event.target.value)
	}

	return (
		<div className='flex flex-col gap-4'>
			<Select>
				<SelectTrigger className='w-[180px]'>
        <SelectValue placeholder="Sortuj" />
        </SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Sortowanie</SelectLabel>
						<SelectItem value='oldest'>Od najstarszych</SelectItem>
						<SelectItem value='newest'>Od najnowszych</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	)
}

export default Sort
