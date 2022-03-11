import React from 'react';
import { useState, useEffect } from 'react'

export default function Front() {

    const [userQuotes, setUserQuotes] = useState([])
    useEffect(() => {
       async function getQuotes() {
        const quotes = await fetch('http://localhost:8000/api/userquotes')
        const data = await quotes.json()
        setUserQuotes(data)
        }
        getQuotes()
    }, []) 
    
    console.log(userQuotes)

    function displayUserQuotes() {
        return userQuotes.map(q => {
            return <p>{q.quote}</p>
        })
    }

  return <div className='quotes'>
    {displayUserQuotes()}
  </div>;
}