/**
 * ACTION TYPES
 */

const ARM_INSTRUMENT = 'ARM_INSTRUMENT'
const DISARM_INSTRUMENT = 'DISARM_INSTRUMENT'
const CLEAR_DRUMBO = 'CLEAR_DRUMBO'
const SAMPLE = 'SAMPLE'

/**
 * INITIAL STATE
 */

const initialState = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
  10: [],
  11: [],
  12: [],
  13: [],
  14: [],
  15: [],
}

const sampleState = {
  0: [{url: "https://res.cloudinary.com/dl7gzlb0w/video/upload/v1531265492/Hat.mp3", instrument: "hat"},
      {url: "https://res.cloudinary.com/dl7gzlb0w/video/upload/v1531265492/Kick.mp3", instrument: "kick"}],
  1: [{url: "https://res.cloudinary.com/dl7gzlb0w/video/upload/v1531265492/Kick.mp3", instrument: "kick"}],
  2: [],
  3: [{url: "https://res.cloudinary.com/dl7gzlb0w/video/upload/v1531265492/Hat.mp3", instrument: "hat"}],
  4: [{url: "https://res.cloudinary.com/dl7gzlb0w/video/upload/v1531265492/Ride.mp3", instrument: "ride"}],
  5: [{url: "https://res.cloudinary.com/dl7gzlb0w/video/upload/v1531265492/Floor.mp3", instrument: "floor"}],
  6: [{url: "https://res.cloudinary.com/dl7gzlb0w/video/upload/v1531265492/Hat.mp3", instrument: "hat"},
      {url: "https://res.cloudinary.com/dl7gzlb0w/video/upload/v1531265492/Snare.mp3", instrument: "snare"}],
  7: [],
  8: [],
  9: [{url: "https://res.cloudinary.com/dl7gzlb0w/video/upload/v1531265492/Ride.mp3", instrument: "ride"}],
  10: [{url: "https://res.cloudinary.com/dl7gzlb0w/video/upload/v1531265492/Hat.mp3", instrument: "hat"}],
  11: [],
  12: [{url: "https://res.cloudinary.com/dl7gzlb0w/video/upload/v1531265492/Hat.mp3", instrument: "hat"},   
       {url: "https://res.cloudinary.com/dl7gzlb0w/video/upload/v1531265492/Kick.mp3", instrument: "kick"}],
  13: [{url: "https://res.cloudinary.com/dl7gzlb0w/video/upload/v1531265492/Kick.mp3", instrument: "kick"}],
  14: [{url: "https://res.cloudinary.com/dl7gzlb0w/video/upload/v1531265492/Rack.mp3", instrument: "rack"}],
  15: [{url: "https://res.cloudinary.com/dl7gzlb0w/video/upload/v1531265492/Rack.mp3", instrument: "rack"}]
}

/**
 * ACTION CREATORS
 */

const armInstrumentAction = (cellId, instrument) => {
  return {
    type: ARM_INSTRUMENT,
    cellId,
    instrument
  }
}

const disarmInstrumentAction = (cellId, instrument) => {
  return {
    type: DISARM_INSTRUMENT,
    cellId,
    instrument
  }
}

const clearDrumboAction = () => {
  return {
    type: CLEAR_DRUMBO
  }
}

const sampleAction = () => {
  return {
    type: SAMPLE
  }
}

/**
 * THUNK CREATORS
 */

export const armInstrumentThunk = (cellId, instrument) => {
  return dispatch => {
    const action = armInstrumentAction(cellId, instrument)
    dispatch(action)
  }
}

export const disarmInstrumentThunk = (cellId, instrument) => {
  return dispatch => {
    const action = disarmInstrumentAction(cellId, instrument)
    dispatch(action)
  }
}

export const clearDrumboThunk = () => {
  return dispatch => {
    const action = clearDrumboAction()
    dispatch(action)
  }
}

export const sampleThunk = () => {
  return dispatch => {
    const action = sampleAction()
    dispatch(action)
  }
}

/**
 * REDUCER
 */

export default function(state = initialState, action) {
  switch (action.type) {
    case ARM_INSTRUMENT:
      const beat = action.cellId
      return { ...state, [beat]: [...state[beat], action.instrument] }
    case DISARM_INSTRUMENT:
      const filteredArr = state[action.cellId].filter(instrument => instrument.instrument !== action.instrument.instrument)
      return { ...state, [action.cellId]: filteredArr }
    case CLEAR_DRUMBO:
      return initialState 
    case SAMPLE:
      return sampleState
    default:
      return state
  }
}
