import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export declare type AddFishResult = {
    ecosystem?: Maybe<Ecosystem>;
};
export declare type AddPlantResult = {
    ecosystem?: Maybe<Ecosystem>;
};
export declare enum AnalysisStatus {
    Bad = "bad",
    Moderate = "moderate",
    Ok = "ok",
    Skipped = "skipped"
}
export declare type Animal = {
    commonNames: Array<Scalars['String']>;
    description: Scalars['String'];
    environment: Environment;
    references: Array<Reference>;
    scientific: Scientific;
    specimenImageUrls: Array<Scalars['String']>;
};
export declare type AquariumGlass = {
    decorationsVolume?: Maybe<Scalars['Int']>;
    dimensions: Dimensions;
    glassThickness: Scalars['Int'];
    substrateThickness?: Maybe<Scalars['Int']>;
};
export declare type AquariumGlassInput = {
    decorationsVolume?: InputMaybe<Scalars['Int']>;
    dimensions?: InputMaybe<DimensionsInput>;
    glassThickness?: InputMaybe<Scalars['Int']>;
    substrateThickness?: InputMaybe<Scalars['Int']>;
};
export declare type Dimensions = {
    height: Scalars['Int'];
    length: Scalars['Int'];
    width: Scalars['Int'];
};
export declare type DimensionsInput = {
    height?: InputMaybe<Scalars['Int']>;
    length?: InputMaybe<Scalars['Int']>;
    width?: InputMaybe<Scalars['Int']>;
};
export declare type Ecosystem = {
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
export declare type EcosystemAnalysisCategory = {
    description: Scalars['String'];
    /** @deprecated Analysis category is a value object */
    id: Scalars['ID'];
    messages: Array<EcosystemAnalysisMessage>;
    name: Scalars['String'];
    serviceName: Scalars['String'];
    status: AnalysisStatus;
};
export declare type EcosystemAnalysisMessage = {
    description: Scalars['String'];
    /** @deprecated Analysis message is a value object */
    id: Scalars['ID'];
    name: Scalars['String'];
    parameters: Array<EcosystemAnalysisMessageParameter>;
    serviceName: Scalars['String'];
    status: AnalysisStatus;
};
export declare type EcosystemAnalysisMessageParameter = {
    name: Scalars['String'];
    type: EcosystemAnalysisMessageParameterType;
    value: Scalars['String'];
};
export declare enum EcosystemAnalysisMessageParameterType {
    Float = "float",
    Integer = "integer",
    String = "string"
}
export declare type EcosystemEquipment = {
    filters?: Maybe<Array<Filter>>;
    heaters?: Maybe<Array<Heater>>;
    lightingItems?: Maybe<Array<LightingItem>>;
};
export declare type EcosystemFish = {
    count: Scalars['Int'];
    fish: Fish;
};
export declare type EcosystemInput = {
    aquarium?: InputMaybe<AquariumGlassInput>;
    equipment?: InputMaybe<EquipmentInput>;
    name?: InputMaybe<Scalars['String']>;
    waterReplacement?: InputMaybe<WaterReplacementInput>;
};
export declare type EcosystemPlant = {
    count: Scalars['Int'];
    plant: Plant;
};
export declare type EcosystemUpdateResult = {
    ecosystem?: Maybe<Ecosystem>;
    error?: Maybe<Scalars['String']>;
    success: Scalars['Boolean'];
};
export declare type Environment = {
    waterParametersRange: WaterParametersRange;
};
export declare type EquipmentInput = {
    filters?: InputMaybe<Array<InputMaybe<FilterInput>>>;
    heaters?: InputMaybe<Array<InputMaybe<HeaterInput>>>;
    lightingItems?: InputMaybe<Array<InputMaybe<LightingItemInput>>>;
};
export declare type Filter = {
    flow: Scalars['Int'];
};
export declare type FilterInput = {
    flow?: InputMaybe<Scalars['Int']>;
};
export declare type Fish = Animal & {
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
export declare type FishListConnection = {
    edges: Array<FishListEdge>;
    pageInfo: PageInfo;
};
export declare type FishListEdge = {
    cursor: Scalars['ID'];
    node?: Maybe<Fish>;
};
export declare type Heater = {
    power: Scalars['Int'];
};
export declare type HeaterInput = {
    power?: InputMaybe<Scalars['Int']>;
};
export declare type LightingItem = {
    lux: Scalars['Int'];
};
export declare type LightingItemInput = {
    lux?: InputMaybe<Scalars['Int']>;
};
export declare type LoginResult = {
    token?: Maybe<Scalars['String']>;
    user?: Maybe<User>;
};
export declare type Mutation = {
    addFishToEcosystem: AddFishResult;
    addPlantToEcosystem: AddPlantResult;
    login?: Maybe<LoginResult>;
    register?: Maybe<RegistrationResult>;
    removeEcosystem: Scalars['Boolean'];
    saveEcosystem: EcosystemUpdateResult;
    updateFishInEcosystem: UpdateFishResult;
    updatePlantInEcosystem: UpdatePlantResult;
};
export declare type MutationAddFishToEcosystemArgs = {
    count?: InputMaybe<Scalars['Int']>;
    ecosystemId: Scalars['ID'];
    fishId: Scalars['ID'];
};
export declare type MutationAddPlantToEcosystemArgs = {
    count?: InputMaybe<Scalars['Int']>;
    ecosystemId: Scalars['ID'];
    plantId: Scalars['ID'];
};
export declare type MutationLoginArgs = {
    login: Scalars['String'];
    password: Scalars['String'];
};
export declare type MutationRegisterArgs = {
    login: Scalars['String'];
    name: Scalars['String'];
    password: Scalars['String'];
};
export declare type MutationRemoveEcosystemArgs = {
    id?: InputMaybe<Scalars['ID']>;
};
export declare type MutationSaveEcosystemArgs = {
    ecosystem: EcosystemInput;
    id?: InputMaybe<Scalars['ID']>;
};
export declare type MutationUpdateFishInEcosystemArgs = {
    count: Scalars['Int'];
    ecosystemId: Scalars['ID'];
    fishId: Scalars['ID'];
};
export declare type MutationUpdatePlantInEcosystemArgs = {
    count: Scalars['Int'];
    ecosystemId: Scalars['ID'];
    plantId: Scalars['ID'];
};
export declare type PageInfo = {
    endCursor: Scalars['ID'];
    hasNextPage?: Maybe<Scalars['Boolean']>;
    startCursor: Scalars['ID'];
};
export declare type Plant = Animal & {
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
export declare type PlantListConnection = {
    edges: Array<PlantListEdge>;
    pageInfo: PageInfo;
};
export declare type PlantListEdge = {
    cursor: Scalars['ID'];
    node?: Maybe<Plant>;
};
export declare type Query = {
    fish?: Maybe<Fish>;
    fishList: FishListConnection;
    me?: Maybe<User>;
    plant?: Maybe<Plant>;
    plantList: PlantListConnection;
};
export declare type QueryFishArgs = {
    id: Scalars['ID'];
};
export declare type QueryFishListArgs = {
    after?: InputMaybe<Scalars['ID']>;
    first?: InputMaybe<Scalars['Int']>;
    substring?: InputMaybe<Scalars['String']>;
};
export declare type QueryPlantArgs = {
    id: Scalars['ID'];
};
export declare type QueryPlantListArgs = {
    after?: InputMaybe<Scalars['ID']>;
    first?: InputMaybe<Scalars['Int']>;
    substring?: InputMaybe<Scalars['String']>;
};
export declare type Reference = {
    baseTitle: Scalars['String'];
    title: Scalars['String'];
    url?: Maybe<Scalars['String']>;
};
export declare type RegistrationResult = {
    token?: Maybe<Scalars['String']>;
    user?: Maybe<User>;
};
export declare type Scientific = {
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
export declare type UpdateFishResult = {
    ecosystem?: Maybe<Ecosystem>;
};
export declare type UpdatePlantResult = {
    ecosystem?: Maybe<Ecosystem>;
};
export declare type User = {
    ecosystems?: Maybe<Array<Ecosystem>>;
    id: Scalars['ID'];
    login?: Maybe<Scalars['String']>;
    name: Scalars['String'];
};
export declare type WaterChemicalParameters = {
    ammonia: Scalars['Float'];
    gh: Scalars['Int'];
    kh: Scalars['Int'];
    nitrate: Scalars['Float'];
    nitrite: Scalars['Float'];
    ph: Scalars['Float'];
};
export declare type WaterChemicalParametersInput = {
    ammonia?: InputMaybe<Scalars['Float']>;
    gh?: InputMaybe<Scalars['Int']>;
    kh?: InputMaybe<Scalars['Int']>;
    nitrate?: InputMaybe<Scalars['Float']>;
    nitrite?: InputMaybe<Scalars['Float']>;
    ph?: InputMaybe<Scalars['Float']>;
};
export declare type WaterParameters = {
    chemical: WaterChemicalParameters;
    temperature: Scalars['Float'];
};
export declare type WaterParametersInput = {
    chemical?: InputMaybe<WaterChemicalParametersInput>;
    temperature?: InputMaybe<Scalars['Float']>;
};
export declare type WaterParametersRange = {
    max: WaterParameters;
    min: WaterParameters;
};
export declare type WaterReplacement = {
    water: WaterParameters;
    /** @deprecated Replaced with water.chemical */
    waterParameters?: Maybe<WaterChemicalParameters>;
};
export declare type WaterReplacementInput = {
    water?: InputMaybe<WaterParametersInput>;
    waterParameters?: InputMaybe<WaterChemicalParametersInput>;
};
export declare type SearchFishQueryVariables = Exact<{
    substring?: InputMaybe<Scalars['String']>;
    first?: InputMaybe<Scalars['Int']>;
    after?: InputMaybe<Scalars['ID']>;
}>;
export declare type SearchFishQuery = {
    fishList: {
        edges: Array<{
            cursor: string;
            node?: {
                id: string;
            } | null;
        }>;
    };
};
export declare const SearchFishDocument: DocumentNode<SearchFishQuery, Exact<{
    substring?: InputMaybe<string> | undefined;
    first?: InputMaybe<number> | undefined;
    after?: InputMaybe<string> | undefined;
}>>;
