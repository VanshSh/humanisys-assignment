import React, { memo, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '../context/QueryContext'

const LoginForm = memo(() => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useQuery()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === 'vansh' && password === '123456') {
      login()
      navigate('/dashboard')
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant='primary' type='submit'>
        Login
      </Button>

      <div className='mt-3 text-muted'>
        <small>Dummy credentials:</small>
        <br />
        <small>Username: vansh</small>
        <br />
        <small>Password: 123456</small>
      </div>
    </Form>
  )
})

export default LoginForm
