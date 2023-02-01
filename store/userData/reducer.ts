const initialState = {
  supportedCurrencies: {},
  networkToMicroservice: {},
};

function dictionaryReducer(state = initialState, action) {
  switch (action.type) {
    // case Types.SET_SUPPORTED_CURRENCIES_DICTIONARY:
    //   return { ...state, supportedCurrencies: action.payload };
    // case Types.SET_NETWORK_TO_MICROSERVICE_DICTIONARY:
    //   return { ...state, networkToMicroservice: action.payload };
    // default:
      // return state;
  }
}

export default dictionaryReducer;
