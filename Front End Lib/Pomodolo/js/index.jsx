const initialState = {
  breakTimeMin: 5,
  sessionTimeMin: 25,
  active: 'Session',
  activeTimeMin: 25,
  activeTimeSec: 0,
  play: true,
  completed: ['n', 'n', 'n', 'n']
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'startStop':
      return {
        ...state,
        play: !state.play
      }
    case 'reset':
      return initialState
    case 'breakIncrement':
      if (state.breakTimeMin >= 60) {
        return state
      }
      return {
        ...state,
        breakTimeMin: state.breakTimeMin + 1,
        activeTimeMin:
          state.active === 'Break'
            ? state.breakTimeMin + 1
            : state.activeTimeMin,
        activeTimeSec: state.active === 'Break' ? 0 : state.activeTimeSec
      }
    case 'breakDecrement':
      if (state.breakTimeMin <= 1) {
        return state
      }
      return {
        ...state,
        breakTimeMin: state.breakTimeMin - 1,
        activeTimeMin:
          state.active === 'Break'
            ? state.breakTimeMin - 1
            : state.activeTimeMin,
        activeTimeSec: state.active === 'Break' ? 0 : state.activeTimeSec
      }
    case 'sessionIncrement':
      if (state.sessionTimeMin >= 60) {
        return state
      }
      return {
        ...state,
        sessionTimeMin: state.sessionTimeMin + 1,
        activeTimeMin:
          state.active === 'Session'
            ? state.sessionTimeMin + 1
            : state.activeTimeMin,
        activeTimeSec: state.active === 'Session' ? 0 : state.activeTimeSec
      }
    case 'sessionDecrement':
      if (state.sessionTimeMin <= 1) {
        return state
      }
      return {
        ...state,
        sessionTimeMin: state.sessionTimeMin - 1,
        activeTimeMin:
          state.active === 'Session'
            ? state.sessionTimeMin - 1
            : state.activeTimeMin,
        activeTimeSec: state.active === 'Session' ? 0 : state.activeTimeSec
      }
    case 'setSec':
      return {
        ...state,
        activeTimeSec: action.sec
      }
    case 'setMin':
      return {
        ...state,
        activeTimeMin: action.min
      }
    case 'setTitle':
      return {
        ...state,
        active: state.active === 'Session' ? 'Break' : 'Session'
      }
    case 'setCompleted':
      return {
        ...state,
        completed: action.checklist
      }
    default:
      return initialState
  }
}

const Pomodoro = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const {
    breakTimeMin,
    activeTimeSec,
    sessionTimeMin,
    activeTimeMin,
    active,
    play,
    completed
  } = state

  React.useEffect(() => {
    if (!play) {
      const { activeTimeMin, activeTimeSec } = state
      if (activeTimeMin === 0 && activeTimeSec === 0) {
        playAudio()
      }
      let countdown = setInterval(() => {
        if (activeTimeSec > 0) {
          dispatch({ type: 'setSec', sec: activeTimeSec - 1 })
        } else if (activeTimeSec === 0) {
          if (activeTimeMin === 0) {
            clearInterval(countdown)
          } else {
            dispatch({ type: 'setSec', sec: 59 })
            dispatch({ type: 'setMin', min: activeTimeMin - 1 })
          }
        }
      }, 1000)
      return () => {
        clearInterval(countdown)
      }
    }
  }, [play, state.activeTimeMin, state.activeTimeSec])

  const editTime = callback => {
    const { play } = state
    if (play) {
      callback()
    }
  }

  let alarmBlock
  const playAudio = () => {
    let audio = document.getElementById('beep')
    audio.currentTime = 0
    audio.play()
    alarmBlock = setTimeout(() => handleChange(), 3500)
  }

  const reset = () => {
    let audio = document.getElementById('beep')
    audio.pause()
    audio.currentTime = 0
    clearTimeout(alarmBlock)
    dispatch({ type: 'reset' })
  }

  const handleChange = () => {
    const { breakTimeMin, active, completed } = state
    let newTime = active === 'Session' ? breakTimeMin : sessionTimeMin
    let firstIndex = completed.indexOf('n')
    let updateChecklist = [...completed]
    // Reset back to default before the after 30 mins break ends
    if (active === 'Break' && firstIndex === -1) {
      updateChecklist = ['n', 'n', 'n', 'n']
      dispatch({ type: 'setCompleted', checklist: updateChecklist })
    }
    if (active === 'Session') {
      // When there is only 1 box left to check, the next break will be 30 mins instead of usual 5 (defualt)
      if (firstIndex === 3) {
        newTime = 30
      }
      updateChecklist[firstIndex] = 'y'
      dispatch({ type: 'setCompleted', checklist: updateChecklist })
    }
    dispatch({ type: 'setMin', min: newTime })
    dispatch({ type: 'setSec', sec: 0 })
    dispatch({ type: 'setTitle' })
  }

  return (
    <div className='display'>
      <h1 className='title'>Tomato Pomodoro</h1>
      <div className='circle'>
        <div className='rect-in-circle'>
          <div id='timer-label'>{active}</div>
          <div id='time-left'>
            {activeTimeMin < 10 ? '0' + activeTimeMin : activeTimeMin}:
            {activeTimeSec < 10 ? '0' + activeTimeSec : activeTimeSec}
          </div>
          <div className='controls'>
            <i
              className={`icon ion-md-${play ? 'play' : 'pause'}`}
              id='start_stop'
              onClick={() => dispatch({ type: 'startStop' })}
            />
            <i
              className='icon ion-md-refresh'
              id='reset'
              onClick={() => reset()}
            />
          </div>
        </div>
      </div>
      <BreakContainer
        dispatch={dispatch}
        breakTimeMin={breakTimeMin}
        editTime={editTime}
      />
      <SessionContainer
        dispatch={dispatch}
        sessionTimeMin={sessionTimeMin}
        editTime={editTime}
      />
      <div className='title pomodoros'>
        Complete 4 Pomodoros and take a longer break!
      </div>
      <div className='row accomplishments'>
        {completed.map((value, i) => {
          if (value === 'n') {
            return (
              <i
                className='icon ion-md-square-outline checkboxes'
                key={i + 'c'}
              />
            )
          } else {
            return (
              <i className='icon ion-md-checkbox checkboxes' key={i + 'nc'} />
            )
          }
        })}
      </div>
      <audio id='beep' src='audio/Beanstalk.mp3'></audio>
    </div>
  )
}

const BreakContainer = ({ editTime, breakTimeMin, dispatch }) => {
  return (
    <div className='break container'>
      <div id='break-label'>Break</div>
      <div className='row'>
        <i
          className='icon ion-md-add buttons'
          id='break-increment'
          onClick={() => editTime(() => dispatch({ type: 'breakIncrement' }))}
        />
        <div id='break-length' className='buttons'>
          {breakTimeMin}
        </div>
        <i
          className='icon ion-md-remove buttons'
          id='break-decrement'
          onClick={() => editTime(() => dispatch({ type: 'breakDecrement' }))}
        />
      </div>
    </div>
  )
}

const SessionContainer = ({ editTime, sessionTimeMin, dispatch }) => {
  return (
    <div className='session container'>
      <div id='session-label'>Session</div>
      <div className='row'>
        <i
          className='icon ion-md-add buttons'
          id='session-increment'
          onClick={() => editTime(() => dispatch({ type: 'sessionIncrement' }))}
        />
        <div id='session-length' className='buttons'>
          {sessionTimeMin}
        </div>
        <i
          className='icon ion-md-remove buttons'
          id='session-decrement'
          onClick={() => editTime(() => dispatch({ type: 'sessionDecrement' }))}
        />
      </div>
    </div>
  )
}

ReactDOM.render(<Pomodoro />, document.getElementById('root'))
