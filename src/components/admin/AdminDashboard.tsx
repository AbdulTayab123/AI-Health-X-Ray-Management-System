import { useState } from 'react';
import { ArrowLeft, FileText, UserPlus, Database, Shield, Activity, Eye, Search, Download, Send, CheckCircle2, XCircle, Lock, Server, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../design/ImageWithFallback';

interface AdminDashboardProps {
  onBackToMain: () => void;
}

export function AdminDashboard({ onBackToMain }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'logs' | 'id-generation' | 'patient-access' | 'database'>('logs');
  const [searchQuery, setSearchQuery] = useState('');
  const [newDoctorEmail, setNewDoctorEmail] = useState('');
  const [newDoctorRole, setNewDoctorRole] = useState('doctor');
  const [selectedPatient, setSelectedPatient] = useState('');
  
  // Database settings state
  const [dbSettings, setDbSettings] = useState({
    username: 'postgres',
    password: '••••••••',
    port: '5432',
    host: 'localhost',
    database: 'xrayiq_db'
  });

  // Mock data - Pakistani names
  const logs = [
    { id: 1, timestamp: '2025-11-07 14:30:22', user: 'Dr. Ayesha Malik', action: 'Viewed DICOM image', module: 'Doctor Dashboard', ip: '192.168.1.10' },
    { id: 2, timestamp: '2025-11-07 14:28:15', user: 'Nurse Fatima', action: 'Downloaded report', module: 'Nursing Module', ip: '192.168.1.25' },
    { id: 3, timestamp: '2025-11-07 14:25:03', user: 'Dr. Hassan Raza', action: 'Generated AI report', module: 'Doctor Dashboard', ip: '192.168.1.12' },
    { id: 4, timestamp: '2025-11-07 14:20:45', user: 'Radiologist Dr. Hina', action: 'Uploaded X-Ray scan', module: 'Radiologist Module', ip: '192.168.1.18' },
    { id: 5, timestamp: '2025-11-07 14:15:30', user: 'Admin User', action: 'Generated access code', module: 'Admin Panel', ip: '192.168.1.5' },
    { id: 6, timestamp: '2025-11-07 14:10:12', user: 'Dr. Fatima Siddiqui', action: 'Signed report', module: 'Doctor Dashboard', ip: '192.168.1.10' },
  ];

  const patients = [
    { id: 'PT-001', name: 'Ahmed Khan', dicomId: 'DICOM-2025-001', status: 'Allowed', uploadDate: '2025-11-07' },
    { id: 'PT-002', name: 'Fatima Siddiqui', dicomId: 'DICOM-2025-002', status: 'Allowed', uploadDate: '2025-11-07' },
    { id: 'PT-003', name: 'Hassan Ali', dicomId: 'DICOM-2025-003', status: 'Restricted', uploadDate: '2025-11-07' },
    { id: 'PT-004', name: 'Zainab Malik', dicomId: 'DICOM-2025-004', status: 'Allowed', uploadDate: '2025-11-06' },
  ];

  const handleGenerateAccessCode = () => {
    if (!newDoctorEmail) {
      toast.error('Please enter an email address');
      return;
    }
    
    const code = `IH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    toast.success(`Access code generated: ${code}`);
    setNewDoctorEmail('');
  };

  const handleGrantAccess = () => {
    if (!selectedPatient) {
      toast.error('Please select a patient');
      return;
    }
    toast.success('Patient access granted');
  };

  const handleUpdateDatabase = () => {
    toast.success('Database settings updated successfully');
  };

  const filteredLogs = logs.filter(log =>
    log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.module.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1735385102811-199278409ee2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1cyUyMGhvc3BpdGFsJTIwa2FyYWNoaSUyMHN0YWZmfGVufDF8fHx8MTc2MjUyNDk0M3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Admin Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-red-50/90 to-white/95 dark:from-gray-950/95 dark:via-red-950/90 dark:to-gray-950/95" />
      </div>

      <div className="relative z-10">
        {/* Admin Header */}
        <div className="bg-gradient-to-r from-red-600/90 via-red-500/90 to-red-600/90 backdrop-blur-xl border-b border-white/10 text-white py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={onBackToMain}
                className="text-white hover:bg-white/10 gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Main
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-4">
                  <Lock className="h-4 w-4 text-yellow-300" />
                  <span className="text-xs sm:text-sm font-medium">
                    Secure Admin Access
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-sm sm:text-base text-red-100">
                  Manage system logs, user access, and database configurations
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="h-5 w-5 text-green-300" />
                    <span className="text-xs text-red-100">System Status</span>
                  </div>
                  <p className="font-bold text-lg">Operational</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-5 w-5 text-blue-300" />
                    <span className="text-xs text-red-100">Active Users</span>
                  </div>
                  <p className="font-bold text-lg">147</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('logs')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all border-b-2 ${
                  activeTab === 'logs'
                    ? 'border-red-600 text-red-600 dark:border-red-500 dark:text-red-500'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500'
                }`}
              >
                <FileText className="h-5 w-5" />
                System Logs
              </button>
              <button
                onClick={() => setActiveTab('id-generation')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all border-b-2 ${
                  activeTab === 'id-generation'
                    ? 'border-red-600 text-red-600 dark:border-red-500 dark:text-red-500'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500'
                }`}
              >
                <UserPlus className="h-5 w-5" />
                ID Generation
              </button>
              <button
                onClick={() => setActiveTab('patient-access')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all border-b-2 ${
                  activeTab === 'patient-access'
                    ? 'border-red-600 text-red-600 dark:border-red-500 dark:text-red-500'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500'
                }`}
              >
                <Shield className="h-5 w-5" />
                Patient Access
              </button>
              <button
                onClick={() => setActiveTab('database')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all border-b-2 ${
                  activeTab === 'database'
                    ? 'border-red-600 text-red-600 dark:border-red-500 dark:text-red-500'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500'
                }`}
              >
                <Database className="h-5 w-5" />
                Database Settings
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* System Logs Tab */}
          {activeTab === 'logs' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  System Activity Logs
                </h2>
                <div className="flex gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search logs..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                    />
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-red-50 dark:bg-red-950/20 border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Action
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Module
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          IP Address
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {filteredLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                            {log.timestamp}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {log.user}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                            {log.action}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                            {log.module}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-500">
                            {log.ip}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ID Generation Tab */}
          {activeTab === 'id-generation' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Generate Access Codes
              </h2>

              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="doctor@indushospital.com"
                      value={newDoctorEmail}
                      onChange={(e) => setNewDoctorEmail(e.target.value)}
                      className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Role
                    </label>
                    <select
                      value={newDoctorRole}
                      onChange={(e) => setNewDoctorRole(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white"
                    >
                      <option value="doctor">Doctor</option>
                      <option value="radiologist">Radiologist</option>
                      <option value="nurse">Nurse</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <Button
                    onClick={handleGenerateAccessCode}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Generate & Send Access Code
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Patient Access Tab */}
          {activeTab === 'patient-access' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Patient Access Control
              </h2>

              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-red-50 dark:bg-red-950/20 border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Patient ID
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Patient Name
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          DICOM ID
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Upload Date
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      {patients.map((patient) => (
                        <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {patient.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                            {patient.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                            {patient.dicomId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                            {patient.uploadDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {patient.status === 'Allowed' ? (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-300 text-xs font-medium">
                                <CheckCircle2 className="h-3 w-3" />
                                Allowed
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-300 text-xs font-medium">
                                <XCircle className="h-3 w-3" />
                                Restricted
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-600 text-red-600 hover:bg-red-50 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-950/20"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Database Settings Tab */}
          {activeTab === 'database' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Database Configuration
              </h2>

              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Database Host
                      </label>
                      <Input
                        value={dbSettings.host}
                        onChange={(e) => setDbSettings({ ...dbSettings, host: e.target.value })}
                        className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Port
                      </label>
                      <Input
                        value={dbSettings.port}
                        onChange={(e) => setDbSettings({ ...dbSettings, port: e.target.value })}
                        className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Database Name
                      </label>
                      <Input
                        value={dbSettings.database}
                        onChange={(e) => setDbSettings({ ...dbSettings, database: e.target.value })}
                        className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Username
                      </label>
                      <Input
                        value={dbSettings.username}
                        onChange={(e) => setDbSettings({ ...dbSettings, username: e.target.value })}
                        className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Password
                      </label>
                      <Input
                        type="password"
                        value={dbSettings.password}
                        onChange={(e) => setDbSettings({ ...dbSettings, password: e.target.value })}
                        className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleUpdateDatabase}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Server className="h-4 w-4 mr-2" />
                    Update Database Settings
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
