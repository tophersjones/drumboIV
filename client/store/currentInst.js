
const SWITCH_INSTRUMENT = 'SWITCH_INSTRUMENT'

const initialState = {
  selectedInstrument: { url: 'https://res.cloudinary.com/dl7gzlb0w/video/upload/v1531265492/Snare.mp3', instrument: 'snare' }
}

const switchInstrumentAction = (link, instrument) => {
  return {
    type: SWITCH_INSTRUMENT,
    instObj: { url: link, instrument },
    // name: link.slice()
  }
}

export const switchInstrumentThunk = (link, instrument) => {
  return dispatch => {
    const action = switchInstrumentAction(link, instrument)
    dispatch(action)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SWITCH_INSTRUMENT:
      return { ...state, selectedInstrument: action.instObj }
    default: 
      return state
  }
}