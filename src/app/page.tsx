'use client'

import { useState } from 'react'
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

const formatEngagementDate = (date: string) => {
  const [year, month, day] = date.split('-')
  return `${day}.${month}.${year.slice(2)}`
}

const navItems = [
  { href: '#story', label: 'About' },
  { href: '#practice', label: 'Approach' },
  { href: '#research', label: 'Research' },
  { href: '#archive', label: 'Engagements' },
  { href: '#videos', label: 'Watch' },
  { href: '#media', label: 'Press' },
]

const pressNotes: Record<string, { eyebrow: string; description: string; note: string }> = {
  CCTV: {
    eyebrow: 'China Central Television · Broadcast',
    description:
      'China’s national broadcaster featured Guzheng performance and UK–China cultural exchange work as part of its coverage of Chinese cultural activity overseas.',
    note: 'Broadcast segment',
  },
  "People's Daily": {
    eyebrow: 'People’s Daily Overseas Edition · 21 August 2025',
    description:
      'Print coverage of performances and community cultural work in the United Kingdom, including collaborations with schools and community organisations.',
    note: 'Overseas edition · August 2025',
  },
  CGTN: {
    eyebrow: 'CGTN Europe · October 2025',
    description:
      'A Mid-Autumn feature exploring Chinese cultural celebration, music, and friendship between communities in Manchester.',
    note: 'Mid-Autumn feature · October 2025',
  },
}

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

  const featuredVideos = performanceVideos.filter((video) => video.featured)
  const additionalVideos = performanceVideos.filter((video) => !video.featured)
  const sortedEngagements = [...engagementArchive].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const selectedEngagements = sortedEngagements.slice(0, 6)
  const additionalEngagements = sortedEngagements.slice(6)

  return (
    <div className={styles.site}>
      <header className={styles.header}>
        <a href="#home" className={styles.identity} aria-label="Lijun Zhang, home">
          <span className={styles.brandDot} aria-hidden="true" />
          <strong>LIJUN ZHANG</strong>
        </a>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>

        <a href="#contact" className={styles.headerCta}>
          Invite me to play <ArrowUpRight size={15} />
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
          <div className={styles.heroIndex}>
            <span>PORTFOLIO · 2026</span>
            <span>LISTEN · MEET · RESONATE</span>
          </div>

          <div className={styles.heroWords}>
            <h1>GUZHENG</h1>
            <div className={styles.heroTagline}>
              <span>Performing across Britain.</span>
              <span>Researching how music makes belonging.</span>
            </div>
            <div className={styles.heroStatement}>
              <span aria-hidden="true" />
              <div>
                <strong>LIJUN ZHANG</strong>
                <p>Guzheng artist · PhD candidate, University of Leeds</p>
              </div>
            </div>
            <div className={styles.heroActions}>
              <a href="#archive">Twenty-two rooms</a>
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
            <span />
            <span>Portfolio · 2026 — Listen · Meet · Resonate</span>
          </div>

          <a href="#story" className={styles.scrollCue}>Explore <ArrowDown size={16} /></a>
        </section>

        <div className={styles.affiliations} aria-label="Selected media and institutional associations">
          <span>Featured by</span>
          <a href="#media">CCTV</a>
          <a href="#media">People&apos;s Daily</a>
          <a href="#media">CGTN</a>
          <a href="#research">University of Leeds</a>
          <a href="#archive">Business Confucius Institute</a>
          <a href="#research">Healthy Buildings Network</a>
        </div>

        <section id="story" className={styles.story}>
          <div className={styles.storyBackdrop} aria-hidden="true">
            <Image
              src="/images/bg-home.jpg"
              alt=""
              fill
              sizes="100vw"
            />
          </div>
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
            {selectedEngagements.map((item, index) => (
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

          <details className={styles.archiveMore}>
            <summary>
              View the complete activity archive · {engagementArchive.length}
              <span aria-hidden="true">+</span>
            </summary>
            <div className={styles.archiveGrid}>
              {additionalEngagements.map((item, index) => (
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
                    <span>{String(index + selectedEngagements.length + 1).padStart(2, '0')}</span>
                    <span>{formatEngagementDate(item.date)}</span>
                    <ArrowUpRight size={15} />
                  </div>
                  <p>{item.tags.join(' · ')}</p>
                  <h3>{item.event}</h3>
                  <small>{item.venue}</small>
                </a>
              ))}
            </div>
          </details>
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

          <div className={styles.videoGrid}>
            {featuredVideos.map((video, index) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className={index === 0 ? styles.videoLead : ''}
              >
                <div className={styles.videoThumb}>
                  <img
                    src={`https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt=""
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.src = `https://i.ytimg.com/vi/${video.youtubeId}/sddefault.jpg`
                    }}
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

          <details className={styles.videoMore}>
            <summary>
              View the complete collection · {performanceVideos.length}
              <span aria-hidden="true">+</span>
            </summary>
            <div className={`${styles.videoGrid} ${styles.videoGridExpanded}`}>
              {additionalVideos.map((video, index) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={styles.videoThumb}>
                    <img
                      src={`https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt=""
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.src = `https://i.ytimg.com/vi/${video.youtubeId}/sddefault.jpg`
                      }}
                    />
                    <span className={styles.videoPlay}><Play size={18} fill="currentColor" /></span>
                    <span className={styles.videoIndex}>
                      {String(index + featuredVideos.length + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className={styles.videoInfo}>
                    <span>{video.category}</span>
                    <h3>{video.title}</h3>
                    <small>Watch on YouTube <ArrowUpRight size={13} /></small>
                  </div>
                </a>
              ))}
            </div>
          </details>
        </section>

        <section id="media" className={styles.media}>
          <div className={`${styles.mediaHead} ${styles.coverageHead}`}>
            <div className={styles.coverageLabel}>
              <span aria-hidden="true" />
              <p>COVERAGE</p>
            </div>
            <h2>Covered by international media, and by<br />the institutions I work alongside.</h2>
          </div>

          <div className={styles.pressSwitcher}>
            {pressItems.map((item, index) => (
              <input
                className={styles.pressControl}
                type="radio"
                name="press-story"
                id={`press-control-${item.id}`}
                defaultChecked={index === 0}
                key={`control-${item.id}`}
              />
            ))}
            <div className={styles.pressTabs} aria-label="Media coverage">
              {pressItems.map((item) => (
                <label
                  htmlFor={`press-control-${item.id}`}
                  key={item.id}
                >
                  <span className={styles.pressLogo}>
                    <Image
                      src={item.logoUrl}
                      alt={`${item.name} logo`}
                      fill
                      sizes="220px"
                    />
                  </span>
                  <strong>{item.name}</strong>
                  <small>{pressNotes[item.name].note}</small>
                </label>
              ))}
            </div>

            <div className={styles.pressPanels}>
              {pressItems.map((item) => (
                <section className={styles.pressFeature} id={`press-${item.id}`} key={item.id}>
                  <div className={`${styles.pressFeatureVisual} ${item.id === '2' ? styles.pressFeaturePortrait : ''}`}>
                    {item.posterUrl || item.screenshotUrl ? (
                      item.videoUrl ? (
                        <a
                          className={styles.pressVideoTrigger}
                          href={`#press-video-${item.id}`}
                          aria-label={`Play ${item.name} coverage video`}
                        >
                          <Image
                            src={item.posterUrl || item.screenshotUrl || ''}
                            alt={`${item.name} coverage preview`}
                            fill
                            sizes="(max-width: 800px) 100vw, 48vw"
                          />
                          <span><Play size={18} fill="currentColor" /></span>
                        </a>
                      ) : (
                        <Image
                          src={item.posterUrl || item.screenshotUrl || ''}
                          alt={`${item.name} coverage preview`}
                          fill
                          sizes="(max-width: 800px) 100vw, 48vw"
                        />
                      )
                    ) : null}
                  </div>
                  <div className={styles.pressFeatureCopy}>
                    <span>{pressNotes[item.name].eyebrow}</span>
                    <h3>{item.name}</h3>
                    <p>{pressNotes[item.name].description}</p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read the coverage <ArrowUpRight size={15} />
                      </a>
                    ) : (
                      <span className={styles.pressUnavailable}>
                        Broadcast only — no online article
                      </span>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {pressItems.filter((item) => item.videoUrl).map((item) => (
            <div
              className={styles.pressVideoModal}
              id={`press-video-${item.id}`}
              role="dialog"
              aria-modal="true"
              aria-label={`${item.name} coverage video`}
              key={`video-${item.id}`}
            >
              <a
                className={styles.pressVideoBackdrop}
                href={`#press-${item.id}`}
                aria-label="Close video"
              />
              <div className={styles.pressVideoPanel}>
                <div className={styles.pressVideoHead}>
                  <span>{item.name} · Coverage clip</span>
                  <a href={`#press-${item.id}`} aria-label="Close video">
                    <X size={20} />
                  </a>
                </div>
                <video controls playsInline poster={item.posterUrl || item.screenshotUrl}>
                  <source src={item.videoUrl} />
                </video>
              </div>
            </div>
          ))}
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
                <a
                  href={`#qr-${social.id}`}
                  key={social.id}
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
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {socialLinks.map((social) => (
        <div
          className={styles.qrModal}
          id={`qr-${social.id}`}
          role="dialog"
          aria-modal="true"
          aria-label={`${social.name} QR code`}
          key={social.id}
        >
          <a href="#contact" className={styles.mediaBackdrop} aria-label="Close QR code" />
          <div className={styles.qrModalPanel}>
            <div className={styles.qrModalHead}>
              <div>
                <span>CONNECT / {social.id.toUpperCase()}</span>
                <strong>{social.name}</strong>
              </div>
              <a href="#contact" aria-label="Close">
                <X size={20} />
              </a>
            </div>
            <div className={styles.qrModalImage}>
              <Image
                src={social.qrCode}
                alt={`Enlarged ${social.name} QR code`}
                width={420}
                height={420}
              />
            </div>
            <p>Scan with your phone camera</p>
          </div>
        </div>
      ))}

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
