export interface StudentRecord {
  id: number;
  roll_number: string;
  name: string;
  email: string;
  department: string;
  gpa: number;
  status: 'Active' | 'Pending' | 'Graduated';
  created_at?: string;
}

export interface ApiResponse<T> {
  count?: number;
  results?: T[];
  error?: string;
  field_errors?: Record<string, string>;
  message?: string;
}

const API_BASE = '/api/students/';

// GET all students with optional search, department, and status filters
export async function getStudents(search = '', department = 'All', status = 'All'): Promise<{ count: number; results: StudentRecord[] }> {
  const params = new URLSearchParams();
  if (search.trim()) params.append('search', search.trim());
  if (department && department !== 'All') params.append('department', department);
  if (status && status !== 'All') params.append('status', status);

  const url = `${API_BASE}?${params.toString()}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to fetch students');
  }
  return data;
}

// GET single student by ID
export async function getStudentById(id: number): Promise<StudentRecord> {
  const res = await fetch(`${API_BASE}${id}/`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `Failed to fetch student #${id}`);
  }
  return data;
}

// POST create new student (SOP 7.6)
export async function createStudent(payload: Omit<StudentRecord, 'id' | 'created_at'>): Promise<StudentRecord> {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    const errorMsg = data.field_errors 
      ? Object.values(data.field_errors).join(', ') 
      : data.error || 'Failed to create student';
    const err: any = new Error(errorMsg);
    err.field_errors = data.field_errors;
    throw err;
  }
  return data;
}

// PUT update existing student (SOP 7.6)
export async function updateStudent(id: number, payload: Partial<StudentRecord>): Promise<StudentRecord> {
  const res = await fetch(`${API_BASE}${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    const errorMsg = data.field_errors 
      ? Object.values(data.field_errors).join(', ') 
      : data.error || `Failed to update student #${id}`;
    const err: any = new Error(errorMsg);
    err.field_errors = data.field_errors;
    throw err;
  }
  return data;
}

// DELETE student by ID (SOP 7.6)
export async function deleteStudent(id: number): Promise<{ message: string; deleted_id: number }> {
  const res = await fetch(`${API_BASE}${id}/`, {
    method: 'DELETE',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || `Failed to delete student #${id}`);
  }
  return data;
}

// POST reset sample database
export async function resetDatabase(): Promise<{ message: string; results: StudentRecord[] }> {
  const res = await fetch('/api/students/reset', {
    method: 'POST',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to reset database');
  }
  return data;
}
