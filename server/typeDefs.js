const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type AuthResponse {
    token: String
    name: String
  }
  input AuthInput {
    accessToken: String!
  }

  type Query {
    hello: String 
    findLandlordsByAddress(street: String, city: String, state: String, zipcode: String): [LandlordSearchResult] ,
    findLandordById(id: ID) : FullLandLordProfile,
    getProperties: String,
  }

  type Mutation {
    addReview(
      landlord_id: String
      streetAddress: String
      reviewBody: String
      wouldRentAgain: Boolean
      friendlinessRating: Int
      communicationRating: Int
      responsivenessRating: Int
      maintenanceRating: Int
      transactionIssues: Boolean
      moveInDate: String
      moveOutDate: String
      cleanliness: Int
      neighborsVibes: [String]
      propertyIssues: [String]
      noiseLevelRating: Int
    ): AddReviewOutput,
    authFacebook(input: AuthInput!): AuthResponse
    authGoogle(input: AuthInput!): AuthResponse
  }

  type LandlordSearchResult {
    name: String 
    id: ID 
    street: String 
    city: String 
    state: String 
    zipcode: String
  }

  type LandlordStats {
    name: String
    overallRating: Int 
    wouldRentAgainLevel: Int 
    tags: [String]
    friendlinessRating: Int 
    communicationRating: Int 
    maintenanceRating: Int
    responsivenessRating: Int
    transactionsIssues: Int
  }

  type PropertyStats {
    cleanliness: Int
    noiseLevel: Int 
    commonPropertyIssues: [String]
    commonNeighborTraits: [String]
  }

  type ReviewObj {
    landlordReview: LandlordReview
    propertyReview: PropertyReview
    reviewBody: String
    user: String
  }

  type LandlordReview {
    wouldRentAgain: Boolean
    friendlinessRating: Int
    communicationRating: Int 
    responsivenessRating: Int
    maintenanceRating: Int
    transactionIssues: Boolean 
    user: String
  }

  type PropertyReview {
    moveInDate: String
    moveOutDate: String
    cleanliness: Int
    neighborsVibes: [String]
    propertyIssues: [String]
    noiseLevelRating: Int
    user: String
  }

  type User {
    name: String
    username: String
    email: String
    DOB: String
    properties: [ID]
  }

  type FullLandLordProfile {
    LandlordStats: LandlordStats 
    PropertyStats: PropertyStats
    Reviews: [ReviewObj]
  }

  input Address {
    street: String, 
    city: String, 
    state: String, 
    zipcode: String
  }

  input LandlordReviewInputs {
    wouldRentAgain: Boolean
    friendlinessRating: Int
    communicationRating: Int
    responsivenessRating: Int
    maintenanceRating: Int
    transactionIssues: Boolean
  }


  input PropertyReviewInputs {
    moveInDate: String
    moveOutDate: String
    cleanliness: Int
    neighborsVibes: [String]
    propertyIssues: [String]
    noiseLevelRating: Int
  }

  type AddReviewOutput {
    wouldRentAgain: Boolean
    friendlinessRating: Int
    communicationRating: Int
    responsivenessRating: Int
    maintenanceRating: Int
    transactionIssues: Boolean
    moveInDate: String
    moveOutDate: String
    cleanliness: Int
    neighborsVibes: [String]
    propertyIssues: [String]
    noiseLevelRating: Int
    reviewBody: String
  }
  
`;

module.exports = typeDefs;