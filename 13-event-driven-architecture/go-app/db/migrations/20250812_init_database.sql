-- +goose Up
CREATE TABLE IF NOT EXISTS clients (
    id         VARCHAR(255)  NOT NULL,
    name       VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_clients_email (email)
    );

CREATE TABLE IF NOT EXISTS accounts (
    id         VARCHAR(255)   NOT NULL,
    client_id  VARCHAR(255)   NOT NULL,
    balance    DECIMAL(19,2) NOT NULL DEFAULT 0,
    created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_accounts_client_id (client_id),
    CONSTRAINT fk_accounts_client
    FOREIGN KEY (client_id) REFERENCES clients(id)
    ON UPDATE RESTRICT ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS transactions (
    id              VARCHAR(255)   NOT NULL,
    account_id_from VARCHAR(255)   NOT NULL,
    account_id_to   VARCHAR(255)   NOT NULL,
    amount          DECIMAL(19,2) NOT NULL,
    created_at      DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_tx_from (account_id_from),
    KEY idx_tx_to   (account_id_to),
    CONSTRAINT fk_tx_from FOREIGN KEY (account_id_from) REFERENCES accounts(id)
    ON UPDATE RESTRICT ON DELETE RESTRICT,
    CONSTRAINT fk_tx_to   FOREIGN KEY (account_id_to)   REFERENCES accounts(id)
    ON UPDATE RESTRICT ON DELETE RESTRICT
);

INSERT INTO clients
(id, name, email, created_at)
VALUES('4a2e28a1-78ae-4387-b90b-757babc3d837', 'Richard Doe', 'richard@gmail.com', '2025-08-12 18:42:55') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO clients
(id, name, email, created_at)
VALUES('65bb5672-32ae-4dc1-8a42-2f0cac36933b', 'Mary Doe ', 'mary@gmail.com', '2025-08-12 18:43:15') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO clients
(id, name, email, created_at)
VALUES('81aac640-da7c-431b-9b4b-27a19573e896', 'Marcel Doe', 'marcel@gmail.com', '2025-08-12 18:48:03') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO clients
(id, name, email, created_at)
VALUES('8b5130f5-5b73-42fa-b380-b52e41345a63', 'John Doe', 'john@gmail.com.com', '2025-08-12 18:42:55') ON DUPLICATE KEY UPDATE id = id;


INSERT INTO accounts
(id, client_id, balance, created_at)
VALUES('bde4accd-9a4b-462f-bd02-4f3aa080c598', '65bb5672-32ae-4dc1-8a42-2f0cac36933b', 5000.00, '2025-08-12 18:43:56') ON DUPLICATE KEY UPDATE id = id;
INSERT INTO accounts
(id, client_id, balance, created_at)
VALUES('d4664cfc-e04f-4c7c-93e6-a3df3bc209e0', '8b5130f5-5b73-42fa-b380-b52e41345a63', 10000.00, '2025-08-12 18:44:07') ON DUPLICATE KEY UPDATE id = id;
-- +goose Down