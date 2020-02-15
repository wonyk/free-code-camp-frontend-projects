// Define global constants
const projectName = 'drum-machine'
const drumProperties = [
  {
    keyCode: 81,
    key: 'Q',
    audio: 'Audio/snare.mp3',
    text: 'SNARE'
  },
  {
    keyCode: 87,
    key: 'W',
    audio: 'Audio/Bass Drum.mp3',
    text: 'BASS'
  },
  {
    keyCode: 69,
    key: 'E',
    audio: 'Audio/Clap.mp3',
    text: 'CLAP'
  },
  {
    keyCode: 65,
    key: 'A',
    audio: 'Audio/Closed Hi Hat.mp3',
    text: 'CLOSED HIHAT'
  },
  {
    keyCode: 83,
    key: 'S',
    audio: 'Audio/Open High Hat.mp3',
    text: 'OPEN HIGH HAT'
  },
  {
    keyCode: 68,
    key: 'D',
    audio: 'Audio/Crash cymbol.mp3',
    text: 'CRASH'
  },
  {
    keyCode: 90,
    key: 'Z',
    audio: 'Audio/Drum Kick.mp3',
    text: 'KICK'
  },
  {
    keyCode: 88,
    key: 'X',
    audio: 'Audio/Tom Mid.mp3',
    text: 'MID TOM'
  },
  {
    keyCode: 67,
    key: 'C',
    audio: 'Audio/Hi-Tom-1.mp3',
    text: 'HI TOM'
  }
]

// Slider stateless component
const Slider = ({ volume, handleSlider }) => (
  <div className='slide'>
    <label htmlFor='slider'>Master Volume</label>
    <input
      type='range'
      min='0'
      max='100'
      value={volume}
      className='slider'
      onChange={handleSlider}
    />
  </div>
)

// class App
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      volume: 75,
      display: 'WELCOME'
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKey)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey)
  }

  handleSlider = e => {
    let volume = e.target.value
    this.setState({ volume, display: `VOLUME: ${volume}` })
  }

  playMusic = prop => {
    // Set the button active
    let elem = document.getElementById(prop.text)
    elem.classList.add('active')
    setTimeout(() => elem.classList.remove('active'), 175)
    // Play the audio clip
    let music = document.getElementById(prop.key)
    music.volume = this.state.volume / 100
    music.currentTime = 0
    music.play()
    this.setState({ display: prop.text })
  }

  handleKey = e => {
    const prop = drumProperties.filter(
      properties => properties.keyCode === e.keyCode
    )
    if (prop.length !== 0) {
      this.playMusic(prop[0])
    }
  }

  render() {
    return (
      <div id='drum-machine'>
        <h1>Drum Machine</h1>
        <div id='display'>{this.state.display}</div>
        <Slider volume={this.state.volume} handleSlider={this.handleSlider} />
        <div className='drum-pads'>
          {drumProperties.map((prop, i) => (
            <button
              className='drum-pad'
              id={prop.text}
              key={prop.key}
              onClick={() => this.playMusic(prop)}>
              <audio src={prop.audio} className='clip' id={prop.key}></audio>
              {prop.key}
            </button>
          ))}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
