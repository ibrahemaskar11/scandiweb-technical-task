<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class ItemAttributeInput extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            "name" => "ItemAttributeInput",
            "fields" => [
                "id" => Type::nonNull(Type::string()),
                "value" => Type::nonNull(Type::string())
            ]
        ]);
    }

}
