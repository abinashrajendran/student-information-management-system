import React, { useState } from 'react';
import {
  Send,
  Terminal,
  Play,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Code,
  Layers,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

interface TestScenario {
  id: string;
  name: string;
  sopTestGroup: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  body?: string;
  expectedStatus: number;
  description: string;
}

const TEST_SCENARIOS: TestScenario[] = [
  {
    id: 'test-1',
    name: '1. Read All Students (GET 200 OK)',
    sopTestGroup: 'Read Operations (SOP 7.6 & 10)',
    method: 'GET',
    endpoint: '/api/students/',
    expectedStatus: 200,
    description: 'Fetch complete list of student records from the database.',
  },
  {
    id: 'test-2',
    name: '2. Create Valid Student (POST 201 Created)',
    sopTestGroup: 'Create Operations (SOP 7.6 & 10)',
    method: 'POST',
    endpoint: '/api/students/',
    body: JSON.stringify(
      {
        roll_number: `CS2026${Math.floor(Math.random() * 80) + 20}`,
        name: 'Suresh Raina',
        email: `suresh.test${Math.floor(Math.random() * 900)}@example.com`,
        department: 'Computer Science',
        gpa: 8.9,
        status: 'Active',
      },
      null,
      2
    ),
    expectedStatus: 201,
    description: 'Insert a valid student record; verifies database insertion and 201 status.',
  },
  {
    id: 'test-3',
    name: '3. Duplicate Roll Number Test (POST 400 Bad Request)',
    sopTestGroup: 'Validation & Constraints (SOP 9 & 10)',
    method: 'POST',
    endpoint: '/api/students/',
    body: JSON.stringify(
      {
        roll_number: '922525148002', // Already belongs to Abinash R
        name: 'Imposter Student',
        email: 'imposter@example.com',
        department: 'Computer Science',
        gpa: 7.5,
        status: 'Active',
      },
      null,
      2
    ),
    expectedStatus: 400,
    description: 'Attempts to insert already existing roll number 922525148002; server should reject with 400 Bad Request.',
  },
  {
    id: 'test-4',
    name: '4. Out of Range GPA Test (POST 400 Bad Request)',
    sopTestGroup: 'Validation & Constraints (SOP 9 & 10)',
    method: 'POST',
    endpoint: '/api/students/',
    body: JSON.stringify(
      {
        roll_number: `IT2026${Math.floor(Math.random() * 80) + 20}`,
        name: 'Invalid GPA Student',
        email: 'invalid.gpa@example.com',
        department: 'Information Technology',
        gpa: 15.5, // Exceeds 10.0 max
        status: 'Active',
      },
      null,
      2
    ),
    expectedStatus: 400,
    description: 'Attempts to insert GPA 15.5 (limit 0.0 - 10.0); server should reject with validation error.',
  },
  {
    id: 'test-5',
    name: '5. Read Single Student by ID (GET 200 OK)',
    sopTestGroup: 'Read Operations (SOP 7.6 & 10)',
    method: 'GET',
    endpoint: '/api/students/1/',
    expectedStatus: 200,
    description: 'Fetches single record with ID #1.',
  },
  {
    id: 'test-6',
    name: '6. Read Non-existent ID (GET 404 Not Found)',
    sopTestGroup: 'Exception Handling (SOP 7.5 & 10)',
    method: 'GET',
    endpoint: '/api/students/9999/',
    expectedStatus: 404,
    description: 'Fetches non-existent ID #9999; tests proper 404 Not Found error handling.',
  },
  {
    id: 'test-7',
    name: '7. Update Student Details (PUT 200 OK)',
    sopTestGroup: 'Update Operations (SOP 7.6 & 10)',
    method: 'PUT',
    endpoint: '/api/students/1/',
    body: JSON.stringify(
      {
        roll_number: '922525148002',
        name: 'Abinash R (Updated)',
        email: 'abinash.r@example.com',
        department: 'CSE (AI & ML)',
        gpa: 9.25,
        status: 'Active',
      },
      null,
      2
    ),
    expectedStatus: 200,
    description: 'Modifies existing student #1 GPA and name; returns updated object.',
  },
];

export const PostmanTester: React.FC = () => {
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [endpoint, setEndpoint] = useState('/api/students/');
  const [requestBody, setRequestBody] = useState('');
  const [loading, setLoading] = useState(false);

  // Response details
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseStatusText, setResponseStatusText] = useState<string>('');
  const [responseHeaders, setResponseHeaders] = useState<Record<string, string>>({});
  const [responseBody, setResponseBody] = useState<string>('');
  const [latencyMs, setLatencyMs] = useState<number | null>(null);

  const handleRunRequest = async (
    reqMethod = method,
    reqEndpoint = endpoint,
    reqBody = requestBody
  ) => {
    setLoading(true);
    const start = performance.now();

    try {
      const options: RequestInit = {
        method: reqMethod,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if ((reqMethod === 'POST' || reqMethod === 'PUT') && reqBody.trim()) {
        options.body = reqBody.trim();
      }

      const res = await fetch(reqEndpoint, options);
      const elapsed = Math.round(performance.now() - start);
      setLatencyMs(elapsed);
      setResponseStatus(res.status);
      setResponseStatusText(res.statusText);

      // Collect headers
      const hdrs: Record<string, string> = {};
      res.headers.forEach((val, key) => {
        hdrs[key] = val;
      });
      setResponseHeaders(hdrs);

      const text = await res.text();
      try {
        const parsed = JSON.parse(text);
        setResponseBody(JSON.stringify(parsed, null, 2));
      } catch {
        setResponseBody(text);
      }
    } catch (err: any) {
      setLatencyMs(Math.round(performance.now() - start));
      setResponseStatus(0);
      setResponseStatusText('Network Error');
      setResponseBody(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleApplyScenario = (sc: TestScenario) => {
    setMethod(sc.method);
    setEndpoint(sc.endpoint);
    setRequestBody(sc.body || '');
    handleRunRequest(sc.method, sc.endpoint, sc.body || '');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold font-mono">
            API-CONSOLE
          </span>
          <h2 className="text-base font-bold text-slate-900">
            REST API Testing Console &amp; Endpoint Inspector
          </h2>
        </div>
        <p className="text-xs text-slate-600">
          Execute and inspect live HTTP requests against the backend server. Demonstrates HTTP methods, payload serialization, and status code assertions (200 OK, 201 Created, 400 Bad Request, 404 Not Found).
        </p>
      </div>

      {/* Preset Test Scenarios */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-1.5">
          <Play className="w-4 h-4 text-emerald-600" />
          Pre-Configured SOP Test Cases (1-Click Run)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {TEST_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleApplyScenario(sc)}
              className="text-left p-3 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all text-xs flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`px-1.5 py-0.5 rounded font-mono font-bold text-[10px] ${
                      sc.method === 'GET'
                        ? 'bg-blue-100 text-blue-800'
                        : sc.method === 'POST'
                        ? 'bg-emerald-100 text-emerald-800'
                        : sc.method === 'PUT'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {sc.method}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Expect: {sc.expectedStatus}
                  </span>
                </div>
                <h4 className="font-semibold text-slate-900 group-hover:text-emerald-950 mb-1">
                  {sc.name}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">{sc.description}</p>
              </div>
              <div className="mt-2 text-[10px] font-mono text-emerald-700 font-medium">
                Run Test →
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Workbench Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Request Builder (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-slate-700" />
              Request Builder
            </h3>

            {/* Method & URL input */}
            <div className="flex gap-2 mb-3">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as any)}
                className="text-xs font-mono font-bold py-2 px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:outline-hidden"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>

              <input
                type="text"
                value={endpoint}
                onChange={(e) => setEndpoint(e.target.value)}
                className="flex-1 text-xs font-mono px-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />

              <button
                onClick={() => handleRunRequest()}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs disabled:opacity-50 flex items-center gap-1.5 shrink-0"
              >
                <Send className="w-3.5 h-3.5" /> Send
              </button>
            </div>

            {/* Request Body Editor */}
            {(method === 'POST' || method === 'PUT') && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Request Payload (JSON Body):
                </label>
                <textarea
                  rows={8}
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  placeholder='{\n  "roll_number": "CS202650",\n  "name": "Sample Student",\n  "email": "sample@example.com",\n  "department": "Computer Science",\n  "gpa": 8.5\n}'
                  className="w-full text-xs font-mono p-3 rounded-lg border border-slate-200 bg-slate-900 text-emerald-300 focus:outline-hidden leading-relaxed"
                />
              </div>
            )}
          </div>
        </div>

        {/* Response Viewer (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 text-slate-200 rounded-xl border border-slate-800 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  HTTP Response
                </span>
              </div>

              {responseStatus !== null && (
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                      responseStatus >= 200 && responseStatus < 300
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    }`}
                  >
                    STATUS: {responseStatus} {responseStatusText}
                  </span>
                  {latencyMs !== null && (
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {latencyMs}ms
                    </span>
                  )}
                </div>
              )}
            </div>

            {loading ? (
              <div className="py-20 text-center text-slate-500 font-mono text-xs">
                Sending HTTP request to backend...
              </div>
            ) : responseBody ? (
              <pre className="text-xs font-mono bg-slate-950 p-3.5 rounded-lg overflow-x-auto text-emerald-300 border border-slate-800 max-h-[360px] overflow-y-auto leading-relaxed">
                <code>{responseBody}</code>
              </pre>
            ) : (
              <div className="py-20 text-center text-slate-500 font-mono text-xs">
                Click &quot;Send&quot; or pick a preset scenario to view response.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
