import { useState } from 'react';
import { Send, FileText, AlertCircle, Clock, User, CheckCircle2, Activity, Eye, Download, ArrowRight, Sparkles, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './design/ImageWithFallback';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface DicomCase {
  id: string;
  mrNo: string;
  irsNo: string;
  patientName: string;
  contact: string;
  type: string;
  uploadedBy: string;
  uploadedAt: string;
  status: 'received' | 'sent-to-doctor' | 'analyzed' | 'ready-for-patient';
  priority: 'High' | 'Medium' | 'Low';
  dicomImage?: string;
  doctorReport?: {
    doctor: string;
    findings: string;
    diagnosis: string;
    aiConfidence: string;
    completedAt: string;
  };
}

export function NursingPage() {
  const [cases, setCases] = useState<DicomCase[]>([
    {
      id: 'XR-001',
      mrNo: 'MR-2024-001',
      irsNo: 'IRS-789456',
      patientName: 'Ahmed Khan',
      contact: '+92-333-1234567',
      type: 'Chest X-Ray',
      uploadedBy: 'Radiologist Dr. Hina',
      uploadedAt: '2025-11-06 14:30',
      status: 'received',
      priority: 'High',
      dicomImage: 'https://images.unsplash.com/photo-1584555684040-bad07f46a21f?w=400',
    },
    {
      id: 'XR-002',
      mrNo: 'MR-2024-002',
      irsNo: 'IRS-789457',
      patientName: 'Fatima Siddiqui',
      contact: '+92-321-9876543',
      type: 'Knee X-Ray',
      uploadedBy: 'Radiologist Dr. Hina',
      uploadedAt: '2025-11-06 13:45',
      status: 'sent-to-doctor',
      priority: 'Medium',
      dicomImage: 'https://images.unsplash.com/photo-1584555684040-bad07f46a21f?w=400',
    },
    {
      id: 'XR-003',
      mrNo: 'MR-2024-003',
      irsNo: 'IRS-789458',
      patientName: 'Hassan Ali',
      contact: '+92-300-5551234',
      type: 'Spine X-Ray',
      uploadedBy: 'Radiologist Dr. Hina',
      uploadedAt: '2025-11-06 13:15',
      status: 'analyzed',
      priority: 'High',
      dicomImage: 'https://images.unsplash.com/photo-1584555684040-bad07f46a21f?w=400',
      doctorReport: {
        doctor: 'Dr. Ayesha Malik',
        findings: 'Clear lung fields, no fractures detected, normal cardiac silhouette. No acute pathology visible.',
        diagnosis: 'Normal chest X-ray',
        aiConfidence: '96%',
        completedAt: '2025-11-06 15:45',
      },
    },
  ]);

  const [selectedCase, setSelectedCase] = useState<DicomCase | null>(null);

  const handleSendToDoctor = (caseId: string) => {
    setCases(cases.map(c => 
      c.id === caseId ? { ...c, status: 'sent-to-doctor' as const } : c
    ));
    toast.success('DICOM sent to Doctor for analysis');
  };

  const handleSendToPatient = (caseId: string) => {
    const caseData = cases.find(c => c.id === caseId);
    setCases(cases.map(c => 
      c.id === caseId ? { ...c, status: 'ready-for-patient' as const } : c
    ));
    toast.success(`Final report sent to patient ${caseData?.patientName} via WhatsApp: ${caseData?.contact}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'received':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300';
      case 'sent-to-doctor':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300';
      case 'analyzed':
        return 'bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300';
      case 'ready-for-patient':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const receivedCases = cases.filter(c => c.status === 'received');
  const sentToDoctorCases = cases.filter(c => c.status === 'sent-to-doctor');
  const analyzedCases = cases.filter(c => c.status === 'analyzed');

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1676552055618-22ec8cde399a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWtpc3RhbmklMjBudXJzZSUyMHVuaWZvcm18ZW58MXx8fHwxNzYyNTI0OTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Nursing Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-green-50/90 to-white/95 dark:from-gray-950/95 dark:via-green-950/90 dark:to-gray-950/95" />
      </div>

      <div className="relative z-10 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 mb-4">
              <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-green-300">
                Nursing Module - Emergency Care Coordination
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Nursing Dashboard
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Manage DICOM workflow: Radiologist → Doctor → Patient Communication
            </p>
          </div>

          {/* Real-time Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600 dark:text-gray-400">New from Radiologist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{receivedCases.length}</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-100 dark:border-yellow-900">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600 dark:text-gray-400">With Doctor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{sentToDoctorCases.length}</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Doctor Analyzed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">{analyzedCases.length}</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Ready for Patient</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {cases.filter(c => c.status === 'ready-for-patient').length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* PHASE 1: New Cases from Radiologist - Need to Send to Doctor */}
          <Card className="mb-6 border-2 border-blue-200 dark:border-blue-800">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Phase 1: New Cases from Radiologist
                  </CardTitle>
                  <CardDescription>Send these cases to Doctor for analysis</CardDescription>
                </div>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300">
                  {receivedCases.length} Pending
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {receivedCases.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No new cases from radiologist</p>
              ) : (
                <div className="space-y-3">
                  {receivedCases.map((caseItem) => (
                    <div key={caseItem.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{caseItem.type}</h3>
                            <Badge className={getPriorityColor(caseItem.priority)}>{caseItem.priority}</Badge>
                            <Badge className={getStatusColor(caseItem.status)}>New</Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <div><span className="font-medium">Patient:</span> {caseItem.patientName}</div>
                            <div><span className="font-medium">MR:</span> {caseItem.mrNo}</div>
                            <div><span className="font-medium">Contact:</span> {caseItem.contact}</div>
                            <div><span className="font-medium">Time:</span> {caseItem.uploadedAt}</div>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleSendToDoctor(caseItem.id)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send to Doctor
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* PHASE 2: Cases Sent to Doctor - Waiting for Analysis */}
          <Card className="mb-6 border-2 border-yellow-200 dark:border-yellow-800">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-white dark:from-yellow-950/20 dark:to-gray-900">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    Phase 2: With Doctor - Awaiting Analysis
                  </CardTitle>
                  <CardDescription>Doctor is analyzing these cases with AI/LLM</CardDescription>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300">
                  {sentToDoctorCases.length} In Progress
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {sentToDoctorCases.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No cases currently with doctor</p>
              ) : (
                <div className="space-y-3">
                  {sentToDoctorCases.map((caseItem) => (
                    <div key={caseItem.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-yellow-50/50 dark:bg-yellow-950/10">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{caseItem.type}</h3>
                        <Badge className={getPriorityColor(caseItem.priority)}>{caseItem.priority}</Badge>
                        <Badge className={getStatusColor(caseItem.status)}>Doctor Analyzing</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div><span className="font-medium">Patient:</span> {caseItem.patientName}</div>
                        <div><span className="font-medium">MR:</span> {caseItem.mrNo}</div>
                        <div><span className="font-medium">Sent:</span> {caseItem.uploadedAt}</div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 animate-spin text-yellow-600" />
                          <span className="text-yellow-600">Processing...</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* PHASE 3: Doctor Analysis Complete - Ready to Send to Patient */}
          <Card className="mb-6 border-2 border-green-200 dark:border-green-800">
            <CardHeader className="bg-gradient-to-r from-green-50 to-white dark:from-green-950/20 dark:to-gray-900">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    Phase 3: Doctor Analysis Complete
                  </CardTitle>
                  <CardDescription>Review doctor's report and send to patient</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300">
                  {analyzedCases.length} Ready
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {analyzedCases.length === 0 ? (
                <p className="text-center text-gray-500 py-4">No completed analyses from doctor yet</p>
              ) : (
                <div className="space-y-4">
                  {analyzedCases.map((caseItem) => (
                    <div key={caseItem.id} className="border-2 border-green-200 dark:border-green-800 rounded-lg overflow-hidden">
                      {/* Header */}
                      <div className="bg-green-50 dark:bg-green-950/20 p-4 border-b border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{caseItem.type}</h3>
                            <Badge className={getPriorityColor(caseItem.priority)}>{caseItem.priority}</Badge>
                            <Badge className={getStatusColor(caseItem.status)}>
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Analyzed
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Patient & Case Info */}
                      <div className="p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Patient Name:</span>
                            <p className="font-semibold text-gray-900 dark:text-white">{caseItem.patientName}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">MR Number:</span>
                            <p className="font-semibold text-blue-600 dark:text-blue-400">{caseItem.mrNo}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">IRS Number:</span>
                            <p className="font-semibold text-purple-600 dark:text-purple-400">{caseItem.irsNo}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Contact:</span>
                            <p className="font-semibold text-gray-900 dark:text-white">{caseItem.contact}</p>
                          </div>
                        </div>
                      </div>

                      {/* Doctor's Report - AI Generated Results */}
                      {caseItem.doctorReport && (
                        <div className="p-4 space-y-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Sparkles className="h-5 w-5 text-green-600" />
                            <h4 className="font-semibold text-gray-900 dark:text-white">Doctor's AI-Generated Report</h4>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            {/* Doctor Info */}
                            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Analyzed by</div>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-blue-600" />
                                <span className="font-semibold text-gray-900 dark:text-white">{caseItem.doctorReport.doctor}</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">{caseItem.doctorReport.completedAt}</div>
                            </div>

                            {/* AI Confidence */}
                            <div className="p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">AI Confidence Level</div>
                              <div className="flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-purple-600" />
                                <span className="font-semibold text-purple-600 dark:text-purple-400">{caseItem.doctorReport.aiConfidence}</span>
                              </div>
                            </div>
                          </div>

                          {/* Diagnosis */}
                          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">Diagnosis:</div>
                            <div className="font-semibold text-green-700 dark:text-green-300 text-lg">
                              {caseItem.doctorReport.diagnosis}
                            </div>
                          </div>

                          {/* Findings */}
                          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">Detailed Findings:</div>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {caseItem.doctorReport.findings}
                            </p>
                          </div>

                          {/* Action Button */}
                          <div className="flex gap-3 pt-2">
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => setSelectedCase(caseItem)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Full Report
                            </Button>
                            <Button
                              onClick={() => handleSendToPatient(caseItem.id)}
                              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Send to Patient via WhatsApp
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Workflow Instructions */}
          <Card className="bg-gradient-to-r from-red-50 to-white dark:from-red-950/20 dark:to-gray-900 border-2 border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-red-600" />
                Nursing Workflow - Real-Time Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <p className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-blue-600" />
                <span><strong>Step 1:</strong> Receive DICOM from Radiologist → Send to Doctor</span>
              </p>
              <p className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-yellow-600" />
                <span><strong>Step 2:</strong> Wait for Doctor to analyze with AI/LLM tools</span>
              </p>
              <p className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-green-600" />
                <span><strong>Step 3:</strong> Review Doctor's AI-generated report and findings</span>
              </p>
              <p className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-purple-600" />
                <span><strong>Step 4:</strong> Send final report to Patient via WhatsApp</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Full Report Modal - Read Only */}
      <Dialog open={selectedCase !== null} onOpenChange={(open) => !open && setSelectedCase(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <FileText className="h-6 w-6 text-green-600" />
              Medical Report - Case {selectedCase?.id}
            </DialogTitle>
            <DialogDescription>
              Read-only view of the doctor's signed report
            </DialogDescription>
          </DialogHeader>

          {selectedCase && selectedCase.doctorReport && (
            <div className="space-y-6 mt-6">
              {/* Hospital Header */}
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xl text-gray-900 dark:text-white">Indus Hospital Karachi</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Department of Radiology - AI Health X-Ray System</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Signed Report
                  </Badge>
                </div>
              </div>

              {/* Patient Information Table */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Patient Information</h3>
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      <tr>
                        <td className="px-4 py-3 bg-gray-50 dark:bg-gray-900 font-medium text-gray-700 dark:text-gray-300 w-1/3">Patient Name</td>
                        <td className="px-4 py-3 text-gray-900 dark:text-white">{selectedCase.patientName}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 bg-gray-50 dark:bg-gray-900 font-medium text-gray-700 dark:text-gray-300">MR Number</td>
                        <td className="px-4 py-3 text-gray-900 dark:text-white">{selectedCase.mrNo}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 bg-gray-50 dark:bg-gray-900 font-medium text-gray-700 dark:text-gray-300">IRS Number</td>
                        <td className="px-4 py-3 text-gray-900 dark:text-white">{selectedCase.irsNo}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 bg-gray-50 dark:bg-gray-900 font-medium text-gray-700 dark:text-gray-300">Contact</td>
                        <td className="px-4 py-3 text-gray-900 dark:text-white">{selectedCase.contact}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 bg-gray-50 dark:bg-gray-900 font-medium text-gray-700 dark:text-gray-300">Examination Type</td>
                        <td className="px-4 py-3 text-gray-900 dark:text-white">{selectedCase.type}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Report Details Table */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Report Details</h3>
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                      <tr>
                        <td className="px-4 py-3 bg-gray-50 dark:bg-gray-900 font-medium text-gray-700 dark:text-gray-300 w-1/3">Doctor Name</td>
                        <td className="px-4 py-3 text-gray-900 dark:text-white">{selectedCase.doctorReport.doctor}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 bg-gray-50 dark:bg-gray-900 font-medium text-gray-700 dark:text-gray-300">Report Date & Time</td>
                        <td className="px-4 py-3 text-gray-900 dark:text-white">{selectedCase.doctorReport.completedAt}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 bg-gray-50 dark:bg-gray-900 font-medium text-gray-700 dark:text-gray-300">AI Confidence Level</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-950/30 dark:text-purple-300">
                            <Sparkles className="h-3 w-3 mr-1" />
                            {selectedCase.doctorReport.aiConfidence}
                          </Badge>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Findings */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Clinical Findings</h3>
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {selectedCase.doctorReport.findings}
                  </p>
                </div>
              </div>

              {/* Diagnosis */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Diagnosis</h3>
                <div className="border-2 border-green-200 dark:border-green-800 rounded-lg p-4 bg-green-50 dark:bg-green-950/20">
                  <p className="text-xl font-semibold text-green-700 dark:text-green-300">
                    {selectedCase.doctorReport.diagnosis}
                  </p>
                </div>
              </div>

              {/* Download PDF Button */}
              <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                <Button
                  onClick={() => {
                    toast.success('Report PDF downloaded successfully');
                    setSelectedCase(null);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF Report
                </Button>
                <Button
                  onClick={() => setSelectedCase(null)}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}