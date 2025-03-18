import express, { json } from 'express';
import { promises as fs } from 'fs';

const app = express();
app.use(json());
const PORT = 3000;
const STUDENTS_FILE = './data/students.json';

// Helper function to read students data
async function readStudentsFile() {
  const data = await fs.readFile(STUDENTS_FILE, 'utf8');
  return JSON.parse(data);
}

// Create (POST) - Add a new student
app.post('/students', async (req, res) => {
  const students = await readStudentsFile();
  students.push(req.body);
  await fs.writeFile(STUDENTS_FILE, JSON.stringify(students, null, 2));
  res.status(201).json(req.body);
});

// Read (GET) - Get all students
app.get('/students', async (req, res) => {
  const students = await readStudentsFile();
  res.json(students);
});

// Update (PUT) - Update a student by ID
app.put('/students/:id', async (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const students = await readStudentsFile();
  const studentIndex = students.findIndex(student => student.id === studentId);
  
  if (studentIndex !== -1) {
    students[studentIndex] = { ...students[studentIndex], ...req.body };
    await fs.writeFile(STUDENTS_FILE, JSON.stringify(students, null, 2));
    res.json(students[studentIndex]);
  } else {
    res.status(404).send('Student not found');
  }
});

// Delete (DELETE) - Remove a student by ID
app.delete('/students/:id', async (req, res) => {
  const studentIdfromClient = parseInt(req.params.id, 10);
  const students = await readStudentsFile();
  const updatedStudents = students.filter(student => student.id !== studentIdfromClient);
  
  if (students.length === updatedStudents.length) {
    res.status(404).json({ message: `Student with ID ${studentIdfromClient} not found` });
    return;
  }
  
  await fs.writeFile(STUDENTS_FILE, JSON.stringify(updatedStudents, null, 2));
  res.status(200).json({ message: `Student with ID ${studentIdfromClient} has been deleted successfully` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});