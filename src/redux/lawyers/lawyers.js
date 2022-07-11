const API_LAWYERS_INDEX_ENDPOINT = `${process.env.REACT_APP_API_HOST}/api/v1/lawyers`;
const REQUEST_STARTED = 'book-a-lawyer/lawyers/REQUEST_STARTED';
const REQUEST_FAILED = 'book-a-lawyer/lawyers/REQUEST_FAILED';
const REQUEST_COMPLETED = 'book-a-lawyer/lawyers/REQUEST_COMPLETED';
const initialState = {
  status: 'idle',
  statusLawyers: 'not_started',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_STARTED:
      return {
        ...state,
        ...action.payload,
      };
    case REQUEST_FAILED:
      return {
        ...state,
        ...action.payload,
      };
    case REQUEST_COMPLETED:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const requestStarted = () => ({
  type: REQUEST_STARTED,
  payload: {
    status: 'fetching',
  },
});

const requestFailed = (error) => ({
  type: REQUEST_FAILED,
  payload: {
    status: 'failed',
    error,
  },
});

const requestLawyersCompleted = ({ lawyers }) => ({
  type: REQUEST_COMPLETED,
  payload: {
    status: 'idle',
    statusLawyers: 'completed',
    lawyers,
  },
});

export const getLawyers = () => async (dispatch, getState) => {
  dispatch(requestStarted());
  try {
    const { authToken } = getState().auth;
    const response = await fetch(API_LAWYERS_INDEX_ENDPOINT, {
      headers: {
        Authorization: authToken,
      },
    });
    if (!response.ok) {
      throw (await response.json()).error;
    }

    dispatch(requestLawyersCompleted(await response.json()));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

export default reducer;
