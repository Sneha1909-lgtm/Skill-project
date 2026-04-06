import React, { useState, useEffect, useRef, useContext } from 'react';
import { DataContext } from '../context/DataContext.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const LiveClassPage = () => {
  const { classes } = useContext(DataContext);
  const { role } = useContext(AuthContext);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, user: 'System', text: 'Welcome to the live session!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatBottomRef = useRef(null);

  const pastSessions = [
    { id: 1, title: 'Introduction to React', duration: '2 hours 30 mins', date: 'Feb 20, 2026', views: 156 },
    { id: 2, title: 'Node.js Basics', duration: '1 hour 45 mins', date: 'Feb 19, 2026', views: 142 },
  ];

  const handleJoinClass = (classId) => {
    setSelectedClass(classId);
    setMessages([{ id: 1, user: 'System', text: 'Welcome to the live session!' }]);
  };

  const handleLeaveClass = () => {
    setSelectedClass(null);
    setIsMuted(false);
    setIsCameraOff(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMessage = { id: Date.now(), user: 'You', text: chatInput };
    setMessages([...messages, newMessage]);
    setChatInput('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), user: 'Dr. John Smith', text: 'Noted. We will discuss that soon.' }]);
    }, 2000);
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (selectedClass) {
    const cls = classes.find(c => c.id === selectedClass);
    return (
      <div className="liveclass-page" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ padding: '20px', background: 'var(--surface)', backdropFilter: 'blur(20px)', borderRadius: '20px', border: '1px solid var(--border-soft)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0 }}>{cls.title}</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span className="live-indicator" style={{ background: '#ef4444', padding: '5px 12px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold' }}>🔴 LIVE</span>
              <span style={{ padding: '5px 12px', background: 'rgba(255,255,255,0.1)', borderRadius: '15px', fontSize: '0.8rem' }}>👤 {cls.students + 1} viewing</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '20px' }}>
            {/* Video Feed Area */}
            <div>
              <div style={{ 
                width: '100%', height: '500px', background: isCameraOff ? '#000' : 'linear-gradient(45deg, #1e293b, #0f172a)', 
                borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden'
              }}>
                {isCameraOff ? (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '10px' }}>🚫</div>
                    <p>Camera is disabled</p>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: '#fff' }}>
                    <div style={{ fontSize: '5rem', marginBottom: '10px', filter: 'drop-shadow(0 0 20px #38bdf8)' }}>{role === 'faculty' ? '👨‍🏫' : '👨‍💻'}</div>
                    <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{role === 'faculty' ? 'You (Presenting)' : `${cls.instructor} (Presenting)`}</p>
                  </div>
                )}
                
                {/* Floating controls overlay */}
                <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '15px', background: 'rgba(0,0,0,0.6)', padding: '10px 20px', borderRadius: '30px', backdropFilter: 'blur(10px)' }}>
                  <button 
                    onClick={() => setIsMuted(!isMuted)} 
                    style={{ background: isMuted ? '#ef4444' : 'rgba(255,255,255,0.2)', border: 'none', padding: '12px', borderRadius: '50%', cursor: 'pointer', color: '#fff', fontSize: '1.2rem', width: '50px', height: '50px' }}
                  >
                    {isMuted ? '🔇' : '🎙️'}
                  </button>
                  <button 
                    onClick={() => setIsCameraOff(!isCameraOff)} 
                    style={{ background: isCameraOff ? '#ef4444' : 'rgba(255,255,255,0.2)', border: 'none', padding: '12px', borderRadius: '50%', cursor: 'pointer', color: '#fff', fontSize: '1.2rem', width: '50px', height: '50px' }}
                  >
                    {isCameraOff ? '🚫' : '📹'}
                  </button>
                  <button 
                    onClick={handleLeaveClass} 
                    style={{ background: '#ef4444', border: 'none', padding: '12px 24px', borderRadius: '25px', cursor: 'pointer', color: '#fff', fontWeight: 'bold' }}
                  >
                    Leave Session
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              <div style={{ padding: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', fontWeight: 'bold' }}>
                💬 Live Chat
              </div>
              <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {messages.map((msg) => (
                  <div key={msg.id} style={{ alignSelf: msg.user === 'You' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', textAlign: msg.user === 'You' ? 'right' : 'left' }}>
                      {msg.user}
                    </div>
                    <div style={{ 
                      padding: '10px 14px', 
                      borderRadius: '12px', 
                      background: msg.user === 'You' ? 'var(--accent-blue)' : 'rgba(255,255,255,0.1)',
                      color: msg.user === 'You' ? '#000' : '#fff',
                      borderBottomRightRadius: msg.user === 'You' ? 0 : '12px',
                      borderBottomLeftRadius: msg.user === 'You' ? '12px' : 0
                    }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatBottomRef} />
              </div>
              <form onSubmit={handleSendMessage} style={{ padding: '15px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  value={chatInput} 
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..." 
                  style={{ flex: 1, padding: '10px 15px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)', color: '#fff', outline: 'none' }}
                />
                <button type="submit" style={{ background: 'var(--accent-blue)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  ➤
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="liveclass-page" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>🎓 Live Virtual Classes</h1>
      </div>
      
      <div className="liveclass-container">
        <div className="section upcoming-classes" style={{ padding: '24px' }}>
          <h2>Upcoming Sessions</h2>
          <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
            {classes.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No classes scheduled yet.</p> : null}
            {classes.map((cls) => (
              <div key={cls.id} className="class-card" style={{ borderLeft: `4px solid ${cls.color || '#38bdf8'}`, padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h3 style={{ margin: 0, color: '#fff' }}>{cls.title}</h3>
                  <span style={{ background: `${cls.color || '#38bdf8'}30`, color: cls.color || '#38bdf8', padding: '4px 8px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {cls.department}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>
                  <p>👨‍🏫 {cls.instructor}</p>
                  <p>⏰ {cls.time}</p>
                  <p>👥 {cls.students} Students</p>
                </div>
                <button className="btn-primary btn-join" style={{ width: '100%', background: `linear-gradient(135deg, ${cls.color || '#38bdf8'}, #1e3a8a)` }} onClick={() => handleJoinClass(cls.id)}>
                  ▶️ Join Session
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="section past-sessions" style={{ padding: '24px' }}>
          <h2>📼 Past Recordings</h2>
          <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
            {pastSessions.map((session) => (
              <div key={session.id} style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ color: '#fff', marginBottom: '5px' }}>{session.title}</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>📅 {session.date} • ⏱️ {session.duration}</p>
                </div>
                <button className="btn-secondary" style={{ padding: '8px 15px', fontSize: '0.85rem' }}>Watch</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveClassPage;