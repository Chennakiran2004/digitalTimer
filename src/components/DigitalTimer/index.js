import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timerLimitInMinutes: 25,
  timeElapsedInSeconds: 0,
}

export default class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onClickStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state

    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }

    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }

    this.setState(previousState => ({
      isTimerRunning: !previousState.isTimerRunning,
    }))
  }

  onClickResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  renderTimerControllers = () => {
    const {isTimerRunning} = this.state

    const startOrPauseImage = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-main-container">
        <button
          className="start-or-pause-button"
          type="button"
          onClick={this.onClickStartOrPauseTimer}
        >
          <img
            src={startOrPauseImage}
            alt={startOrPauseAltText}
            className="start-or-pause-icon"
          />
        </button>
        <p className="timer-controller-label">
          {isTimerRunning ? 'Pause' : 'Start'}
        </p>
        <button
          className="start-or-pause-button"
          type="button"
          onClick={this.onClickResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset"
            className="start-or-pause-icon"
          />
        </button>
        <p className="timer-controller-label">Reset</p>
      </div>
    )
  }

  onIncreaseTimerInMinutes = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onDecrementTimerInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onDecrementTimerInMinutes}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimerInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  getElapsedSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-timer-container">
              <h1 className="elapsed-timer">{this.getElapsedSeconds()}</h1>
              <p className="elapsed-timer-status">{labelText}</p>
            </div>
          </div>
          <div className="controls-main-container">
            {this.renderTimerControllers()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
