package com.demo.repository;

import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.JAXBException;
import jakarta.xml.bind.Marshaller;
import jakarta.xml.bind.Unmarshaller;
import org.springframework.stereotype.Component;

import java.io.File;

public abstract class XmlRepository<T> {

    private final Class<T> type;
    private final String filePath;

    public XmlRepository(Class<T> type, String filePath) {
        this.type = type;
        this.filePath = filePath;
    }

    public T read() {
        try {
            File file = new File(filePath);
            if (!file.exists()) {
                return null;
            }
            JAXBContext context = JAXBContext.newInstance(type);
            Unmarshaller unmarshaller = context.createUnmarshaller();
            return type.cast(unmarshaller.unmarshal(file));
        } catch (JAXBException e) {
            throw new RuntimeException("Error reading XML file: " + filePath, e);
        }
    }

    public void write(T data) {
        try {
            File file = new File(filePath);
            JAXBContext context = JAXBContext.newInstance(type);
            Marshaller marshaller = context.createMarshaller();
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
            marshaller.marshal(data, file);
        } catch (JAXBException e) {
            throw new RuntimeException("Error writing XML file: " + filePath, e);
        }
    }
}
