import { useState } from 'react';
import { Download, Send, Plus, Minus, Sparkles, ArrowLeft, FileText, CheckCircle2, Eye, RefreshCw, Activity, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './design/ImageWithFallback';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import doc2 from '../components/assets/doc2.png';
interface DicomCase {
  id: string;
  mrNo: string;
  irsNo: string;
  patientName: string;
  contact: string;
  type: string;
  priority: 'High' | 'Medium' | 'Low';
  sentBy: string;
  receivedAt: string;
  dicomImage?: string;
  status: 'pending' | 'completed';
  report?: {
    findings: string;
    diagnosis: string;
    aiConfidence: string;
    completedAt: string;
    doctorName: string;
    signed: boolean;
  };
}

export function DoctorPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending');
  const [selectedCase, setSelectedCase] = useState<DicomCase | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'viewer' | 'report'>('list');
  
  // DICOM Viewer Controls
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [zoom, setZoom] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  
  // Report Generation
  const [doctorInput, setDoctorInput] = useState('');
  const [generatedReport, setGeneratedReport] = useState<any>(null);

  // Mock data - Cases received from Nurse
  const [cases, setCases] = useState<DicomCase[]>([
    {
      id: 'XR-001',
      mrNo: 'MR-2024-001',
      irsNo: 'IRS-789456',
      patientName: 'Ahmed Khan',
      contact: '+92-333-1234567',
      type: 'Chest X-Ray',
      priority: 'High',
      sentBy: 'Nurse Fatima',
      receivedAt: '2025-11-07 14:30',
      dicomImage: 'https://images.unsplash.com/photo-1584555684040-bad07f46a21f?w=800',
      status: 'pending',
    },
    {
      id: 'XR-002',
      mrNo: 'MR-2024-002',
      irsNo: 'IRS-789457',
      patientName: 'Fatima Siddiqui',
      contact: '+92-321-9876543',
      type: 'Knee X-Ray',
      priority: 'Medium',
      sentBy: 'Nurse Fatima',
      receivedAt: '2025-11-07 13:45',
      dicomImage: 'https://images.unsplash.com/photo-1584555684040-bad07f46a21f?w=800',
      status: 'pending',
    },
    {
      id: 'XR-003',
      mrNo: 'MR-2024-003',
      irsNo: 'IRS-789458',
      patientName: 'Hassan Ali',
      contact: '+92-300-5551234',
      type: 'Spine X-Ray',
      priority: 'Low',
      sentBy: 'Nurse Ayesha',
      receivedAt: '2025-11-07 12:15',
      dicomImage: 'https://images.unsplash.com/photo-1584555684040-bad07f46a21f?w=800',
      status: 'completed',
      report: {
        findings: 'Clear lung fields observed with no evidence of pulmonary consolidation or effusion. The cardiac silhouette is within normal limits. No acute bony abnormalities detected. The mediastinal contours are unremarkable. Trachea is midline. No pneumothorax present.',
        diagnosis: 'Normal Chest X-Ray - No Acute Pathology Detected',
        aiConfidence: '96%',
        completedAt: '07/11/2025, 15:45',
        doctorName: 'Dr. Ayesha Malik',
        signed: true,
      },
    },
  ]);

  const pendingCases = cases.filter(c => c.status === 'pending');
  const completedCases = cases.filter(c => c.status === 'completed');

  const handleCaseClick = (caseItem: DicomCase) => {
    setSelectedCase(caseItem);
    setViewMode('viewer');
    setDoctorInput('');
    setGeneratedReport(null);
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedCase(null);
    setBrightness(100);
    setContrast(100);
    setZoom(100);
    setGrayscale(0);
    setDoctorInput('');
    setGeneratedReport(null);
  };

  const handleGenerateReport = () => {
    if (!doctorInput.trim()) {
      toast.error('Please enter your analysis and findings first');
      return;
    }

    // Simulate AI report generation
    const report = {
      findings: doctorInput,
      diagnosis: 'AI-Assisted Diagnosis Based on Doctor\'s Analysis',
      aiConfidence: '94%',
      completedAt: new Date().toLocaleString('en-GB', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      doctorName: 'Dr. Ayesha Malik',
      signed: false,
    };

    setGeneratedReport(report);
    setViewMode('report');
    toast.success('AI Report generated successfully!');
  };

  const handleSignReport = () => {
    if (!selectedCase || !generatedReport) return;

    // Update case with signed report
    setCases(cases.map(c => 
      c.id === selectedCase.id 
        ? { 
            ...c, 
            status: 'completed' as const, 
            report: { ...generatedReport, signed: true } 
          }
        : c
    ));

    toast.success('Report signed and sent back to nursing staff!');
    
    // Go back to list and switch to completed tab
    setTimeout(() => {
      setViewMode('list');
      setActiveTab('completed');
      setSelectedCase(null);
    }, 1500);
  };

  const handleRegenerateReport = () => {
    setViewMode('viewer');
    setGeneratedReport(null);
    toast.info('Make changes to your analysis and regenerate');
  };

  const handleDownloadPDF = () => {
    toast.success('Report PDF downloaded successfully');
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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <ImageWithFallback
          src={doc2}
          alt="Doctor Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-blue-50/90 to-white/95 dark:from-gray-950/95 dark:via-blue-950/90 dark:to-gray-950/95" />
      </div>

      <div className="relative z-10 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50 mb-4">
              <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300">
                Doctor Module - Remote DICOM Analysis & AI Report Generation
              </span>
            </div>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {viewMode === 'list' ? 'Available Requests' : viewMode === 'viewer' ? 'DICOM Viewer Panel' : 'Generated Report'}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {viewMode === 'list' 
                    ? 'Review pending and completed case requests from nursing staff' 
                    : viewMode === 'viewer'
                    ? 'Analyze X-ray with advanced controls and AI-powered insights'
                    : 'Review and sign the generated report'}
                </p>
              </div>
              {viewMode !== 'list' && (
                <Button
                  onClick={handleBackToList}
                  variant="outline"
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to List
                </Button>
              )}
            </div>
          </div>

          {/* LIST VIEW - Available Requests */}
          {viewMode === 'list' && (
            <div>
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="border-2 border-blue-100 dark:border-blue-900">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Pending Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{pendingCases.length}</div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-100 dark:border-green-900">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Completed Today</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">{completedCases.length}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'pending' | 'completed')}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="pending" className="gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Pending Requests ({pendingCases.length})
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Completed Requests ({completedCases.length})
                  </TabsTrigger>
                </TabsList>

                {/* Pending Requests Table */}
                <TabsContent value="pending">
                  <Card>
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-900">
                      <CardTitle>Pending DICOM Analysis Requests</CardTitle>
                      <CardDescription>Cases sent by nursing staff awaiting your analysis</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {pendingCases.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No pending requests</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-blue-50 dark:bg-blue-950/20 border-b-2 border-blue-200 dark:border-blue-800">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Case ID</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Patient</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">MR No.</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Type</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Priority</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Sent By</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Time</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                              {pendingCases.map((caseItem) => (
                                <tr key={caseItem.id} className="hover:bg-blue-50 dark:hover:bg-blue-950/10 transition-colors">
                                  <td className="px-4 py-4 font-semibold text-blue-600 dark:text-blue-400">{caseItem.id}</td>
                                  <td className="px-4 py-4">
                                    <div>
                                      <div className="font-medium text-gray-900 dark:text-white">{caseItem.patientName}</div>
                                      <div className="text-xs text-gray-500">{caseItem.contact}</div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">{caseItem.mrNo}</td>
                                  <td className="px-4 py-4">
                                    <Badge variant="outline">{caseItem.type}</Badge>
                                  </td>
                                  <td className="px-4 py-4">
                                    <Badge className={getPriorityColor(caseItem.priority)}>{caseItem.priority}</Badge>
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">{caseItem.sentBy}</td>
                                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-500">{caseItem.receivedAt}</td>
                                  <td className="px-4 py-4">
                                    <Button
                                      size="sm"
                                      onClick={() => handleCaseClick(caseItem)}
                                      className="bg-red-600 hover:bg-red-700 text-white"
                                    >
                                      <Eye className="h-4 w-4 mr-2" />
                                      Open
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Completed Requests Table */}
                <TabsContent value="completed">
                  <Card>
                    <CardHeader className="bg-gradient-to-r from-green-50 to-white dark:from-green-950/20 dark:to-gray-900">
                      <CardTitle>Completed DICOM Analysis</CardTitle>
                      <CardDescription>Signed reports sent back to nursing staff</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      {completedCases.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No completed cases yet</p>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead className="bg-green-50 dark:bg-green-950/20 border-b-2 border-green-200 dark:border-green-800">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Case ID</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Patient</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Type</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Diagnosis</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">AI Confidence</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Completed</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Status</th>
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Action</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                              {completedCases.map((caseItem) => (
                                <tr key={caseItem.id} className="hover:bg-green-50 dark:hover:bg-green-950/10 transition-colors">
                                  <td className="px-4 py-4 font-semibold text-green-600 dark:text-green-400">{caseItem.id}</td>
                                  <td className="px-4 py-4">
                                    <div className="font-medium text-gray-900 dark:text-white">{caseItem.patientName}</div>
                                  </td>
                                  <td className="px-4 py-4">
                                    <Badge variant="outline">{caseItem.type}</Badge>
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                                    {caseItem.report?.diagnosis}
                                  </td>
                                  <td className="px-4 py-4">
                                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                                      {caseItem.report?.aiConfidence}
                                    </span>
                                  </td>
                                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-500">
                                    {caseItem.report?.completedAt}
                                  </td>
                                  <td className="px-4 py-4">
                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300">
                                      <CheckCircle2 className="h-3 w-3 mr-1" />
                                      Signed
                                    </Badge>
                                  </td>
                                  <td className="px-4 py-4">
                                    <Button
                                      size="sm"
                                      onClick={() => handleCaseClick(caseItem)}
                                      variant="outline"
                                      className="gap-2"
                                    >
                                      <Eye className="h-4 w-4" />
                                      View
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* VIEWER PANEL - DICOM Analysis */}
          {viewMode === 'viewer' && selectedCase && (
            <div className="space-y-6">
              {/* Case Info */}
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <CardTitle className="flex items-center gap-2 flex-wrap">
                        Analyzing Case: {selectedCase.id}
                        <Badge className={getPriorityColor(selectedCase.priority)}>{selectedCase.priority} Priority</Badge>
                        {selectedCase.status === 'completed' && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Already Completed
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Patient: {selectedCase.patientName} • MR: {selectedCase.mrNo} • Sent by: {selectedCase.sentBy}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* DICOM Viewer with Filters */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left: DICOM Image Display */}
                <div className="lg:col-span-2">
                  <Card className="border-2 border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-blue-600" />
                        DICOM Renderer - {selectedCase.type}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative bg-black rounded-lg overflow-hidden aspect-[4/3]">
                        <ImageWithFallback
                          src={selectedCase.dicomImage || 'https://images.unsplash.com/photo-1584555684040-bad07f46a21f?w=800'}
                          alt="DICOM X-Ray"
                          className="w-full h-full object-contain"
                          style={{
                            filter: `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%)`,
                            transform: `scale(${zoom / 100})`,
                            transition: 'all 0.3s ease',
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right: Controls */}
                <div>
                  <Card className="border-2 border-blue-200 dark:border-blue-800">
                    <CardHeader className="bg-blue-50 dark:bg-blue-950/20">
                      <CardTitle className="text-sm">DICOM Filters & Controls</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      {/* Brightness */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Brightness: {brightness}%
                        </label>
                        <Slider
                          value={[brightness]}
                          onValueChange={(val) => setBrightness(val[0])}
                          min={0}
                          max={200}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      {/* Contrast */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Contrast: {contrast}%
                        </label>
                        <Slider
                          value={[contrast]}
                          onValueChange={(val) => setContrast(val[0])}
                          min={0}
                          max={200}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      {/* Grayscale */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Grayscale: {grayscale}%
                        </label>
                        <Slider
                          value={[grayscale]}
                          onValueChange={(val) => setGrayscale(val[0])}
                          min={0}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      {/* Zoom */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Zoom: {zoom}%
                        </label>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setZoom(Math.max(50, zoom - 10))}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Slider
                            value={[zoom]}
                            onValueChange={(val) => setZoom(val[0])}
                            min={50}
                            max={200}
                            step={10}
                            className="flex-1"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setZoom(Math.min(200, zoom + 10))}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            setBrightness(100);
                            setContrast(100);
                            setZoom(100);
                            setGrayscale(0);
                          }}
                        >
                          Reset All Filters
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Two Column Layout: LLM Input + Existing Report (if completed) */}
              <div className={selectedCase.status === 'completed' && selectedCase.report ? 'grid lg:grid-cols-2 gap-6' : ''}>
                {/* LLM Input Section - Doctor's Analysis */}
                <Card className="border-2 border-purple-200 dark:border-purple-800">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                      LLM Input - Doctor's Analysis & Findings
                    </CardTitle>
                    <CardDescription>
                      {selectedCase.status === 'completed' 
                        ? 'Previous analysis shown on the right. You can create a new analysis if needed.'
                        : 'Enter your detailed analysis, findings, and diagnosis. The AI will generate a structured report.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Textarea
                      placeholder="Enter your detailed medical analysis and findings here...&#10;&#10;Example:&#10;- Clear lung fields observed&#10;- No fractures detected&#10;- Normal cardiac silhouette&#10;- Diagnosis: Normal chest X-ray"
                      value={doctorInput}
                      onChange={(e) => setDoctorInput(e.target.value)}
                      rows={8}
                      className="w-full mb-4 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
                    />
                    <Button
                      onClick={handleGenerateReport}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      disabled={!doctorInput.trim()}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate AI Report
                    </Button>
                  </CardContent>
                </Card>

                {/* Show Existing Signed Report (if case is completed) */}
                {selectedCase.status === 'completed' && selectedCase.report && (
                  <Card className="border-2 border-green-200 dark:border-green-800">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        Existing Signed Report
                      </CardTitle>
                      <CardDescription>
                        This case was already analyzed and signed on {selectedCase.report.completedAt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                      <div className="border-l-4 border-green-500 bg-green-50 dark:bg-green-950/20 p-4 rounded">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Doctor</div>
                        <div className="font-semibold text-gray-900 dark:text-white">{selectedCase.report.doctorName}</div>
                      </div>

                      <div className="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/20 p-4 rounded">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">AI Confidence</div>
                        <div className="font-semibold text-purple-600 dark:text-purple-400">{selectedCase.report.aiConfidence}</div>
                      </div>

                      <div className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/20 p-4 rounded">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Diagnosis</div>
                        <div className="font-semibold text-blue-900 dark:text-blue-100">{selectedCase.report.diagnosis}</div>
                      </div>

                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Detailed Findings</div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {selectedCase.report.findings}
                        </p>
                      </div>

                      <div className="pt-4">
                        <Button
                          onClick={() => {
                            setGeneratedReport(selectedCase.report);
                            setViewMode('report');
                          }}
                          variant="outline"
                          className="w-full gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View Full Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* REPORT VIEW - Generated & Editable Report */}
          {viewMode === 'report' && selectedCase && generatedReport && (
            <div className="space-y-6">
              {/* Report Header */}
              <Card className="border-2 border-green-200 dark:border-green-800">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    Generated Medical Report - Case {selectedCase.id}
                  </CardTitle>
                  <CardDescription>
                    {generatedReport.signed 
                      ? 'This report has been signed and sent to nursing staff'
                      : 'Review the AI-generated report and sign to send back to nursing staff'}
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Report in Modern Tabular Format */}
              <Card className="border-2 border-gray-200 dark:border-gray-800">
                <CardHeader className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="font-bold text-xl text-gray-900 dark:text-white">Indus Hospital Karachi</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Department of Radiology - AI Health X-Ray System</div>
                    </div>
                    <Badge className={generatedReport.signed 
                      ? "bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300"
                    }>
                      {generatedReport.signed ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Signed Report
                        </>
                      ) : (
                        'Awaiting Signature'
                      )}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {/* Patient Information Table */}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Patient Information</h3>
                      <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                        <table className="w-full">
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            <tr>
                              <td className="px-4 py-3 bg-gray-50 dark:bg-gray-900 font-medium text-gray-700 dark:text-gray-300 w-1/4">Patient Name</td>
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
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Report Details</h3>
                      <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                        <table className="w-full">
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                            <tr>
                              <td className="px-4 py-3 bg-gray-50 dark:bg-gray-900 font-medium text-gray-700 dark:text-gray-300 w-1/4">Doctor Name</td>
                              <td className="px-4 py-3 text-gray-900 dark:text-white">{generatedReport.doctorName}</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 bg-gray-50 dark:bg-gray-900 font-medium text-gray-700 dark:text-gray-300">Report Date & Time</td>
                              <td className="px-4 py-3 text-gray-900 dark:text-white">{generatedReport.completedAt}</td>
                            </tr>
                            <tr>
                              <td className="px-4 py-3 bg-gray-50 dark:bg-gray-900 font-medium text-gray-700 dark:text-gray-300">AI Confidence Level</td>
                              <td className="px-4 py-3">
                                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-950/30 dark:text-purple-300">
                                  <Sparkles className="h-3 w-3 mr-1" />
                                  {generatedReport.aiConfidence}
                                </Badge>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Findings */}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Clinical Findings</h3>
                      <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {generatedReport.findings}
                        </p>
                      </div>
                    </div>

                    {/* Diagnosis */}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Diagnosis</h3>
                      <div className="border-2 border-green-200 dark:border-green-800 rounded-lg p-4 bg-green-50 dark:bg-green-950/20">
                        <p className="text-lg font-semibold text-green-700 dark:text-green-300">
                          {generatedReport.diagnosis}
                        </p>
                      </div>
                    </div>

                    {/* Signature Status */}
                    {!generatedReport.signed && (
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Signature Status</h3>
                        <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                          <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">Digital Signature Required</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                By signing, you confirm the accuracy of this report and authorize sending to nursing staff
                              </p>
                            </div>
                            <Badge variant="outline" className="border-yellow-500 text-yellow-700 dark:text-yellow-400">
                              Pending Signature
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4 flex-wrap">
                {!generatedReport.signed ? (
                  <>
                    <Button
                      onClick={handleRegenerateReport}
                      variant="outline"
                      className="flex-1 gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Regenerate Report
                    </Button>
                    <Button
                      onClick={handleSignReport}
                      className="flex-1 gap-2 bg-red-600 hover:bg-red-700 text-white"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Sign & Send to Nursing Staff
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleDownloadPDF}
                    className="flex-1 gap-2 bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF Report
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
