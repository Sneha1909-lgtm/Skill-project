import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { DataContext } from '../context/DataContext.jsx';

const ProfilePage = () => {
    const { user, role, name: initialName } = useContext(AuthContext); // user is email
    const { users } = useContext(DataContext);

    const currentUser = users.find(u => u.email === user) || { name: initialName, role, course: 'N/A', contact: 'N/A' };

    return (
        <div className="profile-page" style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
            <div className="section" style={{ animation: 'fadeInUp 0.6s ease', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)', width: '80px', height: '80px', background: 'var(--accent-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', border: '4px solid var(--surface)', boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)' }}>
                    👤
                </div>
                
                <div style={{ marginTop: '50px', textAlign: 'center' }}>
                    <h1 style={{ color: '#fff', marginBottom: '5px' }}>{currentUser.name}</h1>
                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                        {role.toUpperCase()}
                    </span>
                </div>

                <div style={{ marginTop: '40px', display: 'grid', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', padding: '15px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>Email Address</span>
                        <span style={{ color: '#fff' }}>{user}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', padding: '15px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>Contact No.</span>
                        <span style={{ color: '#fff' }}>{currentUser.contact || 'Not Provided'}</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', padding: '15px', background: 'rgba(255,255,255,0.02)' }}>
                        <span style={{ color: 'var(--text-muted)', fontWeight: 'bold' }}>Enrolled Course</span>
                        <span style={{ color: '#fff' }}>{currentUser.course || 'Not Provided'}</span>
                    </div>
                </div>

                <div style={{ marginTop: '40px', padding: '15px', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.2)', borderRadius: '8px', color: '#f43f5e', textAlign: 'center', fontSize: '0.9rem' }}>
                    Profile details are locked after initial registration.<br/>
                    To modify your personal details, please contact your Administrator.
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
