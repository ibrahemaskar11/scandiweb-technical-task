<?php

namespace App\GraphQL;

use App\GraphQL\Resolvers\OrdersResolver;
use App\GraphQL\Types\OrderInput;
use App\GraphQL\Types\OrderResponse;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;

class Mutation
{
    public static function defineMutations()
    {
        return new ObjectType([
            'name' => 'Mutation',
            'fields' => [
                'placeOrder' => [
                    'type' => new OrderResponse(),
                    'args' => [
                        'OrderInput' => Type::nonNull(new OrderInput()),
                    ],
                    'resolve' => static fn($rootValue, array $args) => OrdersResolver::store($args['OrderInput']),
                ],
            ],
        ]);
    }
}
