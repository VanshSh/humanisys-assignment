import React, { memo, useCallback, useState } from 'react'
import { Alert, Button, Card, Form, Spinner } from 'react-bootstrap'

const LoginForm = memo(({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      setError('')
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        if (
          credentials.email === 'vansh' &&
          credentials.password === '123456'
        ) {
          onLogin()
        } else {
          setError('Invalid credentials')
        }
        setIsLoading(false)
      }, 1000)
    },
    [credentials, onLogin]
  )

  return (
    <Card>
      <Card.Body>
        <Card.Title className='text-center mb-4'>Login</Card.Title>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              disabled={isLoading}
              required
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              disabled={isLoading}
              required
            />
          </Form.Group>
          <Button
            type='submit'
            variant='primary'
            className='w-100'
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner
                  as='span'
                  animation='border'
                  size='sm'
                  role='status'
                  aria-hidden='true'
                />
                <span className='ms-2'>Logging in...</span>
              </>
            ) : (
              'Login'
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
})

export default LoginForm
