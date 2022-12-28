import React from 'react'

const Message = ({user, message}) => {
  return (
    <div>
        <p>{message.message}</p>
    </div>
  )
}

export default Message