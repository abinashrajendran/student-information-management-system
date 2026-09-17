import React, { useState, useEffect } from 'react';
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  resetDatabase,
  StudentRecord,
} from '../api/studentApi';
import {
  Plus,
  Search,
  RefreshCw,
  Edit2,
  Trash2,
  Eye,
  Download,
  AlertCircle,
  CheckCircle2,
  Filter,
  ArrowUpDown,
  GraduationCap,
  Users,
  CheckCircle,
  Clock,
  X,
  Database,
  FileSpreadsheet,
} from 'lucide-react';

interface CrudManagerProps {
  onApiAction?: (method: string, endpoint: string, status: number, body?: any) => void;
}

export const CrudManager: React.FC<CrudManagerProps> = ({ onApiAction }) => {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState<'id' | 'name' | 'gpa' | 'roll_number'>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Modal States
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view' | null>(null);
  const [activeStudent, setActiveStudent] = useState<StudentRecord | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    roll_number: '',
    name: '',
    email: '',
    department: 'Computer Science',
    gpa: '8.50',
    status: 'Active' as 'Active' | 'Pending' | 'Graduated',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Feedback Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStudents(searchTerm, selectedDept, selectedStatus);
      setStudents(data.results || []);
      if (onApiAction) {
        onApiAction('GET', `/api/students/?search=${searchTerm}&department=${selectedDept}`, 200, data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load records from backend server');
      if (onApiAction) {
        onApiAction('GET', '/api/students/', 500, { error: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [searchTerm, selectedDept, selectedStatus]);

  const handleOpenCreate = () => {
    const nextRoll = `CS2026${String(Math.floor(Math.random() * 80) + 20)}`;
    setFormData({
      roll_number: nextRoll,
      name: '',
      email: '',
      department: 'Computer Science',
      gpa: '8.50',
      status: 'Active',
    });
    setFieldErrors({});
    setModalMode('create');
  };

  const handleOpenEdit = (student: StudentRecord) => {
    setActiveStudent(student);
    setFormData({
      roll_number: student.roll_number,
      name: student.name,
      email: student.email,
      department: student.department,
      gpa: String(student.gpa),
      status: student.status,
    });
    setFieldErrors({});
    setModalMode('edit');
  };

  const handleOpenView = (student: StudentRecord) => {
    setActiveStudent(student);
    setModalMode('view');
    if (onApiAction) {
      onApiAction('GET', `/api/students/${student.id}/`, 200, student);
    }
  };

  const validateClientSide = () => {
    const errs: Record<string, string> = {};
    if (!formData.roll_number.trim()) errs.roll_number = 'Roll Number is required';
    if (!formData.name.trim()) errs.name = 'Full Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email format (e.g. user@example.com)';
      }
    }
    const valGpa = parseFloat(formData.gpa);
    if (isNaN(valGpa) || valGpa < 0 || valGpa > 10) {
      errs.gpa = 'GPA must be between 0.00 and 10.00';
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateClientSide()) return;

    setIsSubmitting(true);
    try {
      if (modalMode === 'create') {
        const payload = {
          roll_number: formData.roll_number.trim(),
          name: formData.name.trim(),
          email: formData.email.trim(),
          department: formData.department,
          gpa: parseFloat(parseFloat(formData.gpa).toFixed(2)),
          status: formData.status,
        };
        const created = await createStudent(payload);
        showToast(`Created student ${created.name} (${created.roll_number}) - HTTP 201 Created`);
        if (onApiAction) {
          onApiAction('POST', '/api/students/', 201, created);
        }
      } else if (modalMode === 'edit' && activeStudent) {
        const payload = {
          roll_number: formData.roll_number.trim(),
          name: formData.name.trim(),
          email: formData.email.trim(),
          department: formData.department,
          gpa: parseFloat(parseFloat(formData.gpa).toFixed(2)),
          status: formData.status,
        };
        const updated = await updateStudent(activeStudent.id, payload);
        showToast(`Updated student #${updated.id} - HTTP 200 OK`);
        if (onApiAction) {
          onApiAction('PUT', `/api/students/${activeStudent.id}/`, 200, updated);
        }
      }
      setModalMode(null);
      loadData();
    } catch (err: any) {
      if (err.field_errors) {
        setFieldErrors(err.field_errors);
      }
      showToast(err.message || 'Operation failed', 'error');
      if (onApiAction) {
        onApiAction(modalMode === 'create' ? 'POST' : 'PUT', '/api/students/', 400, { error: err.message });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" (ID: #${id})?\nThis demonstrates DELETE /api/students/${id}/.`)) {
      try {
        await deleteStudent(id);
        showToast(`Student #${id} removed successfully (HTTP 204/200)`);
        if (onApiAction) {
          onApiAction('DELETE', `/api/students/${id}/`, 204);
        }
        loadData();
      } catch (err: any) {
        showToast(err.message || 'Failed to delete student', 'error');
      }
    }
  };

  const handleResetDb = async () => {
    if (window.confirm('Reset database to standard 5 initial student records?')) {
      try {
        await resetDatabase();
        showToast('Database reset successfully');
        if (onApiAction) {
          onApiAction('POST', '/api/students/reset', 200);
        }
        loadData();
      } catch (err: any) {
        showToast(err.message || 'Failed to reset', 'error');
      }
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Roll Number', 'Name', 'Email', 'Department', 'GPA', 'Status', 'Created At'];
    const rows = students.map((s) => [
      s.id,
      `"${s.roll_number}"`,
      `"${s.name}"`,
      `"${s.email}"`,
      `"${s.department}"`,
      s.gpa,
      s.status,
      s.created_at || '',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `students_records_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sorting
  const sortedStudents = [...students].sort((a, b) => {
    let cmp = 0;
    if (sortBy === 'id') cmp = a.id - b.id;
    else if (sortBy === 'gpa') cmp = a.gpa - b.gpa;
    else if (sortBy === 'name') cmp = a.name.localeCompare(b.name);
    else if (sortBy === 'roll_number') cmp = a.roll_number.localeCompare(b.roll_number);
    return sortOrder === 'asc' ? cmp : -cmp;
  });

  const toggleSort = (col: 'id' | 'name' | 'gpa' | 'roll_number') => {
    if (sortBy === col) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortOrder('asc');
    }
  };

  // Stats
  const totalCount = students.length;
  const activeCount = students.filter((s) => s.status === 'Active').length;
  const avgGpa = totalCount > 0 ? (students.reduce((acc, s) => acc + s.gpa, 0) / totalCount).toFixed(2) : '0.00';

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-2xl border flex items-center gap-3 transition-all ${
            toast.type === 'success'
              ? 'bg-slate-900 text-white border-emerald-500/50'
              : 'bg-rose-900 text-white border-rose-500/50'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span className="text-xs font-medium">{toast.message}</span>
        </div>
      )}

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Total Enrolled</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-0.5">{totalCount} Students</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Active Students</p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-0.5">{activeCount} Active</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Average GPA</p>
            <h3 className="text-2xl font-bold text-amber-600 mt-0.5">{avgGpa} / 10.0</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <GraduationCap className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Operations Action Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Search Bar */}
          <div className="relative min-w-[240px] flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              id="student-search-input"
              type="text"
              placeholder="Search by name, roll number, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Department Filter */}
          <select
            id="student-filter-dept"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-hidden"
          >
            <option value="All">All Departments</option>
            <option value="CSE (AI & ML)">CSE (AI &amp; ML)</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Tech</option>
            <option value="Electronics & Comm">Electronics &amp; Comm</option>
            <option value="Mechanical Engg">Mechanical Engg</option>
          </select>

          {/* Status Filter */}
          <select
            id="student-filter-status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-hidden"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Graduated">Graduated</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            id="btn-export-csv"
            onClick={handleExportCSV}
            title="Export to CSV"
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" /> Export CSV
          </button>

          <button
            id="btn-refresh-students"
            onClick={loadData}
            title="Refresh from REST API"
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            id="btn-reset-db"
            onClick={handleResetDb}
            title="Reset Database to initial state"
            className="px-3 py-1.5 rounded-lg border border-amber-200 text-xs text-amber-800 bg-amber-50 hover:bg-amber-100 flex items-center gap-1 transition-colors"
          >
            <Database className="w-3.5 h-3.5" /> Reset DB
          </button>

          <button
            id="btn-add-student-modal"
            onClick={handleOpenCreate}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Student (POST)
          </button>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="text-xs font-bold text-slate-800 flex items-center gap-2">
            <span>Student Records Database</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-mono text-[11px]">
              {sortedStudents.length} records
            </span>
          </div>
          <span className="text-[11px] text-slate-500">Connected to: /api/students/ (Express REST API)</span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-500">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-600" />
            <p className="text-xs">Fetching records from REST API...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-rose-600">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p className="text-xs font-bold">{error}</p>
            <button
              onClick={loadData}
              className="mt-3 px-3 py-1 bg-slate-900 text-white text-xs rounded-lg"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200 select-none">
                  <th
                    className="py-3 px-3.5 cursor-pointer hover:text-slate-900"
                    onClick={() => toggleSort('id')}
                  >
                    <div className="flex items-center gap-1">
                      ID <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    className="py-3 px-3 cursor-pointer hover:text-slate-900"
                    onClick={() => toggleSort('roll_number')}
                  >
                    <div className="flex items-center gap-1">
                      Roll Number <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th
                    className="py-3 px-3 cursor-pointer hover:text-slate-900"
                    onClick={() => toggleSort('name')}
                  >
                    <div className="flex items-center gap-1">
                      Full Name <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3">Email</th>
                  <th className="py-3 px-3">Department</th>
                  <th
                    className="py-3 px-3 cursor-pointer hover:text-slate-900"
                    onClick={() => toggleSort('gpa')}
                  >
                    <div className="flex items-center gap-1">
                      GPA <ArrowUpDown className="w-3 h-3" />
                    </div>
                  </th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-sans">
                {sortedStudents.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      No student records found matching your filters. Click &quot;Add Student&quot; to create one!
                    </td>
                  </tr>
                ) : (
                  sortedStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3.5 font-mono text-slate-400 font-medium">#{student.id}</td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">
                        {student.roll_number}
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-900">{student.name}</td>
                      <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">{student.email}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px]">
                          {student.department}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`font-mono font-bold text-xs ${
                            student.gpa >= 8.5
                              ? 'text-emerald-600'
                              : student.gpa >= 7.0
                              ? 'text-indigo-600'
                              : 'text-amber-600'
                          }`}
                        >
                          {student.gpa.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            student.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : student.status === 'Pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-right space-x-1 whitespace-nowrap">
                        <button
                          id={`btn-view-${student.id}`}
                          onClick={() => handleOpenView(student)}
                          title="View Details (GET /api/students/:id/)"
                          className="p-1 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          id={`btn-edit-${student.id}`}
                          onClick={() => handleOpenEdit(student)}
                          title="Edit Student (PUT /api/students/:id/)"
                          className="p-1 rounded-md text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          id={`btn-delete-${student.id}`}
                          onClick={() => handleDelete(student.id, student.name)}
                          title="Delete Student (DELETE /api/students/:id/)"
                          className="p-1 rounded-md text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Create / Edit */}
      {(modalMode === 'create' || modalMode === 'edit') && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {modalMode === 'create'
                    ? 'Add New Student Record (POST /api/students/)'
                    : `Edit Student #${activeStudent?.id} (PUT /api/students/${activeStudent?.id}/)`}
                </h3>
                <p className="text-xs text-slate-500">
                  Follows validation guidelines defined in SOP Section 9.
                </p>
              </div>
              <button
                onClick={() => setModalMode(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Roll Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Roll Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="modal-roll-input"
                    type="text"
                    required
                    placeholder="e.g. CS202601"
                    value={formData.roll_number}
                    onChange={(e) => setFormData({ ...formData, roll_number: e.target.value })}
                    className={`w-full text-xs px-3 py-2 rounded-lg border font-mono ${
                      fieldErrors.roll_number
                        ? 'border-rose-400 bg-rose-50/40 text-rose-900'
                        : 'border-slate-200 focus:ring-2 focus:ring-emerald-500'
                    }`}
                  />
                  {fieldErrors.roll_number && (
                    <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.roll_number}</p>
                  )}
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="modal-name-input"
                    type="text"
                    required
                    placeholder="e.g. Karthik Raja"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full text-xs px-3 py-2 rounded-lg border ${
                      fieldErrors.name
                        ? 'border-rose-400 bg-rose-50/40 text-rose-900'
                        : 'border-slate-200 focus:ring-2 focus:ring-emerald-500'
                    }`}
                  />
                  {fieldErrors.name && (
                    <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.name}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  id="modal-email-input"
                  type="email"
                  required
                  placeholder="e.g. karthik.raja@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full text-xs px-3 py-2 rounded-lg border ${
                    fieldErrors.email
                      ? 'border-rose-400 bg-rose-50/40 text-rose-900'
                      : 'border-slate-200 focus:ring-2 focus:ring-emerald-500'
                  }`}
                />
                {fieldErrors.email && (
                  <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Department */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Department
                  </label>
                  <select
                    id="modal-dept-input"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="CSE (AI & ML)">CSE (AI &amp; ML)</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Tech</option>
                    <option value="Electronics & Comm">Electronics &amp; Comm</option>
                    <option value="Mechanical Engg">Mechanical Engg</option>
                  </select>
                </div>

                {/* GPA */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    GPA (0 - 10) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="modal-gpa-input"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    placeholder="8.50"
                    value={formData.gpa}
                    onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                    className={`w-full text-xs px-3 py-2 rounded-lg border font-mono ${
                      fieldErrors.gpa
                        ? 'border-rose-400 bg-rose-50/40 text-rose-900'
                        : 'border-slate-200 focus:ring-2 focus:ring-emerald-500'
                    }`}
                  />
                  {fieldErrors.gpa && (
                    <p className="text-[11px] text-rose-600 mt-1">{fieldErrors.gpa}</p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Enrollment Status
                  </label>
                  <select
                    id="modal-status-input"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value as any })
                    }
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Graduated">Graduated</option>
                  </select>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  id="modal-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isSubmitting ? 'Saving to Database...' : modalMode === 'create' ? 'Create Record (POST)' : 'Save Changes (PUT)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for View Details */}
      {modalMode === 'view' && activeStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-indigo-100 text-indigo-700 text-xs font-mono font-bold">
                  GET #{activeStudent.id}
                </span>
                <h3 className="text-sm font-bold text-slate-900">Student Profile Inspection</h3>
              </div>
              <button
                onClick={() => setModalMode(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Record ID:</span>
                <span className="font-bold text-slate-900">#{activeStudent.id}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Roll Number:</span>
                <span className="font-bold text-indigo-700">{activeStudent.roll_number}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Full Name:</span>
                <span className="font-semibold text-slate-900">{activeStudent.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Email:</span>
                <span className="text-slate-700">{activeStudent.email}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Department:</span>
                <span className="text-slate-800">{activeStudent.department}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">GPA Score:</span>
                <span className="font-bold text-emerald-600">{activeStudent.gpa.toFixed(2)} / 10.00</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Status:</span>
                <span className="font-bold text-slate-800">{activeStudent.status}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Created At:</span>
                <span className="text-slate-600 text-[11px]">{activeStudent.created_at || 'Just now'}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setModalMode(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
