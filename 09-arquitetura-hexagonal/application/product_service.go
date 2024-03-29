package application

import "fmt"

type ProductService struct {
	Persistence ProductPersistenceInterface
}

func NewProductService(persistence ProductPersistenceInterface) *ProductService {
	return &ProductService{persistence}
}

func (s *ProductService) Get(id string) (ProductInterface, error) {
	product, err := s.Persistence.Get(id)
	if err != nil {
		return nil, err
	}
	return product, nil
}

func (s *ProductService) Create(name string, price float64) (ProductInterface, error) {
	product := NewProduct()
	product.Name = name
	product.Price = price
	_, err := product.IsValid()
	if err != nil {
		return &Product{}, err
	}

	result, err := s.Persistence.Save(product)
	if err != nil {
		return &Product{}, err
	}
	return result, nil
}

func (s *ProductService) Update(id string, name string, price float64) (ProductInterface, error) {

	productDb, err := s.Get(id)
	if err != nil {
		return &Product{}, err
	}

	productUpdate := NewProduct()
	productUpdate.ID = productDb.GetID()
	productUpdate.Name = name
	productUpdate.Price = price
	productUpdate.Status = productDb.GetStatus()

	_, err = productUpdate.IsValid()
	if err != nil {
		return &Product{}, err
	}

	result, err := s.Persistence.Save(productUpdate)
	if err != nil {
		return &Product{}, err
	}
	return result, nil
}

func (s *ProductService) Enable(product ProductInterface) (ProductInterface, error) {
	err := product.Enable()
	if err != nil {
		return &Product{}, err
	}
	fmt.Println(product)
	result, err := s.Persistence.Save(product)
	if err != nil {
		return &Product{}, err
	}
	return result, nil
}

func (s *ProductService) Disable(product ProductInterface) (ProductInterface, error) {
	err := product.Disable()
	if err != nil {
		return &Product{}, err
	}

	result, err := s.Persistence.Save(product)
	if err != nil {
		return &Product{}, err
	}
	return result, nil
}
