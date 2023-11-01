import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
declare const documents: {
    "\n  query SearchFish($substring: String, $first: Int, $after: ID) {\n    fishList(substring: $substring, first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          id\n        }\n      }\n    }\n  }\n": DocumentNode<types.SearchFishQuery, types.Exact<{
        substring?: types.InputMaybe<string> | undefined;
        first?: types.InputMaybe<number> | undefined;
        after?: types.InputMaybe<string> | undefined;
    }>>;
};
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export declare function gql(source: string): unknown;
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export declare function gql(source: "\n  query SearchFish($substring: String, $first: Int, $after: ID) {\n    fishList(substring: $substring, first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          id\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchFish($substring: String, $first: Int, $after: ID) {\n    fishList(substring: $substring, first: $first, after: $after) {\n      edges {\n        cursor\n        node {\n          id\n        }\n      }\n    }\n  }\n"];
export declare type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
export {};
