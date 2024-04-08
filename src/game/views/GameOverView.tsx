import { resetState } from '../actions'
import { useGame } from '../context'

export const GameOverView = () => {
  const { state, dispatch } = useGame()
  const handleNext = () => {
    dispatch(resetState())
  }
  return (
    <>
      <h2>Game Over</h2>
      <p>
        <a onClick={handleNext}>Start Over</a>?
      </p>
    </>
  )
}
