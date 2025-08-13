package entity

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestCreateTransaction(t *testing.T) {
	client1, _ := NewClient("John Doe", "jon@jon.com")
	account1 := NewAccount(client1)
	client2, _ := NewClient("Jane Doe", "jane@jane.com")
	account2 := NewAccount(client2)

	account1.Credit(1000)
	account2.Credit(500)

	transaction, err := NewTransaction(account1, account2, 100)
	assert.Nil(t, err)
	assert.NotNil(t, transaction)
	assert.NotEmpty(t, transaction.ID)
	assert.Equal(t, account1.ID, transaction.AccountFrom.ID)
	assert.Equal(t, account2.ID, transaction.AccountTo.ID)
	assert.Equal(t, 900.0, transaction.AccountFrom.Balance)
	assert.Equal(t, 600.0, transaction.AccountTo.Balance)
}

func TestCreateTransactionWithInsufficientBalance(t *testing.T) {
	client1, _ := NewClient("John Doe", "jon@jon.com")
	account1 := NewAccount(client1)
	client2, _ := NewClient("Jane Doe", "jane@jane.com")
	account2 := NewAccount(client2)

	account1.Credit(1000)
	account2.Credit(500)

	transaction, err := NewTransaction(account1, account2, 2000)
	assert.NotNil(t, err)
	assert.Error(t, err, "Insufficient balance")
	assert.Nil(t, transaction)
	assert.Equal(t, 1000.0, account1.Balance)
	assert.Equal(t, 500.0, account2.Balance)
}

func TestCreateTransactionWhenAmountIsZero(t *testing.T) {
	client1, _ := NewClient("John Doe", "jon@jon.com")
	account1 := NewAccount(client1)
	client2, _ := NewClient("Jane Doe", "jane@jane.com")
	account2 := NewAccount(client2)

	transaction, err := NewTransaction(account1, account2, 0)
	assert.NotNil(t, err)
	assert.Error(t, err, "Amount must be greater than zero")
	assert.Nil(t, transaction)
}

func TestCreateTransactionWhenAmountIsNegative(t *testing.T) {
	client1, _ := NewClient("John Doe", "jon@jon.com")
	account1 := NewAccount(client1)
	client2, _ := NewClient("Jane Doe", "jane@jane.com")
	account2 := NewAccount(client2)

	transaction, err := NewTransaction(account1, account2, -123)
	assert.NotNil(t, err)
	assert.Error(t, err, "Amount must be greater than zero")
	assert.Nil(t, transaction)
}
