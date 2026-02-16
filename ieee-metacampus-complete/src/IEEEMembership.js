import React, { useState } from 'react';

function IEEEMembership({ theme }) {
  const [selectedTier, setSelectedTier] = useState('student');
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const membershipTiers = [
    {
      id: 'student',
      name: 'Student Member',
      price: '$32/year',
      emoji: '🎓',
      color: '#006699',
      benefits: [
        'Access to IEEE Xplore Digital Library',
        'Discounted conference registrations',
        'Free IEEE Spectrum magazine subscription',
        'Career development resources',
        'Networking opportunities',
        'Technical society memberships at reduced rates'
      ],
      eligibility: 'Full-time students enrolled in recognized institutions'
    },
    {
      id: 'graduate',
      name: 'Graduate Student',
      price: '$32/year',
      emoji: '👨‍🎓',
      color: '#0099cc',
      benefits: [
        'All student member benefits',
        'Research publication opportunities',
        'Advanced technical resources',
        'Mentorship programs',
        'Travel grants for conferences',
        'Professional development webinars'
      ],
      eligibility: 'Graduate students in MS/PhD programs'
    },
    {
      id: 'professional',
      name: 'Professional Member',
      price: '$199/year',
      emoji: '💼',
      color: '#00cc99',
      benefits: [
        'Full IEEE Xplore access',
        'IEEE membership certificate',
        'Voting rights in IEEE elections',
        'Leadership opportunities',
        'Industry connections',
        'Continuing education credits'
      ],
      eligibility: 'Working professionals and researchers'
    }
  ];

  const pathways = [
    {
      title: 'Online Application',
      icon: '💻',
      steps: ['Visit ieee.org', 'Create account', 'Fill application', 'Make payment'],
      duration: '15 minutes'
    },
    {
      title: 'Campus Chapter',
      icon: '🏛️',
      steps: ['Contact IEEE IGDTUW', 'Attend orientation', 'Submit documents', 'Get approved'],
      duration: '3-5 days'
    },
    {
      title: 'Group Application',
      icon: '👥',
      steps: ['Form group (5+)', 'Contact chapter lead', 'Bulk registration', 'Group discount'],
      duration: '1 week'
    }
  ];

  const benefits = [
    { icon: '📚', title: 'Knowledge Access', desc: '5M+ technical documents' },
    { icon: '🌐', title: 'Global Network', desc: '420K+ members worldwide' },
    { icon: '🎯', title: 'Career Growth', desc: 'Job board & career tools' },
    { icon: '🏆', title: 'Recognition', desc: 'Awards & certifications' },
    { icon: '🎪', title: 'Events', desc: '1900+ conferences annually' },
    { icon: '💡', title: 'Innovation', desc: 'Standards & publications' }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ 
          color: theme.text, 
          fontFamily: 'Georgia, serif', 
          fontSize: '2.5rem',
          marginBottom: '1rem'
        }}>
          ⚡ IEEE Membership & Benefits
        </h1>
        <p style={{ 
          color: theme.textSecondary, 
          fontSize: '1.1rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Join the world's largest technical professional organization and unlock endless opportunities
        </p>
      </div>

      {/* Quick Benefits Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
        gap: '1rem',
        marginBottom: '3rem'
      }}>
        {benefits.map((benefit, i) => (
          <div key={i} style={{
            background: theme.white,
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            transition: 'transform 0.3s',
            cursor: 'pointer',
            border: `2px solid ${theme.bg}`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.borderColor = theme.ieee;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = theme.bg;
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{benefit.icon}</div>
            <div style={{ fontWeight: 'bold', color: theme.text, marginBottom: '0.25rem' }}>
              {benefit.title}
            </div>
            <div style={{ fontSize: '0.85rem', color: theme.textSecondary }}>
              {benefit.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Membership Tiers */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: theme.text, marginBottom: '1.5rem', textAlign: 'center' }}>
          Choose Your Membership
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem'
        }}>
          {membershipTiers.map((tier) => (
            <div key={tier.id} style={{
              background: theme.white,
              borderRadius: '16px',
              padding: '2rem',
              border: selectedTier === tier.id ? `3px solid ${tier.color}` : `2px solid ${theme.bg}`,
              transition: 'all 0.3s',
              cursor: 'pointer',
              transform: selectedTier === tier.id ? 'scale(1.02)' : 'scale(1)'
            }}
            onClick={() => setSelectedTier(tier.id)}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{tier.emoji}</div>
                <h3 style={{ color: theme.text, marginBottom: '0.5rem' }}>{tier.name}</h3>
                <div style={{ 
                  fontSize: '2rem', 
                  fontWeight: 'bold', 
                  color: tier.color,
                  marginBottom: '0.5rem'
                }}>
                  {tier.price}
                </div>
                <div style={{ 
                  fontSize: '0.85rem', 
                  color: theme.textSecondary,
                  fontStyle: 'italic'
                }}>
                  {tier.eligibility}
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ 
                  fontWeight: 'bold', 
                  color: theme.text, 
                  marginBottom: '0.75rem',
                  fontSize: '0.9rem'
                }}>
                  Benefits Include:
                </div>
                {tier.benefits.map((benefit, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    alignItems: 'start', 
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                    fontSize: '0.9rem',
                    color: theme.textSecondary
                  }}>
                    <span style={{ color: tier.color }}>✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <button style={{
                width: '100%',
                padding: '0.875rem',
                background: selectedTier === tier.id ? tier.color : theme.bg,
                color: selectedTier === tier.id ? 'white' : theme.text,
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onClick={(e) => {
                e.stopPropagation();
                setShowApplicationForm(true);
              }}>
                {selectedTier === tier.id ? 'Apply Now ➜' : 'Select'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Application Pathways */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: theme.text, marginBottom: '1.5rem', textAlign: 'center' }}>
          How to Join IEEE
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '1.5rem'
        }}>
          {pathways.map((pathway, i) => (
            <div key={i} style={{
              background: theme.white,
              padding: '1.5rem',
              borderRadius: '12px',
              border: `2px solid ${theme.bg}`
            }}>
              <div style={{ 
                fontSize: '3rem', 
                textAlign: 'center', 
                marginBottom: '1rem' 
              }}>
                {pathway.icon}
              </div>
              <h3 style={{ 
                color: theme.text, 
                textAlign: 'center', 
                marginBottom: '1rem' 
              }}>
                {pathway.title}
              </h3>
              <div style={{ 
                fontSize: '0.85rem', 
                color: theme.textSecondary, 
                textAlign: 'center',
                marginBottom: '1rem',
                fontWeight: 'bold'
              }}>
                ⏱️ {pathway.duration}
              </div>
              <div style={{ marginBottom: '1rem' }}>
                {pathway.steps.map((step, j) => (
                  <div key={j} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.75rem',
                    fontSize: '0.9rem'
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: theme.ieee,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}>
                      {j + 1}
                    </div>
                    <span style={{ color: theme.text }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div style={{ 
        background: `linear-gradient(135deg, ${theme.ieee} 0%, #00cc99 100%)`,
        padding: '2rem',
        borderRadius: '16px',
        color: 'white',
        marginBottom: '3rem'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>IEEE by Numbers</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem',
          textAlign: 'center'
        }}>
          {[
            { value: '420K+', label: 'Members Worldwide' },
            { value: '160+', label: 'Countries' },
            { value: '1900+', label: 'Conferences/Year' },
            { value: '200+', label: 'Transactions & Journals' },
            { value: '5M+', label: 'Documents in Xplore' },
            { value: '39', label: 'Technical Societies' }
          ].map((stat, i) => (
            <div key={i}>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                marginBottom: '0.5rem' 
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                {stat.label}
              </div>
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
            maxWidth: '500px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: theme.text, marginBottom: '1.5rem' }}>
              Apply for IEEE Membership
            </h2>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ 
                padding: '1rem', 
                background: `${theme.ieee}10`, 
                borderRadius: '8px',
                marginBottom: '1.5rem'
              }}>
                <div style={{ fontWeight: 'bold', color: theme.text, marginBottom: '0.5rem' }}>
                  Selected: {membershipTiers.find(t => t.id === selectedTier)?.name}
                </div>
                <div style={{ color: theme.textSecondary, fontSize: '0.9rem' }}>
                  {membershipTiers.find(t => t.id === selectedTier)?.price}
                </div>
              </div>
              
              <div style={{ color: theme.text, marginBottom: '1rem', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '1rem' }}>
                  To complete your IEEE membership application:
                </p>
                <ol style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Visit <strong>ieee.org</strong></li>
                  <li style={{ marginBottom: '0.5rem' }}>Create your IEEE account</li>
                  <li style={{ marginBottom: '0.5rem' }}>Complete the application form</li>
                  <li style={{ marginBottom: '0.5rem' }}>Submit payment</li>
                </ol>
                <p style={{ 
                  padding: '1rem', 
                  background: `${theme.accent}10`, 
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}>
                  💡 <strong>Tip:</strong> Contact IEEE IGDTUW chapter for guidance and group discount opportunities!
                </p>
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
              onClick={() => window.open('https://www.ieee.org/membership/join/', '_blank')}>
                Go to IEEE.org
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

      {/* Contact Section */}
      <div style={{
        background: theme.white,
        padding: '2rem',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: theme.text, marginBottom: '1rem' }}>
          Have Questions?
        </h3>
        <p style={{ color: theme.textSecondary, marginBottom: '1.5rem' }}>
          Contact IEEE IGDTUW Chapter for personalized guidance
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            padding: '0.75rem 1.5rem',
            background: theme.ieee,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ✉️ Email Chapter
          </button>
          <button style={{
            padding: '0.75rem 1.5rem',
            background: '#0077b5',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            💬 Join WhatsApp Group
          </button>
        </div>
      </div>
    </div>
  );
}

export default IEEEMembership;