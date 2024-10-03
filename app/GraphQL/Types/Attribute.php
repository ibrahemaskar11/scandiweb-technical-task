<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class Attribute extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            "name" => "Attribute",
            "fields" => [
                "id" => Type::nonNull(Type::string()),
                "value" => Type::nonNull(Type::string()),
                'attribute_id' => Type::string(),
                'displayValue' => Type::nonNull(Type::string()),
            ]
        ]);
    }
}
