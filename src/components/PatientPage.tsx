import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Download, 
  Share2, 
  FileText, 
  Calendar, 
  User, 
  Hospital,
  Eye,
  Search,
  Clock,
  Phone,
  IdCard
} from 'lucide-react@0.487.0';
import { ImageWithFallback } from './design/ImageWithFallback';

interface MedicalRecord {
  id: string;
  mrNo: string;
  irsNo: string;
  date: string;
  type: string;
  hospital: string;
  doctor: string;
  status: 'completed' | 'pending' | 'reviewed';
  reportUrl?: string;
  imageUrl?: string;
  diagnosis?: string;
  findings?: string;
}

export function PatientPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock patient data with extended info
  const patientInfo = {
    name: "Ahmed Khan",
    id: "PT-2024-001",
    mrNo: "MR-2024-001",
    irsNo: "IRS-789456",
    dob: "January 15, 1985",
    bloodType: "O+",
    allergies: "None",
    contact: "+92-333-1234567"
  };

  const medicalRecords: MedicalRecord[] = [
    {
      id: "XR-001",
      mrNo: "MR-2024-001",
      irsNo: "IRS-789456",
      date: "2024-11-06",
      type: "Chest X-Ray",
      hospital: "Indus Hospital Karachi",
      doctor: "Dr. Ayesha Malik",
      status: "completed",
      reportUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1584555684040-bad07f46a21f?w=400",
      diagnosis: "No acute findings",
      findings: "Clear lung fields, normal cardiac silhouette"
    },
    {
      id: "XR-002",
      mrNo: "MR-2024-001",
      irsNo: "IRS-789456",
      date: "2024-10-25",
      type: "Knee X-Ray",
      hospital: "Indus Hospital Karachi",
      doctor: "Dr. Hassan Raza",
      status: "reviewed",
      reportUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1584555684040-bad07f46a21f?w=400",
      diagnosis: "Mild osteoarthritis",
      findings: "Minimal joint space narrowing"
    },
    {
      id: "XR-003",
      mrNo: "MR-2024-001",
      irsNo: "IRS-789456",
      date: "2024-10-20",
      type: "Spine X-Ray",
      hospital: "Indus Hospital Karachi",
      doctor: "Dr. Fatima Siddiqui",
      status: "completed",
      reportUrl: "#",
      imageUrl: "https://images.unsplash.com/photo-1584555684040-bad07f46a21f?w=400",
      diagnosis: "Normal alignment",
      findings: "No fracture or dislocation detected"
    }
  ];

  const filteredRecords = medicalRecords.filter(record => 
    record.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.diagnosis?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950 py-8 px-4">
      {/* Background with overlay */}
      <div className="fixed inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1633488781325-d36e6818d0c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aCUyMGFzaWFuJTIwcGF0aWVudCUyMGNvbnN1bHRhdGlvbnxlbnwxfHx8fDE3NjI0NTYzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Patient Portal Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/90 to-white/95 dark:from-gray-950/95 dark:via-blue-950/90 dark:to-gray-950/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Patient Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl mb-2">Patient Portal</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Access your medical records and X-ray reports
              </p>
            </div>
          </div>
        </div>

        {/* Patient Info Card - Expanded */}
        <Card className="mb-6 border-2 border-blue-100 dark:border-blue-900 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950 dark:to-gray-900">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Patient Name
                </p>
                <p className="font-semibold">{patientInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <IdCard className="w-4 h-4" />
                  Patient ID
                </p>
                <p className="font-semibold">{patientInfo.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <IdCard className="w-4 h-4" />
                  MR Number
                </p>
                <p className="font-semibold text-blue-600 dark:text-blue-400">{patientInfo.mrNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <IdCard className="w-4 h-4" />
                  IRS Number
                </p>
                <p className="font-semibold text-purple-600 dark:text-purple-400">{patientInfo.irsNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date of Birth
                </p>
                <p className="font-semibold">{patientInfo.dob}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contact
                </p>
                <p className="font-semibold">{patientInfo.contact}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Blood Type</p>
                <p className="font-semibold">{patientInfo.bloodType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Allergies</p>
                <p className="font-semibold">{patientInfo.allergies}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Records Section */}
        <Tabs defaultValue="records" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="records">My X-Ray Records</TabsTrigger>
            <TabsTrigger value="history">Medical History</TabsTrigger>
          </TabsList>

          <TabsContent value="records">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by type, hospital, doctor, or diagnosis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Records Table with DICOM Preview and Report Side by Side */}
            <Card className="border-2 border-gray-100 dark:border-gray-800">
              <CardHeader>
                <CardTitle>All X-Ray Records & Reports</CardTitle>
                <CardDescription>View your DICOM images alongside their medical reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredRecords.map((record) => (
                    <div 
                      key={record.id} 
                      className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {/* Record Header */}
                      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{record.type}</h3>
                            <Badge className={getStatusColor(record.status)}>
                              {record.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(record.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </span>
                            <span>ID: {record.id}</span>
                          </div>
                        </div>
                      </div>

                      {/* DICOM and Report Side by Side */}
                      <div className="grid md:grid-cols-2 gap-0">
                        {/* DICOM Image Section */}
                        <div className="p-4 bg-black/5 dark:bg-black/20 border-r border-gray-200 dark:border-gray-700">
                          <div className="mb-3">
                            <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">DICOM X-Ray Image</h4>
                            <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-500">
                              <span>MR: {record.mrNo}</span>
                              <span>•</span>
                              <span>IRS: {record.irsNo}</span>
                            </div>
                          </div>
                          <div className="relative bg-black rounded-lg overflow-hidden aspect-square">
                            <ImageWithFallback
                              src={record.imageUrl || ''}
                              alt={`${record.type} scan`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-3"
                            onClick={() => alert('Viewing full DICOM...')}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Full Image
                          </Button>
                        </div>

                        {/* Report Section */}
                        <div className="p-4 space-y-4">
                          <div>
                            <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">Medical Report</h4>
                            
                            <div className="space-y-3">
                              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Hospital</div>
                                <div className="flex items-center gap-2">
                                  <Hospital className="w-4 h-4 text-blue-600" />
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {record.hospital}
                                  </span>
                                </div>
                              </div>

                              <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Reporting Doctor</div>
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-purple-600" />
                                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {record.doctor}
                                  </span>
                                </div>
                              </div>

                              <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Diagnosis</div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {record.diagnosis}
                                </div>
                              </div>

                              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Findings</div>
                                <div className="text-sm text-gray-700 dark:text-gray-300">
                                  {record.findings}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => alert('Viewing full report...')}
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              Full Report
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                              onClick={() => alert('Downloading...')}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {filteredRecords.length === 0 && (
              <Card className="p-12 text-center">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl mb-2">No records found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchQuery ? 'Try adjusting your search criteria' : 'No medical records available yet'}
                </p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Medical History Timeline
                </CardTitle>
                <CardDescription>
                  Complete timeline of your medical consultations and treatments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medicalRecords.map((record, index) => (
                    <div key={record.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{record.type}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {record.hospital} • {record.doctor}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {new Date(record.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Manage your medical data and sharing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => alert('Export all records...')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export All Records
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => alert('Share with another hospital...')}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share with Another Hospital
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => alert('Request second opinion...')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Request Second Opinion
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}