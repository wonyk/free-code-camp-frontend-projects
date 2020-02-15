class Interface extends React.Component {
  render() {
    return (
      <div className='interface'>
        <div className='row'>
          <button
            className='key len-2'
            id='clear'
            onClick={() => this.props.clearAll()}>
            AC
          </button>
          <button
            className='key len-1'
            onClick={() => this.props.handleDelete()}>
            <i className='icon ion-md-backspace'></i>
          </button>
          <button
            className='key len-1'
            id='divide'
            onClick={() => this.props.handleOps(' / ')}>
            /
          </button>
        </div>

        <div className='row'>
          <button
            className='key len-1'
            id='seven'
            onClick={() => this.props.handleNumber('7')}>
            7
          </button>
          <button
            className='key len-1'
            id='eight'
            onClick={() => this.props.handleNumber('8')}>
            8
          </button>
          <button
            className='key len-1'
            id='nine'
            onClick={() => this.props.handleNumber('9')}>
            9
          </button>
          <button
            className='key len-1'
            id='multiply'
            onClick={() => this.props.handleOps(' X ')}>
            X
          </button>
        </div>

        <div className='row'>
          <button
            className='key len-1'
            id='four'
            onClick={() => this.props.handleNumber('4')}>
            4
          </button>
          <button
            className='key len-1'
            id='five'
            onClick={() => this.props.handleNumber('5')}>
            5
          </button>
          <button
            className='key len-1'
            id='six'
            onClick={() => this.props.handleNumber('6')}>
            6
          </button>
          <button
            className='key len-1'
            id='subtract'
            onClick={() => this.props.handleOps(' - ')}>
            <i className='icon ion-md-remove'></i>
          </button>
        </div>

        <div className='row'>
          <button
            className='key len-1'
            id='one'
            onClick={() => this.props.handleNumber('1')}>
            1
          </button>
          <button
            className='key len-1'
            id='two'
            onClick={() => this.props.handleNumber('2')}>
            2
          </button>
          <button
            className='key len-1'
            id='three'
            onClick={() => this.props.handleNumber('3')}>
            3
          </button>
          <button
            className='key len-1'
            id='add'
            onClick={() => this.props.handleOps(' + ')}>
            <i className='icon ion-md-add'></i>
          </button>
        </div>

        <div className='row'>
          <button
            className='key len-2'
            id='zero'
            onClick={() => this.props.handleNumber('0')}>
            0
          </button>
          <button
            className='key len-1'
            id='decimal'
            onClick={() => this.props.handleDecimal()}>
            .
          </button>
          <button
            className='len-1 orange'
            id='equals'
            onClick={() => this.props.handleEquals()}>
            =
          </button>
        </div>
      </div>
    )
  }
}

const initialState = {
  history: 'Ans = ',
  main: '0',
  lastClicked: ''
}

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...initialState }
  }

  clearAll = () => {
    this.setState(initialState)
  }

  handleNumber = num => {
    const { main, lastClicked } = this.state
    // Handler to restart operation once equals is clicked by moving answer to history
    if (lastClicked === '=' && !/[X\/+\-]/.test(main)) {
      this.setState({ history: main, main: num, lastClicked: num })
      return
    }
    // Init the first number clicked after clear
    if (main === '0') {
      // Prevent consecutive zeroes beginning
      if (num === '0') return
      this.setState({ main: num, lastClicked: num })
      return
    }
    // Custom handler to prevent state change during Max Digit
    if (main === 'Max Digit Limit') {
      return
    }
    // 15 digit max handler
    let lastNum = main.match(/[0-9]*\.*[0-9]*$/)
    if (lastNum[0].length >= 15) {
      // making a shallow copy
      const prev = main.slice(0)
      this.setState({ main: 'Max Digit Limit' })
      setTimeout(() => {
        this.setState({ main: prev })
      }, 800)
      return
    }
    // Else:
    let newNum = main + num
    this.setState({ main: newNum, lastClicked: num })
  }

  handleDecimal = () => {
    const { main } = this.state
    // Prevent consecutive decimal points
    if (/[0-9]*\.[0-9]*$/.test(main)) {
      return
    }
    let newStr = main + '.'
    this.setState({ main: newStr, lastClicked: '.' })
  }

  handleDelete = () => {
    const { main } = this.state
    if (main === 'Max Digit Limit') return
    if (main.length === 1) {
      this.setState({ main: '0' })
      return
    }
    let newStr = main.slice(0, -1)
    // Slice more out if the last char is an operator (to remove spaces)
    if (/ [X\/\-\+] $/.test(main)) {
      newStr = newStr.slice(0, -2)
    }
    this.setState({ main: newStr })
  }

  handleOps = ops => {
    const { main } = this.state
    // Test for negative
    let newStr
    const negativeOps = / [X\/\+] - $/
    if (negativeOps.test(main)) {
      // Replace both the operator and negative with the new operator
      if (ops !== ' - ') {
        newStr = main.replace(negativeOps, ops)
        this.setState({ main: newStr, lastClicked: ops })
        return
      } else {
        return
      }
    }
    // Regex for ending with an operator (means the following will not be caught => '6 X - 6')
    const regex = / [X\/\-\+] $/
    let match = main.match(regex)
    if (!match) {
      newStr = main + ops
    } else if (ops === ' - ' && match !== ' - ') {
      newStr = main.slice(0, -1) + ops
    } else {
      newStr = main.replace(regex, ops)
    }
    this.setState({ main: newStr, lastClicked: ops })
  }

  handleEquals = () => {
    const calculate = func => {
      return new Function('return ' + func)()
    }
    const { main } = this.state
    // Attempt to sanitise
    let format = main.replace(/X/g, '*').replace(/[^-()\d/*+.]/g, '')
    // Prevent pressing equals when equation ends with an operator
    if (/[X+\-\/] $/.test(main)) {
      return
    }
    let ans = calculate(format)
    ans = +ans.toFixed(10)
    ans = ans.toString()
    this.setState({ main: ans, history: main + ' =', lastClicked: '=' })
  }

  render() {
    const { main, history } = this.state
    return (
      <div className='main'>
        <ion-icon name='remove'></ion-icon>
        <div id='screen'>
          <div className='history-line'>{history}</div>
          <div id='display'>{main}</div>
        </div>
        <Interface
          clearAll={this.clearAll}
          handleNumber={this.handleNumber}
          handleDecimal={this.handleDecimal}
          handleDelete={this.handleDelete}
          handleOps={this.handleOps}
          handleEquals={this.handleEquals}
        />
      </div>
    )
  }
}

ReactDOM.render(<Calculator />, document.getElementById('root'))
