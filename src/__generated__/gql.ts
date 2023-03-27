/* eslint-disable */
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
const documents = {
    "\n  query userQuery {\n    me {\n      id\n      login\n      name\n      ecosystems {\n        id\n        name\n        aquarium {\n          dimensions {\n            width\n            height\n            length\n          }\n        }\n        analysis {\n          id\n          name\n          description\n          status\n          messages {\n            id\n            name\n            description\n            status\n          }\n        }\n        fish {\n          fish {\n            id\n            name\n            description\n          }\n          count\n        }\n        plants {\n          plant {\n            id\n            name\n            description\n          }\n          count\n        }\n      }\n    }\n  }\n": types.UserQueryDocument,
    "\n  query SearchFish($substring: String) {\n    fishList(substring: $substring, first: 100) {\n      edges {\n        cursor\n        node {\n          id\n          name\n          description\n        }\n      }\n      pageInfo {\n        startCursor\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.SearchFishDocument,
    "\n  query SearchPlant($substring: String) {\n    plantList(substring: $substring, first: 100) {\n      edges {\n        cursor\n        node {\n          id\n          name\n          description\n        }\n      }\n      pageInfo {\n        startCursor\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.SearchPlantDocument,
    "\n  mutation userLogin($login: String!, $password: String!) {\n    login(login: $login, password: $password) {\n      token\n      user {\n        id\n        login\n        name\n        ecosystems {\n          id\n          name\n          aquarium {\n            dimensions {\n              width\n              height\n              length\n            }\n          }\n          analysis {\n            id\n            name\n            description\n            status\n            messages {\n              id\n              name\n              description\n              status\n            }\n          }\n          fish {\n            fish {\n              id\n              name\n              description\n            }\n            count\n          }\n          plants {\n            plant {\n              id\n              name\n              description\n            }\n            count\n          }\n        }\n      }\n    }\n  }\n": types.UserLoginDocument,
    "\n  mutation SAVE_ECOSYSTEM($id: ID, $ecosystem: EcosystemInput!) {\n    saveEcosystem(id: $id, ecosystem: $ecosystem) {\n      ecosystem {\n        id\n        name\n        aquarium {\n          dimensions {\n            width\n            height\n            length\n          }\n        }\n        analysis {\n          id\n          name\n          description\n          status\n          messages {\n            id\n            name\n            description\n            status\n          }\n        }\n        fish {\n          fish {\n            id\n            name\n            description\n          }\n          count\n        }\n        plants {\n          plant {\n            id\n            name\n            description\n          }\n          count\n        }\n      }\n      success\n      error\n    }\n  }\n": types.Save_EcosystemDocument,
    "\n  mutation AddFish($ecosystemId: ID!, $fishId: ID!) {\n    addFishToEcosystem(ecosystemId: $ecosystemId, fishId: $fishId) {\n      ecosystem {\n        id\n\n        fish {\n          fish {\n            id\n            name\n            description\n          }\n          count\n        }\n      }\n    }\n  }\n": types.AddFishDocument,
    "\n  mutation AddPlant($ecosystemId: ID!, $plantId: ID!) {\n    addPlantToEcosystem(ecosystemId: $ecosystemId, plantId: $plantId) {\n      ecosystem {\n        id\n\n        plants {\n          plant {\n            id\n            name\n            description\n          }\n          count\n        }\n      }\n    }\n  }\n": types.AddPlantDocument,
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
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query userQuery {\n    me {\n      id\n      login\n      name\n      ecosystems {\n        id\n        name\n        aquarium {\n          dimensions {\n            width\n            height\n            length\n          }\n        }\n        analysis {\n          id\n          name\n          description\n          status\n          messages {\n            id\n            name\n            description\n            status\n          }\n        }\n        fish {\n          fish {\n            id\n            name\n            description\n          }\n          count\n        }\n        plants {\n          plant {\n            id\n            name\n            description\n          }\n          count\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query userQuery {\n    me {\n      id\n      login\n      name\n      ecosystems {\n        id\n        name\n        aquarium {\n          dimensions {\n            width\n            height\n            length\n          }\n        }\n        analysis {\n          id\n          name\n          description\n          status\n          messages {\n            id\n            name\n            description\n            status\n          }\n        }\n        fish {\n          fish {\n            id\n            name\n            description\n          }\n          count\n        }\n        plants {\n          plant {\n            id\n            name\n            description\n          }\n          count\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SearchFish($substring: String) {\n    fishList(substring: $substring, first: 100) {\n      edges {\n        cursor\n        node {\n          id\n          name\n          description\n        }\n      }\n      pageInfo {\n        startCursor\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchFish($substring: String) {\n    fishList(substring: $substring, first: 100) {\n      edges {\n        cursor\n        node {\n          id\n          name\n          description\n        }\n      }\n      pageInfo {\n        startCursor\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SearchPlant($substring: String) {\n    plantList(substring: $substring, first: 100) {\n      edges {\n        cursor\n        node {\n          id\n          name\n          description\n        }\n      }\n      pageInfo {\n        startCursor\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchPlant($substring: String) {\n    plantList(substring: $substring, first: 100) {\n      edges {\n        cursor\n        node {\n          id\n          name\n          description\n        }\n      }\n      pageInfo {\n        startCursor\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation userLogin($login: String!, $password: String!) {\n    login(login: $login, password: $password) {\n      token\n      user {\n        id\n        login\n        name\n        ecosystems {\n          id\n          name\n          aquarium {\n            dimensions {\n              width\n              height\n              length\n            }\n          }\n          analysis {\n            id\n            name\n            description\n            status\n            messages {\n              id\n              name\n              description\n              status\n            }\n          }\n          fish {\n            fish {\n              id\n              name\n              description\n            }\n            count\n          }\n          plants {\n            plant {\n              id\n              name\n              description\n            }\n            count\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation userLogin($login: String!, $password: String!) {\n    login(login: $login, password: $password) {\n      token\n      user {\n        id\n        login\n        name\n        ecosystems {\n          id\n          name\n          aquarium {\n            dimensions {\n              width\n              height\n              length\n            }\n          }\n          analysis {\n            id\n            name\n            description\n            status\n            messages {\n              id\n              name\n              description\n              status\n            }\n          }\n          fish {\n            fish {\n              id\n              name\n              description\n            }\n            count\n          }\n          plants {\n            plant {\n              id\n              name\n              description\n            }\n            count\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SAVE_ECOSYSTEM($id: ID, $ecosystem: EcosystemInput!) {\n    saveEcosystem(id: $id, ecosystem: $ecosystem) {\n      ecosystem {\n        id\n        name\n        aquarium {\n          dimensions {\n            width\n            height\n            length\n          }\n        }\n        analysis {\n          id\n          name\n          description\n          status\n          messages {\n            id\n            name\n            description\n            status\n          }\n        }\n        fish {\n          fish {\n            id\n            name\n            description\n          }\n          count\n        }\n        plants {\n          plant {\n            id\n            name\n            description\n          }\n          count\n        }\n      }\n      success\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation SAVE_ECOSYSTEM($id: ID, $ecosystem: EcosystemInput!) {\n    saveEcosystem(id: $id, ecosystem: $ecosystem) {\n      ecosystem {\n        id\n        name\n        aquarium {\n          dimensions {\n            width\n            height\n            length\n          }\n        }\n        analysis {\n          id\n          name\n          description\n          status\n          messages {\n            id\n            name\n            description\n            status\n          }\n        }\n        fish {\n          fish {\n            id\n            name\n            description\n          }\n          count\n        }\n        plants {\n          plant {\n            id\n            name\n            description\n          }\n          count\n        }\n      }\n      success\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddFish($ecosystemId: ID!, $fishId: ID!) {\n    addFishToEcosystem(ecosystemId: $ecosystemId, fishId: $fishId) {\n      ecosystem {\n        id\n\n        fish {\n          fish {\n            id\n            name\n            description\n          }\n          count\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddFish($ecosystemId: ID!, $fishId: ID!) {\n    addFishToEcosystem(ecosystemId: $ecosystemId, fishId: $fishId) {\n      ecosystem {\n        id\n\n        fish {\n          fish {\n            id\n            name\n            description\n          }\n          count\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddPlant($ecosystemId: ID!, $plantId: ID!) {\n    addPlantToEcosystem(ecosystemId: $ecosystemId, plantId: $plantId) {\n      ecosystem {\n        id\n\n        plants {\n          plant {\n            id\n            name\n            description\n          }\n          count\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddPlant($ecosystemId: ID!, $plantId: ID!) {\n    addPlantToEcosystem(ecosystemId: $ecosystemId, plantId: $plantId) {\n      ecosystem {\n        id\n\n        plants {\n          plant {\n            id\n            name\n            description\n          }\n          count\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;