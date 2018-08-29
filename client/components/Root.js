import React, { Component } from 'react'
// import styles from '../../public/style'
import Sound from 'react-sound'
import { connect } from 'react-redux'
import InstButtons from './InstButtons'
import { armInstrumentThunk, disarmInstrumentThunk, clearDrumboThunk, sampleThunk } from '../store/instruments';
import Instructions from './Instructions'
import { switchInstrumentThunk } from '../store/currentInst';
import Button from 'muicss/lib/react/button'

class Root extends Component {
  constructor () {
    super()
    this.state = {
      tempo: 120,
      activeCell: 0,
      tempoInMs: 180,
      intervalId: '',
      isGoing: false,
      sounds: [],
    }
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress)
  }

  componentDidUpdate() {
    this.updateSoundArr()
  }

  handleInputChange = (event) => {
    this.setState({ tempo: event.target.value })
  }

  startIterator = (event) => {
    if (event) {
      event.preventDefault()
    }
    this.iterateFunc()
    this.setState({isGoing: true})
  } 

  stopIterator = (event) => {
    if (event) {
      event.preventDefault()
    }
    clearInterval(this.state.intervalId)
    this.setState({isGoing: false})
  }

  setTempo = (event) => {
    event.preventDefault()
    const bpmToMs = 15000 / event.target.value;
    this.setState({tempoInMs: bpmToMs})
    console.log(`tempo updated to ${bpmToMs} ms`)
  }

  updateSoundArr = async () => {
    const activeCell = this.state.activeCell
    const test1 = await this.state.sounds
    const test2 = await this.props.instruments[activeCell]
      if (JSON.stringify(test1) !== JSON.stringify(test2)) {
      this.setState({ sounds: this.props.instruments[activeCell] })
    }
  }

  iterateFunc = () => {
    let cell = this.state.activeCell
    this.setState({intervalId: setInterval( () => {
       this.setState({
         activeCell: (++cell) % 16,
       })
    }, this.state.tempoInMs)
    })
  }

  clearDrumbo = () => {
    const activeCells = document.getElementsByTagName("td")
    for (let i = activeCells.length - 1; i >= 0; i--) {
      activeCells[i].classList = ""
    }
    this.props.clearDrumbo()
    this.setState({activeCell: 0})
  }

  sampleBeat = () => {
    this.props.sample()
    this.props.switchInst('https://res.cloudinary.com/dl7gzlb0w/video/upload/v1531265492/Snare.mp3', 'snare')
    document.querySelectorAll("td[value='0'], td[value='3'], td[value='6'], td[value='10'], td[value='12']").classList = 'hat'
    document.querySelectorAll("td[value='0'], td[value='1'], td[value='12'], td[value='13']").classList = 'kick'
    document.querySelectorAll("td[value='4'], td[value ='9']").classList = 'ride'
    document.querySelectorAll("td[value='5']").classList = 'floor'
    document.querySelectorAll("td[value='14'], td[value='15']").classList = 'rack'
    const all = document.querySelectorAll("td")
    for (let i = 0; i < all.length; i++) {
      all[i].classList = ''
    }
    const snare = document.querySelectorAll("td[value='6']")
    for (let i = 0; i < snare.length; i++) {
      snare[i].classList = 'snare'
    }
  }

  handleClick = (event) => {
    const cell = event.currentTarget
    const cellId = Number(event.target.getAttribute('value'))
    const instObj = this.props.currentInstrument
    const instrument = this.props.currentInstrument.instrument
    console.log(event)
    if (cell.classList.contains(instrument)) {
      cell.classList.remove(instrument)
      this.props.disarmInst(cellId, instObj)
  } else {
      cell.classList = instrument
      this.props.armInst(cellId, instObj)
    }
  }

  handleKeyPress = (event) => {
    if (event.code === 'Space') {
      if (this.state.isGoing) {
        this.stopIterator()
      } else {
        this.startIterator()
      }
    }
  }

  render() {
    const iterator = [
      { active: 0, id: 0 },
      { active: 0, id: 1 },
      { active: 0, id: 2 },
      { active: 0, id: 3 },
      { active: 0, id: 4 },
      { active: 0, id: 5 },
      { active: 0, id: 6 },
      { active: 0, id: 7 },
      { active: 0, id: 8 },
      { active: 0, id: 9 },
      { active: 0, id: 10 },
      { active: 0, id: 11 },
      { active: 0, id: 12 },
      { active: 0, id: 13 },
      { active: 0, id: 14 },
      { active: 0, id: 15 },
    ]

    // v displays current position of iterator 
    iterator.map((cell) => {
      cell.id === this.state.activeCell ?
      cell.active = 1 :
      cell.active = 0
    })

    return (
      <div id="container" onKeyDown={this.handleKeyPress}>
        {
          this.state.sounds.map((sound, index) => <Sound url={sound.url} playStatus={Sound.status.PLAYING} autoLoad={true} playFromPosition={0} key={index}/>)
        }
        <table id="iterator">
          <tbody>
            <tr id="cell">
          { 
            iterator.map(cell => 
              (cell.active ?
                (
                <td 
                  key={cell.id} 
                  id="drumbo" 
                  value={cell.id}
                  onClick={this.handleClick} />
              ) : (
                <td 
                  key={cell.id} 
                  id="cell" 
                  value={cell.id}
                  onClick={this.handleClick} />
                )
              ) 
            )
          }
            </tr>
          </tbody>
        </table>
        <div id="buttons">
          {/*<form>
            <label>
              Set Tempo (BPM):
                <input 
                  name="tempo"
                  type="number"
                  min="44"
                  max="266"
                  value={this.state.tempo} 
                  onChange={this.handleInputChange} /> 
            </label>
              <br />
            <button 
              type="submit"
              value={this.state.tempo} 
              onClick={this.setTempo} 
            >
            Set
            </button>
          </form>*/}
            <br />
          <div id="start">
            <Button
              color="primary"
              className="button"
              type="submit"
              value="Start"
              disabled={this.state.isGoing} 
              onClick={this.startIterator} > 
                Start
            </Button>
              <br />
            <Button
              color="primary"
              className="button"
              type="submit"
              value="Stop"
              disabled={!this.state.isGoing} 
              onClick={this.stopIterator} > 
                Stop
            </Button>
              <br />
            <Button 
              color="danger"
              type="submit"
              className="button"
              onClick={this.clearDrumbo} >
                Clear
            </Button>
              <br />
            <Button 
              color="accent"
              type="submit"
              className="button"
              onClick={this.sampleBeat} >
              SAMPLE BEAT
            </Button>
          </div>
        </div>
        <br />
        <InstButtons />
        <Instructions />
      </div>
    )
  }
}

const mapState = state => {
  return {
    currentInstrument: state.currentInst.selectedInstrument,
    instruments: state.instruments
  }
}

const mapDispatch = dispatch => {
  return {
    armInst: (cellId, instrument) => dispatch(armInstrumentThunk(cellId, instrument)),
    disarmInst: (cellId, instrument) => dispatch(disarmInstrumentThunk(cellId, instrument)),
    clearDrumbo: () => dispatch(clearDrumboThunk()),
    switchInst: (link, instrument) => dispatch(switchInstrumentThunk(link, instrument)),
    sample: () => dispatch(sampleThunk())
  }
}

export default connect(mapState, mapDispatch)(Root)
