import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";

const ContactsApp = () => {
  const [contacts, setContacts] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [viewFavorites, setViewFavorites] = useState(false);

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = () => {
    if (firstName && lastName && phone && gender) {
      if (editIndex !== -1) {
        const updatedContacts = [...contacts];
        updatedContacts[editIndex] = {
          firstName,
          lastName,
          phone,
          gender,
          favorite,
        };
        setContacts(updatedContacts);
        setEditIndex(-1);
      } else {
        setContacts([
          ...contacts,
          { firstName, lastName, phone, gender, favorite },
        ]);
      }
      setFirstName("");
      setLastName("");
      setPhone("");
      setGender("");
      setFavorite(false);
      setShowAddModal(false);
      setShowEditModal(false);
    }
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = contacts.filter((contact, i) => i !== index);
    setContacts(updatedContacts);
  };

  const handleEditContact = (index) => {
    const contactToEdit = contacts[index];
    setFirstName(contactToEdit.firstName);
    setLastName(contactToEdit.lastName);
    setPhone(contactToEdit.phone);
    setGender(contactToEdit.gender);
    setFavorite(contactToEdit.favorite);
    setEditIndex(index);
    setShowEditModal(true);
  };

  const handleToggleFavorite = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts[index].favorite = !updatedContacts[index].favorite;
    setContacts(updatedContacts);
  };

  const handleViewFavorites = () => {
    setViewFavorites(true);
  };

  const handleViewAll = () => {
    setViewFavorites(false);
  };

  const filteredContacts = viewFavorites
    ? contacts.filter((contact) => contact.favorite)
    : contacts.filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.phone.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="container mt-5">
      <div className="head d-flex">
        <input
          type="text"
          className="form-control m w-50"
          placeholder="Search contacts"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-outline-dark ms-3" onClick={handleViewFavorites}>
          Favorites
        </button>
        <button className="btn btn-outline-dark ms-2" onClick={handleViewAll}>
          All
        </button>
        <button className="ms-2 btn btn-success" onClick={() => setShowAddModal(true)}>
          Add Contact
        </button>
      </div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Favorite</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.phone}</td>
              <td>{contact.gender}</td>
              <td width={300}>
                <button className="btn btn-outline-info" onClick={() => handleToggleFavorite(index)}>
                  {contact.favorite
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </button>
              </td>
              <td>
                <button className="btn btn-outline-warning" onClick={() => handleEditContact(index)}>Edit</button>
                <button className="btn btn-outline-danger ms-2" onClick={() => handleDeleteContact(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Contact Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn"
            variant="secondary"
            onClick={() => setShowAddModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="btn btn-success"
            variant="primary"
            onClick={handleAddContact}
          >
            {editIndex !== -1 ? "Edit Contact" : "Add Contact"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Contact Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddContact}>
            {editIndex !== -1 ? "Edit Contact" : "Add Contact"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactsApp;
