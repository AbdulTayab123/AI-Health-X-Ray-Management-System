import { Activity, FileText, TrendingUp, Users, Scan, CheckCircle2, Clock, AlertCircle, Upload, User, Phone, Calendar } from 'lucide-react';
import { ImageWithFallback } from './design/ImageWithFallback';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import radiology1 from '../components/assets/radiology1.png';

export function RadiologistPage() {
  // Patient form state
  const [mrNo, setMrNo] = useState('');
  const [irsNo, setIrsNo] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientContact, setPatientContact] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const stats = [
    { icon: Scan, label: 'Scans Analyzed', value: '1,247', change: '+12%', color: 'blue' },
    { icon: CheckCircle2, label: 'Completed', value: '1,198', change: '+8%', color: 'green' },
    { icon: Clock, label: 'Pending Review', value: '49', change: '-5%', color: 'yellow' },
    { icon: Activity, label: 'Avg. Accuracy', value: '96.5%', change: '+2%', color: 'purple' },
  ];

  const features = [
    {
      title: 'Specialized Analysis',
      description: 'Advanced tools for chest, bone, dental, and spine X-ray analysis with AI-assisted detection.',
      items: ['Chest X-Ray Analysis', 'Bone Fracture Detection', 'Dental Imaging', 'Spine Alignment'],
    },
    {
      title: 'Advanced Filters',
      description: 'Professional-grade image enhancement tools for precise diagnosis.',
      items: ['Contrast Enhancement', 'Edge Detection', 'Noise Reduction', 'Multi-planar View'],
    },
    {
      title: 'Collaboration Tools',
      description: 'Work seamlessly with doctors and specialists for complex cases.',
      items: ['Real-time Annotations', 'Case Sharing', 'Second Opinion', 'Team Chat'],
    },
  ];

  const recentCases = [
    { id: 'RAD-001', patient: 'Sarah Williams', type: 'Chest X-Ray', priority: 'High', date: '2025-10-29 09:45' },
    { id: 'RAD-002', patient: 'Michael Chen', type: 'Bone Scan', priority: 'Medium', date: '2025-10-29 09:30' },
    { id: 'RAD-003', patient: 'Emily Davis', type: 'Spine X-Ray', priority: 'Low', date: '2025-10-29 09:15' },
    { id: 'RAD-004', patient: 'David Brown', type: 'Dental X-Ray', priority: 'Medium', date: '2025-10-29 09:00' },
  ];

  // Recent uploads with patient data
  const [recentUploads, setRecentUploads] = useState([
    {
      id: 'UP-001',
      mrNo: 'MR-2024-001',
      irsNo: 'IRS-789456',
      patientName: 'Ahmed Khan',
      contact: '+92-333-1234567',
      timestamp: '2025-11-06 14:30:25',
      status: 'Uploaded',
      dicomPreview: 'https://images.unsplash.com/photo-1584555684040-bad07f46a21f?w=200',
    },
    {
      id: 'UP-002',
      mrNo: 'MR-2024-002',
      irsNo: 'IRS-789457',
      patientName: 'Fatima Siddiqui',
      contact: '+92-321-9876543',
      timestamp: '2025-11-06 13:45:10',
      status: 'Sent to Nurse',
      dicomPreview: 'https://images.unsplash.com/photo-1584555684040-bad07f46a21f?w=200',
    },
    {
      id: 'UP-003',
      mrNo: 'MR-2024-003',
      irsNo: 'IRS-789458',
      patientName: 'Hassan Ali',
      contact: '+92-300-5551234',
      timestamp: '2025-11-06 13:15:42',
      status: 'Processing',
      dicomPreview: 'https://images.unsplash.com/photo-1584555684040-bad07f46a21f?w=200',
    },
  ]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      toast.success('DICOM file selected');
    }
  };

  const handleUpload = () => {
    if (!mrNo || !irsNo || !patientName || !patientContact) {
      toast.error('Please fill all patient information fields');
      return;
    }
    if (!selectedFile) {
      toast.error('Please select a DICOM file');
      return;
    }

    const newUpload = {
      id: `UP-${String(recentUploads.length + 1).padStart(3, '0')}`,
      mrNo,
      irsNo,
      patientName,
      contact: patientContact,
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }),
      status: 'Uploaded',
      dicomPreview: 'https://images.unsplash.com/photo-1584555684040-bad07f46a21f?w=200',
    };

    setRecentUploads([newUpload, ...recentUploads.slice(0, 9)]);
    
    // Reset form
    setMrNo('');
    setIrsNo('');
    setPatientName('');
    setPatientContact('');
    setSelectedFile(null);
    
    toast.success('DICOM uploaded successfully!');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <ImageWithFallback
          src={radiology1}
          alt="Radiologist Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-purple-50/90 to-white/95 dark:from-gray-950/95 dark:via-purple-950/90 dark:to-gray-950/95" />
      </div>

      <div className="relative z-10 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 mb-4">
              <Scan className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-300">
                Radiologist Module
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Radiology Workspace
            </h1>
            <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400">
              Professional tools for specialized X-ray analysis and diagnosis
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600',
                green: 'from-green-500 to-green-600',
                yellow: 'from-yellow-500 to-yellow-600',
                purple: 'from-purple-500 to-purple-600',
              };

              return (
                <div
                  key={index}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 relative overflow-hidden group hover:shadow-2xl transition-all"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colorClasses[stat.color as keyof typeof colorClasses]}`} />
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br ${colorClasses[stat.color as keyof typeof colorClasses]} flex items-center justify-center`}>
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400">
                      {stat.change}
                    </span>
                  </div>

                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* DICOM Upload Section with Patient Form */}
          <div className="mb-8 sm:mb-12">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Upload DICOM X-Ray
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Enter patient information and upload DICOM file
                </p>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* Patient Information Form */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-base text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <User className="h-5 w-5 text-purple-600" />
                      Patient Information
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="mrNo" className="text-sm font-medium">
                            MR Number *
                          </Label>
                          <Input
                            id="mrNo"
                            placeholder="MR-2024-XXX"
                            value={mrNo}
                            onChange={(e) => setMrNo(e.target.value)}
                            className="bg-white dark:bg-gray-900"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="irsNo" className="text-sm font-medium">
                            IRS Number *
                          </Label>
                          <Input
                            id="irsNo"
                            placeholder="IRS-XXXXXX"
                            value={irsNo}
                            onChange={(e) => setIrsNo(e.target.value)}
                            className="bg-white dark:bg-gray-900"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="patientName" className="text-sm font-medium">
                          Patient Name *
                        </Label>
                        <Input
                          id="patientName"
                          placeholder="Full Name"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          className="bg-white dark:bg-gray-900"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="patientContact" className="text-sm font-medium">
                          Contact Number (WhatsApp) *
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="patientContact"
                            placeholder="+1-XXX-XXXX"
                            value={patientContact}
                            onChange={(e) => setPatientContact(e.target.value)}
                            className="pl-10 bg-white dark:bg-gray-900"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Upload Timestamp
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            value={new Date().toLocaleString()}
                            disabled
                            className="pl-10 bg-gray-50 dark:bg-gray-800"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DICOM Uploader */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-base text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Upload className="h-5 w-5 text-blue-600" />
                      DICOM File Upload
                    </h3>

                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:border-purple-500 dark:hover:border-purple-500 transition-colors bg-gray-50 dark:bg-gray-800/50">
                      <input
                        type="file"
                        id="dicom-upload"
                        accept=".dcm,.dicom"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      <label
                        htmlFor="dicom-upload"
                        className="cursor-pointer flex flex-col items-center gap-3"
                      >
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                          <Upload className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                            {selectedFile ? selectedFile.name : 'Click to upload DICOM'}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            .dcm or .dicom files only
                          </p>
                        </div>
                      </label>
                    </div>

                    {selectedFile && (
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                          <CheckCircle2 className="h-5 w-5" />
                          <span className="text-sm font-medium">File ready for upload</span>
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleUpload}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white gap-2"
                      size="lg"
                    >
                      <Upload className="h-5 w-5" />
                      Upload DICOM & Send to Nurse
                    </Button>

                    <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                      <p>• DICOM will be sent to nursing staff for routing</p>
                      <p>• Nurse will forward to senior doctor for analysis</p>
                      <p>• You'll be notified once report is signed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent 10 DICOM Uploads */}
          <div className="mb-8 sm:mb-12">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-green-50 to-purple-50 dark:from-green-950/20 dark:to-purple-950/20">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  Recent DICOM Uploads (Last 10)
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Successfully uploaded and processing on the system
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Upload ID
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        MR No.
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        IRS No.
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Patient Name
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Preview
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {recentUploads.map((upload) => (
                      <tr
                        key={upload.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className="text-xs sm:text-sm font-medium text-purple-600 dark:text-purple-400">
                            {upload.id}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                            {upload.mrNo}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                            {upload.irsNo}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                            {upload.patientName}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                            {upload.contact}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            {upload.timestamp}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              upload.status === 'Uploaded'
                                ? 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-300'
                                : upload.status === 'Sent to Nurse'
                                ? 'bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300'
                                : 'bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-300'
                            }`}
                          >
                            {upload.status}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="w-12 h-12 rounded bg-gray-100 dark:bg-gray-800 overflow-hidden">
                            <ImageWithFallback
                              src={upload.dicomPreview}
                              alt="DICOM preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Image Section */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="aspect-video relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758206523830-a5b8afb372a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWRpb2xvZ2lzdCUyMG1lZGljYWwlMjBzY2FufGVufDF8fHx8MTc2MTgzMTI2MXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Radiologist at work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Specialized Medical Imaging</h3>
                  <p className="text-sm sm:text-base text-gray-200">Advanced analysis for accurate diagnosis</p>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-4 sm:space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 hover:shadow-2xl transition-all"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                    {feature.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {feature.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center gap-2 text-xs sm:text-sm"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Cases */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                Recent Cases
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Case ID
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date & Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {recentCases.map((caseItem) => (
                    <tr
                      key={caseItem.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                    >
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                          {caseItem.id}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          {caseItem.patient}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          {caseItem.type}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            caseItem.priority === 'High'
                              ? 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                              : caseItem.priority === 'Medium'
                              ? 'bg-yellow-100 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-300'
                              : 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-300'
                          }`}
                        >
                          {caseItem.priority}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          {caseItem.date}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}