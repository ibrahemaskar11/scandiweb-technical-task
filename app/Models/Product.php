<?php

namespace App\Models;

use App\Models\BaseModel;

class Product extends BaseModel
{
    protected static string $table = 'products';

    public static function find($id): ?array
    {
        $instance = new static();

        $product = $instance->db->query(
            "SELECT * FROM " . static::$table . " WHERE id = :id",
            ['id' => $id]
        )->fetch();

        if ($product) {
            return $instance->populateProducts($product);
        }

        return null;
    }
    public static function all(): array
    {
        $instance = new static();
        $products = [];

        $results = $instance->db->query(
            "SELECT * FROM " . static::$table
        )->fetchAll();

        foreach ($results as $product) {
            $products[] = $instance->populateProducts($product);
        }


        return $products;
    }

    public static function filterByCategory(string $category = null): array
    {
        $instance = new static();
        $results = [];
        $products = [];
        if ($category === 'all' || !$category || is_null($category)) {
            return self::all();
        } else {
            $results = $instance->db->query(
                "SELECT * FROM " . static::$table . " WHERE category = :category",
                ['category' => $category]
            )->fetchAll();
        }
        foreach ($results as $product) {
            $products[] = $instance->populateProducts($product);
        }
        return $products;
    }
    protected static function populateProducts($product)
    {
        try {
            $instance = new static();
            return [
                'id' => $product['id'],
                'name' => $product['name'],
                'inStock' => (bool) $product['inStock'],
                'gallery' => $instance->parse_gallery($product['gallery']) ?? null,
                'description' => $product['description'],
                'category' => $product['category'],
                'attributes' => $instance->fetchProductAttributes($product['id']) ?? null,
                'prices' => $instance->fetchProductPrices($product['id']) ?? null,
                'brand' => $product['brand'],
            ];
        } catch (\Exception $e) {
            http_response_code(500);
            echo json_encode(
                [
                    'error' => 'failed to populate product: ' . $e->getMessage(),
                ]
            );
        }
    }
    protected function parse_gallery(string $galleryJson): array
    {
        return json_decode($galleryJson, true);
    }
    protected function fetchProductPrices(string $id): array
    {

        $prices = $this->db->query(
            "SELECT PP.amount, C.*
             FROM prices PP
             JOIN currencies C ON PP.currency_id = C.label
             WHERE PP.product_id = :productId",
            ['productId' => $id]
        )->fetchAll();

        $formattedPrices = [];
        foreach ($prices as $price) {
            $formattedPrices[] = [
                'amount' => (float) $price['amount'],
                'currency' => [
                    'label' => $price['label'],
                    'symbol' => $price['symbol'],
                ],
            ];
        }

        return $formattedPrices;
    }
    public static function fetchProductAttributes(string $id): array
    {
        $instance = new static();
        $attributes = $instance->db->query(
            "SELECT A.id, A.name, A.type, PA.*
         FROM product_attributes PA
         JOIN attributes A ON PA.attribute_id = A.id
         WHERE PA.product_id = :productId",
            ['productId' => $id]
        )->fetchAll();

        $attributeSets = [];
        foreach ($attributes as $attribute) {
            $attributeId = $attribute['name'];

            if (!isset($attributeSets[$attributeId])) {
                $attributeSets[$attributeId] = [
                    'id' => $attributeId,
                    'items' => [],
                    'name' => $attribute['name'],
                    'type' => $attribute['type'],
                ];
            }
            $attributeSets[$attributeId]['items'][] = [
                'displayValue' => $attribute['displayValue'],
                'value' => $attribute['value'],
                'id' => $attribute['id'],
                "attribute_id" => $attribute['attribute_id']
            ];
        }

        return array_values($attributeSets);
    }
    public static function exists(string $id): bool
    {
        $result = self::fetchById($id);
        return !empty($result);
    }

    public static function isInStock(string $id): bool
    {
        $product = self::fetchById($id);
        return !empty($product) && (bool)$product['inStock'];
    }
}
