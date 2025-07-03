import React from 'react'
import { useParams } from 'react-router-dom'

const UserDetail = () => {
  const params = useParams();
  const { id, username, age } = params;
  return (
    <div>
      <h3>This is userdetail page</h3>
      <p>User id: {id}</p>
      <p>User name: {username}</p>
      <p>Age: {age}</p>
    </div>
  )
}

export default UserDetail
