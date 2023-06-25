import React, { useState, useEffect } from 'react';

const ContactForm = ({ addContact, updateContact, contactToEdit, setContactToEdit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (contactToEdit) {
      setFirstName(contactToEdit.firstName);
      setLastName(contactToEdit.lastName);
      setPhoneNumber(contactToEdit.phoneNumber);
      setEmail(contactToEdit.email);
    }
  }, [contactToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contactToEdit) {
      // Update existing contact
      updateContact({
        id: contactToEdit.id,
        firstName,
        lastName,
        phoneNumber,
        email,
      });

      setContactToEdit(null); // Clear the contactToEdit state
    } else {
      // Add new contact
      addContact({
        firstName,
        lastName,
        phoneNumber,
        email,
      });
    }

    // Reset form inputs
    resetForm();
  };

  const resetForm = () => {
    setContactToEdit(null);
    
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setEmail('');
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 border border-gray-300 rounded">
      <h2 className="text-xl mb-4">{contactToEdit ? 'Edit Contact' : 'Add Contact'}</h2>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded mb-2 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded mb-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {contactToEdit ? 'Update Contact' : 'Add Contact'}
      </button>
      {contactToEdit && (
        <button
          type="button"
          onClick={() => resetForm()}
          className="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded mt-2"
        >
          Cancel
        </button>
      )}
    </form>
  );
  
};

export default ContactForm;
