<?php

namespace App\GraphQL\Resolvers;

use App\Models\Attribute;
use App\Models\Order;
use App\Models\Product;

class OrdersResolver
{
    public static function store(array $orderInput): array
    {
        try {

            if (!isset($orderInput['total'], $orderInput['currency_id'], $orderInput['items'])) {
                throw new \InvalidArgumentException("Invalid order details");
            }
            self::validateItems($orderInput['items']);
            $orderId = Order::create([
                "total" => $orderInput['total'],
                "currency_id" => $orderInput['currency_id']
            ], $orderInput['items']);
            return [
                "message" => "Order placed successfully!",
                "order" => $orderId
            ];
        } catch (\InvalidArgumentException $e) {
            header(400);
            header('Content-Type: application/json');
            echo json_encode(['error' => $e->getMessage()]);
            die();
        } catch (\RuntimeException $e) {
            header(404);
            header('Content-Type: application/json');
            echo json_encode(['error' => $e->getMessage()]);
            die();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
    public static function validateItems($items)
    {
        foreach ($items as $item) {
            if (!isset($item['id'], $item['quantity'], $item['paid_amount'], $item['paid_currency'])) {
                throw new \InvalidArgumentException("Invalid item details");
            }
            if (!Product::exists($item['id'])) {
                throw new \RuntimeException("Product not found");
            }
            if (!Product::isInStock($item['id'])) {
                throw new \RuntimeException("Product not in stock");
            }

            if (!Attribute::validateSelectedAttributes($item['id'], $item['selected_attributes'])) {
                throw new \InvalidArgumentException("Invalid selected attributes for product ID {$item['id']}");
            }
        }
        return true;
    }
}
