import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import style from './Leaderboard.module.css'
import Tlogo from './Images/technotweet.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './Header'
import Singlecard from './Singlecard'
const App = ({ path, title,bool }) => {
  const navigate = useNavigate()
  const [arr, setArr] = useState([])
  const [rankMsg, setrankMsg] = useState('')
  const [rankSearch, setrankSearch] = useState('')
  const fetchRank = async (username) => {
    const url1 = `http://115.247.20.235:54321/rank/${username}/${bool}`
    const data = { username: username }
    console.log(data)

    try {
      const res = await axios({
        method: 'GET',
        url: url1,
        data,
      })
      console.log(res)
      setrankMsg(`Your Rank is ${res.data.rank} !🥳`)
      // console.log(res)
      // console.log(arr);
    } catch (error) {
      setrankMsg('User Not Found!')
      console.log(error.message)
    }
  }

  const handleClick = () => {
    if(title==='(ORGANIZERS)') navigate('/')
    else
    navigate('/organizers')
  }
  const handleSearch = async (event) => {
    event.preventDefault()
    const username = rankSearch
    await fetchRank(username)
  }

  const fetchdata = async () => {
    const url = `http://115.247.20.235:54321/${path}`
    try {
      // const res = await axios({
      //   method: 'GET',
      //   url: url,
      // })
      const res = await axios.get(`${url}`)
      console.log(res)
      setArr(res.data.users)
      // console.log(arr);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchdata()
  }, [path])
  let idx = 0

  return (
    <>
      <Header />
      <div className={style.main}>
        <div>
          <img src={Tlogo} alt='' srcset='' />
        </div>
        <div className={style.heading}>
          <h1>NODE MANIA {title}</h1>
        </div>
        <div className={style.card}>
          {arr.map((ele) => {
            const { username, score, updatedAt } = ele
            idx++
            if (idx > 10) {
              return
            }
            return (
              <div className={style.Singlecard}>
                <Singlecard
                  idx={idx}
                  username={username}
                  marks={score}
                  time={updatedAt.split('T')[1].split('.')[0]}
                />
              </div>
            )
          })}
        </div>
        <div className={style.loginFooter}>
          <div style={{ fontWeight: 'bold' }}>Search Your Rank!!</div>
          <div id='input-login' className={style.inputMain}>
            <input
              className={style.searchInput}
              type='text'
              placeholder='Enter Techno ID'
              name='rankSearch'
              value={rankSearch}
              onChange={(e) => {
                setrankSearch(e.target.value)
              }}
            />
            <button
              id='leadbtn'
              onClick={handleSearch}
              className={style.searchBtn}
            >
              <div className={style.search}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className={style.searchIcon}
                  viewBox='0 0 48 48'
                  id='search'
                >
                  <path d='M46.599 40.236L36.054 29.691C37.89 26.718 39 23.25 39 19.5 39 8.73 30.27 0 19.5 0S0 8.73 0 19.5 8.73 39 19.5 39c3.75 0 7.218-1.11 10.188-2.943l10.548 10.545a4.501 4.501 0 0 0 6.363-6.366zM19.5 33C12.045 33 6 26.955 6 19.5S12.045 6 19.5 6 33 12.045 33 19.5 26.955 33 19.5 33z'></path>
                </svg>
              </div>
            </button>
          </div>
          <div>
            <p>{rankMsg}</p>
          </div>
        </div>
        {title === '(ORGANIZERS)' ? (
          <>
            <button onClick={handleClick} className={style.leaderboardBtn}>
              Back to Main Leaderboard !
            </button>
          </>
        ) : (
          <button onClick={handleClick} className={style.leaderboardBtn}>
            See Organizers Leaderboard !
          </button>
        )}
      </div>
    </>
  )
}

export default App
