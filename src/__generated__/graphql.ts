/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AquariumGlass = {
  __typename?: 'AquariumGlass';
  decorationsVolume?: Maybe<Scalars['Int']>;
  dimensions: Dimensions;
  glassThickness: Scalars['Int'];
  substrateThickness?: Maybe<Scalars['Int']>;
};

export type Dimensions = {
  __typename?: 'Dimensions';
  height: Scalars['Int'];
  length: Scalars['Int'];
  width: Scalars['Int'];
};

export type Ecosystem = {
  __typename?: 'Ecosystem';
  aquarium: AquariumGlass;
  id: Scalars['ID'];
  info: EcosystemInfo;
  name: Scalars['String'];
};

export type EcosystemHeuristic = {
  __typename?: 'EcosystemHeuristic';
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type EcosystemInfo = {
  __typename?: 'EcosystemInfo';
  heuristics?: Maybe<Array<Maybe<EcosystemHeuristic>>>;
};

export type Query = {
  __typename?: 'Query';
  ecosystem?: Maybe<Ecosystem>;
  ecosystems?: Maybe<Array<Ecosystem>>;
};


export type QueryEcosystemArgs = {
  id: Scalars['ID'];
};

export type EcosystemsQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type EcosystemsQueryQuery = { __typename?: 'Query', ecosystems?: Array<{ __typename?: 'Ecosystem', id: string, name: string, aquarium: { __typename?: 'AquariumGlass', dimensions: { __typename?: 'Dimensions', width: number, height: number, length: number } } }> | null };


export const EcosystemsQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ecosystemsQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ecosystems"},"directives":[{"kind":"Directive","name":{"kind":"Name","value":"client"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"aquarium"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}}]}}]}}]}}]} as unknown as DocumentNode<EcosystemsQueryQuery, EcosystemsQueryQueryVariables>;