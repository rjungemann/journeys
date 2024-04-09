import { useGame } from "../../context"
import { findParty } from "../../helpers"
import { commaSeparateStrings } from "../../utils"

export const RoomPartyEntitiesView = () => {
  const { state } = useGame()
  const party = findParty(state)()
  return (
    <>
      <h3>The Party</h3>
      <p>
        From the party,{' '}
        {commaSeparateStrings(party.map((entity) => entity.title))}{' '}
        {state.party.length === 1 ? 'is' : 'are'} here.
      </p>
    </>
  )
}