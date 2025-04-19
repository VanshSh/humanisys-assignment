import React, { memo, useEffect, useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'

const ResponseDisplay = memo(({ response, error }) => {
  const messagesEndRef = useRef(null)
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [response])

  useEffect(() => {
    if (response) {
      const interval = setInterval(() => {
        if (currentIndex < response.length) {
          setDisplayedText((prev) => prev + response[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        } else {
          clearInterval(interval)
        }
      }, 20) // Adjust speed here (lower number = faster)

      return () => clearInterval(interval)
    } else {
      setDisplayedText('')
      setCurrentIndex(0)
    }
  }, [response, currentIndex])

  return (
    <div className='flex-grow-1 overflow-auto mb-3'>
      {error && <Alert variant='danger'>{error}</Alert>}
      {response && (
        <div className='p-3 border rounded bg-light'>
          <div className='d-flex align-items-center mb-2'>
            <div
              className='bg-primary rounded-circle me-2'
              style={{ width: '8px', height: '8px' }}
            />
            <strong>Response:</strong>
          </div>
          <div className='response-text' style={{ whiteSpace: 'pre-wrap' }}>
            {displayedText}
            {currentIndex < response.length && (
              <span className='blinking-cursor'>|</span>
            )}
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  )
})

export default ResponseDisplay
