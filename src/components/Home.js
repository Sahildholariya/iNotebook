import React from 'react'
import noteContex from '../contex/notes/noteContex'
import { useContext } from 'react'
import Notes from './Notes'
import AddNote from './AddNote'

const Home = (props) => {
  const {showAlert} = props;
  return (
    <>
      <Notes  showAlert={showAlert}/>
    </>
  )
}

export default Home
