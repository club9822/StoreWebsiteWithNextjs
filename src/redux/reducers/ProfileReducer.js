import { HYDRATE } from 'next-redux-wrapper';

const initialState = {

};

function reducer(state=initialState, action) {
  switch (action.type) {
    case HYDRATE: {
      return { ...state, ...action.payload };
    }

    default:
      return state;
  }
}

export default reducer;
