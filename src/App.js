import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'

const url = 'https://course-api.com/react-tabs-project'

function App() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [value, setValue] = useState(1)
  const fetchJobs = async () => {
    try {
      const response = await fetch(url);
      const newJobs = await response.json()
      setJobs(newJobs)
      setLoading(false)
    } catch(e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchJobs()}, [])
  if(loading) {
    return (
      <div className='section loading'>
        <h1>loading...</h1>
      </div>
    )
  }  
  const {duties, dates, title, company} = jobs[value]

  return (
    <section className='section'>
      <div className='title'>
        <h2>experience</h2>
        <div className='underline'></div>
      </div>
      <div className='jobs-center'>
        <div className='btn-container'>
          {jobs.map((job, index) => {
            return (
              <button className={`job-btn ${value===index && 'active-btn'}`} key={job.id} onClick={() => setValue(index)}>{job.company}</button>
            )
          })}
        </div>
        <article className='job-info'>
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className='job-date'>{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className='job-desc'>
                <FaAngleDoubleRight className='job-icon'></FaAngleDoubleRight>
                <p>{duty}</p>
              </div>
            )
          })}
        </article>
      </div>
    </section>
  )
}

export default App
