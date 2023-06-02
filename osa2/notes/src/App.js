import Note from "./components/Note";
import { useState, useEffect } from "react";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    // console.log("effect");
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const addNote = (event) => {
    // Estää sivun uudelleenlatautumisen
    event.preventDefault();

    // Tarkastaa ettei kenttä ole tyhjä
    if (newNote !== "") {
      // Luodaan uusi objekti uutta muistiinpanoa varten
      const noteObject = {
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() > 0.5,
      };

      noteService.create(noteObject).then((returnedNote) => {
        // Asettaa nykyiseksi taulukon johon lisätty uusi objekti
        setNotes(notes.concat(returnedNote));
        // Tyhjentää input kentän
        setNewNote("");
      });
    }
  };

  // Input kentän muuttmisen hallinta
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  // Filtteröi tärkeät
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  // Tärkeyden muuttaminen
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>

      {/* Tärkeiden näyttäminen/piilottaminen */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>

      {/* Muistiinpanojen mappaus ja renderöinti */}
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      {/* Muistiinpanojen lisääminen */}
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="sumbit">save</button>
      </form>
    </div>
  );
};

export default App;
