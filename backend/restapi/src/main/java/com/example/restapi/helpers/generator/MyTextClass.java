package com.example.restapi.helpers.generator;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDFont;

import java.awt.*;
import java.io.IOException;

public class MyTextClass {

    PDDocument document;
    PDPageContentStream contentStream;

    public MyTextClass(PDPageContentStream contentStream, PDDocument document) {
        this.contentStream = contentStream;
        this.document = document;
    }

    void addSingleLineText(String text,
                           int xPosition,
                           int yPosition,
                           PDFont font,
                           float fontSize,
                           Color color
    ) throws IOException {

        contentStream.beginText();
        contentStream.setFont(font, fontSize);
        contentStream.setNonStrokingColor(color);
        contentStream.newLineAtOffset(xPosition, yPosition);
        contentStream.showText(text);
        contentStream.endText();
        contentStream.moveTo(0,0);

    }

    void addMultiLineText(
            String[] textArray, float leading, int xPostion, int yPosition, PDFont font, float fontSize, Color color
    ) throws IOException {

        contentStream.beginText();
        contentStream.setFont(font, fontSize);
        contentStream.setNonStrokingColor(color);
        contentStream.setLeading(leading);
        contentStream.newLineAtOffset(xPostion, yPosition);

        for(String text : textArray){
            contentStream.showText(text);
            contentStream.newLine();
        }

        contentStream.endText();
        contentStream.moveTo(0, 0);
    }

    float getTextWidth(String text, PDFont font, float fontSize) throws IOException {
        return font.getStringWidth(text)/1000 * fontSize;
    }

}
