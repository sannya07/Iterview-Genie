import { useState } from 'react';
import { ArrowLeft, Construction, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function ContactPage() {
 const navigate=useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGoBack = () => {
    setIsAnimating(true);
    // Simulate navigation - in a real app, you'd use router.back() or navigate(-1)
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <button
          onClick={handleGoBack}
          className={`flex items-center gap-2 px-4 py-2 bg-purple-800/30 hover:bg-purple-700/40 border border-purple-500/30 rounded-lg transition-all duration-300 backdrop-blur-sm group ${
            isAnimating ? 'scale-95' : 'hover:scale-105'
          }`}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-sm font-medium">Go Back</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 py-12 min-h-[calc(100vh-120px)]">
        {/* Construction Icon with Animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-full shadow-2xl">
            <Construction className="w-16 h-16 animate-bounce" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">
          Under Construction
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-purple-200 text-center mb-8 max-w-2xl">
          We're building something amazing for you
        </p>

        {/* Description */}
        <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 mb-8 max-w-2xl">
          <p className="text-purple-100 text-center leading-relaxed">
            Our contact page is currently being redesigned to serve you better. 
            We're adding new features and improving the user experience. 
            Please check back soon!
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
          <div className="bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:bg-purple-800/40 transition-all duration-300 hover:scale-105">
            <Mail className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-lg font-semibold text-purple-200 mb-2">Email</h3>
            <p className="text-purple-300 text-sm">contact@company.com</p>
          </div>

          <div className="bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:bg-purple-800/40 transition-all duration-300 hover:scale-105">
            <Phone className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-lg font-semibold text-purple-200 mb-2">Phone</h3>
            <p className="text-purple-300 text-sm">+1 (555) 123-4567</p>
          </div>

          <div className="bg-purple-900/30 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 hover:bg-purple-800/40 transition-all duration-300 hover:scale-105 md:col-span-2 lg:col-span-1">
            <MapPin className="w-8 h-8 text-purple-400 mb-3" />
            <h3 className="text-lg font-semibold text-purple-200 mb-2">Address</h3>
            <p className="text-purple-300 text-sm">123 Business Ave<br />Suite 100<br />City, State 12345</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-gradient-to-r from-purple-900/20 to-black/20 backdrop-blur-sm border border-purple-500/30 rounded-lg p-6 max-w-md">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-200">Expected Launch</h3>
          </div>
          <p className="text-purple-300 text-center">Coming Soon</p>
          <div className="mt-4 bg-purple-900/30 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full w-3/4 animate-pulse" />
          </div>
          <p className="text-xs text-purple-400 mt-2 text-center">75% Complete</p>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-purple-500/30 rounded-full animate-ping" />
        <div className="absolute bottom-32 right-16 w-6 h-6 bg-purple-400/20 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-2 h-2 bg-purple-600/40 rounded-full animate-bounce" />
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 border-t border-purple-800/30">
        <p className="text-purple-400 text-sm">
          © 2025 Company Name. All rights reserved.
        </p>
      </footer>
    </div>
  );
}