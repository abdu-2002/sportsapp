// src/components/CoachDashboard.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './CoachDashboard.css';

const CoachDashboard = () => (
  <div>
    <Container className="coach-dashboard mt-4">
      <h2 className="text-center mb-4">Coach Dashboard</h2>
      
      {/* Card links for each management section */}
      <Row>
        <Col md={3} className="mb-4">
          <Card className="text-center shadow-sm">
            <Card.Img variant="top" src="https://tse2.mm.bing.net/th?id=OIP.gKrTsJVrRvWSEWjbv1mPlAHaEc&pid=Api&P=0&h=180" alt="Team Management" />
            <Card.Body>
              <Card.Title>Team Management</Card.Title>
              <Link to="/team" className="stretched-link text-decoration-none">View</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="text-center shadow-sm">
            <Card.Img variant="top" src="https://tse2.mm.bing.net/th?id=OIP.DfUxzFbOsrUZVO78RS04PQHaEO&pid=Api&P=0&h=180" alt="Player Management" />
            <Card.Body>
              <Card.Title>Player Management</Card.Title>
              <Link to="/player" className="stretched-link text-decoration-none">View</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="text-center shadow-sm">
            <Card.Img variant="top" src="https://tse1.mm.bing.net/th?id=OIP.94ukxEgA_o8ssz-IRA4JPAHaE8&pid=Api&P=0&h=180" alt="Fixture Management" />
            <Card.Body>
              <Card.Title>Fixture Management</Card.Title>
              <Link to="/fixture" className="stretched-link text-decoration-none">View</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="mb-4">
          <Card className="text-center shadow-sm">
            <Card.Img variant="top" src="https://tse3.mm.bing.net/th?id=OIP.REeJ8K0gDQpYTCKTMZj9sAHaE2&pid=Api&P=0&h=180" alt="Attendance Management" />
            <Card.Body>
              <Card.Title>Attendance Management</Card.Title>
              <Link to="/attendance" className="stretched-link text-decoration-none">View</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
     
      <Outlet />
    </Container>

   
    <Container className="additional-content mt-4">
      <h3>OUR TEAM</h3>
      <p>
      To be successful in football, you have to have the heart in the game, the mind in the strategy, and the team in the soul.
      </p>
    </Container>

    {/* Footer section */}
    <div className="footer">
      <Container>
        <p>&copy; 2024 Sports Lynx. All rights reserved.</p>
      </Container>
    </div>
  </div>
);

export default CoachDashboard;
