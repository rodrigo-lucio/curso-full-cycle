package entity

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestCreateAccount(t *testing.T) {
	client, _ := NewClient("John Doe", "jon@jon.br")
	account := NewAccount(client)
	assert.NotNil(t, account)
	assert.Equal(t, client.ID, account.Client.ID)
}

func TestClientWithNilClient(t *testing.T) {
	account := NewAccount(nil)
	assert.Nil(t, account)
}

func TestCredit(t *testing.T) {
	client, _ := NewClient("John Doe", "jon@jon.br")
	account := NewAccount(client)
	account.Credit(100)
	assert.Equal(t, 100.0, account.Balance)

}

func TestAccount_Debit(t *testing.T) {
	client, _ := NewClient("John Doe", "jon@jon.br")
	account := NewAccount(client)
	account.Credit(100)
	account.Debit(50)
	assert.Equal(t, 50.0, account.Balance)
}
