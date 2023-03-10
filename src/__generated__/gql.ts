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
    "\n  query userQuery {\n    me {\n      id\n      login\n      name\n      ecosystems {\n        id\n        name\n        aquarium {\n          dimensions {\n            width\n            height\n            length\n          }\n        }\n        analysis {\n          id\n          name\n          description\n          status\n          messages {\n            id\n            name\n            description\n            status\n          }\n        }\n      }\n    }\n  }\n": types.UserQueryDocument,
    "\n  mutation userLogin($login: String!, $password: String!) {\n    login(login: $login, password: $password) {\n      token\n      user {\n        id\n        login\n        name\n        ecosystems {\n          id\n          name\n          aquarium {\n            dimensions {\n              width\n              height\n              length\n            }\n          }\n          analysis {\n            id\n            name\n            description\n            status\n            messages {\n              id\n              name\n              description\n              status\n            }\n          }\n        }\n      }\n    }\n  }\n": types.UserLoginDocument,
    "\n  mutation SAVE_ECOSYSTEM($id: ID, $ecosystem: EcosystemInput!) {\n    saveEcosystem(id: $id, ecosystem: $ecosystem) {\n      ecosystem {\n        id\n        name\n        aquarium {\n          dimensions {\n            width\n            height\n            length\n          }\n        }\n        analysis {\n          id\n          name\n          description\n          status\n          messages {\n            id\n            name\n            description\n            status\n          }\n        }\n      }\n      success\n      error\n    }\n  }\n": types.Save_EcosystemDocument,
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
export function gql(source: "\n  query userQuery {\n    me {\n      id\n      login\n      name\n      ecosystems {\n        id\n        name\n        aquarium {\n          dimensions {\n            width\n            height\n            length\n          }\n        }\n        analysis {\n          id\n          name\n          description\n          status\n          messages {\n            id\n            name\n            description\n            status\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query userQuery {\n    me {\n      id\n      login\n      name\n      ecosystems {\n        id\n        name\n        aquarium {\n          dimensions {\n            width\n            height\n            length\n          }\n        }\n        analysis {\n          id\n          name\n          description\n          status\n          messages {\n            id\n            name\n            description\n            status\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation userLogin($login: String!, $password: String!) {\n    login(login: $login, password: $password) {\n      token\n      user {\n        id\n        login\n        name\n        ecosystems {\n          id\n          name\n          aquarium {\n            dimensions {\n              width\n              height\n              length\n            }\n          }\n          analysis {\n            id\n            name\n            description\n            status\n            messages {\n              id\n              name\n              description\n              status\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation userLogin($login: String!, $password: String!) {\n    login(login: $login, password: $password) {\n      token\n      user {\n        id\n        login\n        name\n        ecosystems {\n          id\n          name\n          aquarium {\n            dimensions {\n              width\n              height\n              length\n            }\n          }\n          analysis {\n            id\n            name\n            description\n            status\n            messages {\n              id\n              name\n              description\n              status\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SAVE_ECOSYSTEM($id: ID, $ecosystem: EcosystemInput!) {\n    saveEcosystem(id: $id, ecosystem: $ecosystem) {\n      ecosystem {\n        id\n        name\n        aquarium {\n          dimensions {\n            width\n            height\n            length\n          }\n        }\n        analysis {\n          id\n          name\n          description\n          status\n          messages {\n            id\n            name\n            description\n            status\n          }\n        }\n      }\n      success\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation SAVE_ECOSYSTEM($id: ID, $ecosystem: EcosystemInput!) {\n    saveEcosystem(id: $id, ecosystem: $ecosystem) {\n      ecosystem {\n        id\n        name\n        aquarium {\n          dimensions {\n            width\n            height\n            length\n          }\n        }\n        analysis {\n          id\n          name\n          description\n          status\n          messages {\n            id\n            name\n            description\n            status\n          }\n        }\n      }\n      success\n      error\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;