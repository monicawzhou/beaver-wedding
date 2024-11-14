import React, { useState, useEffect } from "react";
import { getGuests, createGuest, deleteGuest } from "../guestService";

const Guests = () => {
  const [guests, setGuests] = useState([]);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    const data = await getGuests();
    setGuests(data);
  };

  const handleAddGuest = async (e) => {
    e.preventDefault();

    const newGuest = { name, role };
    try {
      await createGuest(newGuest);

      // Reset the form fields
      setName("");
      setRole("");
      fetchGuests();
    } catch (error) {
      console.error("There was an error adding the guest!", error);
    }
  };

  const handleDeleteGuest = async (id) => {
    await deleteGuest(id);
    fetchGuests();
  };

  return (
    <div>
      <h2>Guest List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td>{guest.name}</td>
              <td>{guest.role}</td>
              <td>
                <button onClick={() => handleDeleteGuest(guest.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Guest</h3>
      <form onSubmit={handleAddGuest}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Guest</button>
      </form>
    </div>
  );
};

export default Guests;
