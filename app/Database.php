<?php

namespace App;

use PDO;
use PDOException;

class Database
{
    private PDO $connection;
    private $statement;

    public function __construct()
    {
        $dbConfig = [
            'driver' => 'mysql',
            'host' => $_ENV['DB_HOST'],
            'database' => $_ENV['DB_NAME'],
            'username' => $_ENV['DB_USER'],
            'password' => $_ENV['DB_PASS'],
            'charset' => 'utf8mb4',
        ];
        $dsn = "{$dbConfig['driver']}:host={$dbConfig['host']};dbname={$dbConfig['database']};charset={$dbConfig['charset']}";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        try {
            $this->connection = new PDO($dsn, $dbConfig['username'], $dbConfig['password'], $options);
        } catch (PDOException $e) {
            die('Connection failed: ' . $e->getMessage());
        }
    }

    // Execute a raw query
    public function query(string $sql, array $params = [])
    {
        $this->statement = $this->connection->prepare($sql);
        $this->statement->execute($params);
        return $this;
    }

    // Fetch single result
    public function fetch()
    {
        return $this->statement->fetch();
    }

    // Fetch all results
    public function fetchAll()
    {
        return $this->statement->fetchAll();
    }

    // Get the last inserted ID
    public function getLastInsertId(): int
    {
        return (int)$this->connection->lastInsertId();
    }
    // Get the number of affected rows
    public function getRowCount(): int
    {
        return $this->statement->rowCount();
    }
    // Transaction methods
    public function beginTransaction()
    {
        $this->connection->beginTransaction();
    }

    public function commit()
    {
        $this->connection->commit();
    }

    public function rollback()
    {
        $this->connection->rollBack();
    }
}
