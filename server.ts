import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

interface Student {
  id: number;
  roll_number: string;
  name: string;
  email: string;
  department: string;
  gpa: number;
  status: "Active" | "Pending" | "Graduated";
  created_at: string;
}

const INITIAL_STUDENTS: Student[] = [
  {
    id: 1,
    roll_number: "922525148002",
    name: "Abinash R",
    email: "abinash.r@example.com",
    department: "CSE (AI & ML)",
    gpa: 9.15,
    status: "Active",
    created_at: "2026-09-10T10:00:00.000Z",
  },
  {
    id: 2,
    roll_number: "IT202604",
    name: "Priya Sundaram",
    email: "priya.s@example.com",
    department: "Information Technology",
    gpa: 9.20,
    status: "Active",
    created_at: "2026-09-11T11:30:00.000Z",
  },
  {
    id: 3,
    roll_number: "EC202612",
    name: "Anand Kumar",
    email: "anand.kumar@example.com",
    department: "Electronics & Comm",
    gpa: 7.80,
    status: "Pending",
    created_at: "2026-09-12T09:15:00.000Z",
  },
  {
    id: 4,
    roll_number: "ME202608",
    name: "Deepa Narayanan",
    email: "deepa.n@example.com",
    department: "Mechanical Engg",
    gpa: 8.40,
    status: "Active",
    created_at: "2026-09-14T14:20:00.000Z",
  },
  {
    id: 5,
    roll_number: "CS202619",
    name: "Vignesh Murugan",
    email: "vignesh.m@example.com",
    department: "Computer Science",
    gpa: 6.95,
    status: "Graduated",
    created_at: "2026-09-15T16:45:00.000Z",
  },
];

const DATA_FILE = path.join(process.cwd(), "students_db.json");

function loadStudents(): Student[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading database file, using fallback", err);
  }
  return [...INITIAL_STUDENTS];
}

function saveStudents(data: Student[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing to database file", err);
  }
}

// In-memory runtime cache synchronized with JSON
let students: Student[] = loadStudents();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Check
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({
      status: "ok",
      app: "CRUD-Based Web Application Backend",
      version: "1.0.0",
      total_students: students.length,
    });
  });

  // SOP 7.6 REST API Endpoints

  // 1. READ ALL - GET /api/students/ (supports search and filter)
  app.get("/api/students/", (req: Request, res: Response) => {
    const search = ((req.query.search as string) || "").toLowerCase();
    const dept = (req.query.department as string) || "";
    const status = (req.query.status as string) || "";

    let filtered = [...students];

    if (search) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(search) ||
          s.roll_number.toLowerCase().includes(search) ||
          s.email.toLowerCase().includes(search)
      );
    }

    if (dept && dept !== "All") {
      filtered = filtered.filter((s) => s.department === dept);
    }

    if (status && status !== "All") {
      filtered = filtered.filter((s) => s.status === status);
    }

    res.status(200).json({
      count: filtered.length,
      results: filtered,
    });
  });

  // 2. READ ONE - GET /api/students/:id/
  app.get("/api/students/:id/", (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid student ID parameter" });
    }

    const student = students.find((s) => s.id === id);
    if (!student) {
      return res.status(404).json({ error: `Student with ID ${id} not found` });
    }

    res.status(200).json(student);
  });

  // 3. CREATE - POST /api/students/ (Validation per SOP 9)
  app.post("/api/students/", (req: Request, res: Response) => {
    const { roll_number, name, email, department, gpa, status } = req.body;

    // Field-level validations
    const errors: Record<string, string> = {};

    if (!roll_number || !roll_number.trim()) {
      errors.roll_number = "Roll Number is required";
    }
    if (!name || !name.trim()) {
      errors.name = "Student Name is required";
    }
    if (!email || !email.trim()) {
      errors.email = "Email address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "Invalid email format (e.g. user@example.com)";
      }
    }
    if (!department || !department.trim()) {
      errors.department = "Department is required";
    }

    const numericGpa = parseFloat(gpa);
    if (isNaN(numericGpa) || numericGpa < 0.0 || numericGpa > 10.0) {
      errors.gpa = "GPA must be a valid number between 0.00 and 10.00";
    }

    // Check unique constraints (Roll number & Email)
    if (roll_number) {
      const rollExists = students.some(
        (s) => s.roll_number.toLowerCase() === roll_number.trim().toLowerCase()
      );
      if (rollExists) {
        errors.roll_number = `Roll number '${roll_number}' already exists`;
      }
    }

    if (email) {
      const emailExists = students.some(
        (s) => s.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (emailExists) {
        errors.email = `Email '${email}' is already registered`;
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        error: "Validation failed",
        field_errors: errors,
      });
    }

    // Auto-increment ID
    const maxId = students.reduce((max, s) => Math.max(max, s.id), 0);
    const newStudent: Student = {
      id: maxId + 1,
      roll_number: roll_number.trim().toUpperCase(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      department: department.trim(),
      gpa: parseFloat(numericGpa.toFixed(2)),
      status: status || "Active",
      created_at: new Date().toISOString(),
    };

    students.unshift(newStudent);
    saveStudents(students);

    res.status(201).json(newStudent);
  });

  // 4. UPDATE - PUT /api/students/:id/
  app.put("/api/students/:id/", (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid student ID parameter" });
    }

    const studentIndex = students.findIndex((s) => s.id === id);
    if (studentIndex === -1) {
      return res.status(404).json({ error: `Student with ID ${id} not found` });
    }

    const { roll_number, name, email, department, gpa, status } = req.body;
    const errors: Record<string, string> = {};

    if (!roll_number || !roll_number.trim()) {
      errors.roll_number = "Roll Number is required";
    }
    if (!name || !name.trim()) {
      errors.name = "Student Name is required";
    }
    if (!email || !email.trim()) {
      errors.email = "Email address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = "Invalid email format";
      }
    }

    const numericGpa = parseFloat(gpa);
    if (isNaN(numericGpa) || numericGpa < 0.0 || numericGpa > 10.0) {
      errors.gpa = "GPA must be between 0.00 and 10.00";
    }

    // Check unique constraint collisions with other records
    if (roll_number) {
      const rollConflict = students.some(
        (s) => s.id !== id && s.roll_number.toLowerCase() === roll_number.trim().toLowerCase()
      );
      if (rollConflict) {
        errors.roll_number = `Roll number '${roll_number}' is already used by another student`;
      }
    }

    if (email) {
      const emailConflict = students.some(
        (s) => s.id !== id && s.email.toLowerCase() === email.trim().toLowerCase()
      );
      if (emailConflict) {
        errors.email = `Email '${email}' is already used by another student`;
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        error: "Validation failed",
        field_errors: errors,
      });
    }

    const updatedStudent: Student = {
      ...students[studentIndex],
      roll_number: roll_number.trim().toUpperCase(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      department: (department || students[studentIndex].department).trim(),
      gpa: parseFloat(numericGpa.toFixed(2)),
      status: status || students[studentIndex].status,
    };

    students[studentIndex] = updatedStudent;
    saveStudents(students);

    res.status(200).json(updatedStudent);
  });

  // 5. DELETE - DELETE /api/students/:id/
  app.delete("/api/students/:id/", (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid student ID parameter" });
    }

    const studentIndex = students.findIndex((s) => s.id === id);
    if (studentIndex === -1) {
      return res.status(404).json({ error: `Student with ID ${id} not found` });
    }

    const deleted = students.splice(studentIndex, 1)[0];
    saveStudents(students);

    res.status(200).json({
      message: `Student #${id} (${deleted.name}) deleted successfully`,
      deleted_id: id,
    });
  });

  // Seed / Reset Database to standard records
  app.post("/api/students/reset", (req: Request, res: Response) => {
    students = [...INITIAL_STUDENTS];
    saveStudents(students);
    res.status(200).json({
      message: "Database reset to initial 5 student records",
      count: students.length,
      results: students,
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
