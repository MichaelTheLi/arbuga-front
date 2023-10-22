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

export type FullEcosystemFragment = { id: string, name: string, aquarium: { dimensions: { width: number, height: number, length: number } }, analysis?: Array<{ name: string, serviceName: string, description: string, status: AnalysisStatus, messages: Array<{ name: string, serviceName: string, description: string, status: AnalysisStatus, parameters: Array<{ name: string, value: string, type: EcosystemAnalysisMessageParameterType }> }> }> | null, fish?: Array<{ count: number, fish: { id: string, name: string, description: string, scientific: { species: string } } }> | null, plants?: Array<{ count: number, plant: { id: string, name: string, description: string, scientific: { species: string } } }> | null, waterReplacement?: { water: { temperature: number, chemical: { ph: number, gh: number, kh: number, ammonia: number, nitrite: number, nitrate: number } } } | null, equipment: { filters?: Array<{ flow: number }> | null, heaters?: Array<{ power: number }> | null, lightingItems?: Array<{ lux: number }> | null } } & { ' $fragmentName'?: 'FullEcosystemFragment' };

type FullAnimal_Fish_Fragment = { commonNames: Array<string>, specimenImageUrls: Array<string>, description: string, scientific: { species: string }, references: Array<{ title: string, baseTitle: string, url?: string | null }>, environment: { waterParametersRange: { min: { temperature: number, chemical: { ph: number, gh: number, kh: number, ammonia: number, nitrite: number, nitrate: number } }, max: { temperature: number, chemical: { ph: number, gh: number, kh: number, ammonia: number, nitrite: number, nitrate: number } } } } } & { ' $fragmentName'?: 'FullAnimal_Fish_Fragment' };

type FullAnimal_Plant_Fragment = { commonNames: Array<string>, specimenImageUrls: Array<string>, description: string, scientific: { species: string }, references: Array<{ title: string, baseTitle: string, url?: string | null }>, environment: { waterParametersRange: { min: { temperature: number, chemical: { ph: number, gh: number, kh: number, ammonia: number, nitrite: number, nitrate: number } }, max: { temperature: number, chemical: { ph: number, gh: number, kh: number, ammonia: number, nitrite: number, nitrate: number } } } } } & { ' $fragmentName'?: 'FullAnimal_Plant_Fragment' };

export type FullAnimalFragment = FullAnimal_Fish_Fragment | FullAnimal_Plant_Fragment;

export type UserQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQueryQuery = { me?: { id: string, login?: string | null, name: string, ecosystems?: Array<{ ' $fragmentRefs'?: { 'FullEcosystemFragment': FullEcosystemFragment } }> | null } | null };

export type SearchFishQueryVariables = Exact<{
  substring?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
}>;


export type SearchFishQuery = { fishList: { edges: Array<{ cursor: string, node?: (
        { id: string }
        & { ' $fragmentRefs'?: { 'FullAnimal_Fish_Fragment': FullAnimal_Fish_Fragment } }
      ) | null }>, pageInfo: { startCursor: string, endCursor: string, hasNextPage?: boolean | null } } };

export type SearchPlantQueryVariables = Exact<{
  substring?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['ID']>;
}>;


export type SearchPlantQuery = { plantList: { edges: Array<{ cursor: string, node?: (
        { id: string }
        & { ' $fragmentRefs'?: { 'FullAnimal_Plant_Fragment': FullAnimal_Plant_Fragment } }
      ) | null }>, pageInfo: { startCursor: string, endCursor: string, hasNextPage?: boolean | null } } };

export type GetFishQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetFishQuery = { fish?: (
    { id: string }
    & { ' $fragmentRefs'?: { 'FullAnimal_Fish_Fragment': FullAnimal_Fish_Fragment } }
  ) | null };

export type GetPlantQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPlantQuery = { plant?: (
    { id: string }
    & { ' $fragmentRefs'?: { 'FullAnimal_Plant_Fragment': FullAnimal_Plant_Fragment } }
  ) | null };

export type UserLoginMutationVariables = Exact<{
  login: Scalars['String'];
  password: Scalars['String'];
}>;


export type UserLoginMutation = { login?: { token?: string | null, user?: { id: string, login?: string | null, name: string, ecosystems?: Array<{ ' $fragmentRefs'?: { 'FullEcosystemFragment': FullEcosystemFragment } }> | null } | null } | null };

export type UserRegisterMutationVariables = Exact<{
  login: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
}>;


export type UserRegisterMutation = { register?: { token?: string | null, user?: { id: string, login?: string | null, name: string, ecosystems?: Array<{ ' $fragmentRefs'?: { 'FullEcosystemFragment': FullEcosystemFragment } }> | null } | null } | null };

export type Save_EcosystemMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']>;
  ecosystem: EcosystemInput;
}>;


export type Save_EcosystemMutation = { saveEcosystem: { success: boolean, error?: string | null, ecosystem?: { ' $fragmentRefs'?: { 'FullEcosystemFragment': FullEcosystemFragment } } | null } };

export type Remove_EcosystemMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type Remove_EcosystemMutation = { removeEcosystem: boolean };

export type AddFishMutationVariables = Exact<{
  ecosystemId: Scalars['ID'];
  fishId: Scalars['ID'];
}>;


export type AddFishMutation = { addFishToEcosystem: { ecosystem?: { id: string, fish?: Array<{ count: number, fish: { id: string, name: string, description: string } }> | null } | null } };

export type UpdateFishMutationVariables = Exact<{
  ecosystemId: Scalars['ID'];
  fishId: Scalars['ID'];
  count: Scalars['Int'];
}>;


export type UpdateFishMutation = { updateFishInEcosystem: { ecosystem?: { id: string, fish?: Array<{ count: number, fish: { id: string, name: string, description: string } }> | null } | null } };

export type AddPlantMutationVariables = Exact<{
  ecosystemId: Scalars['ID'];
  plantId: Scalars['ID'];
}>;


export type AddPlantMutation = { addPlantToEcosystem: { ecosystem?: { id: string, plants?: Array<{ count: number, plant: { id: string, name: string, description: string } }> | null } | null } };

export type UpdatePlantMutationVariables = Exact<{
  ecosystemId: Scalars['ID'];
  plantId: Scalars['ID'];
  count: Scalars['Int'];
}>;


export type UpdatePlantMutation = { updatePlantInEcosystem: { ecosystem?: { id: string, plants?: Array<{ count: number, plant: { id: string, name: string, description: string } }> | null } | null } };

export const FullEcosystemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FullEcosystem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ecosystem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"aquarium"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dimensions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"analysis"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"serviceName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"serviceName"}},{"kind":"Field","name":{"kind":"Name","value":"parameters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"fish"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fish"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"scientific"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"species"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"plants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"scientific"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"species"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"waterReplacement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"water"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chemical"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ph"}},{"kind":"Field","name":{"kind":"Name","value":"gh"}},{"kind":"Field","name":{"kind":"Name","value":"kh"}},{"kind":"Field","name":{"kind":"Name","value":"ammonia"}},{"kind":"Field","name":{"kind":"Name","value":"nitrite"}},{"kind":"Field","name":{"kind":"Name","value":"nitrate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"temperature"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"equipment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"filters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flow"}}]}},{"kind":"Field","name":{"kind":"Name","value":"heaters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"power"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lightingItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lux"}}]}}]}}]}}]} as unknown as DocumentNode<FullEcosystemFragment, unknown>;
export const FullAnimalFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FullAnimal"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Animal"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commonNames"}},{"kind":"Field","name":{"kind":"Name","value":"scientific"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"species"}}]}},{"kind":"Field","name":{"kind":"Name","value":"specimenImageUrls"}},{"kind":"Field","name":{"kind":"Name","value":"references"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"baseTitle"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"environment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"waterParametersRange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"min"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chemical"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ph"}},{"kind":"Field","name":{"kind":"Name","value":"gh"}},{"kind":"Field","name":{"kind":"Name","value":"kh"}},{"kind":"Field","name":{"kind":"Name","value":"ammonia"}},{"kind":"Field","name":{"kind":"Name","value":"nitrite"}},{"kind":"Field","name":{"kind":"Name","value":"nitrate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"temperature"}}]}},{"kind":"Field","name":{"kind":"Name","value":"max"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chemical"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ph"}},{"kind":"Field","name":{"kind":"Name","value":"gh"}},{"kind":"Field","name":{"kind":"Name","value":"kh"}},{"kind":"Field","name":{"kind":"Name","value":"ammonia"}},{"kind":"Field","name":{"kind":"Name","value":"nitrite"}},{"kind":"Field","name":{"kind":"Name","value":"nitrate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"temperature"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<FullAnimalFragment, unknown>;
export const UserQueryDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"login"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ecosystems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullEcosystem"}}]}}]}}]}},...FullEcosystemFragmentDoc.definitions]} as unknown as DocumentNode<UserQueryQuery, UserQueryQueryVariables>;
export const SearchFishDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchFish"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"substring"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fishList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"substring"},"value":{"kind":"Variable","name":{"kind":"Name","value":"substring"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullAnimal"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},...FullAnimalFragmentDoc.definitions]} as unknown as DocumentNode<SearchFishQuery, SearchFishQueryVariables>;
export const SearchPlantDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchPlant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"substring"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plantList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"substring"},"value":{"kind":"Variable","name":{"kind":"Name","value":"substring"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullAnimal"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}},...FullAnimalFragmentDoc.definitions]} as unknown as DocumentNode<SearchPlantQuery, SearchPlantQueryVariables>;
export const GetFishDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetFish"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fish"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullAnimal"}}]}}]}},...FullAnimalFragmentDoc.definitions]} as unknown as DocumentNode<GetFishQuery, GetFishQueryVariables>;
export const GetPlantDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPlant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullAnimal"}}]}}]}},...FullAnimalFragmentDoc.definitions]} as unknown as DocumentNode<GetPlantQuery, GetPlantQueryVariables>;
export const UserLoginDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"userLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"login"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"login"},"value":{"kind":"Variable","name":{"kind":"Name","value":"login"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"login"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ecosystems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullEcosystem"}}]}}]}}]}}]}},...FullEcosystemFragmentDoc.definitions]} as unknown as DocumentNode<UserLoginMutation, UserLoginMutationVariables>;
export const UserRegisterDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"userRegister"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"login"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"login"},"value":{"kind":"Variable","name":{"kind":"Name","value":"login"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"login"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ecosystems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullEcosystem"}}]}}]}}]}}]}},...FullEcosystemFragmentDoc.definitions]} as unknown as DocumentNode<UserRegisterMutation, UserRegisterMutationVariables>;
export const Save_EcosystemDocument = {"kind":"Document", "definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SAVE_ECOSYSTEM"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ecosystem"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EcosystemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveEcosystem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"ecosystem"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ecosystem"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ecosystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FullEcosystem"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}},...FullEcosystemFragmentDoc.definitions]} as unknown as DocumentNode<Save_EcosystemMutation, Save_EcosystemMutationVariables>;
export const Remove_EcosystemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"REMOVE_ECOSYSTEM"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeEcosystem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<Remove_EcosystemMutation, Remove_EcosystemMutationVariables>;
export const AddFishDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddFish"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ecosystemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fishId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addFishToEcosystem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ecosystemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ecosystemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"fishId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fishId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ecosystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fish"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fish"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddFishMutation, AddFishMutationVariables>;
export const UpdateFishDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateFish"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ecosystemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fishId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"count"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFishInEcosystem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ecosystemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ecosystemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"fishId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fishId"}}},{"kind":"Argument","name":{"kind":"Name","value":"count"},"value":{"kind":"Variable","name":{"kind":"Name","value":"count"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ecosystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fish"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fish"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateFishMutation, UpdateFishMutationVariables>;
export const AddPlantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddPlant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ecosystemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"plantId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPlantToEcosystem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ecosystemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ecosystemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"plantId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"plantId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ecosystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"plants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AddPlantMutation, AddPlantMutationVariables>;
export const UpdatePlantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePlant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ecosystemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"plantId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"count"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePlantInEcosystem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ecosystemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ecosystemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"plantId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"plantId"}}},{"kind":"Argument","name":{"kind":"Name","value":"count"},"value":{"kind":"Variable","name":{"kind":"Name","value":"count"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ecosystem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"plants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePlantMutation, UpdatePlantMutationVariables>;