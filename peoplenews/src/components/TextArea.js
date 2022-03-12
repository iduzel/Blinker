import React, { useCallback, useEffect, useRef } from 'react'
import Textarea from 'react-expanding-textarea'

const MyTextarea = (props) => {
/*   const textareaRef = useRef(null) */

/*   const handleChange = useCallback(e => {
    console.log('Changed value to: ', e.target.value)
    props.setData(e.target.value)
  }, []) */

/*   useEffect(() => {
    textareaRef.current.focus()
  }, []) */



  return (     
      <Textarea

        className="textarea w-100 border border-0 w-100 blink-textarea "       
        id="my-textarea"
        maxLength="280"
        name="pet[notes]"
        onChange={(e) => props.setData(e.target.value)}
        placeholder="What's happening?"
      
      />
 
  )
}

export default MyTextarea;