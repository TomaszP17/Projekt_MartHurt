package com.example.restapi.helpers.generator;

import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDFont;

import java.awt.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class MyTextClass {

    private final PDPageContentStream contentStream;
    private final PDFont font;

    public MyTextClass(PDPageContentStream contentStream, PDFont font) {
        this.contentStream = contentStream;
        this.font = font;
    }

    public float getTextWidth(String text, PDFont font, float fontSize) throws IOException {
        return font.getStringWidth(text) / 1000 * fontSize;
    }

    public void addSingleLineText(String text, int x, int y, PDFont font, float fontSize, Color color) throws IOException {
        contentStream.beginText();
        contentStream.setFont(font, fontSize);
        contentStream.setNonStrokingColor(color);
        contentStream.newLineAtOffset(x, y);
        contentStream.showText(text);
        contentStream.endText();
    }

    public void addMultiLineText(String[] textArray, int x, int y, PDFont font, float fontSize, Color color) throws IOException {
        contentStream.beginText();
        contentStream.setFont(font, fontSize);
        contentStream.setNonStrokingColor(color);
        contentStream.newLineAtOffset(x, y);
        for (String text : textArray) {
            contentStream.showText(text);
            contentStream.newLineAtOffset(0, -fontSize - 2); // Adjust line height
        }
        contentStream.endText();
    }


    public List<String> wrapText(String text, PDFont font, float fontSize, int maxWidth) throws IOException {
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
