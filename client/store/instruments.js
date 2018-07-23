/**
 * ACTION TYPES
 */

const ARM_INSTRUMENT = 'ARM_INSTRUMENT'
const DISARM_INSTRUMENT = 'DISARM_INSTRUMENT'
const CLEAR_DRUMBO = 'CLEAR_DRUMBO'

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
    default:
      return state
  }
}
