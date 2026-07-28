'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Music2,
  Play,
  Users,
  X,
} from 'lucide-react'
import {
  performanceVideos,
  pressItems,
  type PressItem,
} from '@/data/portfolioMedia'
import { engagementArchive } from '@/data/portfolioEngagements'
import styles from './page.module.css'

const socialLinks = [
  {
    id: 'wechat',
    name: 'WeChat',
    qrCode: '/images/social/wechat-qr.png',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    qrCode: '/images/social/instagram-qr.png',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    qrCode: '/images/social/whatsapp-qr.jpg',
  },
]

type SocialLink = (typeof socialLinks)[number]

const formatEngagementDate = (date: string) => {
  const [year, month, day] = date.split('-')
  return `${day}.${month}.${year.slice(2)}`
}

const navItems = [
  { href: '#story', label: 'Story' },
  { href: '#practice', label: 'Practice' },
  { href: '#research', label: 'Research' },
  { href: '#archive', label: 'Archive' },
  { href: '#videos', label: 'Videos' },
  { href: '#media', label: 'Media' },
  { href: '#contact', label: 'Contact' },
]

function ModernImage({
  src,
  alt,
  className = '',
  sizes,
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  sizes: string
  priority?: boolean
}) {
  return (
    <div className={`${styles.modernImage} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        {...(priority ? { priority: true } : { loading: 'eager' as const })}
      />
      <span className={styles.imageSignal} aria-hidden="true" />
    </div>
  )
}

export default function InkResonancePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showAllEngagements, setShowAllEngagements] = useState(false)
  const [showAllVideos, setShowAllVideos] = useState(false)
  const [selectedPress, setSelectedPress] = useState<PressItem | null>(null)
  const [selectedSocial, setSelectedSocial] = useState<SocialLink | null>(null)

  const featuredVideos = performanceVideos.filter((video) => video.featured)
  const visibleVideos = showAllVideos ? performanceVideos : featuredVideos
  const sortedEngagements = [...engagementArchive].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const visibleEngagements = showAllEngagements
    ? sortedEngagements
    : sortedEngagements.slice(0, 6)

  useEffect(() => {
    if (!selectedPress && !selectedSocial) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPress(null)
        setSelectedSocial(null)
      }
    }

    window.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [selectedPress, selectedSocial])

  return (
    <div className={styles.site}>
      <header className={styles.header}>
        <a href="#home" className={styles.identity} aria-label="Lijun Zhang, home">
          <span className={styles.seal}>LZ</span>
          <span>
            <strong>LIJUN<br />ZHANG</strong>
            <small>Guzheng artist · Researcher</small>
          </span>
        </a>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>

        <a href="#contact" className={styles.headerCta}>
          Collaborate <ArrowUpRight size={15} />
        </a>

        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {menuOpen && (
          <nav className={styles.mobileNav} aria-label="Mobile navigation">
            {navItems.map((item, index) => (
              <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>{item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section id="home" className={styles.hero}>
          <div className={styles.heroBackdrop} aria-hidden="true">
            <Image
              src="/images/bg-home.jpg"
              alt=""
              fill
              sizes="100vw"
              priority
            />
          </div>

          <div className={styles.heroIndex}>
            <span>ISSUE 01 / 2026</span>
            <span>LEEDS · UNITED KINGDOM</span>
          </div>

          <div className={styles.heroWords}>
            <p>Guzheng · Leeds, United Kingdom</p>
            <h1>
              Ancient strings.
              <em>New worlds.</em>
            </h1>
            <div className={styles.heroStatement}>
              <span className={styles.miniSeal}>21<br />STRINGS</span>
              <p>
                I use the Guzheng to create meaningful connections across
                cultures, communities, and generations.
              </p>
            </div>
            <div className={styles.heroActions}>
              <a href="#archive">Experience the work</a>
              <a href="#videos"><Play size={11} fill="currentColor" /> Listen</a>
            </div>
          </div>

          <div className={styles.heroPortraitFrame}>
            <ModernImage
              src="/images/about-portrait.jpg"
              alt="Lijun Zhang playing the Guzheng"
              className={styles.heroPortrait}
              sizes="(max-width: 800px) 82vw, 34vw"
              priority
            />
            <span>Portrait / 01</span>
          </div>

          <div className={styles.heroSideNote} aria-hidden="true">
            <span>GZ</span>
            <span>Sound / Place / Belonging</span>
          </div>

          <a href="#story" className={styles.scrollCue}>
            Enter the story <ArrowDown size={16} />
          </a>
        </section>

        <section id="story" className={styles.story}>
          <div className={styles.sectionMarker}>
            <span>01</span>
            <p>POSITION / STORY</p>
          </div>
          <div className={styles.storyHeadline}>
            <span>My practice</span>
            <h2>Music is not an object to preserve.</h2>
            <h2><em>It is a place to meet.</em></h2>
          </div>
          <div className={styles.storyBody}>
            <p>
              Lijun Zhang is a musician and cultural connector based in the
              United Kingdom. Through the Guzheng, he creates opportunities for
              people from different backgrounds to meet, learn, and connect
              through shared musical experiences.
            </p>
            <p>
              Alongside his artistic practice, Lijun is pursuing a PhD at the
              University of Leeds. His work moves between performance,
              education, community engagement, artistic collaboration, and
              research into belonging and inclusive shared space.
            </p>
            <div className={styles.storyMeta}>
              <span><MapPin size={15} /> Leeds, UK</span>
              <span><GraduationCap size={15} /> University of Leeds</span>
              <span><Music2 size={15} /> Guzheng</span>
            </div>
          </div>
        </section>

        <section id="practice" className={styles.practice}>
          <div className={styles.practiceIntro}>
            <div className={styles.sectionMarkerLight}>
              <span>02</span>
              <p>ARTISTIC PRACTICE</p>
            </div>
            <h2>One practice.<br /><em>Three movements.</em></h2>
            <p>
              Tradition becomes contemporary when it is experienced together:
              on stage, through inquiry, and in community.
            </p>
          </div>

          <div className={styles.practiceGrid}>
            <article>
              <span className={styles.practiceNumber}>01 / LIVE</span>
              <Music2 size={30} />
              <h3>Performance</h3>
              <p>
                Guzheng performances that move between classical repertoire,
                contemporary collaboration, and cross-cultural fusion.
              </p>
              <a href="#archive">Explore all activities <ArrowUpRight size={15} /></a>
            </article>
            <article>
              <span className={styles.practiceNumber}>02 / INQUIRY</span>
              <BookOpen size={30} />
              <h3>Research</h3>
              <p>
                Practice-led work exploring music, wellbeing, cultural
                familiarity, participation, and the feeling of belonging.
              </p>
              <a href="#research">Current research <ArrowUpRight size={15} /></a>
            </article>
            <article>
              <span className={styles.practiceNumber}>03 / TOGETHER</span>
              <Users size={30} />
              <h3>Community</h3>
              <p>
                Workshops and shared experiences created with schools,
                universities, cultural organisations, and local communities.
              </p>
              <a href="#archive">Explore all activities <ArrowUpRight size={15} /></a>
            </article>
          </div>
        </section>

        <section id="research" className={styles.research}>
          <div className={styles.researchPoster}>
            <div>
              <Image
                src="/images/research/sonic-belonging-poster.png"
                alt="Sonic Belonging project report poster"
                fill
                sizes="(max-width: 800px) 75vw, 27vw"
                loading="eager"
              />
            </div>
            <span>Field report · 2026</span>
          </div>

          <div className={styles.researchCopy}>
            <div className={styles.researchLabel}>
              <span>03</span>
              <p>FEATURED RESEARCH</p>
            </div>
            <h2>Sonic<br /><em>Belonging</em></h2>
            <h3>Co-designing community music spaces for wellbeing and social inclusion.</h3>
            <p>
              Supported by the Healthy Buildings Network at the University of
              Leeds, the project brought Chinese and Indian music, dance,
              cultural participation, and shared reflection into university and
              community spaces.
            </p>
            <p>
              Across three workshops, it asked how atmosphere, accessibility,
              cultural familiarity, and opportunities for participation can
              make shared environments feel more welcoming and socially
              connected.
            </p>
            <a
              href="https://www.healthybuildingsnetwork.org/blog/sonic-belonging.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the project report <ArrowUpRight size={17} />
            </a>
          </div>

          <div className={styles.researchDiagram} aria-label="Three themes: sound, place, belonging">
            <span>01<small>Sound</small></span>
            <span>02<small>Place</small></span>
            <span>03<small>Belonging</small></span>
          </div>
        </section>

        <section id="archive" className={styles.archive}>
          <div className={styles.archiveHead}>
            <div className={styles.sectionMarker}>
              <span>04</span>
              <p>ACTIVITY ARCHIVE</p>
            </div>
            <h2>Shared moments,<br /><em>made through sound.</em></h2>
            <p>
              The complete record of performances, workshops, collaborations,
              and community activity from the original portfolio.
            </p>
          </div>

          <div className={styles.archiveGrid}>
            {visibleEngagements.map((item, index) => (
              <a
                href={item.link || '#archive'}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.archiveCard}
                key={item.id}
              >
                <ModernImage
                  src={item.images[0]}
                  alt={item.event}
                  className={styles.archiveImage}
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
                <div className={styles.archiveMeta}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{formatEngagementDate(item.date)}</span>
                  <ArrowUpRight size={15} />
                </div>
                <p>{item.tags.join(' · ')}</p>
                <h3>{item.event}</h3>
                <small>{item.venue}</small>
              </a>
            ))}
          </div>

          <button
            type="button"
            className={styles.archiveToggle}
            onClick={() => setShowAllEngagements((value) => !value)}
            aria-expanded={showAllEngagements}
          >
            {showAllEngagements
              ? 'Return to selected activities'
              : `View the complete activity archive · ${engagementArchive.length}`}
            <span>{showAllEngagements ? '−' : '+'}</span>
          </button>
        </section>

        <section id="videos" className={styles.videos}>
          <div className={styles.videosHead}>
            <div className={styles.sectionMarkerLight}>
              <span>05</span>
              <p>PERFORMANCE VIDEOS</p>
            </div>
            <div>
              <span>Selected by the artist</span>
              <h2>Watch the music<br /><em>in motion.</em></h2>
            </div>
            <p>
              A performance-led collection of solo work, ensembles, and
              cross-cultural collaborations—separate from broadcast and press
              coverage.
            </p>
          </div>

          <div className={`${styles.videoGrid} ${showAllVideos ? styles.videoGridExpanded : ''}`}>
            {visibleVideos.map((video, index) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className={index === 0 && !showAllVideos ? styles.videoLead : ''}
              >
                <div className={styles.videoThumb}>
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                  />
                  <span className={styles.videoWash} aria-hidden="true" />
                  <span className={styles.videoPlay}><Play size={18} fill="currentColor" /></span>
                  <span className={styles.videoIndex}>0{index + 1}</span>
                </div>
                <div className={styles.videoInfo}>
                  <span>{video.category}</span>
                  <h3>{video.title}</h3>
                  <small>Watch on YouTube <ArrowUpRight size={13} /></small>
                </div>
              </a>
            ))}
          </div>

          <button
            type="button"
            className={styles.videoToggle}
            onClick={() => setShowAllVideos((value) => !value)}
            aria-expanded={showAllVideos}
          >
            {showAllVideos ? 'Show selected videos' : `View the complete collection · ${performanceVideos.length}`}
            <span>{showAllVideos ? '−' : '+'}</span>
          </button>
        </section>

        <section id="media" className={styles.media}>
          <div className={styles.mediaHead}>
            <div className={styles.sectionMarker}>
              <span>06</span>
              <p>MEDIA &amp; PRESS</p>
            </div>
            <div>
              <span>Independent coverage</span>
              <h2>Stories carried<br /><em>beyond the stage.</em></h2>
            </div>
            <p>
              Broadcasts and editorial coverage from international media.
              Select a story to view the original feature.
            </p>
          </div>

          <div className={styles.mediaGrid}>
            {pressItems.map((item, index) => {
              const preview = item.posterUrl || item.screenshotUrl
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedPress(item)}
                  aria-label={`Open ${item.name} media coverage`}
                >
                  <div className={styles.mediaPreview}>
                    {preview && (
                      <Image
                        src={preview}
                        alt=""
                        fill
                        sizes="(max-width: 800px) 100vw, 33vw"
                      />
                    )}
                    <span>0{index + 1}</span>
                  </div>
                  <div className={styles.mediaBrand}>
                    <div>
                      <Image
                        src={item.logoUrl}
                        alt={`${item.name} logo`}
                        fill
                        sizes="180px"
                      />
                    </div>
                    <span>{item.videoUrl ? 'Broadcast coverage' : 'Editorial feature'}</span>
                  </div>
                  <div className={styles.mediaAction}>
                    <strong>{item.name}</strong>
                    <span>Open coverage <ArrowUpRight size={14} /></span>
                  </div>
                </button>
              )
            })}
          </div>

          <div className={styles.mediaStatement}>
            <span>PRESS NOTE</span>
            <p>
              Media coverage documents the public reach of the work. Performance
              videos above remain the primary artistic archive.
            </p>
          </div>
        </section>

        <section id="contact" className={styles.contact}>
          <div className={styles.contactTopline}>
            <span>07 / CONTACT</span>
            <span>Performance · Research · Education · Collaboration</span>
          </div>
          <h2>Let&apos;s make<br /><em>a place to meet.</em></h2>
          <a href="mailto:zhanglijun109@gmail.com" className={styles.email}>
            <Mail size={24} />
            <span>zhanglijun109@gmail.com</span>
            <ArrowUpRight size={24} />
          </a>

          <div className={styles.contactLower}>
            <div className={styles.contactDetails}>
              <span><MapPin size={15} /> Leeds, United Kingdom</span>
              <span><CalendarDays size={15} /> Available for selected projects</span>
            </div>
            <div className={styles.qrList}>
              {socialLinks.map((social) => (
                <button
                  type="button"
                  key={social.id}
                  onClick={() => setSelectedSocial(social)}
                  aria-label={`Enlarge ${social.name} QR code`}
                >
                  <span className={styles.qrImage}>
                    <Image
                      src={social.qrCode}
                      alt={`${social.name} QR code`}
                      width={92}
                      height={92}
                    />
                  </span>
                  <span>{social.name}</span>
                  <small>Tap to enlarge</small>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {selectedPress && (
        <div className={styles.mediaModal} role="dialog" aria-modal="true" aria-label={`${selectedPress.name} coverage`}>
          <button
            type="button"
            className={styles.mediaBackdrop}
            onClick={() => setSelectedPress(null)}
            aria-label="Close media coverage"
          />
          <div className={styles.mediaModalPanel}>
            <div className={styles.mediaModalHead}>
              <div>
                <span>MEDIA / {selectedPress.id.padStart(2, '0')}</span>
                <strong>{selectedPress.name}</strong>
              </div>
              <button type="button" onClick={() => setSelectedPress(null)} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className={styles.mediaModalContent}>
              {selectedPress.videoUrl ? (
                <video
                  src={selectedPress.videoUrl}
                  poster={selectedPress.posterUrl}
                  controls
                  playsInline
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              ) : selectedPress.screenshotUrl ? (
                <Image
                  src={selectedPress.screenshotUrl}
                  alt={`${selectedPress.name} coverage`}
                  width={1400}
                  height={1000}
                  unoptimized
                />
              ) : null}
            </div>

            <div className={styles.mediaModalFoot}>
              <span>International media coverage</span>
              {selectedPress.link && (
                <a href={selectedPress.link} target="_blank" rel="noopener noreferrer">
                  View original story <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedSocial && (
        <div
          className={styles.qrModal}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedSocial.name} QR code`}
        >
          <button
            type="button"
            className={styles.mediaBackdrop}
            onClick={() => setSelectedSocial(null)}
            aria-label="Close QR code"
          />
          <div className={styles.qrModalPanel}>
            <div className={styles.qrModalHead}>
              <div>
                <span>CONNECT / {selectedSocial.id.toUpperCase()}</span>
                <strong>{selectedSocial.name}</strong>
              </div>
              <button type="button" onClick={() => setSelectedSocial(null)} aria-label="Close">
                <X size={20} />
              </button>
            </div>
            <div className={styles.qrModalImage}>
              <Image
                src={selectedSocial.qrCode}
                alt={`Enlarged ${selectedSocial.name} QR code`}
                width={420}
                height={420}
                priority
              />
            </div>
            <p>Scan with your phone camera</p>
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        <a href="#home" className={styles.footerIdentity}>
          <span className={styles.seal}>LZ</span>
          <strong>LIJUN ZHANG</strong>
        </a>
        <p>Musician · Researcher · Cultural Connector</p>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  )
}
