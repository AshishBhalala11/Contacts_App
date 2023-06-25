import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactList from './pages/contactList';
import ContactForm from './components/contactForm';
import 'tailwindcss/tailwind.css';

const ApiUrl = 'http://localhost:8800/api';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');
  const [contactToEdit, setContactToEdit] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${ApiUrl}/contacts`);
      setContacts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addContact = async (newContact) => {
    try {
      const response = await axios.post(`${ApiUrl}/contacts`, newContact);
      setContacts([...contacts, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (updatedContact) => {
    try {
      const response = await axios.put(
        `${ApiUrl}/contacts/${updatedContact.id}`,
        updatedContact
      );
      setContacts(
        contacts.map((contact) => (contact.id === response.data.id ? response.data : contact))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`${ApiUrl}/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortType(e.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (sortType === 'firstName') {
      return a.firstName.localeCompare(b.firstName);
    } else if (sortType === 'lastName') {
      return a.lastName.localeCompare(b.lastName);
    }
    return 0;
  });

  const editContact = (contact) => {
    setContactToEdit(contact);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Contact Management</h1>
      <input
        type="text"
        placeholder="Search"
        className="p-2 border border-gray-300 rounded mb-2"
        value={searchTerm}
        onChange={handleSearch}
      />
      <select
        className="p-2 border border-gray-300 rounded mb-2"
        value={sortType}
        onChange={handleSort}
      >
        <option value="">Sort By</option>
        <option value="firstName">First Name</option>
        <option value="lastName">Last Name</option>
      </select>
      <ContactList
        contacts={sortedContacts}
        deleteContact={deleteContact}
        setContactToEdit={editContact}
      />
      <ContactForm
        addContact={addContact}
        updateContact={updateContact}
        contactToEdit={contactToEdit}
        setContactToEdit={editContact}
      />
    </div>
  );
  
};

export default App;
