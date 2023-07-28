import { useState } from 'react'
import loginService from '../services/login'
import notesService from '../services/notes'

const Login = () => {
  const [newUsername, setNewUsername] = useState('') 
  const [newPassword, setNewPassword] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
        console.log("virhe")
    }
  }
  const handleButton = async (event) => {
    event.preventDefault()
    console.log("painettu nappia")
    try {
      const nappi = await notesService.getAll()
    } catch(exception){
      console.log(exception)
    }
  }



  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleButton}>nappia paina mua</button>
      <form onSubmit={handleLogin}>
        <div>
            username: <input value={username} onChange={({target}) => setUsername(target.value)}/>
        </div>
        <div>
            password: <input value={password} onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )

}

export default Login