<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class Price extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            "name" => "Price",
            "fields" => [
                'amount' => Type::nonNull(Type::float()),
                'currency' => new Currency(),
            ]
        ]);
    }
}
