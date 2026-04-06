import React from 'react';
import { 
  Award, 
  BookOpen, 
  Globe, 
  Users, 
  GraduationCap, 
  Lightbulb, 
  Building2, 
  ShieldCheck,
  Star,
  Zap,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const UniversityPage = () => {
  const stats = [
    { label: 'Founded', value: '1980', icon: GraduationCap, color: 'text-blue-500' },
    { label: 'NAAC Grade', value: 'A++', icon: Award, color: 'text-amber-500' },
    { label: 'Faculty', value: '1,200+', icon: Users, color: 'text-emerald-500' },
    { label: 'Research Papers', value: '15,000+', icon: BookOpen, color: 'text-purple-500' },
  ];

  const recognitions = [
    { title: 'Category-I Status', detail: 'Recognized as Category-I University by UGC', icon: ShieldCheck },
    { title: 'QS Diamond Rated', detail: 'Diamond Rated institution by QS I-GAUGE', icon: Star },
    { title: 'NIRF Ranked', detail: 'Consistently ranked among Top 50 Universities in India', icon: Zap },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="relative h-64 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <img 
          src="/hero_campus.png" 
          alt="University Campus" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-dark via-secondary-dark/60 to-transparent" />
        <div className="absolute inset-0 p-12 flex flex-col justify-center">
          <Badge variant="primary" className="w-fit mb-4">Official Node</Badge>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Koneru Lakshmaiah Education Foundation</h1>
          <p className="text-white/70 text-lg max-w-2xl">
            Established in 1980, KLEF is a premier Deemed to be University shaping global leaders through academic excellence.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 border-none dark:bg-white/5 shadow-soft flex items-center gap-6">
            <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-secondary shadow-md flex items-center justify-center ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-bold dark:text-white">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* About Section */}
        <Card className="lg:col-span-2 p-10 border-none dark:bg-white/5 shadow-soft">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1.5 h-8 bg-primary rounded-full" />
            <h2 className="text-2xl font-display font-bold dark:text-white">Our Legacy & Mission</h2>
          </div>
          <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
            <p>
              KL University (KLEF) was established in 1980-81 as KL College of Engineering and was later recognized as a Deemed to be University in 2009. 
              The institution has been at the forefront of providing quality education in the fields of Engineering, Management, Architecture, Pharmacy, and Law.
            </p>
            <p>
              Our mission is to create an environment that encourages research, innovation, and holistic development. We strive to be a globally 
              recognized university that produces industry-ready professionals with strong ethical values.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-10">
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                    <h4 className="font-bold mb-2 dark:text-white">Vision</h4>
                    <p className="text-sm">To be a world-class university by achieving excellence in academics and research, fostering innovation and social responsibility.</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                    <h4 className="font-bold mb-2 dark:text-white">Core Values</h4>
                    <ul className="text-sm space-y-1">
                        <li>• Academic Freedom</li>
                        <li>• Integrity & Ethics</li>
                        <li>• Student Centricity</li>
                    </ul>
                </div>
            </div>
          </div>
        </Card>

        {/* Contact & Rankings Card */}
        <div className="space-y-6">
          <Card className="p-8 border-none dark:bg-primary shadow-enterprise text-white">
            <h3 className="text-xl font-bold mb-6">Connect with Us</h3>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <MapPin size={20} className="text-white/60" />
                    <p className="text-sm font-medium">Vaddeswaram, Andhra Pradesh, India</p>
                </div>
                <div className="flex items-center gap-4">
                    <Mail size={20} className="text-white/60" />
                    <p className="text-sm font-medium">registrar@kluniversity.in</p>
                </div>
                <div className="flex items-center gap-4">
                    <Phone size={20} className="text-white/60" />
                    <p className="text-sm font-medium">+91-0863-2399999</p>
                </div>
            </div>
            <button className="w-full mt-8 py-3 bg-white text-primary font-bold rounded-xl text-xs uppercase tracking-widest shadow-xl">
                Contact Admissions
            </button>
          </Card>

          <Card className="p-8 border-none dark:bg-white/5 shadow-soft">
            <h3 className="text-xl font-bold mb-6 dark:text-white">Recognitions</h3>
            <div className="space-y-6">
                {recognitions.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <item.icon size={20} className="text-primary shrink-0" />
                        <div>
                            <p className="text-sm font-bold dark:text-white">{item.title}</p>
                            <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">{item.detail}</p>
                        </div>
                    </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UniversityPage;
