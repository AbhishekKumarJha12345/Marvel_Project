import React, { useState } from "react";
import { Card, Button, Table, Pagination, Form } from "react-bootstrap";
import ModalComponent from '../Police/ModalComponent'

const data = [
  { role: "Assistant Public Prosecutor", posts: 491, date: "2025-02-01" },
  { role: "Additional Public Prosecutor", posts: 244, date: "2025-03-15" },
  { role: "Senior Prosecutor", posts: 50, date: "2025-04-20" },
  { role: "Legal Advisor", posts: 30, date: "2025-05-10" },
  { role: "Chief Prosecutor", posts: 10, date: "2025-06-05" },
];

const rowsPerPageOptions = [10, 20, 30, 50];

const Prosecution = () => {
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const styles = {
    container: {
      marginTop: "20px",
    },
    cardContainer: {
      display: "flex",
      justifyContent: "space-between",
    },
    card: {
      flex: 1,
      margin: "10px",
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease-in-out",
    },
    cardHover: {
      transform: "scale(1.05)",
    },
    cardTitle: {
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    cardText: {
      fontSize: "1rem",
    },
    table: {
      marginTop: "20px",
    },
    pagination: {
      marginTop: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    formSelect: {
      width: "120px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Body>
            <Card.Title style={styles.cardTitle}>Recent Appointment</Card.Title>
            <Card.Text style={styles.cardText}>
              491 New Assistant Public Prosecutors appointed.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={styles.card}>
          <Card.Body>
            <Card.Title style={styles.cardTitle}>Training Program</Card.Title>
            <Card.Text style={styles.cardText}>
              6 weeks training in 4 batches at Maharashtra Police Academy, Nashik.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={styles.card}>
          <Card.Body>
            <Card.Title style={styles.cardTitle}>Recruitment Proposal</Card.Title>
            <Card.Text style={styles.cardText}>
              Proposal for 244 Addl. PPs through MPSC under process.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <div style={styles.table}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Role</th>
              <th>No of Posts</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => (
              <tr key={index}>
                <td>{item.role}</td>
                <td>{item.posts}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p onClick={() =>{console.log('set'); setShowModal(true)}}>open modal</p>
    <ModalComponent open={showModal} onClose={() => setShowModal(false)} />
        {/* <div style={styles.pagination}>
          <Form.Select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            style={styles.formSelect}
          >
            {rowsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>

          <div>
            Page {currentPage} of {totalPages}
          </div>

          <Pagination>
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </Pagination>
        </div> */}
      </div>
    </div>
  );
};

export default Prosecution;
