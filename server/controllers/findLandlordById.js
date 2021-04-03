const axios = require("axios");
require("dotenv").config();

/*-------------------------------------COMMON HEADERS-------------------------------------*/
axios.defaults.headers.common["accept"] = "application/json";
axios.defaults.headers.common["apikey"] = process.env.ATOM_KEY;
/*-------------------------------------COMMON HEADERS-------------------------------------*/

const findLandordById = async (__, args, context) => {

  const { id } = args;
  try {
    const data = await context.Landlords.find({ _id: id })
      .populate("properties")
      .populate({
        path: "reviews",
        populate: {
          path: "reviewedBy",
        },
      });


    const landlordProfile = data[0];
    const reviews = data[0].reviews;
    const properties = data[0].properties;

    const returnObj = {
      LandlordStats: {
        name: landlordProfile.firstName + " " + landlordProfile.lastName,
        overallRating: Math.floor(landlordProfile.overallRating),
        wouldRentAgainLevel: Math.floor(landlordProfile.wouldRentAgainLevel),
        tags: landlordProfile.tags,
        friendlinessRating: Math.floor(landlordProfile.friendlinessRating),
        communicationRating: Math.floor(landlordProfile.communicationRating),
        maintenanceRating: Math.floor(landlordProfile.maintenanceRating),
        responsivenessRating: Math.floor(landlordProfile.responsivenessRating),
        transactionsIssue: Math.floor(landlordProfile.transactionIssue),
      },
      PropertyStats: {
        cleanliness: 2,
        noiseLevel: 2,
        commonPropertyIssues: ["string"],
        commonNeighborTraits: ["string"],
      },
      Reviews: reviews.map((review) => ({
        landlordReview: {
          wouldRentAgain: Math.floor(review.landlordReview.wouldRentAgain),
          friendlinessRating: Math.floor(
            review.landlordReview.friendlinessRating
          ),
          communicationRating: Math.floor(
            review.landlordReview.communicationRating
          ),
          responsivenessRating: Math.floor(
            review.landlordReview.responsivenessRating
          ),
          maintenanceRating: Math.floor(
            review.landlordReview.maintenanceRating
          ),
          transactionIssues: Math.floor(
            review.landlordReview.transactionIssues
          ),
        },
        propertyReview: {
          moveInDate: review.propertyReview.moveInDate.toDateString(),
          moveOutDate: review.propertyReview.moveOutDate.toDateString(),
          cleanliness: Math.floor(review.propertyReview.cleanliness),
          neighborsVibes: review.propertyReview.neighborsVibes,
          propertyIssues: review.propertyReview.propertyIssues,
          noiseLevelRating: Math.floor(review.propertyReview.noiseLevelRating),
        },
        reviewBody: review.reviewBody,
        user: review.reviewedBy.firstName + " " + review.reviewedBy.lastName,
      })),
    };

 
    return returnObj;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  findLandordById,
};
