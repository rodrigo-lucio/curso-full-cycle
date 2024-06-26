package entity

import (
	"errors"
	"github.com/google/uuid"
	"time"
)

type Client struct {
	ID        string
	Name      string
	Email     string
	Accounts  []*Account
	CreatedAt time.Time
	UpdatedAt time.Time
}

func NewClient(name, email string) (*Client, error) {
	client := &Client{
		ID:        uuid.New().String(),
		Name:      name,
		Email:     email,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
	err := client.Validate()
	if err != nil {
		return nil, err
	}
	return client, nil
}

func (client *Client) Validate() error {
	if client.Name == "" {
		return errors.New("Name is required")
	}
	if client.Email == "" {
		return errors.New("Email is required")
	}
	return nil
}

func (client *Client) Update(name string, email string) error {
	client.Name = name
	client.Email = email
	err := client.Validate()
	client.UpdatedAt = time.Now()
	if err != nil {
		return err
	}
	return nil
}

func (client *Client) AddAccount(account *Account) error {
	if account.Client.ID != client.ID {
		return errors.New("Account does not belong to this client")
	}
	client.Accounts = append(client.Accounts, account)
	return nil
}
