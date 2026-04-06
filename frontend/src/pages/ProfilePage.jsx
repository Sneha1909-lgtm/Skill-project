import React, { useContext, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Camera, 
  Settings, 
  Globe, 
  CreditCard,
  Lock,
  Edit3,
  GraduationCap,
  Loader2
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';
import { DataContext } from '../context/DataContext.jsx';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import { twMerge } from 'tailwind-merge';
import { uploadProfileImageApi } from '../services/api.js';
import { toast } from 'sonner';

const ProfilePage = () => {
    const { user, role, name: contextName } = useContext(AuthContext); 
    const { studentProfile, facultyProfile, loading, refetchData } = useContext(DataContext);
    const [isUploading, setIsUploading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef(null);

    if (loading) return (
        <div className="p-12 flex items-center justify-center min-h-[600px]">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin shadow-glass" />
        </div>
    );

    const profile = role === 'faculty' ? facultyProfile : studentProfile;
    const s = profile || {};
    const displayName = s.name || contextName || (role === 'faculty' ? 'Faculty' : 'Student');

    const handleEditToggle = () => {
        if (isEditing) {
            setEditData({}); // Cancel edits
        } else {
            setEditData({ ...s }); // Initialize with current data
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (key, val) => {
        setEditData(prev => ({ ...prev, [key]: val }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            if (role === 'faculty') {
                await import('../services/api.js').then(m => m.updateFacultyProfileApi(editData));
            } else {
                await import('../services/api.js').then(m => m.updateStudentProfileApi(editData));
            }
            toast.success('Sync Complete', { description: 'Institutional metadata updated successfully.' });
            setIsEditing(false);
            refetchData?.();
        } catch (err) {
            toast.error('Sync Failed', { description: 'Unable to update profile. Check your connection.' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleImageClick = () => {
        if (s.profileImage && role !== 'admin') {
            toast.error('Identity Locked', { description: 'Profile images can only be uploaded once. Contact admin for resets.' });
            return;
        }
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error('File Too Large', { description: 'Please select an image smaller than 2MB' });
            return;
        }

        setIsUploading(true);
        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64 = reader.result;
                await uploadProfileImageApi(base64);
                toast.success('Identity Synced', { description: 'Your profile image has been securely uploaded.' });
                refetchData?.();
            };
        } catch (err) {
            toast.error('Sync Failed', { description: 'Unable to upload image. Please try again.' });
        } finally {
            setIsUploading(false);
        }
    };

    const sections = [
        {
            title: 'Personal Identity',
            icon: User,
            fields: [
                { label: 'Full Name', key: 'name', value: s.name },
                { label: 'DOB', key: 'dob', value: s.dob, type: 'date' },
                { label: 'Gender', key: 'gender', value: s.gender },
                { label: 'Blood Group', key: 'bloodGroup', value: s.bloodGroup },
                { label: 'Nationality', key: 'nationality', value: s.nationality },
                { label: 'Religion', key: 'religion', value: s.religion },
                { label: 'Place of Birth', key: 'placeOfBirth', value: s.placeOfBirth }
            ]
        },
        {
            title: 'Academic Standing',
            icon: GraduationCap,
            fields: role === 'faculty' ? [
                { label: 'University ID', key: 'universityId', value: s.universityId },
                { label: 'Department', key: 'department', value: s.department },
                { label: 'Designation', key: 'designation', value: s.designation },
                { label: 'Experience', key: 'experience', value: s.experience },
                { label: 'Specialization', key: 'specialization', value: s.specialization }
            ] : [
                { label: 'University ID', key: 'universityId', value: s.universityId },
                { label: 'Course', key: 'course', value: s.course },
                { label: 'Branch', key: 'branch', value: s.branch },
                { label: 'Semester', key: 'semester', value: s.semester },
                { label: 'Batch', key: 'batch', value: s.batch },
                { label: 'CGPA', key: 'cgpa', value: s.cgpa, highlight: true },
                { label: 'Attendance', key: 'attendancePercent', value: `${s.attendancePercent || '0'}%`, highlight: true }
            ]
        },
        {
            title: 'Residential & Contact',
            icon: MapPin,
            fields: [
                { label: 'Hostel Status', key: 'hostelStatus', value: s.hostelStatus },
                { label: 'Room Number', key: 'roomNo', value: s.roomNo },
                { label: 'Phone', key: 'phone', value: s.phone },
                { label: 'Primary Address', key: 'address', value: s.address, fullWidth: true }
            ]
        }
    ];

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-6 animate-in fade-in duration-1000">
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
            />

            {/* Ultra-Glossy Navbar Hero */}
            <div className="relative p-6 sm:p-10 rounded-[2.5rem] overflow-hidden border border-primary/20 shadow-gloss bg-gradient-to-br from-white/90 via-rose-50/70 to-white/90 backdrop-blur-3xl">
                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                    <div className="relative group">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-primary to-primary-dark p-1 shadow-2xl transition-transform duration-500 group-hover:rotate-3 overflow-hidden">
                            <div className="w-full h-full rounded-[1.4rem] bg-slate-900 flex items-center justify-center overflow-hidden relative">
                                {s.profileImage ? (
                                    <img 
                                        src={s.profileImage.startsWith('data:') ? s.profileImage : `http://localhost:8081${s.profileImage}`} 
                                        alt="Profile" 
                                        className="w-full h-full object-cover" 
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary-dark/60 flex items-center justify-center text-white/40">
                                        <User size={56} strokeWidth={1} />
                                    </div>
                                )}
                                
                                {isUploading && (
                                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center text-white">
                                        <Loader2 className="animate-spin" size={32} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <button 
                            onClick={handleImageClick}
                            disabled={isUploading}
                            className="absolute -bottom-2 -right-2 p-2.5 rounded-xl bg-white text-slate-900 shadow-xl border border-slate-100 hover:scale-110 active:scale-95 transition-all z-20 disabled:opacity-50"
                        >
                            <Camera size={16} />
                        </button>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                            <Badge variant="primary" className="bg-primary/20 text-primary border-primary/30 uppercase tracking-[0.4em] text-[8px] px-3 py-1 backdrop-blur-md">Nodal Identity Hub</Badge>
                            <span className="text-[8px] font-bold text-success/80 uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-sm px-2 py-1 rounded-full border border-success/10 bg-success/5">
                                <ShieldCheck size={10} /> Sync Active
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-display font-black text-slate-900 dark:text-white mb-1 leading-tight tracking-tight">
                            {displayName}
                        </h1>
                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-2.5">
                                {s.universityId || 'PROVISIONING ID...'} <span className="opacity-20 hidden sm:inline">|</span> {s.course || s.department || 'ENROLLED NODE'}
                            </p>
                            <div className="flex gap-2">
                                <Button size="sm" onClick={handleEditToggle} variant={isEditing ? 'ghost' : 'default'} className="h-8 px-4 rounded-xl text-[8px] font-black uppercase tracking-widest gap-2">
                                    {isEditing ? 'Cancel' : <><Edit3 size={12} /> Edit Profile</>}
                                </Button>
                                {isEditing && (
                                    <Button size="sm" onClick={handleSave} isLoading={isSaving} className="h-8 px-4 rounded-xl text-[8px] font-black uppercase tracking-widest bg-success hover:bg-success/90 text-white border-none shadow-glow shadow-success/20">
                                        Save Changes
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Iridescent background glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>

            {/* Compact Glass Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {sections.map((section, idx) => (
                    <div 
                        key={idx} 
                        className="relative group transition-all duration-300 h-fit"
                    >
                        <div className="p-5 sm:p-7 rounded-[2.5rem] bg-gradient-to-br from-white/80 via-rose-50/40 to-white/80 backdrop-blur-2xl border border-primary/20 shadow-enterprise hover:shadow-glass hover:shadow-primary/20 transition-all flex flex-col relative overflow-hidden group">
                            {/* Accentuated reddish gradient overlay */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/15 transition-colors" />
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2.5 rounded-2xl bg-primary/10 text-primary shadow-sm border border-primary/10">
                                    <section.icon size={20} />
                                </div>
                                <h3 className="text-lg font-display font-bold text-slate-800 dark:text-white/90">{section.title}</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                                {section.fields.map((field, fIdx) => (
                                    <div key={fIdx} className={twMerge(
                                        "flex flex-col gap-1 p-3 rounded-2xl bg-primary/[0.02] hover:bg-primary/[0.05] transition-all border border-primary/[0.03] hover:border-primary/20",
                                        field.fullWidth && "col-span-2"
                                    )}>
                                        <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-none mb-1 opacity-70">{field.label}</p>
                                        {isEditing ? (
                                            <input 
                                                type={field.type || 'text'}
                                                value={editData[field.key] || ''}
                                                onChange={(e) => handleInputChange(field.key, e.target.value)}
                                                className="bg-white/50 border border-primary/10 rounded-lg px-2 py-1 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none text-slate-900"
                                            />
                                        ) : (
                                            <p className={twMerge(
                                                "text-xs font-bold truncate",
                                                field.highlight ? "text-primary text-base" : "text-slate-800 dark:text-white/80"
                                            )}>
                                                {typeof field.value === 'object' ? JSON.stringify(field.value) : String(field.value ?? 'N/A')}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-5 bg-error/5 border border-white/5 rounded-[2.5rem] flex items-center gap-4 justify-center backdrop-blur-md">
                <Lock className="text-error/50" size={16} />
                <p className="text-[8px] font-bold text-slate-500 max-w-2xl text-center leading-relaxed uppercase tracking-[0.4em]">
                    ENCRYPTED DATA STREAM: Institutional metadata is protected by end-to-end nodal encryption.
                </p>
            </div>
        </div>
    );
};

export default ProfilePage;
