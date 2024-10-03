<?php

namespace App\GraphQL;

use RuntimeException;
use GraphQL\Type\Schema;
use App\GraphQL\Query;
use GraphQL\Type\SchemaConfig;
use GraphQL\GraphQL;

class Controller
{
    public static function handle()
    {
        try {
            $rawInput = file_get_contents('php://input');
            if ($rawInput === false) {
                throw new RuntimeException('Failed to get raw input');
            }

            $input = json_decode($rawInput, true);
            if ($input === null) {
                throw new RuntimeException('Invalid JSON input');
            }

            $query = $input['query'] ?? '';
            $variables = $input['variables'] ?? null;

            error_log("GraphQL Query: " . print_r($query, true));
            error_log("Variables: " . print_r($variables, true));

            $queryType = Query::defineQueries();
            $mutationType = Mutation::defineMutations();

            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery($queryType)
                    ->setMutation($mutationType) 
            );

            $result = GraphQL::executeQuery(
                $schema,
                $query,
                null,
                null,
                $variables
            );

            $output = $result->toArray();
        } catch (\Exception $e) {
            $output = [
                'errors' => [
                    ['message' => $e->getMessage()]
                ]
            ];
        }

        header('Content-Type: application/json');
        echo json_encode($output);
    }
}
