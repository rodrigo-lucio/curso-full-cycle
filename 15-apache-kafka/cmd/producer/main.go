package main

import (
	"github.com/confluentinc/confluent-kafka-go/kafka"
	"log"
)

func main() {
	deliveryChan := make(chan kafka.Event)
	producer := NewKafkaProducer()
	//Publish("mensagem sem key, vai para qualquer partição", "teste", producer, nil, deliveryChan)
	Publish("{mensagem com key para enviar sempre para a mesma partição e garantir a ordem}",
		"teste",
		producer,
		[]byte("transacao"),
		deliveryChan)
	DeliveryReport(deliveryChan)

	//Forma síncrona
	//event := <-deliveryChan
	//message := event.(*kafka.Message)
	//if message.TopicPartition.Error != nil {
	//	fmt.Println("Erro ao enviar")
	//} else {
	//	fmt.Println("Mensagem enviada: ", message.TopicPartition)
	//}
	//
	producer.Flush(10000)
}

func NewKafkaProducer() *kafka.Producer {
	configMap := &kafka.ConfigMap{
		"bootstrap.servers":   "15-apache-kafka-kafka-1:9092",
		"delivery.timeout.ms": "0",   //timeout de confirmação de entrega
		"acks":                "all", //confirmação de entrega de todas as réplicas, pode ser 0, 1 ou all. 0 é sem confirmação e 1 é apenas no líder
		"enable.idempotence":  true,  //habilita idempotência para evitar duplicação de mensagens, o acks deve ser "all" para funcionar corretamente
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
