FROM golang:1.20

WORKDIR /app/go-app/cmd/walletcore

RUN apt-get update && apt-get install -y librdkafka-dev

CMD ["go", "run", "main.go"]
