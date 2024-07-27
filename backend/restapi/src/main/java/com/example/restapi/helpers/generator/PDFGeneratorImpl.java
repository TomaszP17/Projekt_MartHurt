package com.example.restapi.helpers.generator;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class PDFGeneratorImpl implements IPDFGenerator {

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

            try (PDPageContentStream contentStream = new PDPageContentStream(document, firstPage)) {
                MyTextClass myTextClass = new MyTextClass(contentStream, document);

                PDFont font = new PDType1Font(Standard14Fonts.FontName.HELVETICA);
                PDFont italicFont = new PDType1Font(Standard14Fonts.FontName.HELVETICA_OBLIQUE);

                String[] contactDetails = {"9876543210", "1234567890"};
                myTextClass.addMultiLineText(contactDetails, 18, (int) (pageWidth - font.getStringWidth("9876543210") / 1000 * 15 - 10),
                        pageHeight - 25, font, 15, Color.BLACK);

                myTextClass.addSingleLineText("MARTHURT", 25, pageHeight - 150, font, 40, Color.BLACK);
                myTextClass.addSingleLineText("Imie Klienta: " + name, 25, pageHeight - 250, font, 16, Color.BLACK);
                myTextClass.addSingleLineText("Nr. Tel: " + callNo, 25, pageHeight - 274, font, 16, Color.BLACK);

                String invoiceNo = "ID wyceny# 2536";
                float textWidth = myTextClass.getTextWidth(invoiceNo, font, 16);
                myTextClass.addSingleLineText(invoiceNo, (int) (pageWidth - 25 - textWidth), pageHeight - 250, font, 16, Color.BLACK);

                float dateTextWidth = myTextClass.getTextWidth("Data: " + d_format.format(new Date()), font, 16);
                myTextClass.addSingleLineText("Data: " + d_format.format(new Date()), (int) (pageWidth - 25 - dateTextWidth),
                        pageHeight - 274, font, 16, Color.BLACK);

                String time = t_format.format(new Date());
                float timeTextWidth = myTextClass.getTextWidth("Godzina: " + time, font, 16);
                myTextClass.addSingleLineText("Godzina: " + time, (int) (pageWidth - 25 - timeTextWidth),
                        pageHeight - 298, font, 16, Color.BLACK);

                MyTableClass myTable = new MyTableClass(document, contentStream);
                int[] cellWidth = {70, 160, 120, 90, 100};
                myTable.setTable(cellWidth, 30, 25, pageHeight - 350);
                myTable.setTableFont(font, 16, Color.BLACK);

                Color tableHeadColor = new Color(240, 93, 11);
                Color tableBodyColor = new Color(219, 218, 198);

                myTable.addCell("l.p.", tableHeadColor);
                myTable.addCell("Produkt", tableHeadColor);
                myTable.addCell("Cena", tableHeadColor);
                myTable.addCell("Ilosc", tableHeadColor);
                myTable.addCell("Lacznie", tableHeadColor);

                myTable.addCell("1. ", tableBodyColor);
                myTable.addCell("Plafon Splendor 40 Gold", tableBodyColor);
                myTable.addCell("120", tableBodyColor);
                myTable.addCell("2", tableBodyColor);
                myTable.addCell("240", tableBodyColor);

                myTable.addCell("2. ", tableBodyColor);
                myTable.addCell("Lampa wiszaca Splendor 60 Gold", tableBodyColor);
                myTable.addCell("50", tableBodyColor);
                myTable.addCell("4", tableBodyColor);
                myTable.addCell("200", tableBodyColor);

                myTable.addCell("", null);
                myTable.addCell("", null);
                myTable.addCell("GST", null);
                myTable.addCell("5%", null);
                myTable.addCell("22", null);

                myTable.addCell("", null);
                myTable.addCell("", null);
                myTable.addCell("Total", null);
                myTable.addCell("", null);
                myTable.addCell("462", null);

                String[] paymentMethod = {"Metody platnosci jakie akceptujemy:", "Gotowka, platnosc karta lub BLIKiem"};
                myTextClass.addMultiLineText(paymentMethod,
                        15,
                        25,
                        180,
                        italicFont,
                        10,
                        new Color(122, 122, 122));

                contentStream.setStrokingColor(Color.BLACK);
                contentStream.setLineWidth(2);
                contentStream.moveTo(pageWidth - 250, 150);
                contentStream.lineTo(pageWidth - 25, 150);
                contentStream.stroke();

                String authoSign = "Podpis Handlowca";
                float authoSignWidth = myTextClass.getTextWidth(authoSign, italicFont, 16);
                int xpos = pageWidth - 250 + pageWidth - 25;
                myTextClass.addSingleLineText(authoSign, (int) (xpos - authoSignWidth) / 2, 125, italicFont, 16, Color.BLACK);

                String bottomLine = "Tutaj miejsce na jakas ciekawa stopke";
                float bottomLineWidth = myTextClass.getTextWidth(bottomLine, font, 20);
                myTextClass.addSingleLineText(bottomLine, (int) (pageWidth - bottomLineWidth) / 2, 50, italicFont, 20, Color.GRAY);

                Color bottomRectColor = new Color(255, 91, 0);
                contentStream.setNonStrokingColor(bottomRectColor);
                contentStream.addRect(0, 0, pageWidth, 30);
                contentStream.fill();
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            document.save(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }
}
