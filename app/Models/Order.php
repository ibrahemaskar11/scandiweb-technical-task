<?php

namespace App\Models;

use Exception;

class Order extends BaseModel
{
    protected static string $table = 'orders';
    public static function create($order_details, $productsDetails)
    {
        try {
            $order = self::add([
                "total" => $order_details['total'],
                "currency_id" => $order_details['currency_id']
            ]);
            if (!isset($order)) {
                throw new Exception('Order not created');
            }
            foreach ($productsDetails as $product) {
                OrderItem::add([
                    "order_id" => $order,
                    "product_id" => $product['id'],
                    "quantity" => $product['quantity'],
                    "paid_amount" => $product['paid_amount'],
                    "paid_currency" => $product["paid_currency"],
                    "selected_attributes" => json_encode($product["selected_attributes"])
                ]);
            }

            return $order;
        } catch (Exception $e) {
            return [
                "error" => $e->getMessage()
            ];
        }
    }
}
