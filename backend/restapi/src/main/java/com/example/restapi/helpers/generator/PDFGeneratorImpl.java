package com.example.restapi.helpers.generator;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType0Font;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class PDFGeneratorImpl implements IPDFGenerator {

    private static final int ROWS_PER_PAGE_FIRST = 5; // Rows per page on the first page
    private static final int ROWS_PER_PAGE_SUBSEQUENT = 10; // Rows per page on subsequent pages

    @Override
    public ByteArrayInputStream generate(String text) throws IOException {
        try (PDDocument document = new PDDocument()) {
            PDPage firstPage = new PDPage(PDRectangle.A4);
            document.addPage(firstPage);

            String name = "Marta Marthurt";
            String callNo = "+48 606401620";

            Format d_format = new SimpleDateFormat("dd/MM/yyyy");
            Format t_format = new SimpleDateFormat("HH:mm");

            PDRectangle mediaBox = firstPage.getMediaBox();
            int pageWidth = (int) mediaBox.getWidth();
            int pageHeight = (int) mediaBox.getHeight();

            int currentPageRows = 0;
            PDPageContentStream contentStream = new PDPageContentStream(document, firstPage);

            // Load fonts
            PDType1Font fontHelvetica = new PDType1Font(Standard14Fonts.FontName.HELVETICA);
            PDType1Font boldFontHelvetica = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);
            PDType1Font italicFontHelvetica = new PDType1Font(Standard14Fonts.FontName.HELVETICA_OBLIQUE);

            try {
                // Add header information only on the first page
                addHeader(contentStream, pageWidth, pageHeight, fontHelvetica, boldFontHelvetica, italicFontHelvetica, name, callNo, d_format);

                MyTableClass myTable = new MyTableClass(document, contentStream);
                int[] cellWidth = {30, 150, 70, 150, 50, 50, 40}; // Adjusted column widths
                myTable.setTable(cellWidth, 50, 25, pageHeight - 450);
                myTable.setTableFont(fontHelvetica, 12, Color.BLACK); // Adjusted font size

                Color tableHeadColor = new Color(240, 93, 11);
                Color tableBodyColor = new Color(219, 218, 198);

                myTable.addCell("L.p", tableHeadColor, false);
                myTable.addCell("Nazwa Produktu", tableHeadColor, false);
                myTable.addCell("Zdjecie", tableHeadColor, false);
                myTable.addCell("Opis", tableHeadColor, false);
                myTable.addCell("Cena netto", tableHeadColor, false);
                myTable.addCell("Cena brutto", tableHeadColor, false);
                myTable.addCell("ilosc", tableHeadColor, false);

                // Load the images once and use them for all rows
                PDImageXObject image1 = PDImageXObject.createFromFile("C:\\Users\\Tomasz\\Desktop\\Praca\\marthurt\\Projekt_MartHurt\\backend\\restapi\\src\\main\\resources\\static\\images\\product1.jpg", document);
                PDImageXObject image2 = PDImageXObject.createFromFile("C:\\Users\\Tomasz\\Desktop\\Praca\\marthurt\\Projekt_MartHurt\\backend\\restapi\\src\\main\\resources\\static\\images\\product2.jpg", document);

                // Add rows with repeated images
                for (int i = 1; i <= 10; i++) {
                    if (currentPageRows >= ROWS_PER_PAGE_FIRST) {
                        contentStream.close();
                        PDPage newPage = new PDPage(PDRectangle.A4);
                        document.addPage(newPage);
                        contentStream = new PDPageContentStream(document, newPage);
                        myTable = new MyTableClass(document, contentStream);
                        myTable.setTable(cellWidth, 50, 25, pageHeight - 50); // Adjust Y position for new page
                        myTable.setTableFont(fontHelvetica, 12, Color.BLACK);
                        myTable.addCell("L.p", tableHeadColor, false);
                        myTable.addCell("Nazwa Produktu", tableHeadColor, false);
                        myTable.addCell("Zdjecie", tableHeadColor, false);
                        myTable.addCell("Opis", tableHeadColor, false);
                        myTable.addCell("Cena netto", tableHeadColor, false);
                        myTable.addCell("Cena brutto", tableHeadColor, false);
                        myTable.addCell("ilosc", tableHeadColor, false);
                        currentPageRows = 0;
                    }
                    myTable.addCell(i + ".", tableBodyColor, false);
                    myTable.addWrappedCell("Plafon Splendor 40 Gold", tableBodyColor, fontHelvetica, 12, cellWidth[1]);
                    myTable.addImageCell(image1, tableBodyColor);
                    myTable.addWrappedCell("Opis produktu " + i + " z dlugim tekstem, ktory powinien sie zawijac w komorce", tableBodyColor, fontHelvetica, 8, cellWidth[3]);
                    myTable.addCell("100", tableBodyColor, true); // Right-aligning price
                    myTable.addCell("123", tableBodyColor, true); // Right-aligning total
                    myTable.addCell("2", tableBodyColor, true); // Right-aligning quantity
                    currentPageRows++;
                }

                // Adjust any additional rows and summary rows as needed
                myTable.addCell("", null, false);
                myTable.addCell("", null, false);
                myTable.addCell("", null, false);
                myTable.addCell("GST", null, false);
                myTable.addCell("", null, false);
                myTable.addCell("22", null, true);

                myTable.addCell("", null, false);
                myTable.addCell("", null, false);
                myTable.addCell("", null, false);
                myTable.addCell("Total", null, false);
                myTable.addCell("", null, false);
                myTable.addCell("462", null, true);

                // Add footer information only on the last page
                addFooter(contentStream, pageWidth, pageHeight, italicFontHelvetica, fontHelvetica);

            } finally {
                contentStream.close();
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            document.save(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }

    private void addHeader(PDPageContentStream contentStream, int pageWidth, int pageHeight, PDFont font, PDFont boldFont, PDFont italicFont, String name, String callNo, Format d_format) throws IOException {
        MyTextClass myTextClass = new MyTextClass(contentStream, null);

        String headerText = "WYCENA/OFERTA CENOWA";
        float headerTextWidth = myTextClass.getTextWidth(headerText, font, 20);
        myTextClass.addSingleLineText(headerText, (int) (pageWidth - headerTextWidth) / 2, pageHeight - 50, font, 20, Color.BLACK);

        String[] contactDetails = {"9876543210", "1234567890"};
        myTextClass.addMultiLineText(contactDetails, 18, pageHeight - 25, font, 15, Color.BLACK);

        myTextClass.addSingleLineText("MARTHURT", 25, pageHeight - 150, font, 40, Color.BLACK);

        myTextClass.addSingleLineText("Salon:", 25, pageHeight - 200, boldFont, 16, Color.BLACK);
        myTextClass.addSingleLineText("nr salonu: XXX", 25, pageHeight - 218, font, 16, Color.BLACK);
        myTextClass.addSingleLineText("adres: XXX", 25, pageHeight - 236, font, 16, Color.BLACK);

        myTextClass.addSingleLineText("Dane klienta:", 25, pageHeight - 274, boldFont, 16, Color.BLACK);
        myTextClass.addSingleLineText("imie klienta/nazwa firmy: " + name, 25, pageHeight - 298, font, 16, Color.BLACK);
        myTextClass.addSingleLineText("nr.tel: " + callNo, 25, pageHeight - 322, font, 16, Color.BLACK);
        myTextClass.addSingleLineText("Adres email: XXX", 25, pageHeight - 346, font, 16, Color.BLACK);
        myTextClass.addSingleLineText("Data Dostawy: XXX", 25, pageHeight - 370, font, 16, Color.BLACK);
        myTextClass.addSingleLineText("Dodatkowe Informacje: XXX", 25, pageHeight - 394, font, 16, Color.BLACK);

        String invoiceNo = "ID wyceny# 2536";
        float textWidth = myTextClass.getTextWidth(invoiceNo, font, 16);
        myTextClass.addSingleLineText(invoiceNo, (int) (pageWidth - 25 - textWidth), pageHeight - 200, font, 16, Color.BLACK);

        float dateTextWidth = myTextClass.getTextWidth("Data: " + d_format.format(new Date()), font, 16);
        myTextClass.addSingleLineText("Data: " + d_format.format(new Date()), (int) (pageWidth - 25 - dateTextWidth), pageHeight - 218, font, 16, Color.BLACK);
    }


    private void addFooter(PDPageContentStream contentStream, int pageWidth, int pageHeight, PDFont italicFont, PDFont font) throws IOException {
        MyTextClass myTextClass = new MyTextClass(contentStream, null);

        // Add remarks section
        contentStream.setStrokingColor(Color.BLACK);
        contentStream.setLineWidth(1);
        contentStream.addRect(25, 200, pageWidth - 50, 70);
        contentStream.stroke();

        String remarks = "Uwagi handlowca: To jest przykladowy tekst uwag handlowca, ktory moze byc dluzszy i powinien byc zawijany w obwodke.";
        List<String> wrappedRemarks = myTextClass.wrapText(remarks, font, 10, pageWidth - 70);
        contentStream.beginText();
        contentStream.setFont(font, 10);
        contentStream.setNonStrokingColor(Color.BLACK);
        contentStream.newLineAtOffset(35, 260); // Adjust the position of the remarks section
        for (String line : wrappedRemarks) {
            contentStream.showText(line);
            contentStream.newLineAtOffset(0, -12);
        }
        contentStream.endText();

        String[] paymentMethod = {"Metody platnosci jakie akceptujemy:", "Gotowka, platnosc karta lub BLIKiem"};
        myTextClass.addMultiLineText(paymentMethod, 25, 150, italicFont, 10, new Color(122, 122, 122));

        contentStream.setStrokingColor(Color.BLACK);
        contentStream.setLineWidth(2);
        contentStream.moveTo(pageWidth - 250, 130);
        contentStream.lineTo(pageWidth - 25, 130);
        contentStream.stroke();

        String authoSign = "Podpis Handlowca";
        float authoSignWidth = myTextClass.getTextWidth(authoSign, italicFont, 16);
        int xpos = (pageWidth - 250 + pageWidth - 25) / 2;
        myTextClass.addSingleLineText(authoSign, xpos - (int) (authoSignWidth / 2), 105, italicFont, 16, Color.BLACK);

        String bottomLine = "Tutaj miejsce na jakas ciekawa stopke";
        float bottomLineWidth = myTextClass.getTextWidth(bottomLine, font, 20);
        myTextClass.addSingleLineText(bottomLine, (int) (pageWidth - bottomLineWidth) / 2, 50, italicFont, 20, Color.GRAY);

        Color bottomRectColor = new Color(255, 91, 0);
        contentStream.setNonStrokingColor(bottomRectColor);
        contentStream.addRect(0, 0, pageWidth, 30);
        contentStream.fill();
    }
}
