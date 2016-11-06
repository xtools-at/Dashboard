import moment from 'moment';
//import axios from 'axios';
//var {hashHistory} = require('react-router');
import Helper from 'Helper';

//import firebase, {dbRef} from 'app/firebase/';


//Get Restaurant List
export var getRestaurants = (restaurants) => {
  return {
    type: 'GET_RESTAURANTS',
    restaurants
  };
};

export var startGetRestaurants = () => {
  return (dispatch, getState) => {

    var restaurantsRef = dbRef.child('restaurants');

    return restaurantsRef.once('value').then((snapshot) => {
      var restaurants = snapshot.val() || {};
      var parsedRestaurants = [];

      Object.keys(restaurants).forEach((restaurantId) => {
        parsedRestaurants.push({
          id: restaurantId,
          ...restaurants[restaurantId]
        });
      });
      dispatch(getRestaurants(parsedRestaurants));
    });
  };
};

//Handle Ratings
export var getRatings = (ratings) => {
  return {
    type: 'GET_RATINGS',
    ratings
  };
};

export var startGetRatings = (restaurantId) => {
  return (dispatch) => {

    var ratingsRef = dbRef.child('ratings/');

    return ratingsRef.orderByChild('reference').equalTo(restaurantId).once('value').then((snapshot) => {
      var ratings = snapshot.val() || {};
      var parsedRatings = [];

      Object.keys(ratings).forEach((ratingId) => {
        parsedRatings.push({
          id: ratingId,
          ...ratings[ratingId]
        });
      });

      dispatch(getRatings(parsedRatings));
    });
  };
};

export var clearRatings = () => {
  return {
    type: 'CLEAR_RATINGS'
  };
};


//Add Review
export var addReview = (rating) => {
  return {
    type: 'ADD_RATING',
    rating
  };
};

export var startAddReview = (rating, name, comment, reference, date) => {
  return (dispatch, getState) => {
    var review = {
      rating, name, comment, reference, date
    };
    
    var reviewSave = dbRef.child('ratings').push(review);
    return reviewSave.then(() => {
      dispatch(addReview(review));
      Helper.toast('Review has been saved succesfully!');
    }).catch((error)=>{
      Helper.toast('Unable to save Review - please try again!');
    });
  };
};

//Store custom Data
export var setCheckedRadio = (checkedRadio) => {
  return {
    type: 'CHECKED_RADIO',
    checkedRadio
  };
};

export var storeLocation = (lat, lng) => {
  return {
    type: 'STORE_LOCATION',
    userLat: lat,
    userLng: lng
  };
};

export var showModal = (setTo) => {
  return {
    type: 'SHOW_MODAL',
    showModal: setTo
  }
}

//Filters
export var setFilters = (filters, sortBy) => {
  //filters = {id: bool, id2: bool2}
  //sortBy = "string"
  return {
    type: 'SET_FILTERS',
    filters,
    sortBy
  }
}
