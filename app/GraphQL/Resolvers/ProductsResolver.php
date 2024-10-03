<?php

namespace App\GraphQL\Resolvers;

use App\Models\Product;

class ProductsResolver
{
    public static function index()
    {
        return Product::all();
    }
    public static function filter(?string $category)
    {
        return Product::filterByCategory($category);
    }
    public static function show($id)
    {   
        return Product::find($id);
    }
}
