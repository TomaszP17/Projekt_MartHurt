export interface Option {
	value: string
	label: string
}

export interface CustomSelectProps {
	options: Option[]
	onChange: (selectedOption: Option) => void
	placeholder?: string
}

export interface FormData {
	name: string
	photo?: File | null
	description: string
	nettoPrice: number
	bruttoPrice: number
	quantity: number
}

export interface Quote {
	store: string
	date: string
	salesPerson: string
	items: FormData[]
	clientName: string
	clientEmail: string
	clientPhone: string
	deliveryDate: string
	additionalInfo: string
}

export interface Lighting {
	urlImages: string[]
	productName: string
	productId: string
	netto_buy_price: number
	supplierName: string
	bruttoClientBuyPrice: number
	dateAdded: string
}

export interface LightingNews {
	imagesUrls?: string | null
	imagesNames: string
	id: string
}

export interface Comment {
	id: number
	message: string
}
