package entity

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestCreateClient(t *testing.T) {
	client, err := NewClient("John Doe", "john@doe.com")
	assert.Nil(t, err)
	assert.NotNil(t, client)
	assert.NotEmpty(t, client.ID)
	assert.Equal(t, "John Doe", client.Name)
	assert.Equal(t, "john@doe.com", client.Email)
}

func TestCreateClientWhenArgsAreInvalid(t *testing.T) {
	client, err := NewClient("", "")
	assert.NotNil(t, err)
	assert.Nil(t, client)
}

func TestUpdateClient(t *testing.T) {
	client, _ := NewClient("John Doe", "john@doe.com")
	err := client.Update("John Doe Alterado", "johndoe@gmail.com")
	assert.Nil(t, err)
	assert.NotNil(t, client)
	assert.NotEmpty(t, client.ID)
	assert.Equal(t, "John Doe Alterado", client.Name)
	assert.Equal(t, "johndoe@gmail.com", client.Email)
}

func TestUpdateClientWhenArgsAreINvalid(t *testing.T) {
	client, _ := NewClient("John Doe", "john@doe.com")
	err := client.Update("", "johndoe@gmail.com")
	assert.NotNil(t, err, "Name is required")
}

func TestAddAccount(t *testing.T) {
	client, _ := NewClient("John Doe", "dsd@dsa.com")
	account := NewAccount(client)
	err := client.AddAccount(account)
	assert.Nil(t, err)
	assert.NotNil(t, client.Accounts)
	assert.Equal(t, 1, len(client.Accounts))
}
