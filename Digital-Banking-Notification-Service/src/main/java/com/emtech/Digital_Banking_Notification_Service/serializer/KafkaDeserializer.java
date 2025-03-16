package com.emtech.Digital_Banking_Notification_Service.serializer;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.kafka.common.serialization.Deserializer;
import java.util.Map;

public class KafkaDeserializer<T> implements Deserializer<T> {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private Class<T> type;

    @Override
    public void configure(Map<String, ?> configs, boolean isKey) {
        this.type = (Class<T>) configs.get("value.deserializer");
    }

    @Override
    public T deserialize(String topic, byte[] data) {
        try {
            return objectMapper.readValue(data, type);
        } catch (Exception e) {
            throw new RuntimeException("Error deserializing Kafka message", e);
        }
    }
}
