<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class Product extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Product',
            'fields' => [
                'id' => Type::nonNull(Type::string()),
                'name' => Type::nonNull(Type::string()),
                'inStock' => Type::boolean(),
                'gallery' => Type::listOf(Type::string()),
                'description' => Type::string(),
                'category' => Type::nonNull(Type::string()),
                'attributes' => Type::listOf(new AttributeSet()),
                'prices' => Type::listOf(new Price()),
                'brand' => Type::nonNull(Type::string()),
            ],
        ]);
    }
}
