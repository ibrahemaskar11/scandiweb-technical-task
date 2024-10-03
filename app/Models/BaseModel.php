<?php

namespace App\Models;

use App\Database;

abstract class BaseModel
{
    protected Database $db;
    protected static string $table;
    protected array $attributes = [];

    public function __construct()
    {
        $this->db = new Database();
        if (!isset(static::$table)) {
            static::$table = strtolower(static::class) . 's';
        }
    }

    public function __get($name)
    {
        return $this->attributes[$name] ?? null;
    }
    // Find a record by primary key
    public static function find($id): ?array
    {
        $instance = new static();
        return $instance->db->query("SELECT * FROM " . static::$table . " WHERE id = :id", ['id' => $id])->fetch();
    }

    // Fetch all records
    public static function all(): array
    {
        $instance = new static();
        return $instance->db->query("SELECT * FROM " . static::$table)->fetchAll();
    }

    // Insert a new record
    public static function add(array $data): int
    {
        $instance = new static();
        $columns = implode(',', array_keys($data));
        $placeholders = ':' . implode(', :', array_keys($data));
        $sql = "INSERT INTO " . static::$table . " ($columns) VALUES ($placeholders)";
        $db = $instance->db;
        $db->query($sql, $data);
        return $db->getLastInsertId();
    }

    // Update an existing record
    public static function update(int $id, array $data): bool
    {
        $instance = new static();
        $fields = implode(' = ?, ', array_keys($data)) . ' = ?';
        $sql = "UPDATE " . static::$table . " SET $fields WHERE id = ?";
        $instance->db->query($sql, array_merge(array_values($data), [$id]));
        return $instance->db->query("SELECT * FROM " . static::$table . " WHERE id = ?", [$id])->fetch();
    }

    // Delete a record
    public static function delete(int $id): bool
    {
        $instance = new static();
        $instance->db->query("DELETE FROM " . static::$table . " WHERE id = :id", ['id' => $id]);

        return $instance->db->getRowCount() > 0;
    }
    // Simple where condition
    public static function where(string $column, $value): array
    {
        $instance = new static();
        return $instance->db->query("SELECT * FROM " . static::$table . " WHERE $column = :value", ['value' => $value])->fetch();
    }

    // Get the first result (e.g. fetch one)
    public function first(): ?array
    {
        return $this->db->fetch();
    }
    public static function fetchById(string $id): ?array
    {
        $instance = new static();
        return $instance->db->query("SELECT * FROM " . static::$table . " WHERE id = :id", ['id' => $id])->fetch();
    }
}
