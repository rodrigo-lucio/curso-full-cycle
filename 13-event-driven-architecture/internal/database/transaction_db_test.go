package database

import (
	"database/sql"
	"github.com.br/devfullcycle/fc-ms-wallet/internal/entity"
	"github.com/stretchr/testify/suite"
	"testing"
)

type TransactionDBTestSuite struct {
	suite.Suite
	db            *sql.DB
	client        *entity.Client
	client2       *entity.Client
	accountTo     *entity.Account
	accountFrom   *entity.Account
	transactionDB *TransactionDB
}

func (s *TransactionDBTestSuite) SetupTest() {
	db, err := sql.Open("sqlite3", ":memory:")
	s.Nil(err)
	s.db = db
	db.Exec("create table clients (id varchar(255), name varchar(255), email varchar(255), created_at date)")
	db.Exec("create table accounts (id varchar(255), client_id varchar(255), balance int, created_at date )")
	db.Exec("create table transactions (id varchar(255), account_id_from varchar(255), account_id_to varchar(255), amount int, created_at date)")

	client, err := entity.NewClient("Joe", "j@j.com")
	s.client = client
	s.Nil(err)

	client2, err := entity.NewClient("Joe2", "j2@j2.com")
	s.client2 = client2
	s.Nil(err)

	accountFrom := entity.NewAccount(s.client)
	accountFrom.Balance = 1000
	s.accountFrom = accountFrom

	accountTo := entity.NewAccount(s.client2)
	accountTo.Balance = 500
	s.accountTo = accountTo

	s.transactionDB = NewTransactionDB(db)
}

func (s *TransactionDBTestSuite) TearDownSuite() {
	defer s.db.Close()
	s.db.Exec("drop table clients")
	s.db.Exec("drop table accounts")
	s.db.Exec("drop table transactions")
}

func TestTransactionDBTestSuite(t *testing.T) {
	suite.Run(t, new(TransactionDBTestSuite))
}

func (s *TransactionDBTestSuite) TestCreate() {
	transaction, err := entity.NewTransaction(s.accountFrom, s.accountTo, 100)
	s.Nil(err)
	err = s.transactionDB.Create(transaction)
	s.Nil(err)
}
