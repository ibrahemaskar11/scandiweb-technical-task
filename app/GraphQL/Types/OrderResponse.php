<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class OrderResponse extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'OrderResponse',
            'fields' => [
                'message' => Type::nonNull(Type::string()),
                'order' => Type::int(),
            ],
        ]);
    }
}
