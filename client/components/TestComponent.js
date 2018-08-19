import React, { Component } from 'react'
import Sound from 'react-sound'

export default class TestComponent extends Component {
  constructor() {
    super();
    this.state = { sounds: [] };
  }

  handleClick() {
    console.log(this.state.sounds)
    this.setState({ sounds: this.state.sounds.concat({ url: 'https://res.cloudinary.com/dl7gzlb0w/video/upload/v1531265492/Snare.mp3' }) });
  }

  render() {
    return (
      <div>
        <button type="submit" onClick={this.handleClick.bind(this)}>Click me</button>
        {this.state.sounds.map((sound, index) => <Sound url={sound.url} 
          playStatus={Sound.status.PLAYING}
          key={index}
          position={0}
          onPlaying={(obj) => {
            const ok = this.state.sounds
            ok.pop()
            this.setState({sounds: ok})
            console.log('DDDDdDDDDdDDDDdDDDDdDDDDdDDDDdDDDDd', obj)
          }}/>
        )}
      </div>
    );
  }
}