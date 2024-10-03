<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderItemInput extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            "name" => "OrderItemInput",
            "fields" => [
                "id" => Type::nonNull(Type::string()),
                "quantity" => Type::nonNull(Type::int()),
                "paid_amount" => Type::nonNull(Type::float()),
                "paid_currency" => Type::nonNull(Type::string()),
                "selected_attributes" => Type::listOf(new ItemAttributeInput())
            ]
        ]);
    }
}
