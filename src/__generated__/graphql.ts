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

export enum AnalysisStatus {
  Bad = 'bad',
  Moderate = 'moderate',
  Ok = 'ok'
}

export type AquariumGlass = {
  decorationsVolume?: Maybe<Scalars['Int']>;
  dimensions: Dimensions;
  glassThickness: Scalars['Int'];
  substrateThickness?: Maybe<Scalars['Int']>;
};

export type AquariumGlassInput = {
  decorationsVolume?: InputMaybe<Scalars['Int']>;
  dimensions?: InputMaybe<DimensionsInput>;
  glassThickness?: InputMaybe<Scalars['Int']>;
  substrateThickness?: InputMaybe<Scalars['Int']>;
};

export type Dimensions = {
  height: Scalars['Int'];
  length: Scalars['Int'];
  width: Scalars['Int'];
};

export type DimensionsInput = {
  height?: InputMaybe<Scalars['Int']>;
  length?: InputMaybe<Scalars['Int']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type Ecosystem = {
  analysis?: Maybe<Array<EcosystemAnalysisCategory>>;
  aquarium: AquariumGlass;
  id: Scalars['ID'];
  name: Scalars['String'];
  testClientSide?: Maybe<Scalars['String']>;
};

export type EcosystemAnalysisCategory = {
  description: Scalars['String'];
  id: Scalars['ID'];
  messages: Array<EcosystemAnalysisMessage>;
  name: Scalars['String'];
  status: AnalysisStatus;
};

export type EcosystemAnalysisMessage = {
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  status: AnalysisStatus;
};

export type EcosystemInput = {
  aquarium?: InputMaybe<AquariumGlassInput>;
  name?: InputMaybe<Scalars['String']>;
};

export type EcosystemUpdateResult = {
  ecosystem?: Maybe<Ecosystem>;
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type LoginResult = {
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Mutation = {
  login?: Maybe<LoginResult>;
  saveEcosystem: EcosystemUpdateResult;
};


export type MutationLoginArgs = {
  login: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSaveEcosystemArgs = {
  ecosystem: EcosystemInput;
  id?: InputMaybe<Scalars['ID']>;
};

export type Query = {
  me?: Maybe<User>;
};

export type User = {
  ecosystems?: Maybe<Array<Ecosystem>>;
  id: Scalars['ID'];
  login?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type UserQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQueryQuery = { me?: { id: string, login?: string | null, name: string, ecosystems?: Array<{ id: string, name: string, aquarium: { dimensions: { width: number, height: number, length: number } }, analysis?: Array<{ id: string, name: string, description: string, status: AnalysisStatus, messages: Array<{ id: string, name: string, description: string, status: AnalysisStatus }> }> | null }> | null } | null };

export type UserLoginMutationVariables = Exact<{
  login: Scalars['String'];
  password: Scalars['String'];
}>;


export type UserLoginMutation = { login?: { token?: string | null, user?: { id: string, login?: string | null, name: string, ecosystems?: Array<{ id: string, name: string, aquarium: { dimensions: { width: number, height: number, length: number } }, analysis?: Array<{ id: string, name: string, description: string, status: AnalysisStatus, messages: Array<{ id: string, name: string, description: string, status: AnalysisStatus }> }> | null }> | null } | null } | null };

export type Save_EcosystemMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  ecosystem: EcosystemInput;
}>;


export type Save_EcosystemMutation = { saveEcosystem: { success: boolean, error?: string | null, ecosystem?: { id: string, name: string, aquarium: { dimensions: { width: number, height: number, length: number } }, analysis?: Array<{ id: string, name: string, description: string, status: AnalysisStatus, messages: Array<{ id: string, name: string, description: string, status: AnalysisStatus }> }> | null } | null } };


export const UserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"login"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ecosystems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"aquarium"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"analysis"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserQueryQuery, UserQueryQueryVariables>;
export const UserLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"userLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"login"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"login"},"value":{"kind":"Variable","name":{"kind":"Name","value":"login"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"login"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ecosystems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"aquarium"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"analysis"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UserLoginMutation, UserLoginMutationVariables>;
export const Save_EcosystemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SAVE_ECOSYSTEM"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ecosystem"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EcosystemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveEcosystem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"ecosystem"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ecosystem"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ecosystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"aquarium"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"analysis"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<Save_EcosystemMutation, Save_EcosystemMutationVariables>;