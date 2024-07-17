import React from 'react'
import { Button } from '@/components/ui/button'
// import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'

const iconMap = {
	faFilter,
}

const Filter: React.FC = () => {
	const categories = ['Wszystkie kategorie']
	const types = [
		'Biurkowe',
		'Biurkowe i gabinetowe',
		'Części zamienne',
		'Kinkiety',
		'Kinkiety oraz łazienkowe',
		'Klosze',
		'Liniowe natynkowe',
		'Liniowe wiszące',
		'Magnetyczne szynowe',
		'Magnetyczne szyny i akcesoria',
		'Meblowe',
	]
	const styles = [
		'Części zamienne',
		'Industrialne i retro',
		'Klasyczne',
		'Nowoczesne',
		'Nowoczesne Profesjonalne',
		'Nowoczesne techniczne',
		'Stylizowane',
		'Z kryształami',
		'Z kryształami - klasyczne',
	]
	const otherFilters = [
		{
			title: 'Umywalka',
			options: [
				'Z półką na baterię',
				'Nablatowa',
				'Podblatowa',
				'Z otworem na baterię',
				'Z3 otworami',
				'1-komorowa',
				'Retro',
			],
		},
		{
			title: 'WC',
			options: [
				'2-komorowa',
				'Nowoczesna',
				'Kolorowa (czerny mat, czarny połysk, antracyt mat, szary mat itd.)',
				'Rantowy',
				'bezrantowy',
			],
		},
		{ title: 'Bidet', options: [] },
		{ title: 'Bateria', options: ['Umywalkowa', 'Natryskowa', 'Wannowa'] },
		{ title: 'Zestaw natryskowy', options: ['Natynkowy', 'Podtynkowy'] },
		{ title: 'Oświetlenie', options: ['Lampy wiszące', 'Plafony', 'Listwy oświetleniowe'] },
		{ title: 'Listwy dekoracyjne', options: [] },
		{ title: 'Akcesoria łazienkowe', options: [] },
		{
			title: 'Akcesoria prysznicowe',
			options: ['Słuchawki', 'Deszczownice', 'Przyłącza kątowe', 'Uchwyty solo', 'Wylewki wannowe'],
		},
		{
			title: 'Płytki',
			options: [
				'Marmur mat',
				'Marmur połysk',
				'Beton',
				'Kamień',
				'Drewno',
				'Patchwork',
				'Kafle',
				'Lastryko',
				'Zewnętrzne',
				'Dekory',
				'60x120',
				'120x120',
				'Slaby (120x240, 120x278, 120x280)',
			],
		},
		{ title: 'Kabina', options: [] },
		{ title: 'Wanna', options: [] },
		{ title: 'Brodzik', options: [] },
		{ title: 'Lustro', options: [] },
		{ title: 'Parawan', options: [] },
		{ title: 'Pisuar', options: [] },
		{ title: 'Stelaż WC', options: [] },
		{ title: 'Klawisz WC', options: [] },
		{ title: 'Syfon', options: [] },
		{ title: 'Usługi', options: [] },
	]

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='outline'>
					Filtruj <FontAwesomeIcon icon={iconMap.faFilter} className='ml-2' />
				</Button>
			</SheetTrigger>
			<SheetContent side={'left'}>
				<SheetHeader>
					<SheetTitle>Filtry</SheetTitle>
					<SheetDescription>Wybierz filtry i kliknij "Filtruj", aby zastosować.</SheetDescription>
				</SheetHeader>
				<div className='grid gap-4 py-4'>
					{/* Kategoria */}
					<div className='mb-4'>
						<h2 className='font-bold text-lg mb-2'>KATEGORIA</h2>
						<select className='w-full border p-2'>
							{categories.map((category, index) => (
								<option key={index}>{category}</option>
							))}
						</select>
					</div>
					{/* Rodzaj */}
					<div className='mb-4'>
						<h2 className='font-bold text-lg mb-2'>RODZAJ</h2>
						<div className='h-32 overflow-y-scroll'>
							{types.map((type, index) => (
								<label key={index} className='block'>
									<input type='checkbox' className='mr-2' />
									{type}
								</label>
							))}
						</div>
					</div>
					{/* Styl */}
					<div className='mb-4'>
						<h2 className='font-bold text-lg mb-2'>STYL</h2>
						<div className='h-32 overflow-y-scroll'>
							{styles.map((style, index) => (
								<label key={index} className='block'>
									<input type='checkbox' className='mr-2' />
									{style}
								</label>
							))}
						</div>
					</div>
					{/* Other Filters */}
					{otherFilters.map((filter, index) => (
						<div key={index} className='mb-4'>
							<h2 className='font-bold text-lg mb-2'>{filter.title}</h2>
							<div className='h-32 overflow-y-scroll'>
								{filter.options.map((option, idx) => (
									<label key={idx} className='block'>
										<input type='checkbox' className='mr-2' />
										{option}
									</label>
								))}
							</div>
						</div>
					))}
				</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button type='submit'>Filtruj</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	)
}

export default Filter
