<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class Category extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            "name" => "Category",
            "fields" => [
                'name' => Type::nonNull(Type::string()),
            ]
        ]);
    }
}
