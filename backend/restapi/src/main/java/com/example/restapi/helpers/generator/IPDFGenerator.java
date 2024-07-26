package com.example.restapi.helpers.generator;

import java.io.ByteArrayInputStream;
import java.io.IOException;

public interface IPDFGenerator {
    ByteArrayInputStream generate(String text) throws IOException;
}
