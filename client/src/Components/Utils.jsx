import { gql} from '@apollo/client';

export const TEST_QUERY = gql`
  query  {
    hello
  }
`

export const GET_RESULTS = gql`
  query get_landlords($street: String, $city: String, $state: String, $zipcode: String) {
    findLandlordsByAddress(street: $street, city: $city, state: $state, zipcode: $zipcode){
      landlordSearchResult {
        name
        id
        city
        state
        street
        zipcode
      }
      latitude
      longitude
    }
  }
`

export const GET_LANDLORDS_LIST = gql`
query get_landlords_by_address($street: String, $city: String, $state: String) {
  findLandlordsByAddress(street: $street, city: $city, state: $state) {
    id
    name 
    street
    city 
    state 
    zipcdoe
  }
}
`

export const GET_ALL_LANDLORDS = gql`
  query($id: String) {
    getAllLandlords(id: $id) {
    name
    id
    city
    state
    street
    zipcode
  }}

`

export const GET_LANDLORD_BY_ID = gql`
  query findLandlordByID($id: ID) {
    findLandordById(id: $id) {
      LandlordStats {
        name
        overallRating
        wouldRentAgainLevel
        tags
        friendlinessRating
        communicationRating
        maintenanceRating
        responsivenessRating
        transactionsIssues
      }
      PropertyStats {
        cleanliness
        noiseLevel
      }
      Reviews {
        user
        landlordReview {
          friendlinessRating
          communicationRating
          maintenanceRating
        }
        propertyReview {
          moveInDate
          moveOutDate
        }
      }
    }
  }
`


