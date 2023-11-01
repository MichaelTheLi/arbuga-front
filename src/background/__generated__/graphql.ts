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

export type AddFishResult = {
  ecosystem?: Maybe<Ecosystem>;
};

export type AddPlantResult = {
  ecosystem?: Maybe<Ecosystem>;
};

export enum AnalysisStatus {
  Bad = 'bad',
  Moderate = 'moderate',
  Ok = 'ok',
  Skipped = 'skipped'
}

export type Animal = {
  commonNames: Array<Scalars['String']>;
  description: Scalars['String'];
  environment: Environment;
  references: Array<Reference>;
  scientific: Scientific;
  specimenImageUrls: Array<Scalars['String']>;
};

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
  equipment: EcosystemEquipment;
  fish?: Maybe<Array<EcosystemFish>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  plants?: Maybe<Array<EcosystemPlant>>;
  testClientSide?: Maybe<Scalars['String']>;
  waterReplacement?: Maybe<WaterReplacement>;
};

export type EcosystemAnalysisCategory = {
  description: Scalars['String'];
  /** @deprecated Analysis category is a value object */
  id: Scalars['ID'];
  messages: Array<EcosystemAnalysisMessage>;
  name: Scalars['String'];
  serviceName: Scalars['String'];
  status: AnalysisStatus;
};

export type EcosystemAnalysisMessage = {
  description: Scalars['String'];
  /** @deprecated Analysis message is a value object */
  id: Scalars['ID'];
  name: Scalars['String'];
  parameters: Array<EcosystemAnalysisMessageParameter>;
  serviceName: Scalars['String'];
  status: AnalysisStatus;
};

export type EcosystemAnalysisMessageParameter = {
  name: Scalars['String'];
  type: EcosystemAnalysisMessageParameterType;
  value: Scalars['String'];
};

export enum EcosystemAnalysisMessageParameterType {
  Float = 'float',
  Integer = 'integer',
  String = 'string'
}

export type EcosystemEquipment = {
  filters?: Maybe<Array<Filter>>;
  heaters?: Maybe<Array<Heater>>;
  lightingItems?: Maybe<Array<LightingItem>>;
};

export type EcosystemFish = {
  count: Scalars['Int'];
  fish: Fish;
};

export type EcosystemInput = {
  aquarium?: InputMaybe<AquariumGlassInput>;
  equipment?: InputMaybe<EquipmentInput>;
  name?: InputMaybe<Scalars['String']>;
  waterReplacement?: InputMaybe<WaterReplacementInput>;
};

export type EcosystemPlant = {
  count: Scalars['Int'];
  plant: Plant;
};

export type EcosystemUpdateResult = {
  ecosystem?: Maybe<Ecosystem>;
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Environment = {
  waterParametersRange: WaterParametersRange;
};

export type EquipmentInput = {
  filters?: InputMaybe<Array<InputMaybe<FilterInput>>>;
  heaters?: InputMaybe<Array<InputMaybe<HeaterInput>>>;
  lightingItems?: InputMaybe<Array<InputMaybe<LightingItemInput>>>;
};

export type Filter = {
  flow: Scalars['Int'];
};

export type FilterInput = {
  flow?: InputMaybe<Scalars['Int']>;
};

export type Fish = Animal & {
  commonNames: Array<Scalars['String']>;
  description: Scalars['String'];
  environment: Environment;
  id: Scalars['ID'];
  /** @deprecated Replaced with scientific.species */
  name: Scalars['String'];
  references: Array<Reference>;
  scientific: Scientific;
  specimenImageUrls: Array<Scalars['String']>;
};

export type FishListConnection = {
  edges: Array<FishListEdge>;
  pageInfo: PageInfo;
};

export type FishListEdge = {
  cursor: Scalars['ID'];
  node?: Maybe<Fish>;
};

export type Heater = {
  power: Scalars['Int'];
};

export type HeaterInput = {
  power?: InputMaybe<Scalars['Int']>;
};

export type LightingItem = {
  lux: Scalars['Int'];
};

export type LightingItemInput = {
  lux?: InputMaybe<Scalars['Int']>;
};

export type LoginResult = {
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Mutation = {
  addFishToEcosystem: AddFishResult;
  addPlantToEcosystem: AddPlantResult;
  login?: Maybe<LoginResult>;
  register?: Maybe<RegistrationResult>;
  removeEcosystem: Scalars['Boolean'];
  saveEcosystem: EcosystemUpdateResult;
  updateFishInEcosystem: UpdateFishResult;
  updatePlantInEcosystem: UpdatePlantResult;
};


export type MutationAddFishToEcosystemArgs = {
  count?: InputMaybe<Scalars['Int']>;
  ecosystemId: Scalars['ID'];
  fishId: Scalars['ID'];
};


export type MutationAddPlantToEcosystemArgs = {
  count?: InputMaybe<Scalars['Int']>;
  ecosystemId: Scalars['ID'];
  plantId: Scalars['ID'];
};


export type MutationLoginArgs = {
  login: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  login: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRemoveEcosystemArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationSaveEcosystemArgs = {
  ecosystem: EcosystemInput;
  id?: InputMaybe<Scalars['ID']>;
};


export type MutationUpdateFishInEcosystemArgs = {
  count: Scalars['Int'];
  ecosystemId: Scalars['ID'];
  fishId: Scalars['ID'];
};


export type MutationUpdatePlantInEcosystemArgs = {
  count: Scalars['Int'];
  ecosystemId: Scalars['ID'];
  plantId: Scalars['ID'];
};

export type PageInfo = {
  endCursor: Scalars['ID'];
  hasNextPage?: Maybe<Scalars['Boolean']>;
  startCursor: Scalars['ID'];
};

export type Plant = Animal & {
  commonNames: Array<Scalars['String']>;
  description: Scalars['String'];
  environment: Environment;
  id: Scalars['ID'];
  /** @deprecated Replaced with scientific.species */
  name: Scalars['String'];
  references: Array<Reference>;
  scientific: Scientific;
  specimenImageUrls: Array<Scalars['String']>;
};

export type PlantListConnection = {
  edges: Array<PlantListEdge>;
  pageInfo: PageInfo;
};

export type PlantListEdge = {
  cursor: Scalars['ID'];
  node?: Maybe<Plant>;
};

export type Query = {
  fish?: Maybe<Fish>;
  fishList: FishListConnection;
  me?: Maybe<User>;
  plant?: Maybe<Plant>;
  plantList: PlantListConnection;
};


export type QueryFishArgs = {
  id: Scalars['ID'];
};


export type QueryFishListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  substring?: InputMaybe<Scalars['String']>;
};


export type QueryPlantArgs = {
  id: Scalars['ID'];
};


export type QueryPlantListArgs = {
  after?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  substring?: InputMaybe<Scalars['String']>;
};

export type Reference = {
  baseTitle: Scalars['String'];
  title: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type RegistrationResult = {
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Scientific = {
  class: Scalars['String'];
  domain: Scalars['String'];
  family: Scalars['String'];
  genus: Scalars['String'];
  kingdom: Scalars['String'];
  order: Scalars['String'];
  phylum: Scalars['String'];
  species: Scalars['String'];
  suborder: Scalars['String'];
};

export type UpdateFishResult = {
  ecosystem?: Maybe<Ecosystem>;
};

export type UpdatePlantResult = {
  ecosystem?: Maybe<Ecosystem>;
};

export type User = {
  ecosystems?: Maybe<Array<Ecosystem>>;
  id: Scalars['ID'];
  login?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type WaterChemicalParameters = {
  ammonia: Scalars['Float'];
  gh: Scalars['Int'];
  kh: Scalars['Int'];
  nitrate: Scalars['Float'];
  nitrite: Scalars['Float'];
  ph: Scalars['Float'];
};

export type WaterChemicalParametersInput = {
  ammonia?: InputMaybe<Scalars['Float']>;
  gh?: InputMaybe<Scalars['Int']>;
  kh?: InputMaybe<Scalars['Int']>;
  nitrate?: InputMaybe<Scalars['Float']>;
  nitrite?: InputMaybe<Scalars['Float']>;
  ph?: InputMaybe<Scalars['Float']>;
};

export type WaterParameters = {
  chemical: WaterChemicalParameters;
  temperature: Scalars['Float'];
};

export type WaterParametersInput = {
  chemical?: InputMaybe<WaterChemicalParametersInput>;
  temperature?: InputMaybe<Scalars['Float']>;
};

export type WaterParametersRange = {
  max: WaterParameters;
  min: WaterParameters;
};

export type WaterReplacement = {
  water: WaterParameters;
  /** @deprecated Replaced with water.chemical */
  waterParameters?: Maybe<WaterChemicalParameters>;
};

export type WaterReplacementInput = {
  water?: InputMaybe<WaterParametersInput>;
  waterParameters?: InputMaybe<WaterChemicalParametersInput>;
};

export type SearchFishQueryVariables = Exact<{
  substring?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
}>;


export type SearchFishQuery = { fishList: { edges: Array<{ cursor: string, node?: { id: string } | null }> } };


export const SearchFishDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchFish"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"substring"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fishList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"substring"},"value":{"kind":"Variable","name":{"kind":"Name","value":"substring"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchFishQuery, SearchFishQueryVariables>;