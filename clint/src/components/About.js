import React , {useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {

  const a = useContext(noteContext);

  return (
    <div>This is {a.name} from class {a.class}</div>
  )
}

export default About