package entity

import (
	"errors"
	"github.com/google/uuid"
	"time"
)

type Transaction struct {
	ID          string
	AccountFrom *Account
	AccountTo   *Account
	Amount      float64
	CreatedAt   time.Time
}

func NewTransaction(accountFrom *Account, accountTo *Account, amount float64) (*Transaction, error) {
	transaction := &Transaction{
		ID:          uuid.New().String(),
		AccountFrom: accountFrom,
		AccountTo:   accountTo,
		Amount:      amount,
		CreatedAt:   time.Now(),
	}
	err := transaction.Validate()
	if err != nil {
		return nil, err
	}
	transaction.Commit()
	return transaction, nil
}

func (transaction *Transaction) Commit() {
	transaction.AccountFrom.Debit(transaction.Amount)
	transaction.AccountTo.Credit(transaction.Amount)
}

func (transaction *Transaction) Validate() error {
	if transaction.Amount <= 0 {
		return errors.New("Amount must be greater than zero")
	}

	if transaction.AccountFrom.Balance < transaction.Amount {
		return errors.New("Insufficient balance")
	}

	return nil
}
