import React from 'react'
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    const navigate = useNavigate();
    const users = [
        {
            _id: 1,
            name: "John Doe",
            age: 18
        },
        {
            _id: 2,
            name: "Sugam",
            age: 25
        },
        {
            _id: 3,
            name: "Suyog",
            age: 20
        },
        {
            _id: 4,
            name: "Hari",
            age: 30
        }
    ];

    const handleUser = (userName, userId, userAge) => {
        console.log(`You clicked on ${userName} with id ${userId}`);
        navigate(`/${userId}/${userName}/${userAge}`);
    }
  return (
    <div>
      <h4>Our User List</h4>
      <ul>
        {
            users.map((user) => {
                return (
                    <li key={user._id} onClick={() => handleUser(user.name, user._id, user.age)}>{user.name}</li>
                )
            })
        }
      </ul>
    </div>
  )
}

export default UserList
