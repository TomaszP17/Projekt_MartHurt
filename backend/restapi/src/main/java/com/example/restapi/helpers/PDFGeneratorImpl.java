package com.example.restapi.helpers;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class PDFGeneratorImpl implements IPDFGenerator {

    @Override
    public ByteArrayInputStream generate(String text) throws IOException {
        try (PDDocument document = new PDDocument()) {
            PDPage page = new PDPage();
            document.addPage(page);

            try (PDPageContentStream contentStream = new PDPageContentStream(document, page)) {
                // Add title
                contentStream.beginText();
                contentStream.setFont(new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD), 12);
                contentStream.newLineAtOffset(100, 750);
                contentStream.showText("DRUK ZAMÓWIENIA TOWARU");
                contentStream.endText();

                // Add custom text
                contentStream.beginText();
                contentStream.setFont(new PDType1Font(Standard14Fonts.FontName.HELVETICA), 12);
                contentStream.newLineAtOffset(100, 730);
                contentStream.showText(text);
                contentStream.endText();

                // Draw table
                float margin = 50;
                float yStart = 650;
                float tableWidth = page.getMediaBox().getWidth() - 2 * margin;
                float yPosition = yStart;
                float rowHeight = 20;
                int numRows = 13; // Including header row
                int numCols = 6;

                contentStream.setLineWidth(1);
                // Draw table rows
                for (int i = 0; i <= numRows; i++) {
                    contentStream.moveTo(margin, yPosition);
                    contentStream.lineTo(margin + tableWidth, yPosition);
                    contentStream.stroke();
                    yPosition -= rowHeight;
                }

                // Draw table columns
                float tableHeight = rowHeight * numRows;
                yPosition = yStart;
                float nextX = margin;
                float[] colWidths = {40, 200, 80, 80, 80, 80}; // Adjust widths as needed

                for (int i = 0; i <= numCols; i++) {
                    contentStream.moveTo(nextX, yStart);
                    contentStream.lineTo(nextX, yStart - tableHeight);
                    contentStream.stroke();
                    if (i < numCols) {
                        nextX += colWidths[i];
                    }
                }
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            document.save(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }
}
