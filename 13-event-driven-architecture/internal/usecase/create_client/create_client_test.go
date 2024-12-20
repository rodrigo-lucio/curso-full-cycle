package create_client

import (
	"github.com.br/devfullcycle/fc-ms-wallet/internal/entity"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"testing"
)

type ClientGatewayMock struct {
	mock.Mock
}

func (m *ClientGatewayMock) Get(id string) (*entity.Client, error) {
	args := m.Called(id)
	return args.Get(0).(*entity.Client), args.Error(1)
}

func (m *ClientGatewayMock) Save(client *entity.Client) error {
	args := m.Called(client)
	return args.Error(0)
}

func TestCreateClientUseCase_Execute(t *testing.T) {
	m := &ClientGatewayMock{}
	m.On("Create", mock.Anything).Return(nil)
	uc := NewCreateClientUseCase(m)
	output, err := uc.Execute(CreateClientInputDTO{
		Name:  "Rodrigo Lucio",
		Email: "luciodigo@gmail.com",
	})
	assert.Nil(t, err)
	assert.NotNil(t, output)
	assert.NotEmpty(t, output.ID)
	assert.Equal(t, "Rodrigo Lucio", output.Name)
	assert.Equal(t, "luciodigo@gmail.com", output.Email)
	m.AssertExpectations(t)
	m.AssertNumberOfCalls(t, "Create", 1)
}
