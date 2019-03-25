import React, { useState, useContext, useEffect } from 'react';
import Row from './Row'
import { ThemeContext } from './context'
export default function GHooks (props) {

  const [name, setName] = useState('wang') //设置初始值

  const [otherName, setOtherName] = useState('wu') //设置初始值
 
  useEffect(() => {
    document.title = name + ' ' + otherName
  })

  const width = useWindowWidth()
  
  const theme = useContext(ThemeContext)

  function handleNameChange (e) {
    setName(e.target.value)
  }

  function handleOtherNameChange (e) {
    setOtherName(e.target.value)
  }


  return (
    <section style={theme}>
      <Row label='hooks-Name'>
        <input
          value={name}
          onChange={handleNameChange}
        />
      </Row>
      <Row label='hooks-otherName'>
        <input
          value={otherName}
          onChange={handleOtherNameChange}
        />
      </Row>

      <Row label='hooks-wdith'>
       {width}
      </Row>
    </section>
  );
} 

function useWindowWidth () {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleWidth = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleWidth)
    return () => {
      window.removeEventListener('resize', handleWidth)
    }
  })
  return width
}