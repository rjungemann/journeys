import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from "react"
import { useGame, useTheme } from "../context"
import { changeEditRoom, changeEditScene, changePartyRepresentativeName, changeScene, changeTicks } from "../actions"
import { findRoom } from "../helpers"

export const EditBasicView = () => {
  const { state, dispatch } = useGame()
  const [ticks, setTicks] = useState<number>(state.ticks)
  const [sceneName, setSceneName] = useState<string>(state.sceneName)
  const [partyRepresentativeName, setPartyRepresentativeName] = useState<string>(state.partyRepresentativeName)
  const handleTicksChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTicks(parseInt(event.target.value as string, 10))
  }
  const handleTicksBlur = () => {
    dispatch(changeTicks(ticks))
  }
  const handleSceneNameChange = (event) => {
    setSceneName(event.target.value)
  }
  const handleSceneNameBlur = () => {
    dispatch(changeScene(sceneName))
  }
  const handlePartyRepresentativeNameChange = (event) => {
    setPartyRepresentativeName(event.target.value)
  }
  const handlePartyRepresentativeNameBlur = () => {
    dispatch(changePartyRepresentativeName(partyRepresentativeName))
  }
  return (
    <>
      <h3>Basic Info</h3>
      
      <p className="form-control">
        <label htmlFor="ticks">Ticks</label>
        <input id="ticks" name="ticks" type="number" value={ticks} onChange={handleTicksChange} onBlur={handleTicksBlur} />
      </p>

      <p className="form-control">
        <label htmlFor="scene-name">Scene Name</label>
        <input id="scene-name" name="scene-name" type="text" value={sceneName} onChange={handleSceneNameChange} onBlur={handleSceneNameBlur} />
      </p>

      <p className="form-control">
        <label htmlFor="party-representative-name">Party Representative Name</label>
        <input id="party-representative-name" name="party-representative-name" type="text" value={partyRepresentativeName} onChange={handlePartyRepresentativeNameChange} onBlur={handlePartyRepresentativeNameBlur} />
      </p>
    </>
  )
}

type ExitInput = {
  name: string
  title: string
  to: string
}

export const NewRoomView = () => {
  const [name, setName] = useState<string>('') // TODO
  const [title, setTitle] = useState<string>('') // TODO
  const [exits, setExits] = useState<ExitInput[]>([]) // TODO
  const [entitiesString, setEntitiesString] = useState<string>('') // TODO
  const [tagsString, setTagsString] = useState<string>('') // TODO
  const handleChangeName = (event) => {
    setName(event.target.value)
  }
  const handleBlurName = () => {
    console.log('NewRoomView name changed', name)
  }
  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleBlurTitle = () => {
    console.log('NewRoomView title changed', title)
  }
  const handleChangeExitNameFn = (i) => (event) => {
    setExits(exits.map((exit, j) => i === j ? { ...exit, name: event.target.value } : exit))
  }
  const handleChangeExitTitleFn = (i) => (event) => {
    setExits(exits.map((exit, j) => i === j ? { ...exit, title: event.target.value } : exit))
  }
  const handleChangeExitToFn = (i) => (event) => {
    setExits(exits.map((exit, j) => i === j ? { ...exit, to: event.target.value } : exit))
  }
  const handleRemoveExitFn = (i) => () => {
    setExits(exits.filter((exit, j) => i !== j))
  }
  const handleAddExit = () => {
    setExits([...exits, { name: '', title: '', to: '' }])
  }
  const handleChangeEntitiesString = (event) => {
    setEntitiesString(event.target.value)
  }
  const handleBlurEntities = () => {
    const entityNames = entitiesString.split(',').map((s) => s.trim()).filter((s) => s.length !== 0)
    // TODO
    console.log('NewRoomView entities changed', entityNames)
  }
  const handleChangeTagsString = (event) => {
    setTagsString(event.target.value)
  }
  const handleBlurTags = () => {
    const tags = tagsString.split(',').map((s) => s.trim()).filter((s) => s.length !== 0)
    // TODO
    console.log('NewRoomView tags changed', tags)
  }
  return (
    <>
      <h3>Create Room</h3>
      <div className="form-control">
        <label>Name</label>
        <input name="name" id="name" type="text" value={name} onChange={handleChangeName} onBlur={handleBlurName} />
      </div>
      <div className="form-control">
        <label>Title</label>
        <input name="title" id="title" type="text" value={title} onChange={handleChangeTitle} onBlur={handleBlurTitle} />
      </div>
      <div className="form-control">
        <label>Entities (comma-separated)</label>
        <input name="entities" id="entities" type="text" value={entitiesString} onChange={handleChangeEntitiesString} onBlur={handleBlurEntities} />
      </div>
      <div className="form-control">
        <label>Tags (comma-separated)</label>
        <input name="tags" id="tags" type="text" value={tagsString} onChange={handleChangeTagsString} onBlur={handleBlurTags} />
      </div>
      <div className="form-control exits-control">
        <h3>Exits</h3>
        {
          exits.map((exit, i) => {
            return (
              <div className="exits" key={i}>
                <div style={{ display: 'flex', gap: '0.5em' }}>
                  <div style={{ flex: 1, minWidth: 0, marginBottom: 0 }}>
                    <label>Name</label>
                    <input type="text" style={{ width: '100%' }} value={exit.name} onChange={handleChangeExitNameFn(i)} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0, marginBottom: 0 }}>
                    <label>Title</label>
                    <input type="text" style={{ width: '100%' }} value={exit.title} onChange={handleChangeExitTitleFn(i)} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0, marginBottom: 0 }}>
                    <label>To</label>
                    <input type="text" style={{ width: '100%' }} value={exit.to} onChange={handleChangeExitToFn(i)} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0, marginBottom: 0 }}>
                    <label style={{ opacity: 0, pointerEvents: 'none' }}>Actions</label>
                    <button onClick={handleRemoveExitFn(i)}>Remove</button>
                  </div>
                </div>
              </div>
            )
          })
        }
        <button onClick={handleAddExit}>Add Exit</button>
      </div>
    </>
  )
}

export const EditRoomsView = () => {
  const { state, dispatch } = useGame()
  const room = findRoom(state)(state.editRoomName)
  const handlePickRoomFn = (roomName) => () => {
    dispatch(changeEditRoom(roomName))
  }
  return (
    <>
      <h3>Rooms</h3>
      <p>
        {
          state.rooms.map((room, i) => {
            return (
              <span key={room.name}>
                <a onClick={handlePickRoomFn(room.name)}>{room.title}</a>
                {i < state.rooms.length - 1 ? ' | ' : null}
              </span>
            )
          })
        }
      </p>
      <h4>{room.title}</h4>
      <p>TODO</p>
    </>
  )
}

export const EditView = () => {
  const { state, dispatch } = useGame()
  const handleChangeEditSceneFn = (sceneName: string) => () => {
    dispatch(changeEditScene(sceneName))
  }
  return (
    <>
      <h2>Edit View</h2>
      <p>
        <a onClick={handleChangeEditSceneFn('basic')}>Basic Info</a>
        {' | '}
        <a onClick={handleChangeEditSceneFn('rooms')}>Rooms</a>
        {' | '}
        <a onClick={handleChangeEditSceneFn('new-room')}>New Room</a>
      </p>
      {state.editSceneName === 'basic' ? <EditBasicView /> : null}
      {state.editSceneName === 'rooms' ? <EditRoomsView /> : null}
      {state.editSceneName === 'new-room' ? <NewRoomView /> : null}
    </>
  )
}