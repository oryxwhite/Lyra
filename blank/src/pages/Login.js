import { useState } from 'react'
import React from 'react'


function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  async function loginUser(event) {
    event.preventDefault()

    const response = await fetch('http://localhost:8000/api/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      })
    })

    const data = await response.json()
    console.log(data)

    if(data.user) {
      localStorage.setItem('token', data.user)
      alert('login successful')
      window.location.href = '/dashboard'
    } else {
      alert('Please check your username and password')
    }
  }

  return (
    <div className='login'>
    
      <h1>Login</h1>
      <form onSubmit={loginUser}>
          <br/>
        <input 
          type="email" 
          placeholder="Email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
        />
        <br/>
        <input 
          type="text" 
          placeholder="Password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <input type="submit" value="Login" />
      </form>
      <div>

      </div>
    </div>
  );
}

export default App;
