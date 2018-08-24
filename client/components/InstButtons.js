import React, { Component } from 'react'
import { connect } from 'react-redux'
import { switchInstrumentThunk } from '../store/currentInst';

class InstButtons extends Component {

  handleChange = (event) => {
    // on inst change clears out classes for all cells
    const allCells = document.getElementsByTagName('td')
    for (let i = allCells.length - 1; i >= 0; i--) {
      allCells[i].classList = ""
    }
    this.switchView(event)
  }
  
  switchView = async (event) => {
    // sends switchInst dispatch
    const link = event.target.getAttribute('value')
    const instrument = event.target.getAttribute('instrument')
    await this.props.switchInst(link, instrument)
    // gets updated currentInst, loops over allcells, assigns
    // classes to allCells based on store state
    const currentInst = this.props.currentInstrument.instrument
    const allCells = document.getElementsByTagName('td')
    for (let i = allCells.length - 1; i >= 0; i--) {
      const simplifiedArr = this.props.instruments[i].map(element => element.instrument)
      if (simplifiedArr.includes(currentInst)) {
        allCells[i].classList.add(currentInst)
      }
    }
  }

  render() {
    const url = 'https://res.cloudinary.com/dl7gzlb0w/video/upload/v1531265492/'
    return (
      <div id="instrument buttons">
        <form>
          <label className='text'>
            <input 
              type="radio"
              onChange={this.handleChange}
              value={url + 'Snare.mp3'}
              instrument='snare'
              checked={this.props.currentInstrument.url === url + 'Snare.mp3'} />
              Snare
          </label>
          <label className='text'>
            <input
              type="radio"
              onChange={this.handleChange}
              value={url + 'Kick.mp3'}
              instrument='kick'
              checked={this.props.currentInstrument.url === url + 'Kick.mp3'} />
                 Kick Drum
          </label>
          <label className='text'>
            <input
              type="radio"
              onChange={this.handleChange}
              value={url + 'Floor.mp3'} 
              instrument='floor'
              checked={this.props.currentInstrument.url === url + 'Floor.mp3'} />
                 Floor Tom
          </label>
          <label className='text'>
            <input
              type="radio"
              onChange={this.handleChange}
              value={url + 'Rack.mp3'} 
              instrument='rack'
              checked={this.props.currentInstrument.url === url + 'Rack.mp3'} />
              Rack Tom
          </label>
          <label className='text'>
            <input
              type="radio"
              onChange={this.handleChange}
              value={url + 'Hat.mp3'} 
              instrument='hat'
              checked={this.props.currentInstrument.url === url + 'Hat.mp3'} />
              Hi-Hat
          </label>
          <label className='text'>
            <input
              type="radio"
              onChange={this.handleChange}
              value={url + 'Ride.mp3'} 
              instrument='ride'
              checked={this.props.currentInstrument.url === url + 'Ride.mp3'} />
              Ride
          </label>
          <label className='text'>
            <input
              type="radio"
              onChange={this.handleChange}
              value={url + 'Crash.mp3'}
              instrument='crash'
              checked={this.props.currentInstrument.url === url + 'Crash.mp3'} />
              Crash
          </label>
        </form>
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
    switchInst: (link, instrument) => dispatch(switchInstrumentThunk(link, instrument))
  }
}

export default connect(mapState, mapDispatch)(InstButtons)