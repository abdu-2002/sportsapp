import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, ListGroup, Container, Row, Col, Modal } from "react-bootstrap";

// API Service
const api = axios.create({
  baseURL: "http://localhost:3000/api/team",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("Token:", token); // Debug log
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const handleApiError = (error) => {
  console.error("API error:", error);
  const message = error.response?.data?.message || "An unexpected error occurred";
  alert(message);
  return { success: false, message };
};

const ApiService = {
  getTeams: async () => {
    try {
      const response = await api.get("/");
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error);
    }
  },
  createTeam: async (team) => {
    try {
      console.log("Creating team:", team);
      const response = await api.post("/", team);
      console.log("Team created:", response.data);
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error);
    }
  },
  updateTeam: async (id, team) => {
    try {
      const response = await api.put(`/${id}`, team);
      return { success: true, data: response.data };
    } catch (error) {
      return handleApiError(error);
    }
  },
  deleteTeam: async (id) => {
    try {
      await api.delete(`/${id}`);
      return { success: true };
    } catch (error) {
      return handleApiError(error);
    }
  },
};

const TeamManagement = () => {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [currentTeam, setCurrentTeam] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch all teams
  const fetchTeams = async () => {
    const result = await ApiService.getTeams();
    if (result.success) {
      setTeams(result.data);
    }
  };

  // Load teams on component mount
  useEffect(() => {
    fetchTeams();
  }, []);

  // Handle creating a team
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) {
      alert("Team name cannot be empty.");
      return;
    }
    console.log("Creating team with name:", teamName);
    const result = await ApiService.createTeam({ name: teamName });
    if (result.success) {
      setTeamName("");
      fetchTeams();
    } else {
      console.log("Failed to create team:", result.message);
    }
  };

  // Handle updating a team
  const handleUpdateTeam = async () => {
    if (!teamName.trim()) {
      alert("Team name cannot be empty.");
      return;
    }
    const result = await ApiService.updateTeam(currentTeam._id, { name: teamName });
    if (result.success) {
      setEditMode(false);
      setTeamName("");
      setCurrentTeam(null);
      setShowModal(false);
      fetchTeams();
    } else {
      console.log("Failed to update team:", result.message);
    }
  };

  // Handle deleting a team
  const handleDeleteTeam = async (id) => {
    if (window.confirm("Are you sure you want to delete this team?")) {
      const result = await ApiService.deleteTeam(id);
      if (result.success) {
        fetchTeams();
      } else {
        console.log("Failed to delete team:", result.message);
      }
    }
  };

  // Open edit modal
  const handleEdit = (team) => {
    setCurrentTeam(team);
    setTeamName(team.name);
    setEditMode(true);
    setShowModal(true);
  };

  // Close edit modal
  const handleCloseModal = () => {
    setEditMode(false);
    setTeamName("");
    setCurrentTeam(null);
    setShowModal(false);
  };

  return (
    <Container>
      <h3 className="text-center my-4">Team Management</h3>

      {/* Team Form */}
      <Form onSubmit={editMode ? handleUpdateTeam : handleCreateTeam} className="mb-4">
        <Row className="justify-content-center">
          <Col md={8}>
            <Form.Group controlId="teamName">
              <Form.Control
                type="text"
                placeholder="Enter team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md="auto">
            <Button type="submit" variant="primary">
              {editMode ? "Update Team" : "Create Team"}
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Team List */}
      <ListGroup>
        {teams.map((team) => (
          <ListGroup.Item key={team._id} className="d-flex justify-content-between align-items-center">
            <span>{team.name}</span>
            <div>
              <Button variant="info" onClick={() => handleEdit(team)} className="me-2">
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDeleteTeam(team._id)}>
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Modal for Editing */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editTeamName">
              <Form.Label>Team Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateTeam}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TeamManagement;
