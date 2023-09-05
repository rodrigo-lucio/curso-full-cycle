package application_test

import (
	"github.com/codedu/go-hexagonal/application"
	mock_application "github.com/codedu/go-hexagonal/application/mocks"
	"github.com/golang/mock/gomock"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestProduct_Get(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish() //defer é a mesma coisa que eu chamasse esse finish no final do método, mas vc pode colocar ele mais pra cima.

	product := application.NewProduct()
	product.Name = "IPHONE"
	product.Price = 21311
	persistence := mock_application.NewMockProductPersistenceInterface(ctrl)
	persistence.EXPECT().Get(product.GetID()).Return(product, nil).AnyTimes()

	service := application.ProductService{Persistence: persistence}

	result, err := service.Get(product.ID)
	require.Nil(t, err)
	require.Equal(t, product, result)
	require.Equal(t, product.ID, result.GetID())
	require.Equal(t, product.Name, result.GetName())
	require.Equal(t, product.Price, result.GetPrice())
	require.Equal(t, product.Status, result.GetStatus())
}

func TestProductService_Create(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	product := application.NewProduct()
	product.Name = "IPHONE"
	product.Price = 21311

	persistence := mock_application.NewMockProductPersistenceInterface(ctrl)
	persistence.EXPECT().Save(gomock.Any()).Return(product, nil).AnyTimes()

	service := application.ProductService{Persistence: persistence}

	result, err := service.Create(product.GetName(), product.GetPrice())
	require.Nil(t, err)
	require.Equal(t, product, result)
	require.Equal(t, product.ID, result.GetID())
	require.Equal(t, product.Name, result.GetName())
	require.Equal(t, product.Price, result.GetPrice())
	require.Equal(t, product.Status, result.GetStatus())
}

func TestProductService_EnableDisable(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	product := mock_application.NewMockProductInterface(ctrl)
	product.EXPECT().Enable().Return(nil)
	product.EXPECT().Disable().Return(nil)

	persistence := mock_application.NewMockProductPersistenceInterface(ctrl)
	persistence.EXPECT().Save(gomock.Any()).Return(product, nil).AnyTimes()

	service := application.ProductService{Persistence: persistence}

	result, err := service.Enable(product)
	require.Nil(t, err)
	require.Equal(t, product, result)

	result, err = service.Disable(product)
	require.Nil(t, err)
	require.Equal(t, product, result)

}
