<?php

namespace App\Models;

use App\Models\BaseModel;

class Attribute extends BaseModel
{
    protected static string $table = 'attributes';
    public static function validateSelectedAttributes(string $productId, array $selectedAttributes): bool
    {
        $productAttributes = Product::fetchProductAttributes($productId);

        $validAttributes = [];
        foreach ($productAttributes as $attribute) {
            $validAttributes[$attribute['id']] = $attribute;
        }

        foreach ($selectedAttributes as $selectedAttribute) {
            if (!isset($validAttributes[$selectedAttribute['id']])) {
                return false;
            }
            $isValueValid = false;
            foreach ($validAttributes[$selectedAttribute['id']]['items'] as $item) {
                if ($item['value'] === $selectedAttribute['value']) {
                    $isValueValid = true;
                    break;
                }
            }

            if (!$isValueValid) {
                return false;
            }
        }

        return true;
    }
}
