import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

// Shadcn UI Components (simulated for demo)
const Button = ({ children, className = '', variant = 'default', size = 'default', disabled = false, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
  };
  const sizes = {
    default: 'h-10 py-2 px-4',
    lg: 'h-11 px-8',
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = '', type = 'text', ...props }) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all ${className}`}
      {...props}
    />
  );
};

const Label = ({ children, className = '', ...props }) => {
  return (
    <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`} {...props}>
      {children}
    </label>
  );
};

const Card = ({ children, className = '' }) => {
  return (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>;
};

const CardContent = ({ children, className = '' }) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};

const CardTitle = ({ children, className = '' }) => {
  return <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>;
};

const CardDescription = ({ children, className = '' }) => {
  return <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>;
};

// Types
interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginProps {
  onSubmit: (data: LoginData) => void;
  isLoading?: boolean;
}

interface RegisterProps {
  onSubmit: (data: RegisterData) => void;
  isLoading?: boolean;
}

// Login Component
export const LoginComponent: React.FC<LoginProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginData>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Partial<LoginData> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof LoginData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl animate-in fade-in-0 slide-in-from-bottom-4">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`pl-10 transition-all duration-300 focus:scale-[1.02] ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : 'focus:border-blue-500'}`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs animate-in slide-in-from-top-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`pl-10 pr-10 transition-all duration-300 focus:scale-[1.02] ${errors.password ? 'border-red-500 focus-visible:ring-red-500' : 'focus:border-blue-500'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs animate-in slide-in-from-top-1">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transform transition-all duration-300 hover:scale-[1.02] group"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center">
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-500 font-medium transition-colors">
                Sign up
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Register Component


// Demo Component to show both
export default function AuthDemo() {
  const [currentView, setCurrentView] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (data: LoginData) => {
    setIsLoading(true);
    console.log('Login data:', data);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Login successful! Check console for data.');
    }, 2000);
  };

  const handleRegisterSubmit = (data: RegisterData) => {
    setIsLoading(true);
    console.log('Register data:', data);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Registration successful! Check console for data.');
    }, 2000);
  };

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          onClick={() => setCurrentView(currentView === 'login' ? 'register' : 'login')}
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all"
        >
          Switch to {currentView === 'login' ? 'Register' : 'Login'}
        </Button>
      </div>
      
      {currentView === 'login' ? (
        <LoginComponent onSubmit={handleLoginSubmit} isLoading={isLoading} />
      ) : (
        <RegisterComponent onSubmit={handleRegisterSubmit} isLoading={isLoading} />
      )}
    </div>
  );
}