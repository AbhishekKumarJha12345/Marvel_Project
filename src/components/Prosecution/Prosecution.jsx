import React, { useState } from "react";
import { Card, Button, Table, Pagination, Form } from "react-bootstrap";
import DataTable from "react-data-table-component"; 
import "tailwindcss/tailwind.css";
import ModalComponent from '../Police/ModalComponent'
const data = [
  { role: "Assistant Public Prosecutor", posts: 491, date: "01/02/2025" },
  { role: "Additional Public Prosecutor", posts: 244, date: "15/03/2025" },
  { role: "Senior Prosecutor", posts: 50, date: "20/04/2025" },
  { role: "Legal Advisor", posts: 30, date: "10/05/2025" },
  { role: "Chief Prosecutor", posts: 10, date: "05/06/2025" },
];



const Prosecution = () => {
  const [showModal, setShowModal] = useState(false);

const [filters, setFilters] = useState({ role: "", posts: "", date: "" });
  const [filteredData, setFilteredData] = useState(data);

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
      boxShadow: "2px 6px 10px rgba(0, 0, 0, 0.1)",
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

  const handleFilter = (event, key) => {
    const newFilters = { ...filters, [key]: event.target.value.toLowerCase() };
    setFilters(newFilters);

    setFilteredData(
      data.filter((row) =>
        // Exclude 'Action' column from the filtering
        Object.keys(newFilters).every((filterKey) =>
          filterKey !== "action" && row[filterKey]?.toString().toLowerCase().includes(newFilters[filterKey])
        )
      )
    );
  };

  const columns = [
    {
      name: <span className="font-semibold text-[14px]">Role</span>,
      selector: (row) => row.role,
      sortable: true,
      filterKey: "role",
    },
    {
      name: <span className="font-semibold text-[14px]">Post</span>,
      selector: (row) => row.posts,
      sortable: true,
      filterKey: "posts",
    },
    {
      name: <span className="font-semibold text-[14px]">Date</span>,  
      selector: (row) => row.date,
      sortable: true,
      filterKey: "date",
    },

  ];

  return (
    <div className="rounded-lg w-full max-w-full h-auto">
      {/* <h1 className="text-2xl font-bold mb-6">Features</h1> */}
      <div style={styles.cardContainer}>
        <Card style={styles.card} className="bg-white">
          <Card.Body>
            <Card.Title className="mb-4"><span className="text-xl font-semibold">Recent Appointment</span></Card.Title>
            <Card.Text style={styles.cardText}>
              491 New Assistant Public Prosecutors appointed.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={styles.card} className="bg-white">
          <Card.Body>
            <Card.Title className="mb-4"><span className="text-xl font-semibold">Training Program</span></Card.Title>
            <Card.Text style={styles.cardText}>
              6 weeks training in 4 batches at Maharashtra Police Academy, Nashik.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={styles.card} className="bg-white">
          <Card.Body>
            <Card.Title className="mb-4"><span className="text-xl font-semibold">Recruitment Proposal</span></Card.Title>
            <Card.Text style={styles.cardText}>
              Proposal for 244 Addl. PPs through MPSC under process.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

     
      <div className="mt-5">
      <h2 className="text-2xl font-bold mb-6">Mobile Forensic Vans Details</h2>
      <div className="bg-white p-4 rounded-xl shadow-md">
        {/* Filters */}
        <div className="mb-4">
          <div className="grid grid-cols-3 gap-2">
            {columns.filter((col) => col.filterKey && col.filterKey !== "action").map((col, index) => (
              <input
                key={index}
                // type="text"
                type={col.filterKey === 'date' ? 'date' : 'text'}


                placeholder={`Search by ${col.name.props.children}`}
                value={filters[col.filterKey]}
                onChange={(e) => handleFilter(e, col.filterKey)}
                className="p-2 border border-gray-300 rounded-md w-full text-sm"
              />
            ))}
          </div>
        </div>
        {/* <p onClick={() =>{console.log('set'); setShowModal(true)}}>open modal</p> */}
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
>>>>>>> dhanu
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          responsive
        />
      </div>

    </div>
    </div>
  );
};

export default Prosecution;
