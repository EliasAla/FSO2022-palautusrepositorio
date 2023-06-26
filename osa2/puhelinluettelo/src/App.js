import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [addMessage, setAddMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService.getAll().then((initialPersons) => {
      console.log("promise fulfilled");
      setPersons(initialPersons);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Tarkistaa löytyykö nimeä jo phonebookista
    if (persons.some((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else if (newName.length < 1) {
      window.alert("Field cannot be empty");
    } else if (newNumber.length < 1) {
      window.alert("Field cannot be empty");
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      setAddMessage(`Added '${newName}' to phonebook`);
      setTimeout(() => {
        setAddMessage(null);
      }, 5000);

      personService.create(nameObject).then((returnedObject) => {
        // Asettaa nykyiseksi taulukon johon lisätty uusi objekti
        setPersons(persons.concat(returnedObject));
        // Tyhjentää input kentät
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
    // console.log(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const personsToShow = persons.filter((person) => {
    return person.name.toLowerCase().includes(newFilter.toLowerCase());
  });

  const handleDeletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((n) => n.id !== id));

        setAddMessage(`Removed '${name}' from phonebook`);
        setTimeout(() => {
          setAddMessage(null);
        }, 5000);

        setNewName("");
        setNewNumber("");
      });
    }
  };

  const Notification = ({ message }) => {
    if (message === null) {
      return;
    } else if (message.includes("Removed")) {
      return <div className="removeMessage">{message}</div>;
    } else {
      return <div className="addMessage">{message}</div>;
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={addMessage} />

      <Filter value={newFilter} handle={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        submit={handleSubmit}
        nameChange={handleNameChange}
        numberChange={handleNumberChange}
        nameValue={newName}
        numberValue={newNumber}
      />

      <h2>numbers</h2>
      <Persons persons={personsToShow} deletePerson={handleDeletePerson} />
    </div>
  );
};

export default App;
