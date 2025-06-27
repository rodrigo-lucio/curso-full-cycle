package main

import (
	"fmt"
	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func main() {
	configMap := kafka.ConfigMap{
		"bootstrap.servers": "15-apache-kafka-kafka-1:9092",
		"client.id":         "goapp-consumer",
		"group.id":          "goapp-group",
		"auto.offset.reset": "earliest", // Inicia a leitura do início do tópico
	}

	c, err := kafka.NewConsumer(&configMap)
	if err != nil {
		fmt.Println("Error creating consumer:", err.Error())
	}

	topics := []string{"teste"}
	c.SubscribeTopics(topics, nil)

	for {
		msg, err := c.ReadMessage(-1)
		if err == nil {
			fmt.Println("Received message:", string(msg.Value),
				"on topic:", *msg.TopicPartition.Topic,
				"at partition:", msg.TopicPartition.Partition,
				"offset:", msg.TopicPartition.Offset)
		}

	}
}
