import React from 'react'
import style from './Sinlgecard.module.css'
import tweet from './Images/Tweet.png'
const Singlecard = ({ idx, username, marks, time }) => {
  console.log(username, marks)

  return (
    <div
      className={style.contentCard}
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 7,
      }}
    >
      <div className={style.idx}>
        {idx === 'Rank' ? (
          <h3>Rank</h3>
        ) : (
          <div className={style.search}>
            <h4> {idx}</h4>
          </div>
        )}
      </div>
      <div className={style.username}>
        {username === 'Username' ? <h3>{username}</h3> : <h4>{username}</h4>}
      </div>
      <div>
        {marks === 'Points' ? (
          <h3>{marks} </h3>
        ) : (
          <div className={style.points}>
            <h4>{marks} </h4>
            <img
              height='30rem'
              style={{ marginTop: '1.5rem', marginLeft: '0.5rem' }}
              src={tweet}
              alt='🏆'
            />
          </div>
        )}
      </div>
      <div className={style.user}>
        {time === 'Time' ? <h3>{time}</h3> : <h4>{time ? time : 0}</h4>}
      </div>
    </div>
  )
}

export default Singlecard
