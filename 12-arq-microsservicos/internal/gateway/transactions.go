package gateway

import "github.com.br/devfullcycle/fc-ms-wallet/internal/entity"

type TransactionGateway interface {
	Create(transation *entity.Transaction) error
}
