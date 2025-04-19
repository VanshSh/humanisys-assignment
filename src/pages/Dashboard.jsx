import React, { memo, useCallback, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'
import QueryForm from '../components/QueryForm'
import QueryHistory from '../components/QueryHistory'
import ResponseDisplay from '../components/ResponseDisplay'
import { useQuery } from '../context/QueryContext'

const Dashboard = memo(() => {
  const { queryHistory, incrementQuery, isAuthenticated, login } = useQuery()
  const [response, setResponse] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const [error, setError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleQuerySubmit = useCallback(
    (message) => {
      setError('')
      setIsProcessing(true)

      // Simulate streaming response
      const words = message.split(' ')
      let currentResponse = ''
      let index = 0

      const interval = setInterval(() => {
        if (index < words.length) {
          currentResponse += words[index] + ' '
          setResponse(currentResponse)
          index++
        } else {
          clearInterval(interval)
          incrementQuery(message)
          setIsProcessing(false)
        }
      }, 200)
    },
    [incrementQuery]
  )

  if (!isAuthenticated) {
    return (
      <Layout>
        <Row className='justify-content-center mt-5'>
          <Col md={8} lg={6}>
            <LoginForm onLogin={login} />
          </Col>
        </Row>
      </Layout>
    )
  }

  return (
    <Layout>
      <Row className='mb-3'>
        <Col>
          <Button
            variant='outline-primary'
            onClick={() => setShowHistory(true)}
          >
            History
          </Button>
        </Col>
      </Row>
      <Row className='flex-grow-1'>
        <Col className='d-flex flex-column'>
          <ResponseDisplay response={response} error={error} />
          <QueryForm onSubmit={handleQuerySubmit} isProcessing={isProcessing} />
        </Col>
      </Row>
      <QueryHistory
        show={showHistory}
        onHide={() => setShowHistory(false)}
        history={queryHistory}
      />
    </Layout>
  )
})

export default Dashboard
