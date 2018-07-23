import React, { Component } from 'react'
// import styles from '../../public/style'
import Sound from 'react-sound'
import { connect } from 'react-redux'
import InstButtons from './InstButtons'
import { armInstrumentThunk, disarmInstrumentThunk, clearDrumboThunk } from '../store/instruments';

class Root extends Component {
  constructor () {
    super()
    this.state = {
      tempo: 120,
      activeCell: 0,
      tempoInMs: 180,
      intervalId: '',
      isGoing: false,
      sounds: []
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

  handleClick = (event) => {
    const cell = event.currentTarget
    const cellId = Number(event.target.getAttribute('value'))
    const instObj = this.props.currentInstrument
    const instrument = this.props.currentInstrument.instrument
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
          this.state.sounds.map((sound, index) => <Sound url={sound.url} playStatus={Sound.status.PLAYING} playFromPosition={0} key={index}/>)
        }
        <table id="iterator">
          <tbody>
            <tr>
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
          <form>
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
          </form>
            <br />
          <button
            type="submit"
            value="Start"
            disabled={this.state.isGoing} 
            onClick={this.startIterator} > 
              Start
          </button>
            <br />
          <button
            type="submit"
            value="Stop"
            disabled={!this.state.isGoing} 
            onClick={this.stopIterator} > 
              Stop
          </button>
            <br />
          <button 
            type="submit"
            onClick={this.clearDrumbo} >
              Clear
          </button>
        </div>
        <InstButtons />
        <div>{this.state.activeCell + 1}</div> 
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
    clearDrumbo: () => dispatch(clearDrumboThunk())
  }
}

export default connect(mapState, mapDispatch)(Root)
