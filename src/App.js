import React, { useState } from 'react';
import './style/App.css';
import { data } from './data'

function App() {

  // useState for data with var users and function setUser
  const [users, setUser] = useState(data);

  // loading useState (im not using Redux, but i like the effect of loading :) )
  const [loading, setLoading] = useState(false);

  // remove handler to remove users by id
  const removeHandler = (userId) => {
    setLoading(true)
    //the user who have not the id of above stay on the list, the other one is removed
    let newUsers = users.filter((person) => person.id !== userId);
    setLoading(false);
    setUser(newUsers);
  }

  // select a random name for the add user function
  const randomName = () => {
    let randomUsername = ['alex', 'xavi', 'anna', 'annie', 'javier', 'carlos', 'jordi', 'salvaje'];
    const pickRandom = Math.floor(Math.random() * randomUsername.length);
    return randomUsername[pickRandom];
  }

  // adduser function
  const addUser = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
      const newUser = { id: new Date().getTime(), name: randomName(), date: '09/07/2021', image: require('./images/default-user_6_0.png') };
      setUser([...users, newUser]);
    }, 500);
  }

  // return of the actual birthdday reminder app block
  return (
    <div className="container">
      <div className="action">
        <h1 className="title">Birthday Reminder</h1>
        {/* add user button */}
        <button onClick={addUser} className="btn btn--add">{(loading) ? 'loading...' : 'new reminder'}</button>
      </div>
      <h2>You have {users.length} reminders</h2>
      <div className="birthday-display">
        {
          // we iterate the data of the useState (important)
          users.slice(0).reverse().map((user) => {
            // destructure of the data
            const { id, name, date, image } = user;

            return <div className="user" key={id}>
              <img src={image} alt="" />
              <div className="user__info">
                <strong className="info__name">Birthday of {name}</strong>
                <span className="info__date">{date}</span>
              </div>
              {/* remove user button */}
              <div className="btn-wrap">
                <button className="btn btn--del" onClick={() => removeHandler(id)}>Remove</button>
              </div>
            </div>
          })
        }
      </div>
    </div>
  );
}

export default App;
