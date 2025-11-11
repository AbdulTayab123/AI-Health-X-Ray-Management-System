import { Brain, Cpu, Database, Zap, Shield, TrendingUp, CheckCircle2, Award } from 'lucide-react';
import { ImageWithFallback } from './design/ImageWithFallback';
import radiology from '../components/assets/radiology.png';
export function AITechnologyPage() {
  const techStack = [
    {
      name: 'GPT-4 Medical LLM',
      description: 'Advanced language model for natural report generation',
      icon: Brain,
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Computer Vision',
      description: 'PyDICOM & OpenCV for real-time image processing',
      icon: Cpu,
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'TensorFlow AI',
      description: 'Deep learning models trained on 1M+ X-rays',
      icon: Database,
      color: 'from-green-500 to-green-600',
    },
  ];

  const aiCapabilities = [
    {
      title: 'Fracture Detection',
      accuracy: '96.5%',
      description: 'Identifies bone fractures across all skeletal regions',
    },
    {
      title: 'Chest Pathology',
      accuracy: '94.2%',
      description: 'Detects pneumonia, edema, and lung abnormalities',
    },
    {
      title: 'Spine Alignment',
      accuracy: '93.8%',
      description: 'Analyzes vertebral alignment and disc health',
    },
    {
      title: 'Dental Analysis',
      accuracy: '95.1%',
      description: 'Cavity detection and root canal assessment',
    },
  ];

  const stats = [
    { value: '1M+', label: 'X-Rays Analyzed' },
    { value: '95%+', label: 'Accuracy Rate' },
    { value: '<60s', label: 'Analysis Time' },
    { value: '24/7', label: 'Availability' },
  ];

  const certifications = [
    { name: 'FDA Cleared', icon: Award },
    { name: 'HIPAA Compliant', icon: Shield },
    { name: 'ISO 27001', icon: CheckCircle2 },
    { name: 'SOC 2 Type II', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 mb-6">
              <Brain className="h-4 w-4 text-blue-300" />
              <span className="text-sm font-medium text-blue-200">
                AI Technology
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              The Intelligence Behind
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Emergency Healthcare
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              State-of-the-art AI algorithms and medical imaging technology powering instant, accurate diagnosis
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Technology Stack */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced Technology Stack
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Powered by cutting-edge AI and medical imaging technologies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {techStack.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8 hover:shadow-2xl transition-all"
                >
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center mb-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {tech.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {tech.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Tech Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
            <ImageWithFallback
              src={radiology}
              alt="AI Technology"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-3xl font-bold mb-2">Neural Network Architecture</h3>
              <p className="text-lg text-gray-200">Deep learning models trained on millions of medical images</p>
            </div>
          </div>
        </section>

        {/* AI Workflow */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How Our AI Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              From image upload to validated diagnosis in three steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Image Processing',
                description: 'DICOM files are processed using PyDICOM and OpenCV. Our system automatically enhances brightness, contrast, and applies noise reduction for optimal analysis.',
                icon: Cpu,
                color: 'blue',
              },
              {
                step: '02',
                title: 'AI Analysis',
                description: 'TensorFlow-based deep learning models analyze the image, trained on over 1 million X-rays. Detects fractures, pathologies, and abnormalities with 95%+ accuracy.',
                icon: Brain,
                color: 'purple',
              },
              {
                step: '03',
                title: 'Report Generation',
                description: 'GPT-4 Medical LLM converts doctor findings into structured reports with yes/no validations, diagnosis fields, and recommended actions.',
                icon: FileText,
                color: 'green',
              },
            ].map((step, index) => {
              const Icon = step.icon;
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600',
                purple: 'from-purple-500 to-purple-600',
                green: 'from-green-500 to-green-600',
              };

              return (
                <div
                  key={index}
                  className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8"
                >
                  <div className="absolute -top-4 -left-4 text-8xl font-bold text-gray-100 dark:text-gray-800">
                    {step.step}
                  </div>
                  
                  <div className="relative">
                    <div className={`inline-flex h-14 w-14 rounded-xl bg-gradient-to-br ${colorClasses[step.color as keyof typeof colorClasses]} items-center justify-center mb-6`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* AI Capabilities */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              AI Diagnostic Capabilities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Specialized models for different types of medical imaging
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {aiCapabilities.map((capability, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {capability.title}
                  </h3>
                  <div className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-950/30">
                    <span className="text-sm font-bold text-green-700 dark:text-green-300">
                      {capability.accuracy}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {capability.description}
                </p>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                      style={{ width: capability.accuracy }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950/20 rounded-3xl border border-gray-200 dark:border-gray-800 p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Certified & Compliant
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Meeting the highest standards in medical technology and data security
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 text-center"
                >
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {cert.name}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

// FileText icon component
function FileText({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
