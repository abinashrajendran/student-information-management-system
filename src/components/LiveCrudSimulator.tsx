import React, { useState } from 'react';
import { CrudRecord } from '../types';
import {
  Plus,
  Trash2,
  Edit2,
  Search,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Terminal,
  Server,
  ArrowUpDown,
} from 'lucide-react';

interface ApiLog {
  timestamp: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  status: number;
  payload?: any;
}

const INITIAL_RECORDS: CrudRecord[] = [
  {
    id: '1',
    title: 'Karthik Raja',
    category: 'Computer Science',
    status: 'Active',
    email: 'karthik@example.com',
    value: 8.75,
    createdAt: '2026-09-15',
  },
  {
    id: '2',
    title: 'Priya Sundaram',
    category: 'Information Tech',
    status: 'Active',
    email: 'priya@example.com',
    value: 9.12,
    createdAt: '2026-09-16',
  },
  {
    id: '3',
    title: 'Anand Kumar',
    category: 'Electronics',
    status: 'Pending',
    email: 'anand.k@example.com',
    value: 7.60,
    createdAt: '2026-09-17',
  },
];

export const LiveCrudSimulator: React.FC = () => {
  const [records, setRecords] = useState<CrudRecord[]>(INITIAL_RECORDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  // Form State for Create & Edit
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Computer Science',
    email: '',
    status: 'Active' as 'Active' | 'Pending' | 'Completed' | 'Inactive',
    value: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // API Call Inspection Logs
  const [logs, setLogs] = useState<ApiLog[]>([
    {
      timestamp: new Date().toLocaleTimeString(),
      method: 'GET',
      endpoint: '/api/records/',
      status: 200,
    },
  ]);

  const addLog = (method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, status: number, payload?: any) => {
    setLogs((prev) => [
      {
        timestamp: new Date().toLocaleTimeString(),
        method,
        endpoint,
        status,
        payload,
      },
      ...prev.slice(0, 7),
    ]);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Computer Science',
      email: '',
      status: 'Active',
      value: '',
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (rec: CrudRecord) => {
    setEditingId(rec.id);
    setFormData({
      title: rec.title,
      category: rec.category,
      email: rec.email || '',
      status: rec.status,
      value: rec.value !== undefined ? String(rec.value) : '',
    });
    setFormError(null);
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // SOP Section 9: Validation Requirements
    if (!formData.title.trim()) {
      setFormError('Validation Error: Name/Title field cannot be empty.');
      return;
    }

    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setFormError('Validation Error: Please enter a valid email format.');
        return;
      }
    }

    if (formData.value && (isNaN(Number(formData.value)) || Number(formData.value) < 0 || Number(formData.value) > 10)) {
      setFormError('Validation Error: Score/GPA must be a number between 0.0 and 10.0');
      return;
    }

    if (editingId) {
      // UPDATE Operation (PUT/PATCH /api/records/{id}/)
      setRecords((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? {
                ...r,
                title: formData.title.trim(),
                category: formData.category,
                email: formData.email.trim(),
                status: formData.status,
                value: formData.value ? parseFloat(formData.value) : undefined,
              }
            : r
        )
      );
      addLog('PUT', `/api/records/${editingId}/`, 200, formData);
      showToast(`Record #${editingId} updated successfully (HTTP 200 OK)`);
    } else {
      // CREATE Operation (POST /api/records/)
      const newId = String(Date.now()).slice(-4);
      const newRecord: CrudRecord = {
        id: newId,
        title: formData.title.trim(),
        category: formData.category,
        email: formData.email.trim(),
        status: formData.status,
        value: formData.value ? parseFloat(formData.value) : undefined,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setRecords((prev) => [newRecord, ...prev]);
      addLog('POST', '/api/records/', 201, newRecord);
      showToast(`New record #${newId} created successfully (HTTP 201 Created)`);
    }

    setIsFormOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    // Delete Confirmation
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setRecords((prev) => prev.filter((r) => r.id !== id));
      addLog('DELETE', `/api/records/${id}/`, 204);
      showToast(`Record #${id} deleted (HTTP 204 No Content)`);
    }
  };

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.email && r.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'All' || r.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Intro Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-bold">
              SOP Demonstration
            </span>
            <h2 className="text-base font-bold text-slate-900">
              Interactive Full-Stack CRUD Simulator
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Test and visualize Create (POST), Read (GET), Update (PUT), and Delete (DELETE) operations in real-time.
          </p>
        </div>

        <button
          id="btn-add-record-trigger"
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 justify-center"
        >
          <Plus className="w-4 h-4" /> Create New Record (POST)
        </button>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: CRUD UI */}
        <div className="lg:col-span-8 space-y-4">
          {/* Controls: Search & Category Filter */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                id="search-input"
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-500 whitespace-nowrap">Department:</label>
              <select
                id="filter-category-select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-hidden"
              >
                <option value="All">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Tech">Information Tech</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>
          </div>

          {/* Form Modal / Drawer */}
          {isFormOpen && (
            <div className="bg-white rounded-xl border-2 border-emerald-500 p-5 shadow-md animate-in fade-in">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  {editingId ? `Update Record #${editingId} (PUT)` : 'Create New Record (POST)'}
                </h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Cancel
                </button>
              </div>

              {formError && (
                <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="form-title"
                      type="text"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      placeholder="e.g. anand@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Department
                    </label>
                    <select
                      id="form-category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Information Tech">Information Tech</option>
                      <option value="Electronics">Electronics</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Status
                    </label>
                    <select
                      id="form-status"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value as any })
                      }
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Score / GPA (0-10)
                    </label>
                    <input
                      id="form-value"
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      placeholder="8.50"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    id="btn-submit-crud-form"
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
                  >
                    {editingId ? 'Update Record (PUT)' : 'Save Record (POST)'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Records Table (READ operation) */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
              <div className="text-xs font-bold text-slate-800">
                READ: Active Records List ({filteredRecords.length})
              </div>
              <button
                onClick={() => {
                  addLog('GET', '/api/records/', 200);
                  showToast('Refetched records from simulated API (GET 200 OK)');
                }}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Refresh
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <th className="py-2.5 px-3">ID</th>
                    <th className="py-2.5 px-3">Name</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3">Department</th>
                    <th className="py-2.5 px-3">GPA</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredRecords.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-slate-400">
                        No records found. Click &quot;Create New Record&quot; to add one.
                      </td>
                    </tr>
                  ) : (
                    filteredRecords.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3 font-mono text-slate-500">#{rec.id}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-900">{rec.title}</td>
                        <td className="py-2.5 px-3 text-slate-600">{rec.email || '-'}</td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">
                            {rec.category}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-mono font-medium text-indigo-600">
                          {rec.value !== undefined ? rec.value.toFixed(2) : '-'}
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                              rec.status === 'Active'
                                ? 'bg-emerald-100 text-emerald-800'
                                : rec.status === 'Pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {rec.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right space-x-1">
                          <button
                            id={`btn-edit-rec-${rec.id}`}
                            onClick={() => handleOpenEdit(rec)}
                            title="Edit Record (PUT)"
                            className="p-1 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            id={`btn-delete-rec-${rec.id}`}
                            onClick={() => handleDelete(rec.id, rec.title)}
                            title="Delete Record (DELETE)"
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
          </div>
        </div>

        {/* Right 4 cols: REST API Inspector & SOP 7.6 Reference */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900 text-slate-200 rounded-xl p-4 border border-slate-800 shadow-xs">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Live REST API Activity Log
              </h4>
            </div>
            <div className="space-y-2 font-mono text-[11px]">
              {logs.map((log, i) => (
                <div
                  key={i}
                  className="p-2 rounded bg-slate-950/80 border border-slate-800/80 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        log.method === 'GET'
                          ? 'bg-blue-500/20 text-blue-400'
                          : log.method === 'POST'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : log.method === 'PUT'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {log.method}
                    </span>
                    <span className="text-slate-300 truncate max-w-[130px]">{log.endpoint}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold ${
                        log.status < 300 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {log.status}
                    </span>
                    <span className="text-slate-500 text-[9px]">{log.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SOP 7.6 REST API Mapping Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100">
              <Server className="w-4 h-4 text-indigo-600" />
              <h4 className="text-xs font-bold text-slate-900">SOP 7.6 REST Endpoint Map</h4>
            </div>
            <div className="space-y-1.5 text-[11px] font-mono">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-emerald-700 font-bold">POST /api/items/</span>
                <span className="text-slate-500">201 Created</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-blue-700 font-bold">GET /api/items/</span>
                <span className="text-slate-500">200 (Array)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-blue-700 font-bold">GET /api/items/:id/</span>
                <span className="text-slate-500">200 (Single)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-amber-700 font-bold">PUT /api/items/:id/</span>
                <span className="text-slate-500">200 (Updated)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-rose-700 font-bold">DELETE /api/items/:id/</span>
                <span className="text-slate-500">204 / 200</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
