import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Building, Users, Award, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './design/ImageWithFallback';
import nurse1 from '../components/assets/nurse1.png';
export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const stats = [
    { icon: Building, label: 'Founded', value: '2024' },
    { icon: Users, label: 'Partner Hospitals', value: '50+' },
    { icon: Award, label: 'Accuracy Rate', value: '95%' },
    { icon: Heart, label: 'Lives Impacted', value: '10K+' },
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'support@aihealthxray.com',
      link: 'mailto:support@aihealthxray.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Karachi, Pakistan',
      link: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section with Image */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758574437870-f83c160efd82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzYxNzI2NDM1fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Medical Team"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 to-gray-900/60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-400/30 mb-6">
            <Heart className="h-4 w-4" />
            <span className="text-sm font-medium">About & Contact</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Have questions about our AI-powered X-ray management system? We're here to help.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* About Section */}
        <section className="mb-20">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Inspired by Indus Hospital's Commitment to Healthcare Innovation
                </h2>
                
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <p>
                    Our AI Health X-Ray Management System was developed by passionate students inspired by Indus Hospital's dedication to accessible, quality healthcare for all.
                  </p>
                  <p>
                    During holidays and weekends, when specialist doctors aren't available on-site, emergency patients often face delays in critical X-ray diagnosis. We built this platform to bridge that gap.
                  </p>
                  <p>
                    By combining advanced AI technology with remote doctor collaboration, we ensure that patients receive timely diagnosis and first aid — even when specialists are away.
                  </p>
                  <p className="font-medium text-red-600 dark:text-red-400">
                    Our mission: Save lives through intelligent technology and compassionate care.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                        <Icon className="h-8 w-8 text-red-600 dark:text-red-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
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

              <div className="relative h-full min-h-[400px]">
                <ImageWithFallback
                  src={nurse1}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Contact Information
            </h2>

            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const content = (
                <div className="flex items-start gap-4 p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {info.title}
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {info.value}
                    </div>
                  </div>
                </div>
              );

              if (info.link) {
                return (
                  <a key={index} href={info.link}>
                    {content}
                  </a>
                );
              }

              return <div key={index}>{content}</div>;
            })}

            {/* Office Hours */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border border-red-200 dark:border-red-800/30">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                Support Hours
              </h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-medium">Closed</span>
                </div>
                <div className="pt-2 mt-2 border-t border-red-200 dark:border-red-800/30">
                  <span className="text-red-600 dark:text-red-400 font-medium">
                    24/7 Emergency Support Available
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <Input
                    type="text"
                    placeholder="What is this regarding?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <Textarea
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-lg shadow-red-500/30"
                >
                  <Send className="h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              © 2025 AI Health X-Ray Management System
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Inspired by Indus Hospital | All Rights Reserved | Privacy Policy | Terms of Service
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
