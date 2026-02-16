import React, { useState } from 'react';

function FeedbackSystem({ theme }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    overall: 5,
    content: 5,
    organization: 5,
    venue: 5,
    speaker: 5,
    attendAgain: 'yes',
    recommend: 'yes',
    highlights: '',
    improvements: '',
    suggestions: '',
    name: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const recentEvents = [
    { 
      id: 1, 
      title: 'AI/ML Workshop', 
      date: '2026-02-15', 
      attendees: 45,
      feedbackCount: 38,
      avgRating: 4.8 
    },
    { 
      id: 2, 
      title: 'Blockchain Hackathon', 
      date: '2026-02-10', 
      attendees: 120,
      feedbackCount: 102,
      avgRating: 4.9 
    },
    { 
      id: 3, 
      title: 'Web3 Masterclass', 
      date: '2026-02-05', 
      attendees: 60,
      feedbackCount: 55,
      avgRating: 4.7 
    },
    { 
      id: 4, 
      title: 'IEEE Day Celebration', 
      date: '2026-01-28', 
      attendees: 200,
      feedbackCount: 175,
      avgRating: 4.6 
    }
  ];

  const feedbackStats = [
    { label: 'Total Responses', value: '370', icon: '📝' },
    { label: 'Average Rating', value: '4.7/5', icon: '⭐' },
    { label: 'Response Rate', value: '86%', icon: '📊' },
    { label: 'NPS Score', value: '+68', icon: '💯' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => {
        setShowForm(false);
        setSubmitted(false);
        setFormData({
          overall: 5,
          content: 5,
          organization: 5,
          venue: 5,
          speaker: 5,
          attendAgain: 'yes',
          recommend: 'yes',
          highlights: '',
          improvements: '',
          suggestions: '',
          name: '',
          email: ''
        });
      }, 2000);
    }, 1000);
  };

  const RatingInput = ({ label, value, onChange }) => (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{ 
        display: 'block', 
        color: theme.text, 
        fontWeight: 'bold',
        marginBottom: '0.75rem'
      }}>
        {label}
      </label>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            style={{
              width: '50px',
              height: '50px',
              border: 'none',
              background: value >= rating ? theme.ieee : theme.bg,
              color: value >= rating ? 'white' : theme.textSecondary,
              borderRadius: '8px',
              fontSize: '1.25rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontWeight: 'bold'
            }}
            onMouseEnter={(e) => {
              if (value < rating) {
                e.currentTarget.style.background = `${theme.ieee}40`;
              }
            }}
            onMouseLeave={(e) => {
              if (value < rating) {
                e.currentTarget.style.background = theme.bg;
              }
            }}
          >
            {rating}
          </button>
        ))}
        <span style={{ 
          marginLeft: '1rem', 
          color: theme.text,
          fontWeight: 'bold',
          fontSize: '1.1rem'
        }}>
          {value}/5
        </span>
      </div>
    </div>
  );

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
          📋 Event Feedback System
        </h1>
        <p style={{ 
          color: theme.textSecondary, 
          fontSize: '1.1rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Your feedback helps us create better experiences for everyone
        </p>
      </div>

      {/* Stats Overview */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {feedbackStats.map((stat, i) => (
          <div key={i} style={{
            background: theme.white,
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            border: `2px solid ${theme.bg}`
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: theme.ieee,
              marginBottom: '0.25rem'
            }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.9rem', color: theme.textSecondary }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Events - Provide Feedback */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: theme.text, marginBottom: '1.5rem' }}>
          📅 Recent Events - Share Your Feedback
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '1.5rem'
        }}>
          {recentEvents.map((event) => (
            <div key={event.id} style={{
              background: theme.white,
              padding: '1.5rem',
              borderRadius: '12px',
              border: `2px solid ${theme.bg}`,
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.ieee;
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.bg;
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <h3 style={{ 
                color: theme.text, 
                marginBottom: '0.75rem',
                fontSize: '1.1rem'
              }}>
                {event.title}
              </h3>
              <div style={{ 
                color: theme.textSecondary, 
                fontSize: '0.9rem',
                marginBottom: '1rem'
              }}>
                📅 {new Date(event.date).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '1rem',
                padding: '0.75rem',
                background: theme.bg,
                borderRadius: '8px'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>
                    Attendees
                  </div>
                  <div style={{ fontWeight: 'bold', color: theme.text }}>
                    {event.attendees}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>
                    Responses
                  </div>
                  <div style={{ fontWeight: 'bold', color: theme.text }}>
                    {event.feedbackCount}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: theme.textSecondary }}>
                    Rating
                  </div>
                  <div style={{ fontWeight: 'bold', color: theme.ieee }}>
                    ⭐ {event.avgRating}
                  </div>
                </div>
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
                transition: 'all 0.3s'
              }}
              onClick={() => {
                setSelectedEvent(event);
                setShowForm(true);
              }}>
                Give Feedback ➜
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Impact Section */}
      <div style={{
        background: `linear-gradient(135deg, ${theme.ieee} 0%, #00cc99 100%)`,
        padding: '2rem',
        borderRadius: '16px',
        color: 'white',
        marginBottom: '3rem'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Your Feedback Makes a Difference!
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1.5rem'
        }}>
          {[
            { 
              icon: '🎯', 
              title: 'Improved Events', 
              desc: 'We implemented 85% of suggestions from last semester'
            },
            { 
              icon: '📈', 
              title: 'Better Content', 
              desc: 'Workshop quality increased by 40% based on feedback'
            },
            { 
              icon: '🤝', 
              title: 'Enhanced Experience', 
              desc: 'Satisfaction rate grew from 4.3 to 4.7 stars'
            }
          ].map((impact, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '1.5rem',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                {impact.icon}
              </div>
              <h3 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                {impact.title}
              </h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                {impact.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Form Modal */}
      {showForm && selectedEvent && (
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
          padding: '2rem',
          overflowY: 'auto'
        }}
        onClick={() => !submitted && setShowForm(false)}>
          <div style={{
            background: theme.white,
            padding: '2rem',
            borderRadius: '16px',
            maxWidth: '700px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            margin: '2rem 0'
          }}
          onClick={(e) => e.stopPropagation()}>
            {!submitted ? (
              <>
                <h2 style={{ color: theme.text, marginBottom: '0.5rem' }}>
                  Event Feedback Form
                </h2>
                <h3 style={{ 
                  color: theme.ieee, 
                  marginBottom: '2rem',
                  fontWeight: 'normal'
                }}>
                  {selectedEvent.title}
                </h3>

                <form onSubmit={handleSubmit}>
                  {/* Rating Sections */}
                  <RatingInput
                    label="Overall Experience"
                    value={formData.overall}
                    onChange={(val) => handleInputChange('overall', val)}
                  />
                  
                  <RatingInput
                    label="Content Quality"
                    value={formData.content}
                    onChange={(val) => handleInputChange('content', val)}
                  />
                  
                  <RatingInput
                    label="Organization & Planning"
                    value={formData.organization}
                    onChange={(val) => handleInputChange('organization', val)}
                  />
                  
                  <RatingInput
                    label="Venue & Facilities"
                    value={formData.venue}
                    onChange={(val) => handleInputChange('venue', val)}
                  />
                  
                  <RatingInput
                    label="Speaker/Instructor"
                    value={formData.speaker}
                    onChange={(val) => handleInputChange('speaker', val)}
                  />

                  {/* Yes/No Questions */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ 
                      display: 'block', 
                      color: theme.text, 
                      fontWeight: 'bold',
                      marginBottom: '0.75rem'
                    }}>
                      Would you attend similar events in the future?
                    </label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      {['yes', 'no', 'maybe'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleInputChange('attendAgain', option)}
                          style={{
                            flex: 1,
                            padding: '0.75rem',
                            border: `2px solid ${formData.attendAgain === option ? theme.ieee : theme.bg}`,
                            background: formData.attendAgain === option ? `${theme.ieee}10` : 'transparent',
                            color: theme.text,
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: formData.attendAgain === option ? 'bold' : 'normal',
                            textTransform: 'capitalize'
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ 
                      display: 'block', 
                      color: theme.text, 
                      fontWeight: 'bold',
                      marginBottom: '0.75rem'
                    }}>
                      Would you recommend this event to others?
                    </label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      {['yes', 'no', 'maybe'].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleInputChange('recommend', option)}
                          style={{
                            flex: 1,
                            padding: '0.75rem',
                            border: `2px solid ${formData.recommend === option ? theme.ieee : theme.bg}`,
                            background: formData.recommend === option ? `${theme.ieee}10` : 'transparent',
                            color: theme.text,
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: formData.recommend === option ? 'bold' : 'normal',
                            textTransform: 'capitalize'
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text Areas */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ 
                      display: 'block', 
                      color: theme.text, 
                      fontWeight: 'bold',
                      marginBottom: '0.75rem'
                    }}>
                      What did you like most about the event?
                    </label>
                    <textarea
                      value={formData.highlights}
                      onChange={(e) => handleInputChange('highlights', e.target.value)}
                      placeholder="Share the highlights..."
                      style={{
                        width: '100%',
                        minHeight: '80px',
                        padding: '0.75rem',
                        border: `2px solid ${theme.bg}`,
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        background: theme.bg,
                        color: theme.text
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ 
                      display: 'block', 
                      color: theme.text, 
                      fontWeight: 'bold',
                      marginBottom: '0.75rem'
                    }}>
                      What could be improved?
                    </label>
                    <textarea
                      value={formData.improvements}
                      onChange={(e) => handleInputChange('improvements', e.target.value)}
                      placeholder="Help us improve..."
                      style={{
                        width: '100%',
                        minHeight: '80px',
                        padding: '0.75rem',
                        border: `2px solid ${theme.bg}`,
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        background: theme.bg,
                        color: theme.text
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ 
                      display: 'block', 
                      color: theme.text, 
                      fontWeight: 'bold',
                      marginBottom: '0.75rem'
                    }}>
                      Any suggestions for future events?
                    </label>
                    <textarea
                      value={formData.suggestions}
                      onChange={(e) => handleInputChange('suggestions', e.target.value)}
                      placeholder="We'd love to hear your ideas..."
                      style={{
                        width: '100%',
                        minHeight: '80px',
                        padding: '0.75rem',
                        border: `2px solid ${theme.bg}`,
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        background: theme.bg,
                        color: theme.text
                      }}
                    />
                  </div>

                  {/* Optional Contact Info */}
                  <div style={{ 
                    padding: '1rem',
                    background: `${theme.accent}10`,
                    borderRadius: '8px',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ 
                      fontWeight: 'bold', 
                      color: theme.text,
                      marginBottom: '1rem'
                    }}>
                      Contact Information (Optional)
                    </div>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your Name"
                        style={{
                          padding: '0.75rem',
                          border: `2px solid ${theme.bg}`,
                          borderRadius: '8px',
                          fontSize: '1rem',
                          background: theme.white,
                          color: theme.text
                        }}
                      />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Your Email"
                        style={{
                          padding: '0.75rem',
                          border: `2px solid ${theme.bg}`,
                          borderRadius: '8px',
                          fontSize: '1rem',
                          background: theme.white,
                          color: theme.text
                        }}
                      />
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      type="submit"
                      style={{
                        flex: 1,
                        padding: '1rem',
                        background: theme.ieee,
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                    >
                      Submit Feedback
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      style={{
                        flex: 1,
                        padding: '1rem',
                        background: theme.bg,
                        color: theme.text,
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ 
                  fontSize: '5rem', 
                  marginBottom: '1rem',
                  animation: 'pulse 1s ease-in-out'
                }}>
                  ✅
                </div>
                <h2 style={{ color: theme.text, marginBottom: '1rem' }}>
                  Thank You!
                </h2>
                <p style={{ color: theme.textSecondary, fontSize: '1.1rem' }}>
                  Your feedback has been submitted successfully
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackSystem;