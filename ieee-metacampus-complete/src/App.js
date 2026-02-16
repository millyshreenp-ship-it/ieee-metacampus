import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './login';
import IEEEMembership from './IEEEMembership';
import FeedbackSystem from './FeedbackSystem';
import SocialLinks from './SocialLink';

// ==================== DEMO DATA ====================
const DEMO_EVENTS = [
  { id: 1, title: 'AI/ML Workshop', date: '2026-02-20', type: 'Workshop', attendees: 45, category: 'Technical', description: 'Hands-on machine learning with TensorFlow', venue: 'Seminar Hall A', tags: ['AI', 'ML', 'Python'], speaker: 'Dr. Sarah Chen', rating: 4.8 },
  { id: 2, title: 'Blockchain Hackathon', date: '2026-02-25', type: 'Hackathon', attendees: 120, category: 'Competition', description: '24-hour Web3 building challenge', venue: 'Computer Lab', tags: ['Blockchain', 'Web3', 'DeFi'], speaker: 'Vitalik Mentor', rating: 4.9 },
  { id: 3, title: 'IEEE Day Celebration', date: '2026-03-05', type: 'Cultural', attendees: 200, category: 'Celebration', description: 'Annual IEEE anniversary event', venue: 'Main Auditorium', tags: ['IEEE', 'Networking', 'Cultural'], speaker: 'Multiple', rating: 4.6 },
  { id: 4, title: 'Web3 Masterclass', date: '2026-03-10', type: 'Seminar', attendees: 60, category: 'Technical', description: 'Deep dive into decentralized applications', venue: 'Lecture Hall 3', tags: ['Web3', 'Blockchain', 'DApps'], speaker: 'Prof. Kumar', rating: 4.7 },
  { id: 5, title: 'IoT Innovation Challenge', date: '2026-03-15', type: 'Competition', attendees: 80, category: 'Competition', description: 'Build smart solutions for campus', venue: 'Innovation Lab', tags: ['IoT', 'Hardware', 'Innovation'], speaker: 'Team Leads', rating: 4.5 }
];

const DEMO_MENTORS = [
  { id: 1, name: 'Dr. Sarah Chen', expertise: 'AI/ML', match: 95, available: true, bio: 'PhD in Machine Learning, 10+ years industry experience', sessions: 24, rating: 4.9, company: 'Google Research' },
  { id: 2, name: 'Prof. Rajesh Kumar', expertise: 'IoT', match: 88, available: true, bio: 'IoT researcher, published 50+ papers', sessions: 18, rating: 4.8, company: 'IIT Delhi' },
  { id: 3, name: 'Ms. Priya Sharma', expertise: 'Blockchain', match: 92, available: false, bio: 'Web3 developer, ex-Ethereum Foundation', sessions: 32, rating: 5.0, company: 'Consensys' },
  { id: 4, name: 'Mr. Arjun Patel', expertise: 'AR/VR', match: 85, available: true, bio: 'AR developer, Google ARCore specialist', sessions: 15, rating: 4.7, company: 'Meta' }
];

const DEMO_PROJECTS = [
  { id: 1, name: 'Smart Campus System', tech: ['IoT', 'ML'], team: 4, progress: 75, description: 'IoT sensors for campus management', deadline: '2026-04-15', lead: 'Alice Johnson', github: 'github.com/ieee/smart-campus' },
  { id: 2, name: 'DeFi Platform', tech: ['Blockchain', 'Web3'], team: 3, progress: 60, description: 'Decentralized finance application', deadline: '2026-05-01', lead: 'Bob Smith', github: 'github.com/ieee/defi-app' },
  { id: 3, name: 'AR Navigation App', tech: ['AR', 'React Native'], team: 5, progress: 45, description: 'Campus navigation with AR', deadline: '2026-04-30', lead: 'Carol Williams', github: 'github.com/ieee/ar-nav' },
  { id: 4, name: 'AI Chatbot Assistant', tech: ['AI', 'NLP'], team: 2, progress: 85, description: 'Student support chatbot', deadline: '2026-03-20', lead: 'David Lee', github: 'github.com/ieee/ai-bot' }
];

const DEMO_NFTS = [
  { id: 1, name: 'AI Workshop Completion', date: '2026-01-15', chain: 'Polygon', tokenId: '#12345', image: '🏆', rarity: 'Rare' },
  { id: 2, name: 'Hackathon Winner', date: '2026-01-28', chain: 'Polygon', tokenId: '#12346', image: '🥇', rarity: 'Epic' },
  { id: 3, name: 'Core Team Member', date: '2026-02-01', chain: 'Polygon', tokenId: '#12347', image: '⭐', rarity: 'Common' },
  { id: 4, name: 'Event Organizer Badge', date: '2026-02-10', chain: 'Polygon', tokenId: '#12348', image: '🎯', rarity: 'Rare' }
];

const ANALYTICS_DATA = [
  { month: 'Sep', events: 12, participation: 85, projects: 3, certificates: 2 },
  { month: 'Oct', events: 18, participation: 92, projects: 5, certificates: 4 },
  { month: 'Nov', events: 15, participation: 88, projects: 4, certificates: 3 },
  { month: 'Dec', events: 10, participation: 78, projects: 2, certificates: 2 },
  { month: 'Jan', events: 20, participation: 95, projects: 6, certificates: 5 },
  { month: 'Feb', events: 16, participation: 90, projects: 4, certificates: 3 }
];

// ==================== MAIN APP ====================
function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check for saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('ieee_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setCurrentUser(userData);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem('ieee_user');
      }
    }
  }, []);

  // Login Handler
  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('ieee_user', JSON.stringify(userData));
  };

  // Logout Handler
  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('ieee_user');
    setCurrentView('universe');
  };

  const [showOnboarding, setShowOnboarding] = useState(false); // Disabled by default for demo
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [demoMode, setDemoMode] = useState(true);
  const [userMood, setUserMood] = useState('neutral');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [currentView, setCurrentView] = useState('universe');
  
  const [activityRings, setActivityRings] = useState({
    learn: 65,
    build: 40,
    care: 80
  });

  const [userProfile] = useState(currentUser || {
    name: 'Demo User',
    email: 'demo@igdtuw.ac.in',
    skills: ['AI/ML', 'Web Development', 'IoT'],
    interests: ['Robotics', 'Blockchain', 'AR/VR'],
    role: 'student'
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen]);

  const getTheme = () => {
    const baseColors = {
      ieee: isDarkMode ? '#0099cc' : '#006699',
      white: isDarkMode ? '#1a1a2e' : '#ffffff',
      text: isDarkMode ? '#ffffff' : '#000000',
      textSecondary: isDarkMode ? '#b0b0b0' : '#666666',
      bg: isDarkMode ? '#0f0f1e' : '#f8f9fa'
    };

    switch(userMood) {
      case 'stressed':
        return { ...baseColors, accent: '#8ab4f8', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' };
      case 'happy':
        return { ...baseColors, accent: '#ffd700', gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' };
      case 'focused':
        return { ...baseColors, accent: '#4caf50', gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' };
      default:
        return { ...baseColors, accent: '#0099cc', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' };
    }
  };

  const theme = getTheme();

  // Show Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <Login 
        onLogin={handleLogin}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
    );
  }

  return (
    <div className="app-container" style={{ background: theme.bg, color: theme.text, minHeight: '100vh' }}>
      {showOnboarding && (
        <StoryOnboarding 
          onComplete={() => setShowOnboarding(false)}
          theme={theme}
        />
      )}

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        theme={theme}
        setUserMood={setUserMood}
        setIsDarkMode={setIsDarkMode}
        setDemoMode={setDemoMode}
        demoMode={demoMode}
        setCurrentView={setCurrentView}
      />

      <ContextualAssistant
        theme={theme}
        currentView={currentView}
        onOpen={() => setCommandPaletteOpen(true)}
      />

      <Header
        theme={theme}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        demoMode={demoMode}
        setDemoMode={setDemoMode}
        onCommandPalette={() => setCommandPaletteOpen(true)}
        activityRings={activityRings}
        setCurrentView={setCurrentView}
        onLogout={handleLogout}
        currentUser={currentUser}
      />

      {currentView === 'universe' && <UniverseDashboard theme={theme} setCurrentView={setCurrentView} />}
      {currentView === 'events' && <EventsView theme={theme} userProfile={userProfile} />}
      {currentView === 'mentorship' && <MentorshipView theme={theme} />}
      {currentView === 'projects' && <ProjectsView theme={theme} />}
      {currentView === 'wellness' && (
        <WellnessView 
          theme={theme} 
          userMood={userMood}
          setUserMood={setUserMood}
          activityRings={activityRings}
          setActivityRings={setActivityRings}
        />
      )}
      {currentView === 'analytics' && <AnalyticsView theme={theme} />}
      {currentView === 'blockchain' && <BlockchainView theme={theme} />}
      {currentView === 'membership' && <IEEEMembership theme={theme} />}
      {currentView === 'feedback' && <FeedbackSystem theme={theme} />}
      {currentView === 'social' && <SocialLinks theme={theme} />}
      {currentView === 'ar_navigation' && <ARNavigationView theme={theme} />}
      {currentView === 'voice_assistant' && <VoiceAssistantView theme={theme} />}
      {currentView === 'recruitment' && <RecruitmentView theme={theme} />}
    </div>
  );
}

// ==================== COMPONENTS ====================

function Header({ theme, isDarkMode, setIsDarkMode, demoMode, setDemoMode, onCommandPalette, activityRings, setCurrentView, onLogout, currentUser }) {
  return (
    <header className="app-header" style={{
      background: `${theme.white}ee`,
      borderBottom: `1px solid ${theme.accent}30`,
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="header-content">
        <div onClick={() => setCurrentView('universe')} className="header-brand" style={{ cursor: 'pointer' }}>
          <div className="brand-logo" style={{ background: theme.ieee }}>IEEE</div>
          <div>
            <h1 className="brand-title" style={{ color: theme.text }}>IEEE IGDTUW MetaCampus</h1>
            <p className="brand-tagline" style={{ color: theme.textSecondary }}>Empowering Women in Technology</p>
          </div>
        </div>

        <div className="header-actions">
          {currentUser && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              padding: '0.5rem 1rem',
              background: `${theme.accent}10`,
              borderRadius: '12px',
              marginRight: '0.5rem'
            }}>
              <span style={{ color: theme.text, fontWeight: '600', fontSize: '0.9rem' }}>
                👤 {currentUser.name}
              </span>
            </div>
          )}
          
          <button onClick={onCommandPalette} className="command-button" style={{ background: `${theme.accent}20`, color: theme.accent }}>
            <span>⚡</span>
            <span className="command-shortcut">Ctrl+K</span>
          </button>
          
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="icon-button" style={{ background: `${theme.accent}20` }}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <button onClick={() => setDemoMode(!demoMode)} className="demo-button" style={{ background: demoMode ? '#4caf50' : theme.ieee, color: 'white' }}>
            {demoMode ? '✅ Demo Mode' : '🎬 Demo'}
          </button>

          <button 
            onClick={onLogout} 
            className="icon-button" 
            style={{ 
              background: '#dc3545', 
              color: 'white',
              fontWeight: '600'
            }}
            title="Logout"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      <div className="header-rings">
        <ActivityRings rings={activityRings} theme={theme} />
      </div>

      {demoMode && (
        <div className="demo-banner" style={{ background: '#4caf50', color: 'white', textAlign: 'center', padding: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
          🎯 Demo Mode Active - No backend required! All features work offline with demo data.
        </div>
      )}
    </header>
  );
}

function ActivityRings({ rings, theme }) {
  const ringData = [
    { name: 'Learn', value: rings.learn, color: '#006699', icon: '📚' },
    { name: 'Build', value: rings.build, color: '#ff6b6b', icon: '🔨' },
    { name: 'Care', value: rings.care, color: '#95e1d3', icon: '💚' }
  ];

  return (
    <div style={{ display: 'flex', gap: '1.5rem', padding: '1rem' }}>
      {ringData.map((ring, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '80px', height: '80px', marginBottom: '0.5rem' }}>
            <svg style={{ transform: 'rotate(-90deg)' }} width="80" height="80">
              <circle cx="40" cy="40" r="32" fill="none" stroke={`${ring.color}20`} strokeWidth="6" />
              <circle
                cx="40" cy="40" r="32" fill="none" stroke={ring.color} strokeWidth="6"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - ring.value / 100)}`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '2rem' }}>
              {ring.icon}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 'bold', color: theme.text }}>{ring.value}%</div>
            <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>{ring.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function UniverseDashboard({ theme, setCurrentView }) {
  const features = [
    { name: 'events', icon: '📅', color: '#006699', label: 'Events', description: 'AI-powered event recommendations' },
    { name: 'projects', icon: '🚀', color: '#ff6b6b', label: 'Projects', description: 'GitHub-integrated collaborative hub' },
    { name: 'mentorship', icon: '🎓', color: '#4ecdc4', label: 'Mentorship', description: 'AI-matched peer mentorship network' },
    { name: 'ar_navigation', icon: '🗺️', color: '#ff9800', label: 'AR Campus', description: 'AR navigation for IEEE events' },
    { name: 'membership', icon: '⚡', color: '#00cc99', label: 'Membership', description: 'IEEE IGDTUW membership benefits' },
    { name: 'feedback', icon: '📋', color: '#ffa500', label: 'Feedback', description: 'NLP-powered feedback analysis' },
    { name: 'social', icon: '🌐', color: '#0077b5', label: 'Social', description: 'Connect across all platforms' },
    { name: 'wellness', icon: '💚', color: '#95e1d3', label: 'Wellness', description: 'AI chatbot & peer support' },
    { name: 'analytics', icon: '📊', color: '#9b59b6', label: 'Analytics', description: 'Data-driven insights dashboard' },
    { name: 'blockchain', icon: '🎨', color: '#667eea', label: 'NFT Certs', description: 'Blockchain-verified achievements' },
    { name: 'voice_assistant', icon: '🎤', color: '#e91e63', label: 'Voice Assistant', description: 'Hands-free IEEE IGDTUW queries' },
    { name: 'recruitment', icon: '📝', color: '#795548', label: 'Recruitment', description: 'Join IEEE IGDTUW core team' }
  ];

  return (
    <div style={{ 
      width: '100%', 
      minHeight: '100vh', 
      background: theme.gradient,
      padding: '6rem 2rem 4rem',
      overflow: 'auto'
    }}>
      {/* Welcome Header */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '4rem',
        animation: 'slideUp 0.6s ease-out'
      }}>
        <div style={{ 
          fontSize: '4rem', 
          marginBottom: '1rem',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          🌌
        </div>
        <h1 style={{ 
          color: 'white', 
          fontSize: '3rem', 
          fontWeight: 'bold',
          fontFamily: 'Georgia, serif',
          marginBottom: '0.5rem',
          textShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}>
          IEEE MetaCampus Universe
        </h1>
        <p style={{ 
          color: 'rgba(255,255,255,0.9)', 
          fontSize: '1.25rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Explore your IEEE journey - Select any feature to get started
        </p>
      </div>

      {/* Feature Grid */}
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        padding: '0 1rem'
      }}>
        {features.map((feature) => (
          <div
            key={feature.name}
            onClick={() => setCurrentView(feature.name)}
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '2rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '2px solid rgba(255,255,255,0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.borderColor = feature.color;
              e.currentTarget.style.boxShadow = `0 20px 40px ${feature.color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Decorative gradient overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${feature.color}, transparent)`
            }} />

            {/* Icon */}
            <div style={{ 
              fontSize: '4rem', 
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {feature.icon}
            </div>

            {/* Title */}
            <h3 style={{ 
              color: 'white', 
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '0.75rem',
              textAlign: 'center'
            }}>
              {feature.label}
            </h3>

            {/* Description */}
            <p style={{ 
              color: 'rgba(255,255,255,0.8)', 
              fontSize: '0.95rem',
              textAlign: 'center',
              lineHeight: '1.5',
              marginBottom: '1.5rem'
            }}>
              {feature.description}
            </p>

            {/* Action indicator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              color: feature.color,
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              <span>Explore</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Footer */}
      <div style={{
        maxWidth: '1200px',
        margin: '4rem auto 0',
        padding: '2rem',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '2px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '2.5rem', color: 'white', fontWeight: 'bold' }}>12</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>Features Available</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', color: 'white', fontWeight: 'bold' }}>∞</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>Possibilities</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', color: 'white', fontWeight: 'bold' }}>24/7</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>Always Available</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', color: 'white', fontWeight: 'bold' }}>100%</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>IEEE IGDTUW Focused</div>
          </div>
        </div>
      </div>

      {/* Tip Section */}
      <div style={{
        textAlign: 'center',
        marginTop: '3rem',
        color: 'rgba(255,255,255,0.7)',
        fontSize: '0.9rem'
      }}>
        <p>💡 Pro Tip: Press <kbd style={{ 
          background: 'rgba(255,255,255,0.2)', 
          padding: '0.25rem 0.5rem', 
          borderRadius: '4px',
          fontWeight: 'bold'
        }}>Ctrl+K</kbd> anytime to open the command palette</p>
      </div>
    </div>
  );
}

function CommandPalette({ isOpen, onClose, theme, setUserMood, setIsDarkMode, setDemoMode, demoMode, setCurrentView }) {
  const [searchQuery, setSearchQuery] = useState('');

  const commands = [
    { name: 'Find AI events', action: () => setCurrentView('events'), category: 'navigation', icon: '🔍' },
    { name: 'Book mentor session', action: () => setCurrentView('mentorship'), category: 'action', icon: '📅' },
    { name: 'View my NFTs', action: () => setCurrentView('blockchain'), category: 'content', icon: '🎨' },
    { name: 'AR Campus Navigation', action: () => setCurrentView('ar_navigation'), category: 'navigation', icon: '🗺️' },
    { name: 'Voice Assistant', action: () => setCurrentView('voice_assistant'), category: 'action', icon: '🎤' },
    { name: 'Apply for Recruitment', action: () => setCurrentView('recruitment'), category: 'action', icon: '📝' },
    { name: 'I feel stressed', action: () => { setUserMood('stressed'); setCurrentView('wellness'); }, category: 'wellness', icon: '😰' },
    { name: 'View analytics', action: () => setCurrentView('analytics'), category: 'navigation', icon: '📊' },
    { name: 'Join project', action: () => setCurrentView('projects'), category: 'action', icon: '🚀' },
    { name: 'IEEE Membership', action: () => setCurrentView('membership'), category: 'navigation', icon: '⚡' },
    { name: 'Give Event Feedback', action: () => setCurrentView('feedback'), category: 'action', icon: '📋' },
    { name: 'Social Media Links', action: () => setCurrentView('social'), category: 'navigation', icon: '🌐' },
    { name: 'Toggle dark mode', action: () => setIsDarkMode(prev => !prev), category: 'settings', icon: '🌙' },
    { name: 'Toggle demo mode', action: () => setDemoMode(!demoMode), category: 'settings', icon: '🎬' },
    { name: 'Go to universe', action: () => setCurrentView('universe'), category: 'navigation', icon: '🌌' }
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCommand = (command) => {
    command.action();
    onClose();
    setSearchQuery('');
  };

  if (!isOpen) return null;

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '8rem', zIndex: 1000 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '42rem', margin: '0 1rem', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', background: theme.white }}>
        <div style={{ padding: '1rem', borderBottom: `1px solid ${theme.accent}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>⚡</span>
            <input
              type="text" placeholder="Type a command or search..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '1.125rem', color: theme.text }}
              autoFocus
            />
            <kbd style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', background: theme.accent, color: 'white', fontSize: '0.75rem', fontWeight: 'bold' }}>ESC</kbd>
          </div>
        </div>
        
        <div style={{ maxHeight: '24rem', overflowY: 'auto' }}>
          {filteredCommands.map((cmd, index) => (
            <button
              key={index}
              onClick={() => handleCommand(cmd)}
              style={{
                width: '100%', padding: '1rem 1.5rem', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'background 0.2s',
                background: index % 2 === 0 ? 'transparent' : `${theme.accent}10`,
                color: theme.text
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left' }}>
                <span style={{ fontSize: '1.5rem' }}>{cmd.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{cmd.name}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{cmd.category}</div>
                </div>
              </div>
              <span style={{ fontSize: '1.25rem' }}>→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function StoryOnboarding({ onComplete, theme }) {
  const [step, setStep] = useState(0);
  const steps = [
    { title: 'Welcome to IEEE MetaCampus', subtitle: 'Your IEEE Universe in One App', description: 'Experience a day in the life of an IEEE member', choice: null },
    { title: 'Morning: Discover Events', subtitle: 'What catches your attention?', description: 'You check the latest happenings...', 
      choice: { a: 'AI/ML Workshop', b: 'Blockchain Hackathon', c: 'Cultural Fest' } },
    { title: 'Afternoon: Build & Collaborate', subtitle: 'Time to create something amazing', description: 'Join a project or start your own...',
      choice: { a: 'Join Smart Campus Team', b: 'Start AR Project', c: 'Explore GitHub Repos' } }
  ];

  const currentStep = steps[step];

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
      <div style={{ maxWidth: '48rem', margin: '0 2rem', textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: 'white', fontFamily: 'Georgia, serif', marginBottom: '1rem' }}>
          {currentStep.title}
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#8ab4f8', marginBottom: '0.5rem' }}>{currentStep.subtitle}</p>
        <p style={{ color: '#b0b0b0', marginBottom: '2rem' }}>{currentStep.description}</p>

        {currentStep.choice ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            {Object.values(currentStep.choice).map((label, i) => (
              <button
                key={i}
                onClick={() => step < steps.length - 1 ? setStep(step + 1) : onComplete()}
                style={{
                  padding: '1.5rem', border: 'none', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white', fontWeight: 'bold', cursor: 'pointer'
                }}
              >
                {label}
              </button>
            ))}
          </div>
        ) : (
          <button onClick={() => setStep(1)} style={{
            padding: '1rem 2rem', border: 'none', borderRadius: '25px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white', fontWeight: 'bold', fontSize: '1.25rem', cursor: 'pointer'
          }}>
            Begin Your Journey →
          </button>
        )}

        <button onClick={onComplete} style={{ marginTop: '2rem', background: 'none', border: 'none', color: '#999', cursor: 'pointer' }}>
          Skip Onboarding →
        </button>
      </div>
    </div>
  );
}

function ContextualAssistant({ theme, currentView, onOpen }) {
  const messages = {
    events: { text: 'Check out the AI/ML Workshop - perfect for your skills!', icon: '🎯' },
    projects: { text: 'Smart Campus Team needs someone with your expertise!', icon: '💡' },
    mentorship: { text: 'Dr. Sarah Chen is a 95% match for your goals!', icon: '🤝' },
    wellness: { text: 'Try a quick breathing exercise?', icon: '🧘' },
    default: { text: 'What would you like to explore?', icon: '🌟' }
  };
  const message = messages[currentView] || messages.default;

  return (
    <div onClick={onOpen} style={{
      position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 900, cursor: 'pointer'
    }}>
      <div style={{
        width: '4rem', height: '4rem', borderRadius: '50%', background: theme.ieee,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)', animation: 'pulse 3s ease-in-out infinite'
      }}>
        {message.icon}
      </div>
      <div style={{
        position: 'absolute', bottom: '100%', right: 0, marginBottom: '0.5rem',
        padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600,
        maxWidth: '200px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        whiteSpace: 'nowrap', background: theme.white, color: theme.text
      }}>
        {message.text}
      </div>
    </div>
  );
}

// ==================== VIEW COMPONENTS ====================

function EventsView({ theme, userProfile }) {
  return (
    <div style={{ padding: '2rem', maxWidth: '1280px', margin: '0 auto' }}>
      <h1 style={{ color: theme.text, fontFamily: 'Georgia, serif', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        📅 Upcoming Events
      </h1>
      <p style={{ color: theme.textSecondary, marginBottom: '2rem' }}>AI-powered recommendations based on your profile</p>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {DEMO_EVENTS.map((event, index) => {
          const matchScore = 95 - (index * 7);
          return (
            <div
              key={event.id}
              style={{
                background: theme.white,
                border: matchScore > 85 ? `2px solid ${theme.ieee}` : '2px solid #e0e0e0',
                boxShadow: matchScore > 85 ? `0 4px 20px ${theme.accent}40` : '0 2px 10px rgba(0,0,0,0.1)',
                borderRadius: '12px',
                padding: '1.5rem',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ color: theme.text, fontSize: '1.5rem', margin: 0 }}>{event.title}</h3>
                    {matchScore > 85 && (
                      <span style={{
                        background: theme.ieee, color: 'white', padding: '0.25rem 0.75rem',
                        borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold'
                      }}>
                        {matchScore}% Match ⭐
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: theme.textSecondary, marginBottom: '0.5rem' }}>
                    <span>📅 {event.date}</span>
                    <span>👥 {event.attendees} attending</span>
                    <span>🎤 {event.speaker}</span>
                    <span style={{ background: `${theme.accent}20`, color: theme.accent, padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                      {event.type}
                    </span>
                  </div>
                  <p style={{ color: theme.textSecondary, margin: '0.5rem 0' }}>{event.description}</p>
                  <p style={{ color: theme.textSecondary, fontSize: '0.85rem' }}>📍 {event.venue}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    {event.tags.map((tag, i) => (
                      <span key={i} style={{ fontSize: '0.75rem', background: `${theme.accent}15`, color: theme.accent, padding: '0.25rem 0.5rem', borderRadius: '12px' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  style={{
                    background: theme.ieee, color: 'white', border: 'none',
                    padding: '0.75rem 1.5rem', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer'
                  }}
                >
                  Register
                </button>
              </div>

              {matchScore > 85 && (
                <div style={{ marginTop: '1rem', padding: '0.75rem', background: `${theme.accent}10`, borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: theme.accent, marginBottom: '0.25rem' }}>
                    🤖 AI Recommendation
                  </div>
                  <div style={{ fontSize: '0.85rem', color: theme.textSecondary }}>
                    Perfect match for your {userProfile.skills[0]} skills. Past attendees rated {event.rating}/5.
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MentorshipView({ theme }) {
  return (
    <div style={{ padding: '2rem', maxWidth: '1280px', margin: '0 auto' }}>
      <h1 style={{ color: theme.text, fontFamily: 'Georgia, serif', fontSize: '2.5rem' }}>
        🎓 Mentorship Network
      </h1>
      <p style={{ color: theme.textSecondary, marginBottom: '2rem' }}>AI-matched mentors based on your goals</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {DEMO_MENTORS.map((mentor) => (
          <div
            key={mentor.id}
            style={{
              background: theme.white,
              border: mentor.match > 90 ? `2px solid ${theme.ieee}` : '2px solid transparent',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', background: theme.ieee, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.25rem' }}>
                {mentor.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ color: theme.text, margin: 0 }}>{mentor.name}</h3>
                <p style={{ color: theme.textSecondary, fontSize: '0.9rem', margin: '0.25rem 0' }}>{mentor.expertise}</p>
                <p style={{ color: theme.textSecondary, fontSize: '0.85rem', margin: 0 }}>{mentor.company}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: theme.ieee }}>{mentor.match}%</div>
                <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Match</div>
              </div>
            </div>

            <p style={{ color: theme.textSecondary, margin: '1rem 0', fontSize: '0.9rem' }}>{mentor.bio}</p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1, textAlign: 'center', padding: '0.5rem', background: `${theme.accent}10`, borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: theme.ieee }}>{mentor.sessions}</div>
                <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Sessions</div>
              </div>
              <div style={{ flex: 1, textAlign: 'center', padding: '0.5rem', background: `${theme.accent}10`, borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: theme.ieee }}>⭐ {mentor.rating}</div>
                <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>Rating</div>
              </div>
            </div>

            <div style={{ width: '100%', height: '8px', background: `${theme.accent}20`, borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
              <div style={{ width: `${mentor.match}%`, height: '100%', background: `linear-gradient(90deg, ${theme.ieee}, ${theme.accent})`, transition: 'width 0.5s' }} />
            </div>

            <button
              disabled={!mentor.available}
              style={{
                width: '100%', padding: '0.75rem', borderRadius: '8px', border: 'none',
                background: mentor.available ? theme.ieee : '#cccccc',
                color: 'white', fontWeight: 'bold', cursor: mentor.available ? 'pointer' : 'not-allowed',
                opacity: mentor.available ? 1 : 0.6
              }}
            >
              {mentor.available ? '🤝 Request Session' : '⏰ Unavailable'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsView({ theme }) {
  return (
    <div style={{ padding: '2rem', maxWidth: '1280px', margin: '0 auto' }}>
      <h1 style={{ color: theme.text, fontFamily: 'Georgia, serif' }}>🚀 Collaborative Projects</h1>
      <p style={{ color: theme.textSecondary, marginBottom: '2rem' }}>Build amazing things together</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {DEMO_PROJECTS.map((project) => (
          <div key={project.id} style={{ background: theme.white, padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: theme.text, marginBottom: '0.5rem' }}>{project.name}</h3>
            <p style={{ color: theme.textSecondary, fontSize: '0.9rem', marginBottom: '1rem' }}>{project.description}</p>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              {project.tech.map((tech, i) => (
                <span key={i} style={{ background: `${theme.accent}20`, color: theme.accent, padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                  {tech}
                </span>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.85rem', color: theme.textSecondary }}>
              <div>👥 {project.team} members</div>
              <div>👤 Lead: {project.lead}</div>
              <div style={{ gridColumn: '1 / -1' }}>📅 Due: {project.deadline}</div>
              <div style={{ gridColumn: '1 / -1' }}>💻 {project.github}</div>
            </div>

            <div style={{ marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: theme.textSecondary, marginBottom: '0.5rem' }}>
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div style={{ height: '8px', background: `${theme.accent}20`, borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${project.progress}%`, height: '100%', background: `linear-gradient(90deg, ${theme.ieee}, ${theme.accent})`, transition: 'width 0.5s' }} />
              </div>
            </div>

            <button style={{ width: '100%', padding: '0.75rem', background: theme.ieee, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '1rem' }}>
              Join Team
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function WellnessView({ theme, userMood, setUserMood, setActivityRings }) {
  const moods = [
    { mood: 'happy', emoji: '😊', label: 'Great' },
    { mood: 'neutral', emoji: '😐', label: 'Okay' },
    { mood: 'stressed', emoji: '😰', label: 'Stressed' },
    { mood: 'focused', emoji: '🎯', label: 'Focused' }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1280px', margin: '0 auto' }}>
      <h1 style={{ color: theme.text, fontFamily: 'Georgia, serif' }}>💚 Wellness Hub</h1>
      <p style={{ color: theme.textSecondary, marginBottom: '2rem' }}>
        {userMood === 'stressed' ? 'Take a breather, you got this' : 'How are you feeling today?'}
      </p>

      <div style={{ background: theme.white, padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
        <h3 style={{ color: theme.text, marginBottom: '1rem' }}>Check Your Mood</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {moods.map(({ mood, emoji, label }) => (
            <button
              key={mood}
              onClick={() => {
                setUserMood(mood);
                setActivityRings(prev => ({ ...prev, care: Math.min(prev.care + 15, 100) }));
              }}
              style={{
                padding: '1rem', borderRadius: '12px', border: 'none',
                background: userMood === mood ? theme.accent : `${theme.accent}20`,
                color: userMood === mood ? 'white' : theme.text,
                cursor: 'pointer', transition: 'all 0.3s'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{emoji}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{label}</div>
            </button>
          ))}
        </div>
      </div>

      {userMood === 'stressed' && (
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '1.5rem', borderRadius: '12px', color: 'white', marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>🧘 Quick Breathing Exercise</h3>
          <p style={{ marginBottom: '1rem' }}>Breathe in for 4 seconds, hold for 4, exhale for 4...</p>
          <button style={{ width: '100%', padding: '0.75rem', background: 'white', color: '#667eea', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            Start 2-Minute Session
          </button>
        </div>
      )}

      <div style={{ background: theme.white, padding: '1.5rem', borderRadius: '12px' }}>
        <h3 style={{ color: theme.text, marginBottom: '1rem' }}>🤖 AI Wellness Assistant</h3>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: theme.ieee, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
            AI
          </div>
          <div style={{ flex: 1, padding: '0.75rem', background: `${theme.accent}10`, borderRadius: '12px', color: theme.text }}>
            {userMood === 'stressed' 
              ? "I notice you're feeling stressed. Would you like to try a guided meditation or talk to a peer supporter?"
              : "Great to see you! What would you like to work on today?"}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder={userMood === 'stressed' ? "I'd like some help with..." : "Ask me anything..."}
            style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none', background: `${theme.accent}10`, color: theme.text, outline: 'none' }}
          />
          <button style={{ padding: '0.75rem 1.5rem', background: theme.ieee, color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            Send
          </button>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', background: theme.white, padding: '1.5rem', borderRadius: '12px' }}>
        <h3 style={{ color: theme.text, marginBottom: '1rem' }}>📈 Your Wellness Journey</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {[
            { label: 'Check-ins', value: '45', icon: '✅' },
            { label: 'Streak Days', value: '12', icon: '🔥' },
            { label: 'Avg. Mood', value: '😊', icon: '💭' }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '1rem', background: `${theme.accent}10`, borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: theme.ieee, marginBottom: '0.25rem' }}>{stat.value}</div>
              <div style={{ fontSize: '0.85rem', color: theme.textSecondary }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnalyticsView({ theme }) {
  return (
    <div style={{ padding: '2rem', maxWidth: '1280px', margin: '0 auto' }}>
      <h1 style={{ color: theme.text, fontFamily: 'Georgia, serif' }}>📊 Analytics Dashboard</h1>
      <p style={{ color: theme.textSecondary, marginBottom: '2rem' }}>Your IEEE journey insights</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Events', value: '92', icon: '📅', color: '#006699', change: '+12%' },
          { label: 'Certificates', value: '15', icon: '🏆', color: '#4ecdc4', change: '+8%' },
          { label: 'Projects', value: '8', icon: '🚀', color: '#ff6b6b', change: '+25%' },
          { label: 'Mentors Met', value: '6', icon: '🎓', color: '#ffa500', change: '+50%' }
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: theme.white,
              padding: '1.5rem',
              borderRadius: '12px',
              borderLeft: `4px solid ${stat.color}`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '2rem' }}>{stat.icon}</div>
            </div>
            <div style={{ fontSize: '0.9rem', color: theme.textSecondary, marginBottom: '0.25rem' }}>{stat.label}</div>
            <div style={{ fontSize: '0.85rem', color: '#4caf50', fontWeight: 'bold' }}>{stat.change} this month</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: theme.white, padding: '1.5rem', borderRadius: '12px' }}>
          <h3 style={{ color: theme.text, marginBottom: '1rem' }}>📈 Monthly Participation</h3>
          <div style={{ height: '250px' }}>
            {ANALYTICS_DATA.map((data, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ width: '60px', fontSize: '0.85rem', color: theme.textSecondary }}>{data.month}</div>
                <div style={{ flex: 1, height: '30px', background: `${theme.accent}20`, borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
                  <div style={{ 
                    width: `${data.participation}%`, 
                    height: '100%', 
                    background: `linear-gradient(90deg, ${theme.ieee}, ${theme.accent})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '8px',
                    color: 'white',
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }}>
                    {data.participation}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: theme.white, padding: '1.5rem', borderRadius: '12px' }}>
          <h3 style={{ color: theme.text, marginBottom: '1rem' }}>🎯 Event Types Distribution</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { type: 'Workshops', count: 35, percent: 38, color: '#006699' },
              { type: 'Hackathons', count: 20, percent: 22, color: '#ff6b6b' },
              { type: 'Seminars', count: 25, percent: 27, color: '#4ecdc4' },
              { type: 'Cultural', count: 12, percent: 13, color: '#ffa500' }
            ].map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  <span style={{ color: theme.text, fontWeight: 'bold' }}>{item.type}</span>
                  <span style={{ color: theme.textSecondary }}>{item.count} events ({item.percent}%)</span>
                </div>
                <div style={{ height: '12px', background: `${item.color}20`, borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.percent}%`, height: '100%', background: item.color, transition: 'width 0.5s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: theme.white, padding: '1.5rem', borderRadius: '12px' }}>
        <h3 style={{ color: theme.text, marginBottom: '1rem' }}>🏅 Recent Achievements</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          {[
            { title: 'AI Workshop Champion', date: '2 days ago', badge: '🥇' },
            { title: 'Project Contributor', date: '5 days ago', badge: '⭐' },
            { title: '10-Event Streak', date: '1 week ago', badge: '🔥' },
            { title: 'Peer Mentor', date: '2 weeks ago', badge: '🎓' }
          ].map((achievement, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: `${theme.accent}10`, borderRadius: '8px' }}>
              <div style={{ fontSize: '2.5rem' }}>{achievement.badge}</div>
              <div>
                <div style={{ fontWeight: 'bold', color: theme.text, marginBottom: '0.25rem' }}>{achievement.title}</div>
                <div style={{ fontSize: '0.85rem', color: theme.textSecondary }}>{achievement.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlockchainView({ theme }) {
  return (
    <div style={{ padding: '2rem', maxWidth: '1280px', margin: '0 auto' }}>
      <h1 style={{ color: theme.text, fontFamily: 'Georgia, serif' }}>🎨 Your NFT Certificates</h1>
      <p style={{ color: theme.textSecondary, marginBottom: '2rem' }}>Blockchain-verified achievements on Polygon</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {DEMO_NFTS.map((nft) => (
          <div
            key={nft.id}
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              transition: 'transform 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              height: '250px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '6rem', marginBottom: '1rem' }}>{nft.image}</div>
                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.25rem', padding: '0 1rem' }}>
                  {nft.name}
                </div>
                <div style={{
                  marginTop: '0.5rem',
                  padding: '0.25rem 0.75rem',
                  background: nft.rarity === 'Epic' ? '#ffd700' : nft.rarity === 'Rare' ? '#c0c0c0' : '#cd7f32',
                  borderRadius: '12px',
                  display: 'inline-block',
                  fontSize: '0.85rem',
                  fontWeight: 'bold'
                }}>
                  {nft.rarity}
                </div>
              </div>
            </div>

            <div style={{ background: theme.white, padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', color: theme.textSecondary }}>📅 {nft.date}</span>
                <span style={{ background: '#8247e5', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                  {nft.chain}
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: theme.textSecondary, marginBottom: '0.75rem' }}>
                Token ID: {nft.tokenId}
              </div>
              <div style={{ fontSize: '0.75rem', color: theme.textSecondary, marginBottom: '0.75rem', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                Contract: 0x7d2c...9f3a
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ flex: 1, padding: '0.5rem', background: theme.ieee, color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>
                  📋 Copy Link
                </button>
                <button style={{ flex: 1, padding: '0.5rem', background: '#0077b5', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>
                  Share LinkedIn
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', background: theme.white, padding: '1.5rem', borderRadius: '12px' }}>
        <h3 style={{ color: theme.text, marginBottom: '1rem' }}>💎 Your NFT Collection Stats</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          {[
            { label: 'Total NFTs', value: '4', icon: '🎨' },
            { label: 'Epic Rarity', value: '1', icon: '💎' },
            { label: 'Total Value', value: '0.5 ETH', icon: '💰' },
            { label: 'Collection Rank', value: '#127', icon: '🏆' }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '1rem', background: `${theme.accent}10`, borderRadius: '8px' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: theme.ieee, marginBottom: '0.25rem' }}>{stat.value}</div>
              <div style={{ fontSize: '0.85rem', color: theme.textSecondary }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==================== NEW IEEE IGDTUW FEATURES ====================

function ARNavigationView({ theme }) {
  const [selectedVenue, setSelectedVenue] = useState(null);
  
  const campusVenues = [
    { 
      id: 1, 
      name: 'Seminar Hall A', 
      coordinates: '28.6692° N, 77.2378° E',
      qrCode: '🔲',
      capacity: 100,
      facilities: ['Projector', 'AC', 'Sound System'],
      upcomingEvents: 2,
      arFeatures: ['3D Floor Plan', 'Speaker Bio Overlay', 'Historical Events Timeline']
    },
    { 
      id: 2, 
      name: 'Computer Lab', 
      coordinates: '28.6695° N, 77.2380° E',
      qrCode: '🔲',
      capacity: 60,
      facilities: ['High-Speed Internet', 'Workstations', 'Whiteboard'],
      upcomingEvents: 1,
      arFeatures: ['Equipment Guide', 'Lab Rules AR', 'Project Showcase']
    },
    { 
      id: 3, 
      name: 'Main Auditorium', 
      coordinates: '28.6690° N, 77.2375° E',
      qrCode: '🔲',
      capacity: 500,
      facilities: ['Stage', 'LED Screen', 'Professional Audio'],
      upcomingEvents: 3,
      arFeatures: ['Seat Finder', 'Event History', 'Speaker Spotlight']
    },
    { 
      id: 4, 
      name: 'Innovation Lab', 
      coordinates: '28.6697° N, 77.2382° E',
      qrCode: '🔲',
      capacity: 40,
      facilities: ['3D Printers', 'IoT Kits', 'VR Headsets'],
      upcomingEvents: 1,
      arFeatures: ['Equipment Tutorial', 'Project Gallery', 'Safety Guidelines']
    }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ 
          color: theme.text, 
          fontFamily: 'Georgia, serif', 
          fontSize: '2.5rem',
          marginBottom: '1rem'
        }}>
          🗺️ AR Campus Navigation
        </h1>
        <p style={{ 
          color: theme.textSecondary, 
          fontSize: '1.1rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Scan QR codes at IGDTUW venues for immersive AR directions, speaker bios, and IEEE history
        </p>
      </div>

      {/* AR Features Overview */}
      <div style={{
        background: `linear-gradient(135deg, ${theme.ieee} 0%, #00cc99 100%)`,
        padding: '2rem',
        borderRadius: '16px',
        color: 'white',
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '2rem' }}>AR Navigation Features</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem'
        }}>
          {[
            { icon: '📍', label: 'Real-time Directions', desc: 'Turn-by-turn AR guidance' },
            { icon: '👤', label: 'Speaker Bios', desc: 'Interactive presenter info' },
            { icon: '📚', label: 'IEEE History', desc: 'Society heritage overlays' },
            { icon: '🎯', label: 'Event Details', desc: 'Live schedule & updates' }
          ].map((feature, i) => (
            <div key={i}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                {feature.label}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                {feature.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campus Venues */}
      <h2 style={{ color: theme.text, marginBottom: '1.5rem' }}>
        📍 IGDTUW Event Venues
      </h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '1.5rem'
      }}>
        {campusVenues.map((venue) => (
          <div key={venue.id} style={{
            background: theme.white,
            borderRadius: '16px',
            padding: '1.5rem',
            border: `2px solid ${selectedVenue === venue.id ? theme.ieee : theme.bg}`,
            transition: 'all 0.3s',
            cursor: 'pointer'
          }}
          onClick={() => setSelectedVenue(venue.id)}
          onMouseEnter={(e) => {
            if (selectedVenue !== venue.id) {
              e.currentTarget.style.borderColor = `${theme.ieee}60`;
              e.currentTarget.style.transform = 'translateY(-3px)';
            }
          }}
          onMouseLeave={(e) => {
            if (selectedVenue !== venue.id) {
              e.currentTarget.style.borderColor = theme.bg;
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}>
            <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ color: theme.text, marginBottom: '0.5rem', fontSize: '1.3rem' }}>
                  {venue.name}
                </h3>
                <div style={{ fontSize: '0.85rem', color: theme.textSecondary, marginBottom: '0.5rem' }}>
                  📍 {venue.coordinates}
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: theme.textSecondary }}>
                  <span>👥 {venue.capacity} capacity</span>
                  <span style={{ 
                    background: `${theme.accent}20`, 
                    color: theme.accent, 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '12px',
                    fontWeight: 'bold'
                  }}>
                    {venue.upcomingEvents} events
                  </span>
                </div>
              </div>
              <div style={{ fontSize: '4rem' }}>{venue.qrCode}</div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontWeight: 'bold', color: theme.text, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Facilities:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {venue.facilities.map((facility, i) => (
                  <span key={i} style={{
                    fontSize: '0.75rem',
                    background: `${theme.accent}10`,
                    color: theme.accent,
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px'
                  }}>
                    {facility}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontWeight: 'bold', color: theme.text, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                AR Features:
              </div>
              {venue.arFeatures.map((feature, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  fontSize: '0.85rem',
                  color: theme.textSecondary,
                  marginBottom: '0.25rem'
                }}>
                  <span style={{ color: theme.ieee }}>✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <button style={{
              width: '100%',
              padding: '0.75rem',
              background: theme.ieee,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}>
              🔲 Scan QR & Launch AR
            </button>
          </div>
        ))}
      </div>

      {/* How to Use AR */}
      <div style={{
        background: theme.white,
        padding: '2rem',
        borderRadius: '16px',
        marginTop: '3rem'
      }}>
        <h2 style={{ color: theme.text, marginBottom: '1.5rem', textAlign: 'center' }}>
          🚀 How to Use AR Navigation
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem'
        }}>
          {[
            { 
              step: '1', 
              title: 'Find QR Code',
              desc: 'Locate QR codes at venue entrances or event posters',
              icon: '🔍'
            },
            { 
              step: '2', 
              title: 'Scan with Camera',
              desc: 'Use your phone camera or IEEE MetaCampus app to scan',
              icon: '📱'
            },
            { 
              step: '3', 
              title: 'Experience AR',
              desc: 'View directions, speaker info, and IEEE history overlays',
              icon: '✨'
            },
            { 
              step: '4', 
              title: 'Navigate Easily',
              desc: 'Follow AR markers to reach your destination',
              icon: '🎯'
            }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: theme.ieee,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: '0 auto 1rem'
              }}>
                {item.step}
              </div>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <h3 style={{ color: theme.text, marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                {item.title}
              </h3>
              <p style={{ color: theme.textSecondary, fontSize: '0.9rem', lineHeight: '1.5' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AR Compatibility */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: `${theme.accent}10`,
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <div style={{ fontWeight: 'bold', color: theme.text, marginBottom: '0.5rem' }}>
          📱 Device Compatibility
        </div>
        <div style={{ color: theme.textSecondary, fontSize: '0.9rem' }}>
          Powered by ARKit (iOS) and ARCore (Android) • Requires camera access • Best with iOS 12+ or Android 8+
        </div>
      </div>
    </div>
  );
}

function VoiceAssistantView({ theme }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [language, setLanguage] = useState('en');

  const sampleQueries = [
    { query: 'What are upcoming IEEE IGDTUW events?', category: 'Events', icon: '📅' },
    { query: 'Check my registration status', category: 'Status', icon: '✅' },
    { query: 'Find AI/ML workshops', category: 'Search', icon: '🔍' },
    { query: 'Connect me with a mentor', category: 'Mentorship', icon: '🎓' },
    { query: 'Show my NFT certificates', category: 'Blockchain', icon: '🎨' },
    { query: 'IEEE IGDTUW ka address kya hai?', category: 'Info (Hindi)', icon: '🏛️' }
  ];

  const features = [
    { icon: '🎤', title: 'Voice Commands', desc: 'Hands-free IEEE queries' },
    { icon: '🌍', title: 'Hindi & English', desc: 'Bilingual support' },
    { icon: '⚡', title: 'Real-time Response', desc: 'Instant answers' },
    { icon: '🔊', title: 'Text-to-Speech', desc: 'Audio responses' }
  ];

  const handleStartListening = () => {
    setIsListening(true);
    setTranscript('');
    setResponse('');
    // Simulate voice recognition
    setTimeout(() => {
      setTranscript('What are upcoming IEEE IGDTUW events?');
      setIsListening(false);
      setTimeout(() => {
        setResponse('I found 3 upcoming events: AI/ML Workshop on Feb 20, Blockchain Hackathon on Feb 25, and IEEE Day Celebration on Mar 5. Would you like to register for any of these?');
      }, 500);
    }, 2000);
  };

  const handleSampleQuery = (query) => {
    setTranscript(query);
    setResponse('Processing your query...');
    setTimeout(() => {
      setResponse(`Here's information about: "${query}". This is a demo response showing how the voice assistant would handle your query.`);
    }, 1000);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ 
          color: theme.text, 
          fontFamily: 'Georgia, serif', 
          fontSize: '2.5rem',
          marginBottom: '1rem'
        }}>
          🎤 Voice-Activated IEEE IGDTUW Assistant
        </h1>
        <p style={{ 
          color: theme.textSecondary, 
          fontSize: '1.1rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Ask questions hands-free with Hindi/English support and real-time responses
        </p>
      </div>

      {/* Features Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {features.map((feature, i) => (
          <div key={i} style={{
            background: theme.white,
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            border: `2px solid ${theme.bg}`
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
            <div style={{ fontWeight: 'bold', color: theme.text, marginBottom: '0.25rem' }}>
              {feature.title}
            </div>
            <div style={{ fontSize: '0.85rem', color: theme.textSecondary }}>
              {feature.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Voice Interface */}
      <div style={{
        background: theme.white,
        padding: '2rem',
        borderRadius: '16px',
        marginBottom: '3rem',
        border: `2px solid ${theme.bg}`
      }}>
        <h2 style={{ color: theme.text, marginBottom: '1.5rem', textAlign: 'center' }}>
          Try Voice Assistant
        </h2>

        {/* Language Selector */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.9rem', color: theme.textSecondary, marginBottom: '0.5rem' }}>
            Select Language:
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {[
              { code: 'en', label: 'English 🇺🇸' },
              { code: 'hi', label: 'हिंदी 🇮🇳' }
            ].map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: language === lang.code ? theme.ieee : theme.bg,
                  color: language === lang.code ? 'white' : theme.text,
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Microphone Button */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <button
            onClick={handleStartListening}
            disabled={isListening}
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: isListening 
                ? 'linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%)' 
                : `linear-gradient(135deg, ${theme.ieee} 0%, #00cc99 100%)`,
              border: 'none',
              cursor: isListening ? 'not-allowed' : 'pointer',
              fontSize: '4rem',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              transition: 'all 0.3s',
              animation: isListening ? 'pulse 1.5s ease-in-out infinite' : 'none'
            }}
            onMouseEnter={(e) => {
              if (!isListening) e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              if (!isListening) e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            🎤
          </button>
          <div style={{ 
            marginTop: '1rem', 
            fontWeight: 'bold', 
            color: theme.text,
            fontSize: '1.1rem'
          }}>
            {isListening ? 'Listening... 🔊' : 'Tap to speak'}
          </div>
        </div>

        {/* Transcript */}
        {transcript && (
          <div style={{
            padding: '1rem',
            background: `${theme.accent}10`,
            borderRadius: '12px',
            marginBottom: '1rem'
          }}>
            <div style={{ fontWeight: 'bold', color: theme.text, marginBottom: '0.5rem' }}>
              You said:
            </div>
            <div style={{ color: theme.textSecondary, fontSize: '1.1rem' }}>
              "{transcript}"
            </div>
          </div>
        )}

        {/* Response */}
        {response && (
          <div style={{
            padding: '1.5rem',
            background: theme.ieee,
            color: 'white',
            borderRadius: '12px',
            display: 'flex',
            gap: '1rem',
            alignItems: 'start'
          }}>
            <div style={{ fontSize: '2rem' }}>🤖</div>
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                IEEE Assistant:
              </div>
              <div style={{ lineHeight: '1.6' }}>
                {response}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sample Queries */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: theme.text, marginBottom: '1.5rem', textAlign: 'center' }}>
          Try These Sample Queries
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '1rem'
        }}>
          {sampleQueries.map((item, i) => (
            <div
              key={i}
              onClick={() => handleSampleQuery(item.query)}
              style={{
                background: theme.white,
                padding: '1.25rem',
                borderRadius: '12px',
                border: `2px solid ${theme.bg}`,
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.ieee;
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.bg;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ fontSize: '2rem' }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: theme.accent, 
                    fontWeight: 'bold',
                    marginBottom: '0.25rem'
                  }}>
                    {item.category}
                  </div>
                  <div style={{ color: theme.text, fontSize: '0.95rem' }}>
                    {item.query}
                  </div>
                </div>
                <div style={{ fontSize: '1.5rem', color: theme.textSecondary }}>▶️</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Info */}
      <div style={{
        background: `${theme.accent}10`,
        padding: '1.5rem',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <div style={{ fontWeight: 'bold', color: theme.text, marginBottom: '0.5rem' }}>
          🔧 Powered by Web Speech API
        </div>
        <div style={{ color: theme.textSecondary, fontSize: '0.9rem' }}>
          Supports real-time transcription • Hindi & English recognition • Text-to-speech responses • Works on modern browsers
        </div>
      </div>
    </div>
  );
}

function RecruitmentView({ theme }) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const recruitmentRoles = [
    {
      id: 'core-technical',
      title: 'Core Team - Technical Lead',
      emoji: '💻',
      color: '#006699',
      openings: 3,
      deadline: '2026-03-01',
      eligibility: ['2nd/3rd year students', 'Strong technical skills', 'Leadership experience'],
      responsibilities: [
        'Lead technical workshops and events',
        'Mentor junior members',
        'Coordinate with faculty advisors',
        'Manage project deliverables'
      ],
      requirements: ['AI/ML or Web Development expertise', 'Past IEEE event participation', 'Good communication skills']
    },
    {
      id: 'core-events',
      title: 'Core Team - Events Coordinator',
      emoji: '🎪',
      color: '#ff6b6b',
      openings: 2,
      deadline: '2026-03-01',
      eligibility: ['2nd/3rd year students', 'Event management experience', 'Creative mindset'],
      responsibilities: [
        'Plan and execute IEEE events',
        'Coordinate with speakers and vendors',
        'Manage event budgets',
        'Handle logistics and promotions'
      ],
      requirements: ['Strong organizational skills', 'Team player', 'Past event coordination experience']
    },
    {
      id: 'associate-content',
      title: 'Associate - Content Writer',
      emoji: '✍️',
      color: '#4ecdc4',
      openings: 5,
      deadline: '2026-03-05',
      eligibility: ['All years', 'Good writing skills', 'Tech-savvy'],
      responsibilities: [
        'Write technical blogs and articles',
        'Create social media content',
        'Document IEEE events',
        'Maintain website content'
      ],
      requirements: ['Excellent English writing', 'Knowledge of tech trends', 'Creativity']
    },
    {
      id: 'associate-design',
      title: 'Associate - Design & Media',
      emoji: '🎨',
      color: '#9b59b6',
      openings: 4,
      deadline: '2026-03-05',
      eligibility: ['All years', 'Design portfolio required', 'Creative tools proficiency'],
      responsibilities: [
        'Design event posters and banners',
        'Create social media graphics',
        'Edit event videos and photos',
        'Maintain visual brand identity'
      ],
      requirements: ['Adobe Creative Suite or Canva', 'Portfolio of past work', 'Creative thinking']
    },
    {
      id: 'coordinator-outreach',
      title: 'Coordinator - Outreach & PR',
      emoji: '📢',
      color: '#00cc99',
      openings: 3,
      deadline: '2026-03-10',
      eligibility: ['1st/2nd year students', 'Good communication', 'Social media skills'],
      responsibilities: [
        'Manage social media accounts',
        'Connect with other IEEE chapters',
        'Promote IEEE events',
        'Build community engagement'
      ],
      requirements: ['Active on social media', 'Good interpersonal skills', 'Marketing knowledge']
    }
  ];

  const applicationProcess = [
    { step: 1, title: 'Choose Role', desc: 'Select the position that matches your skills', icon: '🎯' },
    { step: 2, title: 'Fill Application', desc: 'Complete the detailed application form', icon: '📝' },
    { step: 3, title: 'Submit Portfolio', desc: 'Share relevant work samples (if applicable)', icon: '📁' },
    { step: 4, title: 'Shortlisting', desc: 'Wait for review (3-5 working days)', icon: '⏳' },
    { step: 5, title: 'Interview', desc: 'Attend interview with IEEE panel', icon: '💬' },
    { step: 6, title: 'Selection', desc: 'Receive acceptance notification', icon: '🎉' }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ 
          color: theme.text, 
          fontFamily: 'Georgia, serif', 
          fontSize: '2.5rem',
          marginBottom: '1rem'
        }}>
          📝 IEEE IGDTUW Recruitment 2026
        </h1>
        <p style={{ 
          color: theme.textSecondary, 
          fontSize: '1.1rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Join the IEEE IGDTUW family! Applications open for Core Team, Associates, and Coordinators
        </p>
      </div>

      {/* Recruitment Stats */}
      <div style={{
        background: `linear-gradient(135deg, ${theme.ieee} 0%, #00cc99 100%)`,
        padding: '2rem',
        borderRadius: '16px',
        color: 'white',
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '2rem'
        }}>
          {[
            { label: 'Open Positions', value: '17', icon: '📊' },
            { label: 'Departments', value: '5', icon: '🏢' },
            { label: 'Benefits', value: '∞', icon: '🎁' },
            { label: 'Growth', value: '100%', icon: '📈' }
          ].map((stat, i) => (
            <div key={i}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Roles */}
      <h2 style={{ color: theme.text, marginBottom: '1.5rem' }}>
        🎯 Available Positions
      </h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {recruitmentRoles.map((role) => (
          <div key={role.id} style={{
            background: theme.white,
            borderRadius: '16px',
            padding: '1.5rem',
            border: selectedRole === role.id ? `3px solid ${role.color}` : `2px solid ${theme.bg}`,
            transition: 'all 0.3s',
            cursor: 'pointer'
          }}
          onClick={() => setSelectedRole(role.id)}>
            <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ fontSize: '3rem' }}>{role.emoji}</div>
                <div>
                  <h3 style={{ color: theme.text, margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
                    {role.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem' }}>
                    <span style={{ 
                      background: `${role.color}20`, 
                      color: role.color, 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '12px',
                      fontWeight: 'bold'
                    }}>
                      {role.openings} openings
                    </span>
                    <span style={{ color: theme.textSecondary }}>
                      📅 {role.deadline}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontWeight: 'bold', color: theme.text, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Eligibility:
              </div>
              {role.eligibility.map((item, i) => (
                <div key={i} style={{ 
                  fontSize: '0.85rem', 
                  color: theme.textSecondary,
                  marginBottom: '0.25rem',
                  paddingLeft: '1rem'
                }}>
                  • {item}
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontWeight: 'bold', color: theme.text, marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Key Responsibilities:
              </div>
              {role.responsibilities.slice(0, 3).map((item, i) => (
                <div key={i} style={{ 
                  fontSize: '0.85rem', 
                  color: theme.textSecondary,
                  marginBottom: '0.25rem',
                  paddingLeft: '1rem'
                }}>
                  • {item}
                </div>
              ))}
              {role.responsibilities.length > 3 && (
                <div style={{ 
                  fontSize: '0.85rem', 
                  color: role.color,
                  marginTop: '0.25rem',
                  fontWeight: 'bold'
                }}>
                  +{role.responsibilities.length - 3} more...
                </div>
              )}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedRole(role.id);
                setShowApplicationForm(true);
              }}
              style={{
                width: '100%',
                padding: '0.875rem',
                background: selectedRole === role.id ? role.color : theme.bg,
                color: selectedRole === role.id ? 'white' : theme.text,
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              Apply Now →
            </button>
          </div>
        ))}
      </div>

      {/* Application Process */}
      <div style={{
        background: theme.white,
        padding: '2rem',
        borderRadius: '16px',
        marginBottom: '3rem'
      }}>
        <h2 style={{ color: theme.text, marginBottom: '1.5rem', textAlign: 'center' }}>
          📋 Application Process
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '1.5rem'
        }}>
          {applicationProcess.map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: theme.ieee,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                margin: '0 auto 0.5rem'
              }}>
                {item.step}
              </div>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <h3 style={{ color: theme.text, marginBottom: '0.25rem', fontSize: '1rem' }}>
                {item.title}
              </h3>
              <p style={{ color: theme.textSecondary, fontSize: '0.85rem', lineHeight: '1.4' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits of Joining */}
      <div style={{
        background: `${theme.accent}10`,
        padding: '2rem',
        borderRadius: '16px',
        marginBottom: '3rem'
      }}>
        <h2 style={{ color: theme.text, marginBottom: '1.5rem', textAlign: 'center' }}>
          🎁 Why Join IEEE IGDTUW?
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem'
        }}>
          {[
            { icon: '🏆', title: 'Leadership Skills', desc: 'Develop management & coordination abilities' },
            { icon: '🤝', title: 'Networking', desc: 'Connect with industry professionals' },
            { icon: '📚', title: 'Learning', desc: 'Access to workshops & resources' },
            { icon: '🎯', title: 'Experience', desc: 'Organize real IEEE events' },
            { icon: '📜', title: 'Certificates', desc: 'Official IEEE recognition' },
            { icon: '⭐', title: 'Portfolio', desc: 'Build impressive credentials' }
          ].map((benefit, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{benefit.icon}</div>
              <h3 style={{ color: theme.text, marginBottom: '0.25rem' }}>
                {benefit.title}
              </h3>
              <p style={{ color: theme.textSecondary, fontSize: '0.9rem' }}>
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '2rem'
        }}
        onClick={() => setShowApplicationForm(false)}>
          <div style={{
            background: theme.white,
            padding: '2rem',
            borderRadius: '16px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: theme.text, marginBottom: '1.5rem' }}>
              Apply for Position
            </h2>
            
            <div style={{
              padding: '1rem',
              background: `${theme.ieee}10`,
              borderRadius: '8px',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontWeight: 'bold', color: theme.text }}>
                {recruitmentRoles.find(r => r.id === selectedRole)?.title}
              </div>
            </div>

            <div style={{ color: theme.text, marginBottom: '1.5rem', lineHeight: '1.6' }}>
              <p style={{ marginBottom: '1rem' }}>
                To apply for this position at IEEE IGDTUW:
              </p>
              <ol style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Fill the Google Form application</li>
                <li style={{ marginBottom: '0.5rem' }}>Upload your resume/CV</li>
                <li style={{ marginBottom: '0.5rem' }}>Submit portfolio (if applicable)</li>
                <li style={{ marginBottom: '0.5rem' }}>Wait for shortlisting notification</li>
              </ol>
              <div style={{ 
                padding: '1rem', 
                background: `${theme.accent}10`, 
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}>
                💡 <strong>Tip:</strong> Make sure your application highlights relevant skills and past IEEE/tech event participation!
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button style={{
                flex: 1,
                padding: '0.875rem',
                background: theme.ieee,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              onClick={() => alert('Opening Google Form... (Demo)')}>
                Open Application Form
              </button>
              <button style={{
                flex: 1,
                padding: '0.875rem',
                background: theme.bg,
                color: theme.text,
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              onClick={() => setShowApplicationForm(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact for Queries */}
      <div style={{
        background: theme.white,
        padding: '2rem',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: theme.text, marginBottom: '1rem' }}>
          Have Questions About Recruitment?
        </h3>
        <p style={{ color: theme.textSecondary, marginBottom: '1.5rem' }}>
          Contact IEEE IGDTUW Recruitment Team
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            padding: '0.75rem 1.5rem',
            background: theme.ieee,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            ✉️ recruitment@ieeeigdtuw.com
          </button>
          <button style={{
            padding: '0.75rem 1.5rem',
            background: '#25D366',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            💬 WhatsApp Group
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
