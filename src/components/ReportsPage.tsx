import { useState } from 'react';
import { FileText, Download, Eye, Search, Filter, Calendar, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';

export function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { icon: FileText, label: 'Total Reports', value: '1,247', color: 'blue' },
    { icon: CheckCircle2, label: 'Completed', value: '1,198', color: 'green' },
    { icon: Clock, label: 'Pending', value: '37', color: 'yellow' },
    { icon: AlertCircle, label: 'Urgent', value: '12', color: 'red' },
  ];

  const reports = [
    {
      id: 'RPT-2025-001',
      patient: 'Emma Thompson',
      doctor: 'Dr. Sarah Johnson',
      type: 'Chest X-Ray',
      diagnosis: 'Fractured Rib (6th)',
      date: '2025-10-29',
      time: '14:30',
      status: 'Completed',
      priority: 'Urgent',
    },
    {
      id: 'RPT-2025-002',
      patient: 'James Wilson',
      doctor: 'Dr. Michael Chen',
      type: 'Bone Scan',
      diagnosis: 'No fracture detected',
      date: '2025-10-29',
      time: '13:45',
      status: 'Completed',
      priority: 'Normal',
    },
    {
      id: 'RPT-2025-003',
      patient: 'Olivia Martinez',
      doctor: 'Dr. Emily Davis',
      type: 'Spine X-Ray',
      diagnosis: 'Minor hairline fracture L4',
      date: '2025-10-29',
      time: '12:20',
      status: 'Completed',
      priority: 'Moderate',
    },
    {
      id: 'RPT-2025-004',
      patient: 'David Brown',
      doctor: 'Dr. James Anderson',
      type: 'Dental X-Ray',
      diagnosis: 'Cavity detected (Molar 18)',
      date: '2025-10-29',
      time: '11:15',
      status: 'Completed',
      priority: 'Normal',
    },
    {
      id: 'RPT-2025-005',
      patient: 'Sophia Lee',
      doctor: 'Dr. Sarah Johnson',
      type: 'Chest X-Ray',
      diagnosis: 'Pneumonia indication',
      date: '2025-10-29',
      time: '10:00',
      status: 'Pending',
      priority: 'Urgent',
    },
    {
      id: 'RPT-2025-006',
      patient: 'Lucas Garcia',
      doctor: 'Dr. Michael Chen',
      type: 'Bone Scan',
      diagnosis: 'Wrist fracture (Radius)',
      date: '2025-10-28',
      time: '16:45',
      status: 'Completed',
      priority: 'Moderate',
    },
  ];

  const handleViewReport = (id: string) => {
    toast.success(`Opening report ${id}`);
  };

  const handleDownloadReport = (id: string) => {
    toast.success(`Downloading report ${id}`);
  };

  const filteredReports = reports.filter((report) =>
    report.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 mb-4">
            <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              Reports Module
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Medical Reports
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Access, search, and download all diagnostic reports
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600',
              green: 'from-green-500 to-green-600',
              yellow: 'from-yellow-500 to-yellow-600',
              red: 'from-red-500 to-red-600',
            };

            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colorClasses[stat.color as keyof typeof colorClasses]}`} />
                
                <div className="flex items-start justify-between mb-4">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses]} flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by patient name, report ID, or diagnosis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 gap-2">
                <Calendar className="h-4 w-4" />
                Date Range
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              All Reports ({filteredReports.length})
            </h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export All
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Report ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Diagnosis
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredReports.map((report) => (
                  <tr
                    key={report.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {report.id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {report.patient}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {report.doctor}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {report.diagnosis}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {report.date}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {report.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          report.priority === 'Urgent'
                            ? 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                            : report.priority === 'Moderate'
                            ? 'bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-300'
                            : 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-300'
                        }`}
                      >
                        {report.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          report.status === 'Completed'
                            ? 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-300'
                            : 'bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-300'
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewReport(report.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadReport(report.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
