package application_test

import (
	"github.com/codedu/go-hexagonal/application"
	uuid "github.com/satori/go.uuid"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestProduct_Enable(t *testing.T) {
	product := application.Product{}
	product.Name = "IPHONE"
	product.Status = application.DISABLED
	product.Price = 10

	err := product.Enable()
	require.Nil(t, err)

	product.Price = 0
	err = product.Enable()
	require.Equal(t, "the price must be greater than zero to enable the product", err.Error())
}

func TestProduct_Disabled(t *testing.T) {
	product := application.Product{}
	product.Name = "IPHONE"
	product.Status = application.DISABLED
	product.Price = 0

	err := product.Disabled()
	require.Nil(t, err)

	product.Price = 10
	err = product.Disabled()
	require.Equal(t, "the price must be zero in order to have the product disabled", err.Error())
}

func TestProduct_IsValid(t *testing.T) {
	product := application.Product{}
	product.ID = uuid.NewV4().String()
	product.Name = "IPHONE"
	product.Status = application.DISABLED
	product.Price = 2500

	_, err := product.IsValid()
	require.Nil(t, err)

	product.Status = "INVALID"
	_, err = product.IsValid()
	require.Equal(t, "the status must be enabled or disabled", err.Error())

	product.Status = application.ENABLED
	_, err = product.IsValid()
	require.Nil(t, err)

	product.Price = -10
	_, err = product.IsValid()
	require.Equal(t, "the price must be greter or equal zero", err.Error())

	product.Price = 2500
	_, err = product.IsValid()
	require.Nil(t, err)

	//Exemplo testando o govalidator
	product.ID = "aaa"
	_, err = product.IsValid()
	require.Equal(t, "ID: aaa does not validate as uuidv4", err.Error())

}
