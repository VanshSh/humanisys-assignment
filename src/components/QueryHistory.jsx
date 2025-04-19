import React, { memo } from 'react'
import { ListGroup, Offcanvas } from 'react-bootstrap'

const QueryHistory = memo(({ show, onHide, history }) => {
  return (
    <Offcanvas show={show} onHide={onHide} placement='start'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Query History</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {history.length === 0 ? (
          <p className='text-muted'>No queries yet</p>
        ) : (
          <ListGroup>
            {history.map((query, index) => (
              <ListGroup.Item key={index}>{query}</ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  )
})

export default QueryHistory
