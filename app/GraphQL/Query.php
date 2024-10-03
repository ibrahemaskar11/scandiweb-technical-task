<?php

namespace App\GraphQL;

use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ObjectType;
use App\GraphQL\Types\Category;
use App\GraphQL\Types\Product;
use App\GraphQL\Resolvers\CategoriesResolver;
use App\GraphQL\Resolvers\ProductsResolver;

class Query
{
    public static function defineQueries()
    {
        $categoryType = new Category();
        $productType = new Product();

        return new ObjectType([
            'name' => 'Query',
            'fields' => [
                'categories' => [
                    'type' => Type::listOf($categoryType), 
                    'resolve' => function () {
                        return CategoriesResolver::index();
                    },
                ],
                "products" => [
                    'type' => Type::listOf($productType), 
                    "args" => [
                        "category" => ['type' => Type::string()]
                    ],
                    "resolve" => function ($rootValue, array $args) {
                        return ProductsResolver::filter($args['category'] ?? null);
                    }
                ],
                'product' => [
                    'type' => $productType, 
                    'args' => [
                        'id' => ['type' => Type::nonNull(Type::string())],
                    ],
                    'resolve' => function ($rootValue, array $args) {
                        return ProductsResolver::show($args['id']);
                    },
                ],
            ],
        ]);
    }
}
