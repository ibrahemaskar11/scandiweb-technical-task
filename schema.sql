-- DROP DATABASE IF EXISTS u947154701_test;
-- CREATE DATABASE u947154701_test;
USE u947154701_test;

-- CREATING TABLES --

CREATE TABLE categories (
    name VARCHAR(255) PRIMARY KEY
);

CREATE TABLE products (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    inStock BOOLEAN DEFAULT TRUE,
    gallery JSON,
    FOREIGN KEY (category) REFERENCES categories(name) ON DELETE CASCADE
);

CREATE TABLE attributes (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    CONSTRAINT unique_attribute UNIQUE (name, type)
);

CREATE TABLE product_attributes (
    id VARCHAR(255) PRIMARY KEY,
    displayValue VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    product_id VARCHAR(255) NOT NULL,
    attribute_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (attribute_id) REFERENCES attributes(id) ON DELETE CASCADE,
    CONSTRAINT unique_product_attribute_value UNIQUE (product_id, attribute_id, value)
);

CREATE TABLE currencies (
    label VARCHAR(255) PRIMARY KEY,
    symbol VARCHAR(255) NOT NULL
);

CREATE TABLE prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id VARCHAR(255) NOT NULL,
    currency_id VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (currency_id) REFERENCES currencies(label) ON DELETE CASCADE,
    CONSTRAINT unique_product_currency_price UNIQUE (product_id, currency_id)
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    total DECIMAL(10, 2) NOT NULL,
    order_status ENUM('pending', 'processed', 'shipped', 'fulfilled', 'cancelled') NOT NULL,
    currency_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (currency_id) REFERENCES currencies(label) ON DELETE CASCADE
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id VARCHAR(255),
    quantity INT NOT NULL DEFAULT 1,
    paid_amount DECIMAL(10, 2) NOT NULL,
    paid_currency VARCHAR(255) NOT NULL,
    selected_attributes JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
