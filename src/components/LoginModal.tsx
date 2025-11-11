import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [loginType, setLoginType] = useState<'staff' | 'patient'>('staff');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [patientLoginData, setPatientLoginData] = useState({ patientId: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', role: 'doctor' });
  const [patientSignupData, setPatientSignupData] = useState({ 
    name: '', 
    mrNo: '', 
    irsNo: '', 
    contact: '', 
    password: '' 
  });

  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    toast.success('Staff login successful!');
    onOpenChange(false);
    setLoginData({ email: '', password: '' });
  };

  const handlePatientLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientLoginData.patientId || !patientLoginData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    toast.success('Patient login successful!');
    onOpenChange(false);
    setPatientLoginData({ patientId: '', password: '' });
  };

  const handleStaffSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupData.name || !signupData.email || !signupData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    toast.success('Staff account created successfully!');
    onOpenChange(false);
    setSignupData({ name: '', email: '', password: '', role: 'doctor' });
  };

  const handlePatientSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!patientSignupData.name || !patientSignupData.mrNo || !patientSignupData.irsNo || 
        !patientSignupData.contact || !patientSignupData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    toast.success('Patient account created successfully! Your Patient ID is: PT-' + patientSignupData.mrNo);
    onOpenChange(false);
    setPatientSignupData({ name: '', mrNo: '', irsNo: '', contact: '', password: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
            Welcome to AI Health X-Ray
          </DialogTitle>
          <DialogDescription>
            Sign in to your account or create a new one to access the platform
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            {/* Login Type Selector */}
            <div className="flex gap-2 mb-4">
              <Button
                type="button"
                variant={loginType === 'staff' ? 'default' : 'outline'}
                className={`flex-1 ${loginType === 'staff' ? 'bg-red-600 hover:bg-red-700 text-white' : ''}`}
                onClick={() => setLoginType('staff')}
              >
                Staff Login
              </Button>
              <Button
                type="button"
                variant={loginType === 'patient' ? 'default' : 'outline'}
                className={`flex-1 ${loginType === 'patient' ? 'bg-red-600 hover:bg-red-700 text-white' : ''}`}
                onClick={() => setLoginType('patient')}
              >
                Patient Login
              </Button>
            </div>

            {loginType === 'staff' ? (
              <form onSubmit={handleStaffLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="doctor@indushospital.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 dark:text-gray-300">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-red-600 hover:text-red-700">
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
                >
                  Login as Staff
                </Button>
              </form>
            ) : (
              <form onSubmit={handlePatientLogin} className="space-y-4">
                <div>
                  <Label htmlFor="patient-login-id">Patient ID or MR Number</Label>
                  <Input
                    id="patient-login-id"
                    type="text"
                    placeholder="PT-2024-001 or MR-2024-001"
                    value={patientLoginData.patientId}
                    onChange={(e) => setPatientLoginData({ ...patientLoginData, patientId: e.target.value })}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Enter your Patient ID or MR Number provided by the hospital
                  </p>
                </div>

                <div>
                  <Label htmlFor="patient-login-password">Password</Label>
                  <Input
                    id="patient-login-password"
                    type="password"
                    placeholder="••••••••"
                    value={patientLoginData.password}
                    onChange={(e) => setPatientLoginData({ ...patientLoginData, password: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-700 dark:text-gray-300">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-red-600 hover:text-red-700">
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                >
                  Login as Patient
                </Button>
              </form>
            )}
          </TabsContent>

          <TabsContent value="signup">
            {/* Signup Type Selector */}
            <div className="flex gap-2 mb-4">
              <Button
                type="button"
                variant={loginType === 'staff' ? 'default' : 'outline'}
                className={`flex-1 ${loginType === 'staff' ? 'bg-red-600 hover:bg-red-700 text-white' : ''}`}
                onClick={() => setLoginType('staff')}
              >
                Staff Signup
              </Button>
              <Button
                type="button"
                variant={loginType === 'patient' ? 'default' : 'outline'}
                className={`flex-1 ${loginType === 'patient' ? 'bg-red-600 hover:bg-red-700 text-white' : ''}`}
                onClick={() => setLoginType('patient')}
              >
                Patient Signup
              </Button>
            </div>

            {loginType === 'staff' ? (
              <form onSubmit={handleStaffSignup} className="space-y-4">
                <div>
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Dr. Ayesha Malik"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="doctor@indushospital.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="signup-role">Role</Label>
                  <Select
                    value={signupData.role}
                    onValueChange={(value) => setSignupData({ ...signupData, role: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="radiologist">Radiologist</SelectItem>
                      <SelectItem value="nurse">Nurse</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 rounded" required />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    I agree to the Terms of Service and Privacy Policy
                  </span>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
                >
                  Create Staff Account
                </Button>
              </form>
            ) : (
              <form onSubmit={handlePatientSignup} className="space-y-4">
                <div>
                  <Label htmlFor="patient-signup-name">Full Name</Label>
                  <Input
                    id="patient-signup-name"
                    type="text"
                    placeholder="Ahmed Khan"
                    value={patientSignupData.name}
                    onChange={(e) => setPatientSignupData({ ...patientSignupData, name: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="patient-signup-mrno">MR Number</Label>
                    <Input
                      id="patient-signup-mrno"
                      type="text"
                      placeholder="MR-2024-XXX"
                      value={patientSignupData.mrNo}
                      onChange={(e) => setPatientSignupData({ ...patientSignupData, mrNo: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="patient-signup-irsno">IRS Number</Label>
                    <Input
                      id="patient-signup-irsno"
                      type="text"
                      placeholder="IRS-XXXXXX"
                      value={patientSignupData.irsNo}
                      onChange={(e) => setPatientSignupData({ ...patientSignupData, irsNo: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="patient-signup-contact">Contact Number</Label>
                  <Input
                    id="patient-signup-contact"
                    type="tel"
                    placeholder="+92-3XX-XXXXXXX"
                    value={patientSignupData.contact}
                    onChange={(e) => setPatientSignupData({ ...patientSignupData, contact: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="patient-signup-password">Password</Label>
                  <Input
                    id="patient-signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={patientSignupData.password}
                    onChange={(e) => setPatientSignupData({ ...patientSignupData, password: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 rounded" required />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    I agree to the Terms of Service and Privacy Policy
                  </span>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                >
                  Create Patient Account
                </Button>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
