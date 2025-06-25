package main

import (
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"log"
)

func main() {
	deliveryChan := make(chan kafka.Event)
	producer := NewKafkaProducer()
	Publish("mensagem baba", "teste", producer, nil, deliveryChan)

	go DeliveryReport(deliveryChan)
	//Forma síncrona
	//event := <-deliveryChan
	//message := event.(*kafka.Message)
	//if message.TopicPartition.Error != nil {
	//	fmt.Println("Erro ao enviar")
	//} else {
	//	fmt.Println("Mensagem enviada: ", message.TopicPartition)
	//}
	//
	//producer.Flush(1000)
}

func NewKafkaProducer() *kafka.Producer {
	configMap := &kafka.ConfigMap{
		"bootstrap.servers": "15-apache-kafka-kafka-1:9092",
	}
	producer, err := kafka.NewProducer(configMap)
	if err != nil {
		log.Println(err.Error())
	}
	return producer
}

func Publish(msg string, topic string, producer *kafka.Producer, key []byte, deliveryChan chan kafka.Event) error {
	message := &kafka.Message{
		Value: []byte(msg),
		TopicPartition: kafka.TopicPartition{
			Topic:     &topic,
			Partition: kafka.PartitionAny,
		},
		Key: key,
	}
	err := producer.Produce(message, deliveryChan)
	if err != nil {
		log.Println(err.Error())
		return err
	}
	return nil
}

func DeliveryReport(deliveryChan chan kafka.Event) {
	for event := range deliveryChan {
		switch e := event.(type) {
		case *kafka.Message:
			if e.TopicPartition.Error != nil {
				log.Printf("Mensagem falhou: %v\n", e.TopicPartition)
			} else {
				log.Printf("Mensagem enviada: %v\n", e.TopicPartition)
				//anotar no banco de dados que a mensagem foi enviada
				//confirma que a transferencia ocorreu
				//OBS: Confirmação de entrega daqui para o Kafka
			}
		default:
			log.Printf("Evento desconhecido: %v\n", e)
		}
	}
}
