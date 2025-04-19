import React, { memo } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import Layout from '../components/Layout'
import LoginForm from '../components/LoginForm'
import { useQuery } from '../context/QueryContext'

const Home = memo(() => {
  const { queryCount, isAuthenticated } = useQuery()

  return (
    <Layout>
      <Row className='justify-content-center'>
        <Col md={6} className='text-center'>
          <Card className='p-4 shadow'>
            <h5 className='mb-4'>Welcome to Humanisys Labs</h5>

            {!isAuthenticated ? (
              <LoginForm />
            ) : (
              <div className='mt-4'>
                <h3>Queries Resolved</h3>
                <div className='display-4 text-primary'>{queryCount}</div>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Layout>
  )
})

export default Home
