const axios = require('axios')
require('dotenv').config()
const mongoose = require('mongoose')

/*-------------------------------------COMMON HEADERS-------------------------------------*/
// axios.defaults.headers.common['accept'] = 'application/json'
// axios.defaults.headers.common['apikey'] = "6d58671a70c7abeee02107555d1a8a62"
/*-------------------------------------COMMON HEADERS-------------------------------------*/


const findLandlordsByAddress = async (__, args, context) => {
  const mainObj = {
    queryReturnValue: {},
    defaultReturnValue: {
      landlordSearchResult: [{
        name: "No results found. Please try again.", 
        id: "0", 
        street:  "No results found. Please try again.", 
        city:  "No results found. Please try again.", 
        state:  "No results found. Please try again.", 
        zipcode:  "No results found. Please try again.",
      }], 
      latitude: '', 
      longitude: ''
    }, 
    address: {
      street: '', 
      city: '',
      state: '', 
      zipcode: '',
    },
    landlords: [], 
    landlordIds: [], 
    queryResponse: ""
  }

  const generateRandomNum = () => (Math.random() * 5.1).toFixed(2)

  //Query the ATTOM API to get the full address and property owner(s)
  const fetchAttomApi = async ({street, city, state, zipcode}) => {
    const queryURL = process.env.ATOM_URL_FULL_ADDRESS
    const res = await axios.get(queryURL, {
      headers: {
        accept: "application/json", 
        apikey: process.env.ATOM_KEY_2,
      },
      params: {
        address1: street, 
        address2: city + ', ' + state
      }
    })
    if(res.data.status.code === 0 && res.data.property.length > 0)  {
      mainObj.queryReturnValue.latitude = res.data.property[0].location.latitude
      mainObj.queryReturnValue.longitude = res.data.property[0].location.longitude
      const { address } = res.data.property[0]
      mainObj.address.street = address.line1
      mainObj.address.city = address.locality
      mainObj.address.state = address.countrySubd
      mainObj.address.zipcode = address.postal1
      return res.data.property
    }else 
      throw {message: 'ATTOM API query unsuccessful', data: res.data} 
  }

  

  const generateLandlordSchema  = (propertyData) => {
    //parse through multiple owners 
    const landlordList = []

    propertyData.forEach(property => {
      for(let i = 1; i < 5; i++) {
        //Check for multiple owners
        if(property.assessment.owner[`owner${i}`].lastName) {
          const { firstNameAndMi, lastName} = property.assessment.owner[`owner${i}`]

          const newLandlordObj = {
            firstName: firstNameAndMi.split(' ')[0].trim(), 
            lastName: lastName.trim(),
            overallRating: generateRandomNum(),
            wouldRentAgainLevel:Math.floor(Math.random() * 101),
            tags: [], 
            friendlinessRating: generateRandomNum(),
            communcicationRating: generateRandomNum(),
            maintenanceRating: generateRandomNum(),
            responsivenessRating: generateRandomNum(),
            transactionIssue: (Math.random() * 101).toFixed(2), 
            properties: []
          }

          landlordList.push(newLandlordObj)
        }
      }
    })

    return landlordList
  } 

  const addLandlordToDB = async (landlordList) => {
    try {
      const data =  await Promise.allSettled(landlordList.map(async landlord =>  {
          const res = await context.Landlords.findOneAndUpdate(
            {
              firstName: landlord.firstName || 'N/A', 
              lastName: landlord.lastName,
            }, 
            {$setOnInsert: landlord}, 
            {upsert: true, new: true, useFindAndModify: false}, 
          ).exec()
          return res
        }))
  
        return data
    }catch(err) {
      throw {message: 'Insert to database failed', data: err}
    }
  }

  const generateLandlordList = (databaseResponse, queryResponse) => {
    const { line1, locality, countrySubd, postal1 } = queryResponse[0].address
    return databaseResponse.map(landlord => {
      const { value } = landlord 
      mainObj.landlordIds.push(value._id)
      return {
        name: value.firstName + " " + value.lastName,
        id: value._id, 
        street: line1, 
        city: locality, 
        state: countrySubd, 
        zipcode: postal1
      }
    })
  } 

  const addPropertyToDB = (landlordIds, address) => {
    console.log('adding property')
    console.log(landlordIds, address)
  }

  try{ 
    mainObj.queryResponse = await fetchAttomApi(args)
    mainObj.landlords = generateLandlordSchema(mainObj.queryResponse)
    const databaseResponse = await addLandlordToDB(mainObj.landlords, context)
    mainObj.queryReturnValue.landlordSearchResult = generateLandlordList(databaseResponse, mainObj.queryResponse)
    return mainObj.queryReturnValue.landlordSearchResult.length > 0 ? mainObj.queryReturnValue : mainObj.defaultReturnValue
  }catch(err) {
    console.log('error', err)
    return mainObj.defaultReturnValue
  }finally{
    if(mainObj.queryReturnValue.landlordSearchResult.length > 0) {
      addPropertyToDB(mainObj.landlordIds, mainObj.address)
    }
    delete mainObj
  }
}

module.exports = {
  findLandlordsByAddress
}