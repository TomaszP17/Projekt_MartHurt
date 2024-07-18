"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Lighting {
    id: string;
    productMarkingsName: string;
    supplierName: string;
    productName: string;
    nettoClientBuyPrice: number;
    bruttoClientBuyPrice: number;
    description: string;
    availability: string;
    images: string[];
}

export default function Page() {
    const { slug } = useParams();
    const [product, setProduct] = useState<Lighting | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/lightings/${slug}`);
                setProduct(res.data);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to fetch product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>No product found</p>;
    }

    // Extracting details from description for better presentation
    const details = extractDetailsFromDescription(product.description);

    return (
        <main className='md:px-52 px-5'>
            <Card className='drop-shadow-md'>
                <CardHeader>
                    <div className='relative w-full h-64'>
                        <Image
                            layout='fill'
                            objectFit='contain'
                            loader={() => product.images[0]}
                            src={product.images[0]}
                            alt={product.productName}
                        />
                    </div>
                    <CardTitle>{product.productName}</CardTitle>
                    <CardDescription>{product.supplierName}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className='text-lg font-semibold'>Cena netto: {product.nettoClientBuyPrice} zł</p>
                    <p className='text-lg font-semibold'>Cena brutto: {product.bruttoClientBuyPrice} zł</p>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className='font-medium'>Rodzaj</TableCell>
                                <TableCell>{product.productMarkingsName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='font-medium'>Wymiary</TableCell>
                                <TableCell>{details.dimensions}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='font-medium'>Oświetlenie</TableCell>
                                <TableCell>{details.lighting}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='font-medium'>Lumeny</TableCell>
                                <TableCell>{details.lumens}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='font-medium'>Barwa</TableCell>
                                <TableCell>{details.colorTemperature}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='font-medium'>Źródło światła</TableCell>
                                <TableCell>{details.lightSource}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='font-medium'>Ściemnianie</TableCell>
                                <TableCell>{details.dimmable}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className='font-medium'>Wykończenie</TableCell>
                                <TableCell>{details.finish}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <p className='text-md mt-2'>Dostępność: {product.availability}</p>
                </CardContent>
                <div className='flex p-5 gap-x-3'>
                    <Button className='w-full md:w-auto'>Kup</Button>
                </div>
            </Card>
        </main>
    );
}

// Helper function to extract details from description
function extractDetailsFromDescription(description: string) {
    const details: any = {};

    // Regular expressions to match specific details in the description
    const dimensionsRegex = /ᴓ(\d+cm) x h (\d+cm)/;
    const lightingRegex = /Oświetlenie LED ([^ ]+)/;
    const lumensRegex = /Lumeny:(\d+)lm/;
    const colorRegex = /Barwa: ([^ ]+)/;
    const sourceRegex = /Źródło światła LED w komplecie ([^ ]+)/;
    const dimmableRegex = /LED ściemnialny/;
    const finishRegex = /Wykończenie: ([^ ]+)/;

    // Extracting details using regex and populating the details object
    const dimensionsMatch = description.match(dimensionsRegex);
    if (dimensionsMatch) {
        details.dimensions = `${dimensionsMatch[1]} x ${dimensionsMatch[2]}`;
    }

    details.lighting = extractValueFromRegex(description, lightingRegex);
    details.lumens = extractValueFromRegex(description, lumensRegex);
    details.colorTemperature = extractValueFromRegex(description, colorRegex);
    details.lightSource = extractValueFromRegex(description, sourceRegex);
    details.dimmable = dimmableRegex.test(description) ? 'Tak' : 'Nie';
    details.finish = extractValueFromRegex(description, finishRegex);

    return details;
}

// Helper function to extract value from regex match
function extractValueFromRegex(description: string, regex: RegExp) {
    const match = description.match(regex);
    return match ? match[1] : 'Nieokreślone';
}
