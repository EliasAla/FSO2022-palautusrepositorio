import { useState } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = (props) => {
  const [persons, setPersons] = useState(props.phonebook);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Tarkistaa löytyykö nimeä jo phonebookista
    if (persons.some((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else if (newName.length < 1) {
      window.alert("Field cannot be empty");
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      setPersons(persons.concat(nameObject));

      // Tyhjentää input kentät
      setNewName("");
      setNewNumber("");
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
