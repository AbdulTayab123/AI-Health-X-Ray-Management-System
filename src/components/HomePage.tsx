import { Activity, Zap, Shield, Users, FileText, Clock, TrendingUp, Heart, ChevronRight, Play, CheckCircle2, ArrowRight, Apple, Smartphone, Sparkles, Stethoscope, Upload, Database, UserCheck, Target, MousePointer } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './design/ImageWithFallback';
import radiology1 from '../components/assets/radiology1.png';
import bg3 from '../components/assets/bg3.png';
import receptDisk from '../components/assets/receptDisk.png';
interface HomePageProps {
  onAccessAdmin?: () => void;
}

export function HomePage({ onAccessAdmin }: HomePageProps) {
  const stats = [
    { icon: Heart, value: '10K+', label: 'Lives Saved', color: 'text-red-500' },
    { icon: Users, value: '500+', label: 'Doctors', color: 'text-blue-500' },
    { icon: TrendingUp, value: '95%', label: 'Accuracy', color: 'text-green-500' },
    { icon: Activity, value: '50+', label: 'Hospitals', color: 'text-purple-500' },
  ];

  const features = [
    {
      icon: Zap,
      title: 'AI-Driven DICOM Analysis',
      description: 'Advanced AI algorithms analyze X-rays with 95% accuracy, providing instant diagnostic insights.',
    },
    {
      icon: Shield,
      title: 'HIPAA-Compliant Security',
      description: 'Bank-level encryption and HIPAA compliance ensure your patient data is always protected.',
    },
    {
      icon: Users,
      title: 'Remote Doctor Collaboration',
      description: 'Connect specialists anywhere, anytime for real-time consultation and emergency diagnosis.',
    },
    {
      icon: FileText,
      title: 'Automated Report Generation',
      description: 'LLM-powered reports with structured medical fields, ready to download and share.',
    },
    {
      icon: Clock,
      title: 'Faster Emergency Decisions',
      description: 'Get critical insights in emergencies when every second counts for patient care.',
    },
    {
      icon: TrendingUp,
      title: '24/7 Remote Support',
      description: 'No more waiting for specialists. Get expert opinions during weekends and holidays.',
    },
  ];

  const workflow = [
    {
      icon: Upload,
      title: 'Hospital',
      subtitle: 'Upload DICOM',
      description: 'Medical staff uploads DICOM X-ray images securely to the cloud platform.',
      color: 'bg-blue-500',
    },
    {
      icon: Database,
      title: 'Secure Cloud',
      subtitle: 'Store & Process',
      description: 'Images are encrypted and stored in HIPAA-compliant cloud infrastructure.',
      color: 'bg-purple-500',
    },
    {
      icon: UserCheck,
      title: 'Remote Doctor',
      subtitle: 'Analyze & Diagnose',
      description: 'Specialists analyze images remotely with advanced visualization tools.',
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 shadow-sm">
                <Stethoscope className="h-4 w-4 text-red-600 dark:text-red-400" />
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  Powered by Indus Hospital
                </span>
              </div>

              {/* Decorative Sparkles */}
              <div className="relative">
                <div className="absolute -left-8 top-0 animate-pulse">
                  <Sparkles className="h-6 w-6 text-red-500 opacity-70" />
                </div>
                <div className="absolute -left-4 top-10">
                  <div className="h-3 w-3 rounded-full bg-red-500 opacity-50 animate-ping" />
                </div>
                <div className="absolute left-0 top-20">
                  <div className="h-2 w-2 rounded-full bg-blue-500 opacity-40" />
                </div>
                <div className="absolute -right-8 top-16 hidden sm:block animate-pulse">
                  <Sparkles className="h-6 w-6 text-red-500 opacity-70" />
                </div>
                <div className="absolute -right-4 top-8 hidden sm:block">
                  <div className="h-2 w-2 rounded-full bg-purple-500 opacity-40 animate-ping" />
                </div>

                {/* Main Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="block text-gray-900 dark:text-white">
                    AI Health X-Ray
                  </span>
                  <span className="block text-red-600 dark:text-red-500 mt-2">
                    Management
                  </span>
                  <span className="block text-red-600 dark:text-red-500">
                    System
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
                <span className="text-gray-600 dark:text-gray-400">
                  Revolutionizing emergency care through{' '}
                </span>
                <span className="text-red-600 dark:text-red-500 font-semibold">
                  AI-powered remote DICOM diagnosis
                </span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="gap-2 bg-red-600 hover:bg-red-700 text-white text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Sparkles className="h-5 w-5" />
                  Explore Project
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-2 border-red-600 text-red-600 hover:bg-red-50 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-950/20 text-base px-8 py-6 rounded-xl transition-all"
                >
                  <Play className="h-5 w-5" />
                  View Demo
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative order-first lg:order-last">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={radiology1}
                  alt="Indus Hospital Medical Team"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red-500/10 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-800 text-center hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 mb-8 shadow-sm">
            <Target className="h-4 w-4 text-red-600 dark:text-red-400" />
            <span className="text-sm font-medium text-red-600 dark:text-red-400">
              Our Mission
            </span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-gray-900 dark:text-white">Smarter, Faster, </span>
              <span className="text-red-600 dark:text-red-500">Remote Diagnosis</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Bridging the gap between emergency care needs and specialist availability
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Workflow Steps */}
            <div className="space-y-6">
              {workflow.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <div className={`h-14 w-14 rounded-xl ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
                        {step.subtitle}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right - Image & Emergency Use Case */}
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={bg3}
                  alt="AI Healthcare Technology"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Emergency Use Case
                </h3>
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <p className="leading-relaxed">
                    During holidays and off-hours, when orthopedic specialists aren't available on-site, emergency patients requiring immediate first aid face critical delays. Our AI-driven platform allows medical staff to upload DICOM images and instantly route them to remote doctors for expert analysis.
                  </p>
                  <p className="leading-relaxed">
                    Doctors can analyze images remotely with advanced visualization tools, adjust brightness and contrast, and leverage AI-powered insights to make informed decisions quickly.
                  </p>
                  <p className="font-semibold text-red-600 dark:text-red-500 leading-relaxed">
                    The result? Faster diagnosis, better patient outcomes, and peace of mind for medical teams working around the clock.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Platform Features
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Everything you need for modern emergency care
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-950 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="h-14 w-14 rounded-xl bg-red-100 dark:bg-red-950/30 flex items-center justify-center mb-6 shadow-md">
                    <Icon className="h-7 w-7 text-red-600 dark:text-red-500" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile Apps Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 lg:space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                Access Anywhere,
                <span className="block text-red-600 dark:text-red-500 mt-2">Anytime</span>
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Download our mobile app for iOS and Android to access your health records, view X-ray reports, and consult with doctors on the go.
              </p>

              <div className="space-y-4">
                {[
                  'Instant push notifications for new reports',
                  'Secure biometric authentication',
                  'Offline access to medical records',
                  'Video consultation with specialists',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-red-600 dark:text-red-500" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-3 border-2 border-gray-900 dark:border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                  disabled
                >
                  <Apple className="h-6 w-6" />
                  <div className="text-left">
                    <div className="text-xs opacity-75">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-3 border-2 border-gray-900 dark:border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                  disabled
                >
                  <Smartphone className="h-6 w-6" />
                  <div className="text-left">
                    <div className="text-xs opacity-75">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={receptDisk}
                  alt="Doctor using smartphone for medical purposes"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-red-600 dark:bg-red-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Emergency Care?
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-red-50 max-w-2xl mx-auto">
            Join hundreds of hospitals already using AI Health X-Ray Management System
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="gap-2 bg-white text-red-600 hover:bg-gray-100 text-base px-8 shadow-lg hover:shadow-xl transition-all"
            >
              Request Demo
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-2 border-white text-red-600 hover:bg-white/10 text-base px-8 transition-all">
            
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 rounded-lg bg-red-600 flex items-center justify-center shadow-lg">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold">AI Health X-Ray</div>
                  <div className="text-xs text-gray-400">Management System</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Revolutionizing emergency medical care with AI-powered X-ray analysis.
              </p>
            </div>

            {[
              {
                title: 'Product',
                links: ['Features', 'Pricing', 'Security', 'Roadmap'],
              },
              {
                title: 'Company',
                links: ['About', 'Careers', 'Blog', 'Press'],
              },
              {
                title: 'Support',
                links: ['Help Center', 'Contact', 'Status', 'Privacy'],
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-bold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2025 AI Health X-Ray Management System. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social, index) => (
                <a key={index} href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}