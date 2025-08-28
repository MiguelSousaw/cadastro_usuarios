import './style.css'
import {FaTrash} from 'react-icons/fa'
import api from '../../services/api.js'
import { useEffect, useState, useRef, use} from 'react'

function App() {
  const [users, setUsers] = useState([])
  const inputName = useRef(null)
  const inputEmail = useRef(null)
  const inputAge = useRef(null)

  async function getUsers(){
    const response = await api.get('/users')
    setUsers(response.data)
  }

  async function deleteUser(id){
    if (id === false) return
    await api.delete(`/users/${id}`)
    getUsers()
  }

  async function createUser(e){
    e.preventDefault()

    if (
      inputName.current.value === '' || 
      inputEmail.current.value === '' || 
      inputAge.current.value === ''
    ) return alert('Preencha todos os campos!')
    
    if (users.find(user => user.email === inputEmail.current.value)) {
      return alert('Email já cadastrado!')
    }

    await api.post("/users", {
      name: inputName.current.value,
      email: inputEmail.current.value,
      age: inputAge.current.value
    })
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])  //Toda vez que carregar minha tela, essa função será chamada

  return(
    <div className="container">
      <form action="" className='form' onSubmit={(event) => createUser(event)}>
        <h1>Cadastro de Usuários</h1>
        <input type="text" placeholder="Nome" ref={inputName} required/>
        <input type="email" placeholder="Email" ref={inputEmail} required/>
        <input type="text" placeholder="Idade" ref={inputAge} required/>
        <button type="submit">Cadastrar</button>
      </form>
        <ul>
            {users.map(user => (
              <li key={user.id} className="user-list"> 
                <div>
                  <p><strong>Nome:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Idade:</strong> {user.age}</p>
                </div>
                <button>
                  <FaTrash size={20} color='red' onClick={() => deleteUser(user.id)}/>
                </button>
              </li>
            ))}
        </ul>
    </div>
  )
}

export default App
