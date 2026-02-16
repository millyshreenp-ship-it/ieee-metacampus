import React, { useState } from 'react';

function SocialLinks({ theme }) {
  const [copiedLink, setCopiedLink] = useState(null);

  const socialPlatforms = [
    {
      name: 'LinkedIn',
      icon: '💼',
      url: 'https://www.linkedin.com/company/ieee-igdtuw/',
      color: '#0077b5',
      description: 'Connect professionally and stay updated with career opportunities',
      followers: '2.5K+',
      type: 'professional'
    },
    {
      name: 'Instagram',
      icon: '📸',
      url: 'https://www.instagram.com/ieeeigdtuw/',
      color: '#E4405F',
      description: 'Follow our visual journey, event highlights, and behind-the-scenes',
      followers: '3.2K+',
      type: 'social'
    },
    {
      name: 'Website',
      icon: '🌐',
      url: 'https://ieeeigdtuw.com/',
      color: '#006699',
      description: 'Official website with detailed information, events, and resources',
      followers: '10K+ visits',
      type: 'web'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: 'https://twitter.com/ieeeigdtuw',
      color: '#1DA1F2',
      description: 'Real-time updates, announcements, and tech discussions',
      followers: '1.8K+',
      type: 'social'
    },
    {
      name: 'GitHub',
      icon: '💻',
      url: 'https://github.com/ieee-igdtuw',
      color: '#333',
      description: 'Open-source projects, code repositories, and collaborations',
      followers: '500+ stars',
      type: 'technical'
    },
    {
      name: 'YouTube',
      icon: '📹',
      url: 'https://www.youtube.com/@ieeeigdtuw',
      color: '#FF0000',
      description: 'Workshop recordings, tutorials, and event highlights',
      followers: '1.5K+ subs',
      type: 'video'
    },
    {
      name: 'Discord',
      icon: '💬',
      url: 'https://discord.gg/ieeeigdtuw',
      color: '#5865F2',
      description: 'Join our community server for discussions and collaborations',
      followers: '800+ members',
      type: 'community'
    },
    {
      name: 'Medium',
      icon: '✍️',
      url: 'https://medium.com/@ieeeigdtuw',
      color: '#000000',
      description: 'Technical articles, tutorials, and thought leadership',
      followers: '600+ readers',
      type: 'blog'
    }
  ];

  const quickLinks = [
    { title: 'Join Our WhatsApp', icon: '📱', url: '#', color: '#25D366' },
    { title: 'Telegram Channel', icon: '✈️', url: '#', color: '#0088cc' },
    { title: 'Email Newsletter', icon: '📧', url: '#', color: '#EA4335' },
    { title: 'RSS Feed', icon: '📡', url: '#', color: '#FFA500' }
  ];

  const handleCopyLink = (url, name) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(name);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const handleShare = async (platform) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `IEEE IGDTUW on ${platform.name}`,
          text: `Check out IEEE IGDTUW on ${platform.name}!`,
          url: platform.url
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      window.open(platform.url, '_blank');
    }
  };

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
          🌟 Connect With IEEE IGDTUW
        </h1>
        <p style={{ 
          color: theme.textSecondary, 
          fontSize: '1.1rem',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          Stay connected across all platforms for updates, events, tech content, and community interactions
        </p>
      </div>

      {/* Quick Stats */}
      <div style={{
        background: `linear-gradient(135deg, ${theme.ieee} 0%, #00cc99 100%)`,
        padding: '2rem',
        borderRadius: '16px',
        color: 'white',
        marginBottom: '3rem',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '2rem' }}>Our Community Reach</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '2rem'
        }}>
          {[
            { label: 'Total Followers', value: '10K+', icon: '👥' },
            { label: 'Monthly Reach', value: '50K+', icon: '📊' },
            { label: 'Active Members', value: '800+', icon: '⚡' },
            { label: 'Engagement Rate', value: '8.5%', icon: '💯' }
          ].map((stat, i) => (
            <div key={i}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                {stat.icon}
              </div>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                marginBottom: '0.25rem' 
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

      {/* Main Social Platforms */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: theme.text, marginBottom: '1.5rem' }}>
          📱 Follow Us On Social Media
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem'
        }}>
          {socialPlatforms.map((platform) => (
            <div key={platform.name} style={{
              background: theme.white,
              borderRadius: '16px',
              padding: '1.5rem',
              border: `2px solid ${theme.bg}`,
              transition: 'all 0.3s',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = platform.color;
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = `0 10px 30px ${platform.color}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.bg;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              {/* Platform Icon and Badge */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'start', 
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  background: `${platform.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem'
                }}>
                  {platform.icon}
                </div>
                <div style={{
                  padding: '0.25rem 0.75rem',
                  background: `${platform.color}15`,
                  color: platform.color,
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}>
                  {platform.type}
                </div>
              </div>

              {/* Platform Name */}
              <h3 style={{ 
                color: theme.text, 
                marginBottom: '0.5rem',
                fontSize: '1.3rem',
                fontWeight: 'bold'
              }}>
                {platform.name}
              </h3>

              {/* Followers */}
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem',
                color: theme.textSecondary,
                fontSize: '0.9rem'
              }}>
                <span>👥</span>
                <span style={{ fontWeight: 'bold', color: platform.color }}>
                  {platform.followers}
                </span>
              </div>

              {/* Description */}
              <p style={{ 
                color: theme.textSecondary, 
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
                lineHeight: '1.5'
              }}>
                {platform.description}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => window.open(platform.url, '_blank')}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: platform.color,
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  Visit {platform.name}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyLink(platform.url, platform.name);
                  }}
                  style={{
                    padding: '0.75rem',
                    background: theme.bg,
                    color: theme.text,
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    minWidth: '45px'
                  }}
                  title="Copy Link"
                >
                  {copiedLink === platform.name ? '✓' : '📋'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: theme.text, marginBottom: '1.5rem' }}>
          ⚡ Quick Access Links
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '1rem'
        }}>
          {quickLinks.map((link, i) => (
            <div key={i} style={{
              background: theme.white,
              padding: '1.25rem',
              borderRadius: '12px',
              border: `2px solid ${theme.bg}`,
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = link.color;
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.bg;
              e.currentTarget.style.transform = 'scale(1)';
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '10px',
                background: `${link.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                {link.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontWeight: 'bold', 
                  color: theme.text,
                  marginBottom: '0.25rem'
                }}>
                  {link.title}
                </div>
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: link.color,
                  fontWeight: 'bold'
                }}>
                  Join Now →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Tips */}
      <div style={{
        background: theme.white,
        padding: '2rem',
        borderRadius: '16px',
        border: `2px solid ${theme.bg}`,
        marginBottom: '3rem'
      }}>
        <h2 style={{ color: theme.text, marginBottom: '1.5rem', textAlign: 'center' }}>
          🎯 How to Stay Engaged
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem'
        }}>
          {[
            { 
              icon: '🔔', 
              title: 'Turn on Notifications',
              desc: 'Never miss important updates and events'
            },
            { 
              icon: '💬', 
              title: 'Engage with Posts',
              desc: 'Like, comment, and share our content'
            },
            { 
              icon: '🏷️', 
              title: 'Tag Us',
              desc: 'Share your IEEE journey with #IEEEIGDTUW'
            },
            { 
              icon: '📨', 
              title: 'Direct Messages',
              desc: 'DM us for queries and collaborations'
            }
          ].map((tip, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '0.75rem' 
              }}>
                {tip.icon}
              </div>
              <h3 style={{ 
                color: theme.text, 
                marginBottom: '0.5rem',
                fontSize: '1.1rem'
              }}>
                {tip.title}
              </h3>
              <p style={{ 
                color: theme.textSecondary, 
                fontSize: '0.9rem',
                lineHeight: '1.5'
              }}>
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div style={{
        background: `linear-gradient(135deg, ${theme.ieee} 0%, #764ba2 100%)`,
        padding: '3rem 2rem',
        borderRadius: '16px',
        color: 'white',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>
          📧 Subscribe to Our Newsletter
        </h2>
        <p style={{ 
          marginBottom: '2rem', 
          opacity: 0.9,
          fontSize: '1.1rem',
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
          Get weekly updates, event invitations, and exclusive tech content delivered to your inbox
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '1rem',
          maxWidth: '500px',
          margin: '0 auto',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <input
            type="email"
            placeholder="your.email@example.com"
            style={{
              flex: 1,
              minWidth: '250px',
              padding: '1rem',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1rem'
            }}
          />
          <button style={{
            padding: '1rem 2rem',
            background: 'white',
            color: theme.ieee,
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            Subscribe
          </button>
        </div>
      </div>

      {/* Contact Information */}
      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: theme.white,
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: theme.text, marginBottom: '1rem' }}>
          Need Direct Contact?
        </h3>
        <div style={{ 
          display: 'flex', 
          gap: '1.5rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '1.5rem'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: theme.text
          }}>
            <span style={{ fontSize: '1.25rem' }}>📧</span>
            <span style={{ fontWeight: 'bold' }}>ieee@igdtuw.ac.in</span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: theme.text
          }}>
            <span style={{ fontSize: '1.25rem' }}>📱</span>
            <span style={{ fontWeight: 'bold' }}>+91 XXX XXX XXXX</span>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            color: theme.text
          }}>
            <span style={{ fontSize: '1.25rem' }}>📍</span>
            <span style={{ fontWeight: 'bold' }}>IGDTUW Campus, Delhi</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialLinks;
