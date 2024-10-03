<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderInput extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            "name" => "OrderInput",
            "fields" => [
                "total" => Type::nonNull(Type::float()),
                "currency_id" => Type::nonNull(Type::string()),
                "items" => Type::listOf(Type::nonNull(new OrderItemInput())) 
            ]
        ]);
    }
}
