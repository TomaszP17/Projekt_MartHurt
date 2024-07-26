package com.example.restapi.helpers.generator;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDFont;

import java.awt.*;
import java.io.IOException;

public class MyTableClass {

    PDDocument document;
    PDPageContentStream contentStream;
    private int[] colWidth;
    private int cellHeight;
    private int yPosition;
    private int xPosition;
    private int colPosition;
    private int xInitialPosition;
    private float fontSize;
    private PDFont font;
    private Color fontColor;

    public MyTableClass(PDDocument document, PDPageContentStream contentStream){

        this.document = document;
        this.contentStream = contentStream;

    }

    void setTable(int[] colWidth, int cellHeight, int xPosition, int yPosition){
        this.colWidth = colWidth;
        this.cellHeight = cellHeight;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        xInitialPosition = xPosition;
    }

    void setTableFont(PDFont font, float fontSize, Color fontColor){
        this.font = font;
        this.fontSize = fontSize;
        this.fontColor = fontColor;
    }

    void addCell(String text, Color fillColor) throws IOException {
        contentStream.setStrokingColor(1f);

        if(fillColor != null){
            contentStream.setNonStrokingColor(fillColor);
        }

        contentStream.addRect(xPosition, yPosition, colWidth[colPosition], cellHeight);

        if(fillColor == null){
            contentStream.stroke();
        }else{
            contentStream.fillAndStroke();
        }

        contentStream.beginText();
        contentStream.setNonStrokingColor(fontColor);

        if(colPosition == 4 || colPosition == 2){
            float fontWidth = font.getStringWidth(text)/1000 * fontSize;
            contentStream.newLineAtOffset(xPosition+colWidth[colPosition]-20-fontWidth, yPosition+10);
        }else{
            contentStream.newLineAtOffset(xPosition+20, yPosition+10);
        }

        contentStream.showText(text);
        contentStream.endText();

        xPosition = xPosition + colWidth[colPosition];
        colPosition++;

        if(colPosition == colWidth.length){
            colPosition = 0;
            xPosition = xInitialPosition;
            yPosition-=cellHeight;
        }
    }
}
