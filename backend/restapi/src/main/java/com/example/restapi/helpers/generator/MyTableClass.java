package com.example.restapi.helpers.generator;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;

import java.awt.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class MyTableClass {

    private final PDDocument document;
    private final PDPageContentStream contentStream;
    private int[] colWidth;
    private int cellHeight;
    private int yPosition;
    private int xPosition;
    private int colPosition;
    private int xInitialPosition;
    private float fontSize;
    private PDFont font;
    private Color fontColor;

    public MyTableClass(PDDocument document, PDPageContentStream contentStream) {
        this.document = document;
        this.contentStream = contentStream;
    }

    void setTable(int[] colWidth, int cellHeight, int xPosition, int yPosition) {
        this.colWidth = colWidth;
        this.cellHeight = cellHeight;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.xInitialPosition = xPosition;
    }

    void setTableFont(PDFont font, float fontSize, Color fontColor) {
        this.font = font;
        this.fontSize = fontSize;
        this.fontColor = fontColor;
    }

    void addCell(String text, Color fillColor, boolean rightAlign) throws IOException {
        contentStream.setStrokingColor(1f);

        if (fillColor != null) {
            contentStream.setNonStrokingColor(fillColor);
        }

        contentStream.addRect(xPosition, yPosition, colWidth[colPosition], cellHeight);

        if (fillColor == null) {
            contentStream.stroke();
        } else {
            contentStream.fillAndStroke();
        }

        contentStream.beginText();
        contentStream.setNonStrokingColor(fontColor);

        if (rightAlign) {
            float fontWidth = font.getStringWidth(text) / 1000 * fontSize;
            contentStream.newLineAtOffset(xPosition + colWidth[colPosition] - 20 - fontWidth, yPosition + 10);
        } else {
            contentStream.newLineAtOffset(xPosition + 20, yPosition + 10);
        }

        contentStream.setFont(font, fontSize);
        contentStream.showText(text);
        contentStream.endText();

        xPosition += colWidth[colPosition];
        colPosition++;

        if (colPosition == colWidth.length) {
            colPosition = 0;
            xPosition = xInitialPosition;
            yPosition -= cellHeight;
        }
    }

    void addWrappedCell(String text, Color fillColor, PDFont font, float fontSize, int columnWidth) throws IOException {
        contentStream.setStrokingColor(1f);

        if (fillColor != null) {
            contentStream.setNonStrokingColor(fillColor);
        }

        contentStream.addRect(xPosition, yPosition, columnWidth, cellHeight);

        if (fillColor == null) {
            contentStream.stroke();
        } else {
            contentStream.fillAndStroke();
        }

        List<String> lines = wrapText(text, font, fontSize, columnWidth - 40);

        contentStream.beginText();
        contentStream.setNonStrokingColor(fontColor);
        contentStream.newLineAtOffset(xPosition + 20, yPosition + cellHeight - 20);

        contentStream.setFont(font, fontSize);

        for (String line : lines) {
            contentStream.showText(line);
            contentStream.newLineAtOffset(0, -fontSize - 2); // Adjust line height
        }

        contentStream.endText();

        xPosition += columnWidth;
        colPosition++;

        if (colPosition == colWidth.length) {
            colPosition = 0;
            xPosition = xInitialPosition;
            yPosition -= cellHeight;
        }
    }

    void addImageCell(PDImageXObject image, Color fillColor) throws IOException {
        contentStream.setStrokingColor(1f);

        if (fillColor != null) {
            contentStream.setNonStrokingColor(fillColor);
        }

        contentStream.addRect(xPosition, yPosition, colWidth[colPosition], cellHeight);

        if (fillColor == null) {
            contentStream.stroke();
        } else {
            contentStream.fillAndStroke();
        }

        contentStream.drawImage(image, xPosition + 10, yPosition + 10, colWidth[colPosition] - 20, cellHeight - 20);

        xPosition += colWidth[colPosition];
        colPosition++;

        if (colPosition == colWidth.length) {
            colPosition = 0;
            xPosition = xInitialPosition;
            yPosition -= cellHeight;
        }
    }

    private List<String> wrapText(String text, PDFont font, float fontSize, int maxWidth) throws IOException {
        List<String> lines = new ArrayList<>();
        String[] words = text.split(" ");
        StringBuilder currentLine = new StringBuilder();

        for (String word : words) {
            String lineWithWord = currentLine + (currentLine.length() > 0 ? " " : "") + word;
            float width = font.getStringWidth(lineWithWord) / 1000 * fontSize;

            if (width > maxWidth) {
                lines.add(currentLine.toString());
                currentLine = new StringBuilder(word);
            } else {
                currentLine.append((currentLine.length() > 0 ? " " : "")).append(word);
            }
        }

        lines.add(currentLine.toString());
        return lines;
    }
}
