import React, { useState } from 'react';
import { 
  Shield, Users, Building2, CheckCircle, XCircle, AlertCircle, 
  Search, BarChart3, FileText, MoreVertical, Terminal, Clock
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'VERIFICATION' | 'USERS' | 'LOGS'>('VERIFICATION');

  const pendingBusinesses = [
    { id: 1, name: 'Ocean Blue Resort', type: 'Hotel', owner: 'Alice Smith', submitted: '2 hours ago', status: 'Pending' },
    { id: 2, name: 'Green Tour Co.', type: 'Agency', owner: 'Bob Jones', submitted: '1 day ago', status: 'Pending' },
    { id: 3, name: 'Eco Eats Cafe', type: 'Restaurant', owner: 'Charlie Day', submitted: '2 days ago', status: 'Reviewing' },
  ];

  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Tourist', joined: 'Oct 2023', status: 'Active' },
    { id: 2, name: 'Sarah Connor', email: 'sarah@skynet.com', role: 'Business', joined: 'Nov 2023', status: 'Active' },
    { id: 3, name: 'Admin User', email: 'admin@ecovoyage.com', role: 'Admin', joined: 'Jan 2023', status: 'Active' },
    { id: 4, name: 'Suspicious Bot', email: 'bot@spam.com', role: 'Tourist', joined: 'Yesterday', status: 'Suspended' },
  ];

  const systemLogs = [
    { id: 1, time: '10:42:01 AM', level: 'INFO', msg: 'New user registration: user_8823' },
    { id: 2, time: '10:41:55 AM', level: 'WARN', msg: 'API Rate limit approaching for IP 192.168.1.1' },
    { id: 3, time: '10:40:12 AM', level: 'INFO', msg: 'Business verification submitted: biz_991' },
    { id: 4, time: '10:38:00 AM', level: 'ERROR', msg: 'Payment gateway timeout (retry successful)' },
    { id: 5, time: '10:35:22 AM', level: 'INFO', msg: 'System backup completed successfully' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-10">
              <div className="p-2 bg-indigo-500 rounded-lg"><Shield className="w-5 h-5" /></div>
              <span className="font-bold text-lg">Admin Panel</span>
          </div>
          
          <nav className="space-y-2 flex-1">
              <button 
                onClick={() => setActiveTab('VERIFICATION')}
                className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${activeTab === 'VERIFICATION' ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}
              >
                  <Building2 className="w-5 h-5" /> Verifications
                  <span className="ml-auto bg-red-500 text-xs px-2 py-0.5 rounded-full">3</span>
              </button>
              <button 
                 onClick={() => setActiveTab('USERS')}
                 className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${activeTab === 'USERS' ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}
              >
                  <Users className="w-5 h-5" /> User Mgmt
              </button>
              <button 
                 onClick={() => setActiveTab('LOGS')}
                 className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition ${activeTab === 'LOGS' ? 'bg-indigo-600' : 'hover:bg-slate-800'}`}
              >
                  <FileText className="w-5 h-5" /> System Logs
              </button>
          </nav>

          <div className="mt-auto p-4 bg-slate-800 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-mono text-slate-300">SYSTEM HEALTHY</span>
              </div>
              <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-green-500 w-[98%] h-full"></div>
              </div>
              <p className="text-xs text-slate-500 mt-2">Uptime: 99.99%</p>
          </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
          <header className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-slate-800">
                  {activeTab === 'VERIFICATION' && 'Business Verifications'}
                  {activeTab === 'USERS' && 'User Management'}
                  {activeTab === 'LOGS' && 'System Logs & Audits'}
              </h1>
              <div className="flex items-center gap-4">
                  <div className="relative">
                      <Search className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                      <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64" />
                  </div>
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                      A
                  </div>
              </div>
          </header>

          {activeTab === 'VERIFICATION' && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in">
                  <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                              <th className="px-6 py-4 text-sm font-bold text-slate-600">Business Name</th>
                              <th className="px-6 py-4 text-sm font-bold text-slate-600">Type</th>
                              <th className="px-6 py-4 text-sm font-bold text-slate-600">Owner</th>
                              <th className="px-6 py-4 text-sm font-bold text-slate-600">Submitted</th>
                              <th className="px-6 py-4 text-sm font-bold text-slate-600">Document</th>
                              <th className="px-6 py-4 text-sm font-bold text-slate-600">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                          {pendingBusinesses.map((biz) => (
                              <tr key={biz.id} className="hover:bg-slate-50 transition">
                                  <td className="px-6 py-4 font-medium text-slate-900">{biz.name}</td>
                                  <td className="px-6 py-4 text-slate-600">
                                      <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold">{biz.type}</span>
                                  </td>
                                  <td className="px-6 py-4 text-slate-600">{biz.owner}</td>
                                  <td className="px-6 py-4 text-slate-500 text-sm">{biz.submitted}</td>
                                  <td className="px-6 py-4">
                                      <button className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1">
                                          <FileText className="w-3 h-3" /> License.pdf
                                      </button>
                                  </td>
                                  <td className="px-6 py-4">
                                      <div className="flex gap-2">
                                          <button className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200" title="Approve">
                                              <CheckCircle className="w-5 h-5" />
                                          </button>
                                          <button className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200" title="Reject">
                                              <XCircle className="w-5 h-5" />
                                          </button>
                                      </div>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          )}

          {activeTab === 'USERS' && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in">
                  <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                              <th className="px-6 py-4 text-sm font-bold text-slate-600">User</th>
                              <th className="px-6 py-4 text-sm font-bold text-slate-600">Role</th>
                              <th className="px-6 py-4 text-sm font-bold text-slate-600">Joined</th>
                              <th className="px-6 py-4 text-sm font-bold text-slate-600">Status</th>
                              <th className="px-6 py-4 text-sm font-bold text-slate-600">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                          {mockUsers.map((user) => (
                              <tr key={user.id} className="hover:bg-slate-50 transition">
                                  <td className="px-6 py-4">
                                      <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                                              {user.name[0]}
                                          </div>
                                          <div>
                                              <div className="font-medium text-slate-900">{user.name}</div>
                                              <div className="text-xs text-slate-500">{user.email}</div>
                                          </div>
                                      </div>
                                  </td>
                                  <td className="px-6 py-4 text-slate-600">{user.role}</td>
                                  <td className="px-6 py-4 text-slate-600">{user.joined}</td>
                                  <td className="px-6 py-4">
                                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                          user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                      }`}>
                                          {user.status}
                                      </span>
                                  </td>
                                  <td className="px-6 py-4">
                                      <button className="text-slate-400 hover:text-slate-600">
                                          <MoreVertical className="w-5 h-5" />
                                      </button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          )}

          {activeTab === 'LOGS' && (
              <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-700 overflow-hidden font-mono text-sm p-4 animate-fade-in">
                  <div className="flex items-center gap-2 text-slate-400 border-b border-slate-800 pb-2 mb-2">
                      <Terminal className="w-4 h-4" /> System Output
                  </div>
                  <div className="space-y-2">
                      {systemLogs.map((log) => (
                          <div key={log.id} className="flex gap-4 hover:bg-slate-800/50 p-1 rounded">
                              <span className="text-slate-500 w-24 shrink-0">{log.time}</span>
                              <span className={`w-16 font-bold ${
                                  log.level === 'INFO' ? 'text-blue-400' : 
                                  log.level === 'WARN' ? 'text-yellow-400' : 
                                  'text-red-400'
                              }`}>{log.level}</span>
                              <span className="text-slate-300">{log.msg}</span>
                          </div>
                      ))}
                      <div className="animate-pulse text-teal-500 mt-2">_</div>
                  </div>
              </div>
          )}
      </div>
    </div>
  );
};
