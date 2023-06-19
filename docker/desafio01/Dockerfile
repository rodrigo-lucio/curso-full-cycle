FROM golang:alpine3.18 as builder

WORKDIR /usr/scr/app

COPY full-cycle-rocks.go .

RUN go build full-cycle-rocks.go

FROM hello-world
COPY --from=builder /usr/scr/app/full-cycle-rocks .
ENTRYPOINT ["./full-cycle-rocks"]