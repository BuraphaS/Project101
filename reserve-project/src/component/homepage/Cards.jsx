import React from 'react'
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const Cards = () => {
  return (

    
    <div>


        <CardGroup className='p-5 w-100'>
      <Card className='p-0 w-100'>
        <Card.Img variant="top" src="https://ap.rdcpix.com/496223710/d43afdce15dc930fed7b897a1fc5d40bl-m3xd-w1020_h770_q80.jpg" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>

      <Card className='p-0 w-100'>
        <Card.Img variant="top" src="https://ap.rdcpix.com/496223710/d43afdce15dc930fed7b897a1fc5d40bl-m3xd-w1020_h770_q80.jpg" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>

      <Card className='p-0 w-100'>
        <Card.Img variant="top" src="https://ap.rdcpix.com/496223710/d43afdce15dc930fed7b897a1fc5d40bl-m3xd-w1020_h770_q80.jpg" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      
    </CardGroup>
    </div>
  )
}

export default Cards