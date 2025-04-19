import React, { memo, useCallback, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'

const QueryForm = memo(({ onSubmit, isProcessing }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (!message.trim()) return
      onSubmit(message)
      setMessage('')
    },
    [message, onSubmit]
  )

  return (
    <Form onSubmit={handleSubmit} className='mt-3'>
      <Form.Group>
        <div className='d-flex align-items-center mb-2'>
          <div
            className='bg-success rounded-circle me-2'
            style={{ width: '8px', height: '8px' }}
          />
          <Form.Label className='mb-0'>Your Query</Form.Label>
        </div>
        <Form.Control
          as='textarea'
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type your question here...'
          disabled={isProcessing}
          className='border border-success-subtle'
          style={{ resize: 'none' }}
        />
      </Form.Group>
      <Button
        type='submit'
        className='mt-2'
        variant='success'
        disabled={isProcessing || !message.trim()}
      >
        {isProcessing ? (
          <>
            <Spinner
              as='span'
              animation='border'
              size='sm'
              role='status'
              aria-hidden='true'
            />
            <span className='ms-2'>Processing...</span>
          </>
        ) : (
          'Send'
        )}
      </Button>
    </Form>
  )
})

export default QueryForm
