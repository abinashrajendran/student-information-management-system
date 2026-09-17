import { SopStep, ProjectTemplate } from '../types';

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'student',
    name: 'Student Management System',
    entity: 'Student',
    description: 'Manage student enrollments, roll numbers, departments, emails, and academic standing.',
    fields: [
      { name: 'id', type: 'Integer / AutoField', constraints: 'PRIMARY KEY', example: '1' },
      { name: 'roll_number', type: 'String / Varchar(20)', constraints: 'UNIQUE, NOT NULL', example: 'CS202601' },
      { name: 'name', type: 'String / Varchar(100)', constraints: 'NOT NULL', example: 'Karthik Raja' },
      { name: 'email', type: 'String / EmailField', constraints: 'UNIQUE, NOT NULL', example: 'karthik@example.com' },
      { name: 'department', type: 'String / Varchar(50)', constraints: 'NOT NULL', example: 'Computer Science' },
      { name: 'gpa', type: 'Float / Decimal(3,2)', constraints: '0.0 - 10.0', example: '8.75' },
    ],
    suggestedEndpoints: '/api/students/',
  },
  {
    id: 'employee',
    name: 'Employee Management System',
    entity: 'Employee',
    description: 'Track staff details, job titles, departments, salaries, and employment status.',
    fields: [
      { name: 'id', type: 'Integer / AutoField', constraints: 'PRIMARY KEY', example: '101' },
      { name: 'emp_code', type: 'String / Varchar(20)', constraints: 'UNIQUE, NOT NULL', example: 'EMP-902' },
      { name: 'name', type: 'String / Varchar(100)', constraints: 'NOT NULL', example: 'Priya Sundaram' },
      { name: 'email', type: 'String / EmailField', constraints: 'UNIQUE, NOT NULL', example: 'priya@company.com' },
      { name: 'designation', type: 'String / Varchar(50)', constraints: 'NOT NULL', example: 'Frontend Engineer' },
      { name: 'salary', type: 'Decimal(10,2)', constraints: 'NOT NULL', example: '65000' },
    ],
    suggestedEndpoints: '/api/employees/',
  },
  {
    id: 'library',
    name: 'Library Management System',
    entity: 'Book',
    description: 'Manage books catalog, authors, ISBN numbers, availability, and rack location.',
    fields: [
      { name: 'id', type: 'Integer / AutoField', constraints: 'PRIMARY KEY', example: '1' },
      { name: 'isbn', type: 'String / Varchar(20)', constraints: 'UNIQUE, NOT NULL', example: '978-0132350884' },
      { name: 'title', type: 'String / Varchar(200)', constraints: 'NOT NULL', example: 'Clean Code' },
      { name: 'author', type: 'String / Varchar(100)', constraints: 'NOT NULL', example: 'Robert C. Martin' },
      { name: 'available_copies', type: 'Integer', constraints: '>= 0, NOT NULL', example: '5' },
      { name: 'genre', type: 'String / Varchar(50)', constraints: 'NOT NULL', example: 'Programming' },
    ],
    suggestedEndpoints: '/api/books/',
  },
  {
    id: 'inventory',
    name: 'Inventory Management System',
    entity: 'Product',
    description: 'Stock control system with SKU, product names, categories, unit prices, and quantity.',
    fields: [
      { name: 'id', type: 'Integer / AutoField', constraints: 'PRIMARY KEY', example: '1' },
      { name: 'sku', type: 'String / Varchar(30)', constraints: 'UNIQUE, NOT NULL', example: 'SKU-LOGI-M331' },
      { name: 'name', type: 'String / Varchar(120)', constraints: 'NOT NULL', example: 'Wireless Mouse' },
      { name: 'category', type: 'String / Varchar(50)', constraints: 'NOT NULL', example: 'Electronics' },
      { name: 'unit_price', type: 'Decimal(10,2)', constraints: 'NOT NULL, > 0', example: '1299.00' },
      { name: 'stock_quantity', type: 'Integer', constraints: 'NOT NULL, >= 0', example: '45' },
    ],
    suggestedEndpoints: '/api/products/',
  },
  {
    id: 'expense',
    name: 'Expense Tracker System',
    entity: 'Expense',
    description: 'Record personal or organization expenses, payment modes, amounts, and dates.',
    fields: [
      { name: 'id', type: 'Integer / AutoField', constraints: 'PRIMARY KEY', example: '1' },
      { name: 'title', type: 'String / Varchar(100)', constraints: 'NOT NULL', example: 'Cloud Hosting' },
      { name: 'amount', type: 'Decimal(10,2)', constraints: 'NOT NULL, > 0', example: '1450.00' },
      { name: 'category', type: 'String / Varchar(50)', constraints: 'NOT NULL', example: 'Software' },
      { name: 'payment_mode', type: 'String / Varchar(30)', constraints: 'NOT NULL', example: 'UPI' },
      { name: 'expense_date', type: 'Date', constraints: 'NOT NULL', example: '2026-09-15' },
    ],
    suggestedEndpoints: '/api/expenses/',
  },
];

export const SOP_STEPS: SopStep[] = [
  {
    id: 1,
    title: 'Requirement Analysis & Project Selection',
    sopSection: 'SOP 7.1 & Section 6',
    shortDesc: 'Choose your management domain, primary entity, and define fields with constraints.',
    tanglishSummary: 'முதல்ல உங்க Project Topic (எ.கா: Student, Employee, Library) தேர்வு பண்ணி, அதுக்கான Main Entity & Fields (Name, Email, ID...) முடிவு பண்ணனும்.',
    objective: 'Identify the problem domain, target users, and establish the core data fields required for Create, Read, Update, and Delete operations.',
    tasks: [
      'Select a practical project topic (e.g., Student, Employee, Library, or Inventory Management).',
      'Identify the main Entity to be managed (e.g. Student, Employee, Book, Product).',
      'List at least 5 to 6 essential fields with appropriate data types (String, Number, Date, Email).',
      'Mark primary key and unique constraints (e.g., ID is Primary Key, Roll No/Email is UNIQUE).',
      'Document functional requirements: Add form, List view, Edit modal/form, Delete confirmation.',
    ],
    deliverables: [
      'Project title and problem statement document',
      'Entity-Attribute list with constraints (NOT NULL, UNIQUE)',
      'Basic wireframe or UI sketches for list and form views',
    ],
    tips: [
      'Keep your entity focused. Having 1 solid entity with 5-6 fields done end-to-end with high quality is much better than trying 5 complex tables with broken APIs.',
      'Always have a unique identifier field (e.g., roll_no, emp_id, or sku) in addition to auto-increment id.',
    ],
    rubricWeight: '10% (Requirement & Design)',
  },
  {
    id: 2,
    title: 'Project Planning & Environment Setup',
    sopSection: 'SOP 7.2 & Section 4',
    shortDesc: 'Select technology stack, set up directory structure, and initialize Git repository.',
    tanglishSummary: 'Frontend (React), Backend (Django / Spring Boot), Database (SQLite/MySQL) முடிவு பண்ணி Project Folders மற்றும் Git Repo initialize பண்ணனும்.',
    objective: 'Establish a clean separation of concerns between client and server, initialize version control, and prepare dependencies.',
    tasks: [
      'Select your tech stack (Frontend: React + Vite / Tailwind; Backend: Django REST or Spring Boot / Express).',
      'Create standard project folder structure (e.g., frontend/ and backend/).',
      'Initialize Git repo with git init and create a .gitignore file (exclude node_modules, venv, .env).',
      'Verify package managers (npm / pip / maven) and runtime versions.',
      'Create an initial commit: "chore: initial project setup".',
    ],
    deliverables: [
      'Clean project directory structure',
      'Working Git repository with first commit',
      '.gitignore and README.md setup',
    ],
    tips: [
      'Never commit secret keys or node_modules to Git.',
      'Keep frontend and backend in clearly distinct subfolders or repositories.',
    ],
    rubricWeight: '10% (Architecture & Version Control)',
    codeTemplate: {
      filename: 'Directory Structure',
      language: 'text',
      code: `my-crud-project/
├── backend/
│   ├── manage.py / pom.xml / server.ts
│   ├── models/
│   ├── serializers/ / controllers/
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   └── api.ts
│   └── package.json
├── README.md
└── .gitignore`,
    },
  },
  {
    id: 3,
    title: 'Database Schema Design & Connectivity',
    sopSection: 'SOP 7.3',
    shortDesc: 'Design tables, define primary keys, foreign keys, data types, and verify connectivity.',
    tanglishSummary: 'Database Table structure create பண்ணி, Primary Key, NOT NULL, UNIQUE constraints set பண்ணி backend connectivity check பண்ணனும்.',
    objective: 'Model the database structure with integrity constraints and establish persistent connection.',
    tasks: [
      'Design SQL schema or ORM models with explicit column types.',
      'Set Primary Key (auto-incrementing integer or UUID).',
      'Apply database-level constraints (e.g., UNIQUE email, NOT NULL name).',
      'Configure database credentials via environment variables (.env).',
      'Run initial migrations or CREATE TABLE script and verify table existence.',
    ],
    deliverables: [
      'Database schema / ER diagram representation',
      'Migration files or DDL SQL scripts',
      'Verified active database connection from backend',
    ],
    tips: [
      'Use SQLite for quick, zero-config local development, or PostgreSQL / MySQL for production-grade testing.',
      'Ensure field names in the database match what your serializers / DTOs expect.',
    ],
    rubricWeight: '10% (Database Design)',
    codeTemplate: {
      filename: 'Django models.py / SQL',
      language: 'python',
      code: `# Django ORM Model example:
from django.db import models

class Student(models.Model):
    roll_number = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=50)
    gpa = models.DecimalField(max_digits=4, decimal_places=2, default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.roll_number} - {self.name}"`,
    },
  },
  {
    id: 4,
    title: 'Backend Setup & Entity Models',
    sopSection: 'SOP 7.5',
    shortDesc: 'Configure server, create models/entities, and setup serializers/DTOs.',
    tanglishSummary: 'Backend framework-ல் Data Model and Serializer create பண்ணி business logic தயார் பண்ணனும்.',
    objective: 'Implement server-side entity mapping, data transfer objects, and error handling framework.',
    tasks: [
      'Configure backend app framework (Django REST Framework / Spring Boot / Node Express).',
      'Create Serializers (Django) or DTOs (Java/Spring) to serialize/deserialize JSON.',
      'Set up database settings in settings.py or application.properties.',
      'Implement basic model validation rules (max length, regex, range).',
      'Test model creation via shell or admin dashboard.',
    ],
    deliverables: [
      'Backend project boots up on local port (e.g. 8000 or 8080 or 3000)',
      'Model and serializer files created and verified',
    ],
    tips: [
      'Enable CORS headers early so React can communicate with your backend without browser blocking.',
    ],
    rubricWeight: '20% (Backend & API)',
    codeTemplate: {
      filename: 'serializers.py',
      language: 'python',
      code: `from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'roll_number', 'name', 'email', 'department', 'gpa', 'created_at']

    def validate_gpa(self, value):
        if value < 0.0 or value > 10.0:
            raise serializers.ValidationError("GPA must be between 0.0 and 10.0")
        return value`,
    },
  },
  {
    id: 5,
    title: 'REST API Implementation (CRUD Endpoints)',
    sopSection: 'SOP 7.6',
    shortDesc: 'Implement POST (Create), GET (Read All/One), PUT/PATCH (Update), and DELETE endpoints.',
    tanglishSummary: 'SOP 7.6 table படி 5 REST API Endpoints: POST, GET all, GET by ID, PUT/PATCH, and DELETE build பண்ணனும்.',
    objective: 'Build standardized RESTful API endpoints adhering to HTTP verbs, standard status codes (200, 201, 204, 400, 404), and JSON payloads.',
    tasks: [
      'POST /api/items/ : Create a new record (Return 201 Created with new object).',
      'GET /api/items/ : Read list of records (Return 200 OK with array).',
      'GET /api/items/{id}/ : Read single record by ID (Return 200 OK or 404 Not Found).',
      'PUT or PATCH /api/items/{id}/ : Update existing record (Return 200 OK with updated object).',
      'DELETE /api/items/{id}/ : Delete record (Return 204 No Content or 200 OK confirmation).',
      'Implement global exception handler to return clean JSON errors { "error": "message" }.',
    ],
    deliverables: [
      'All 5 REST endpoints functioning with proper HTTP status codes',
      'Proper JSON responses for both success and error cases',
    ],
    tips: [
      'Always return HTTP 201 Created for POST, HTTP 200 OK for GET/PUT, and HTTP 204 No Content (or 200) for DELETE.',
      'Check if record exists before updating or deleting to prevent 500 crashes.',
    ],
    rubricWeight: '20% (CRUD Functionality)',
    codeTemplate: {
      filename: 'views.py / endpoints',
      language: 'python',
      code: `# Django REST Framework ModelViewSet handles all 5 endpoints automatically:
from rest_framework import viewsets, filters
from .models import Student
from .serializers import StudentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all().order_by('-id')
    serializer_class = StudentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'roll_number', 'department']

# In urls.py:
# router = DefaultRouter()
# router.register(r'students', StudentViewSet)
# urlpatterns = [path('api/', include(router.urls))]`,
    },
  },
  {
    id: 6,
    title: 'Frontend Development (Responsive UI)',
    sopSection: 'SOP 7.4',
    shortDesc: 'Develop responsive React UI with forms for add/edit, table/card list, and action buttons.',
    tanglishSummary: 'React-ல் Add Form, Records Table/Card layout, Edit & Delete buttons, மற்றும் Search bar அழகா design பண்ணனும்.',
    objective: 'Create an accessible, modern, responsive user interface with intuitive controls for all CRUD operations.',
    tasks: [
      'Build responsive layout (header, search bar, stats bar, table/card container).',
      'Develop Add Record Form with typed inputs (text, email, select, number).',
      'Create Records Table or Card Grid displaying all fields with sorting/status badges.',
      'Add Edit button that populates the form with existing values.',
      'Add Delete button with confirmation prompt modal to prevent accidental deletion.',
      'Ensure mobile-friendly layout and touch targets.',
    ],
    deliverables: [
      'Responsive React frontend component structure',
      'Add/Edit form with clean inputs and labels',
      'Records list view with action buttons (Edit, Delete)',
    ],
    tips: [
      'Never execute a delete without user confirmation dialog.',
      'Use clear visual states (loading spinners, empty state illustrations, error alerts).',
    ],
    rubricWeight: '20% (Frontend UI)',
  },
  {
    id: 7,
    title: 'Frontend–Backend Integration',
    sopSection: 'SOP 7.7',
    shortDesc: 'Connect React to API using fetch or Axios, manage state, and handle CORS.',
    tanglishSummary: 'Frontend fetch/axios வழியாக Backend APIs call பண்ணி data retrieve, update, delete பண்ணி UI-ஐ auto-refresh பண்ணனும்.',
    objective: 'Enable smooth asynchronous communication between client and server with JSON request/response handling.',
    tasks: [
      'Configure API base URL (e.g., http://localhost:8000 or /api).',
      'Implement API utility functions: getItems(), createItem(), updateItem(), deleteItem().',
      'Use React useEffect to load items on component mount.',
      'Update React state immediately after successful POST, PUT, or DELETE.',
      'Configure CORS headers on backend (e.g. django-cors-headers).',
      'Show toast / banner notifications on success and failure.',
    ],
    deliverables: [
      'Full round-trip data flow: User action -> API call -> DB -> UI refresh',
      'CORS successfully resolved and tested',
      'Feedback toasts for Created, Updated, Deleted',
    ],
    tips: [
      'Always catch network errors in a try/catch block to avoid unhandled promise rejections.',
      'Optimistic UI or re-fetching list ensures UI is always in sync with DB.',
    ],
    rubricWeight: '20% (Integration & CRUD)',
    codeTemplate: {
      filename: 'api.ts (React Service)',
      language: 'typescript',
      code: `const API_BASE = '/api/students/';

export async function fetchStudents() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch records');
  return res.json();
}

export async function createStudent(data: any) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create record');
  return res.json();
}

export async function updateStudent(id: number | string, data: any) {
  const res = await fetch(\`\${API_BASE}\${id}/\`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update record');
  return res.json();
}

export async function deleteStudent(id: number | string) {
  const res = await fetch(\`\${API_BASE}\${id}/\`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete record');
  return true;
}`,
    },
  },
  {
    id: 8,
    title: 'Input Validation & Exception Handling',
    sopSection: 'SOP 9 & Section 11',
    shortDesc: 'Enforce client-side and server-side validation for required fields, formats, and duplicates.',
    tanglishSummary: 'Empty fields, invalid email format, negative numbers, மற்றும் duplicate values check பண்ணி error message காட்டணும்.',
    objective: 'Protect data integrity with dual-layer validation (browser client + backend server) and meaningful feedback.',
    tasks: [
      'Client-side validation: Check empty required fields, regex for email, number ranges.',
      'Server-side validation: Reject invalid payloads with HTTP 400 Bad Request and field-specific errors.',
      'Handle duplicate unique values (e.g. roll number or email already exists) gracefully.',
      'Display inline error messages below form inputs.',
      'Disable submit button or show loading spinner during in-flight requests.',
    ],
    deliverables: [
      'Dual-layer validation working seamlessly',
      'No invalid or duplicate data can enter the database',
      'Helpful inline validation messages for the user',
    ],
    tips: [
      'Never rely only on HTML5 validation (like required or type="email") because API requests can bypass it; server validation is mandatory!',
    ],
    rubricWeight: '10% (Validation & Quality)',
  },
  {
    id: 9,
    title: 'Testing Procedure (Postman & Frontend)',
    sopSection: 'SOP 10',
    shortDesc: 'Test every endpoint with Postman (valid, invalid, edge cases) and test UI responsiveness.',
    tanglishSummary: 'Postman-ல் எல்லா Endpoints-க்கும் (POST, GET, PUT, DELETE) positive and negative test cases run பண்ணி verify பண்ணனும்.',
    objective: 'Systematically verify each API route and user workflow under normal and edge-case conditions.',
    tasks: [
      'Create a Postman collection for your API with requests for all 5 endpoints.',
      'Test Create with: (a) valid data, (b) missing fields, (c) duplicate unique value.',
      'Test Read: (a) empty table, (b) populated list, (c) non-existent ID (verify 404).',
      'Test Update: (a) valid payload, (b) invalid field types.',
      'Test Delete: (a) valid ID (verify 204/200), (b) repeated delete of same ID (verify 404).',
      'Test frontend across mobile (375px) and desktop (1280px) screen sizes.',
      'Take screenshots of Postman test responses for project documentation.',
    ],
    deliverables: [
      'Exported Postman collection (JSON) or test screenshots',
      'Verification of status codes (200, 201, 204, 400, 404)',
      'Cross-device responsiveness verified',
    ],
    tips: [
      'Save example responses in Postman—professors and evaluators love seeing documented API collections!',
    ],
    rubricWeight: '10% (Testing)',
  },
  {
    id: 10,
    title: 'Git Version Control, Documentation & Final Demo',
    sopSection: 'SOP 12, 13, 16 & 17',
    shortDesc: 'Finalize README, document endpoints, push clean commits, and rehearse live demonstration.',
    tanglishSummary: 'README file, Project Report, GitHub push பண்ணிட்டு, Final Demo checklist (SOP 17) verify பண்ணி Viva-க்கு prepare ஆகணும்.',
    objective: 'Prepare professional documentation, clean Git repository history, and rehearse flawless live CRUD demonstration.',
    tasks: [
      'Ensure all code is committed with descriptive messages ("feat: add student update endpoint").',
      'Write comprehensive README.md with setup instructions (Prerequisites, backend run, frontend run).',
      'Document all endpoints with request/response samples.',
      'Rehearse the Final Demonstration Checklist (SOP 17): Create, Read, Update, Delete, Validation, Search.',
      'Prepare project explanation: Architecture flow (User -> React -> REST API -> Django/Spring -> DB).',
    ],
    deliverables: [
      'Complete GitHub repository link with clean commits',
      'Project Documentation / Report PDF (Architecture, ER diagram, Screenshots)',
      'Working live demo fulfilling all 4 CRUD operations',
    ],
    tips: [
      'During the demo, start by creating a record, show it in the list, edit one value to prove Update, and delete it to prove Delete. Evaluators grade on this exact flow!',
    ],
    rubricWeight: '10% (Documentation & Viva)',
  },
];
