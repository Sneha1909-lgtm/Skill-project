import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';

const HomePage = () => {
  const navigate = useNavigate();
  const [inquiry, setInquiry] = useState({ name: '', email: '', course: '', phone: '' });

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${inquiry.name}! Our admissions team will reach out to ${inquiry.email} regarding the ${inquiry.course} program.`);
    setInquiry({ name: '', email: '', course: '', phone: '' });
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden bg-secondary-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src="/lgu_hero_campus.png" 
            alt="Campus" 
            className="w-full h-full object-cover opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary-dark to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl animate-fadeInUp">
            <h1 className="text-5xl md:text-6xl text-white font-bold mb-6">
              Apex Global <span className="text-primary-light italic">University</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Igniting Minds, Inspiring Futures. Join a world-class academic environment 
              designed to foster innovation, research, and leadership in the 21st century.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => navigate('/register')}>
                Apply for Admission
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white/20 hover:bg-white/10" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
                Explore Campus Life
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-50 border-y border-slate-200 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Students', value: '12,500+' },
              { label: 'Degree Programs', value: '150+' },
              { label: 'Placement Rate', value: '94%' },
              { label: 'Global Partners', value: '50+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl text-slate-900 mb-4 text-center">Campus Life & Research</h2>
          <div className="h-1.5 w-20 bg-primary rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card 
            className="hover:-translate-y-2 transition-transform duration-300"
            footer={<span className="text-xs font-bold text-slate-400">📅 Fall Semester 2026</span>}
          >
            <div className="aspect-video mb-6 -mx-6 -mt-5 overflow-hidden">
              <img src="/lgu_students.png" alt="Lab" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3 block">Academics</span>
            <h3 className="text-xl mb-3">Advanced AI Labs Opened</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Our newly inaugurated state-of-the-art computational lab empowers 
              students to run neural networks at scale.
            </p>
          </Card>

          <Card 
            className="hover:-translate-y-2 transition-transform duration-300"
            footer={<span className="text-xs font-bold text-slate-400">📅 October 15-18</span>}
          >
            <div className="aspect-video mb-6 -mx-6 -mt-5 overflow-hidden">
              <img src="/lgu_event.png" alt="Event" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-bold text-success uppercase tracking-widest mb-3 block">Event</span>
            <h3 className="text-xl mb-3">Global Tech Symposium</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Join industry leaders and alumni for a 3-day networking and hackathon 
              event housed in the main auditorium.
            </p>
          </Card>

          <Card 
            className="hover:-translate-y-2 transition-transform duration-300"
            footer={<span className="text-xs font-bold text-slate-400">🌿 Sustainability Report</span>}
          >
            <div className="aspect-video mb-6 -mx-6 -mt-5 overflow-hidden">
              <img src="/lgu_hero_campus.png" alt="Campus" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-bold text-warning uppercase tracking-widest mb-3 block">Campus</span>
            <h3 className="text-xl mb-3">Green Infrastructure</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Apex Global commits to 100% renewable energy operations across all 
              academic zones by 2028.
            </p>
          </Card>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="bg-slate-900 py-24">
        <div className="container mx-auto px-6">
          <Card className="max-w-4xl mx-auto border-none bg-white/5 backdrop-blur-md">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-4 text-white">Begin Your Journey</h2>
                <p className="text-slate-400 leading-relaxed">
                  Ready to join the next generation of global leaders? Fill out the inquiry 
                  form and our admissions team will be in touch with detailed program information.
                </p>
              </div>
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <Input 
                  placeholder="Full Legal Name" 
                  className="bg-white/10 border-white/10 text-white placeholder:text-slate-500"
                  required
                  value={inquiry.name}
                  onChange={e => setInquiry({...inquiry, name: e.target.value})}
                />
                <Input 
                  type="email"
                  placeholder="Email Address" 
                  className="bg-white/10 border-white/10 text-white placeholder:text-slate-500"
                  required
                  value={inquiry.email}
                  onChange={e => setInquiry({...inquiry, email: e.target.value})}
                />
                <select 
                  className="input-field bg-white/10 border-white/10 text-white"
                  required
                  value={inquiry.course}
                  onChange={e => setInquiry({...inquiry, course: e.target.value})}
                >
                  <option value="" disabled className="text-slate-900">Select Program</option>
                  <option value="CS" className="text-slate-900">B.Tech Computer Science</option>
                  <option value="BIOTECH" className="text-slate-900">B.Sc Biotechnology</option>
                  <option value="FINANCE" className="text-slate-900">BBA Finance</option>
                </select>
                <Button type="submit" className="w-full h-12 text-lg">
                  Request Details
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
