import { useEffect, useState, UseState } from "react"
import './App.css';

function App() {

  const [students, setStudents] = useState([]);
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [age, setAge] = useState(0);

  const [newAge, SetNewAge] = useState(0);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/students/");
      const data = await response.json();
      setStudents(data);
      // console.log(data);
    } catch (err) {
      console.log(err)
    }
  };

  const addStudent = async () => {
    const studentData = {
      first_name,
      last_name,
      age
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/students/create/", 
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      const data = await response.json();
      setStudents((allElements) => [...allElements, data]);
      //console.log(data);
    } catch(err) {
      console.log(err);
    }
  };

  const updateAge = async (pk, first_name, last_name) => {
    const studentData = {
      first_name: first_name,
      last_name: last_name,
      age: newAge
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/students/${pk}/`, 
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      const data = await response.json();
      setStudents((element) => 
        element.map((student) => {
          if (student.id === pk) {
            return data;
          } else {
            return student;
          }
        })
      );
    } catch(err) {
      console.log(err);
    }
  };

  const deleteStudent = async (pk) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/students/${pk}/`, {
        method: "DELETE",
      });

      setStudents((prev) => prev.filter((student) => student.id != pk))
    } catch (err) {
      console.log(err)
    }
  };


  return (
    <>
    <div className="App">
      <h1>PAGE DE CREATION D'UN ETUDIANT</h1><br></br>
      <input type="text" placeholder="Veuillez remplir le nom" onChange={(e) => setFirstname(e.target.value)} /><br></br>
      <input type="text" placeholder="Veuillez remplir le prénom" onChange={(e) => setLastname(e.target.value)}/><br></br>
      <input type="number" placeholder="Veuillez remplir l'âge" onChange={(e) => setAge(e.target.value)}/><br></br>
      <button onClick={addStudent}>Soumettre</button>
    </div>

    {/* Lister l'ensemble des éléments récupérés depuis django */}
    {students.map((student) => (
      <div>
        <p>ID : {student.id} </p>
        <p>NOM : {student.first_name} </p>
        <p>PRENOM : {student.last_name} </p>
        <p>AGE : {student.age} </p> 
        <input type="number" placeholder="Changer l'âge" onChange={(e) => SetNewAge(e.target.value)}/>
        <button onClick={() => updateAge(student.id, student.first_name, student.last_name)}>Changer Age</button>
        <button onClick={() => deleteStudent(student.id)}>Supprimer</button>
      </div>
      ))}
    </>
  );
}

export default App;
