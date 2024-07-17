package com.example.restapi.dto.request;

import com.example.restapi.entity.products.Product;

import java.io.File;
import java.util.List;

public class FormDataRequestDTO {

    private String productName; // Nazwa produktu
    private String photo; // Zdjęcie produktu (opcjonalne)
    private String description; // Opis produktu (możliwy do edycji)
    private double bruttoPrice; // Cena brutto za m²
    private double bruttoPriceWithDiscount; // Cena brutto po rabacie
    private double quantity; // Ilość szt/m²
    private double totalValueAfterDiscount; // Wartość łączna po rabacie
    private String store; // Wybrany sklep (np. "MH-206")
    private String date; // Data wygenerowania wyceny (np. "2024-07-11 15:30:00")
    private String salesPerson; // Identyfikator sprzedawcy (np. "KG206")
    private List<Product> itemsList;
    /**
     * {
     *       "name": "string",                 // Nazwa produktu (np. "Produkt 1")
     *       "photo": "File | null",           // Zdjęcie produktu (opcjonalne)
     *       "description": "string",          // Opis produktu (np. "Opis produktu 1")
     *       "bruttoPrice": "number",          // Cena brutto za m² (np. 100)
     *       "bruttoPriceWithDiscount": "number", // Cena brutto po rabacie (np. 90)
     *       "quantity": "number",             // Ilość szt/m² (np. 2)
     *       "totalValueAfterDiscount": "number" // Wartość łączna po rabacie (np. 180)
     *     }
     *     // ... więcej produktów
     */
    private String clientName; // Nazwisko/Nazwa firmy klienta (np. "Jan Kowalski")
    private String clientEmail; // Adres e-mail klienta (np. "jan.kowalski@example.com")
    private String clientPhone; // Numer telefonu klienta (np. "123-456-789")
    private String deliveryDate; // Data dostawy (np. "2024-08-01")
    private String additionalInfo; // Dodatkowe informacje (np. "Uwagi do zamówienia")


}
