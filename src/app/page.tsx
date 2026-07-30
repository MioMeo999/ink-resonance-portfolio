'use client'

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import Image from 'next/image'
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  createLucideIcon,
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

const Instagram = createLucideIcon('Instagram', [
  ['rect', { width: '20', height: '20', x: '2', y: '2', rx: '5', ry: '5', key: 'instagram-frame' }],
  ['path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', key: 'instagram-lens' }],
  ['line', { x1: '17.5', x2: '17.51', y1: '6.5', y2: '6.5', key: 'instagram-dot' }],
])

const Youtube = createLucideIcon('Youtube', [
  ['path', { d: 'M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17', key: 'youtube-frame' }],
  ['path', { d: 'm10 15 5-3-5-3z', key: 'youtube-play' }],
])

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

const socialProfiles = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/miolijun999/',
    icon: Instagram,
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@lijun6',
    icon: Youtube,
  },
]

const researchReportUrl =
  'https://www.healthybuildingsnetwork.org/blog/sonic-belonging.html'

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

const describeEngagement = (tags: string[]) => {
  const hasWorkshop = tags.includes('workshop')
  const hasPerformance = tags.includes('performance')
  const hasCommunity = tags.includes('community')

  if (hasWorkshop && hasPerformance && hasCommunity) {
    return 'Performance, participation and community exchange brought together in one shared cultural programme.'
  }

  if (hasWorkshop && hasPerformance) {
    return 'A participatory encounter moving between live performance, demonstration and shared learning.'
  }

  if (hasPerformance && hasCommunity) {
    return 'A live musical gathering shaped around celebration, cultural connection and a shared audience.'
  }

  if (hasWorkshop && hasCommunity) {
    return 'An open learning space connecting traditional music with conversation, participation and community.'
  }

  if (hasWorkshop) {
    return 'A hands-on session exploring sound, tradition and the social possibilities of making music together.'
  }

  return 'A live guzheng performance presented as part of an evolving, research-led artistic practice.'
}

const portraitArchiveImages = new Set([
  '/images/timeline/wu-fest-acoustic-2025.jpg',
  '/images/timeline/harrogate-grammar-school-2025.jpg',
  '/images/timeline/york-resident-festival-2026.jpg',
  '/images/timeline/world-unite-acoustic-2025.jpg',
  '/images/timeline/sonic-belonging-2026.jpg',
  '/images/timeline/silk-road-workshop-2026.jpg',
])

const wideArchiveImages = new Set([
  '/images/timeline/lihua-school-awards-2024.jpg',
  '/images/timeline/wu-fest-teaser-2025.jpg',
  '/images/timeline/york-spring-gala-2026.jpg',
  '/images/timeline/lccs-summer-fair-2025.jpg',
  '/images/timeline/leeds-chinese-new-year-2026.jpg',
  '/images/timeline/lubs-global-impact-day-2026.jpeg',
  '/images/timeline/dragon-new-year-2024-leeds.jpg',
])

const tallArchiveImages = new Set([
  '/images/timeline/wu-fest-acoustic-2025.jpg',
])

const memoirTilts = [-2.4, 1.5, -.8, 2.1, -1.4, .9]
const memoirOffsets = [24, 2, 38, 12, 30, 0]

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
  const [selectedEngagement, setSelectedEngagement] = useState<(typeof engagementArchive)[number] | null>(null)
  const archiveTrackRef = useRef<HTMLDivElement>(null)
  const archiveScrollTargetRef = useRef(0)
  const archiveAnimationRef = useRef<number | null>(null)
  const archivePointerIntentRef = useRef(0)
  const archiveVelocityRef = useRef(0)
  const archivePointerActiveRef = useRef(false)

  const featuredVideos = performanceVideos.filter((video) => video.featured)
  const additionalVideos = performanceVideos.filter((video) => !video.featured)
  const sortedEngagements = [...engagementArchive].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const scrollArchive = (direction: -1 | 1) => {
    const track = archiveTrackRef.current
    if (!track) return

    const maxScroll = track.scrollWidth - track.clientWidth
    archiveScrollTargetRef.current = Math.min(
      maxScroll,
      Math.max(0, track.scrollLeft + direction * track.clientWidth * .72)
    )

    track.scrollTo({
      left: archiveScrollTargetRef.current,
      behavior: 'smooth',
    })
  }

  const animateArchiveFromPointer = () => {
    const track = archiveTrackRef.current
    if (!track) {
      archiveAnimationRef.current = null
      return
    }

    const targetVelocity = archivePointerActiveRef.current
      ? archivePointerIntentRef.current * 2.25
      : 0

    archiveVelocityRef.current += (targetVelocity - archiveVelocityRef.current) * .032

    if (Math.abs(targetVelocity) < .012 && Math.abs(archiveVelocityRef.current) < .012) {
      archiveVelocityRef.current = 0
      archiveAnimationRef.current = null
      return
    }

    const maxScroll = track.scrollWidth - track.clientWidth
    const nextScroll = Math.min(
      maxScroll,
      Math.max(0, track.scrollLeft + archiveVelocityRef.current)
    )

    track.scrollLeft = nextScroll

    const pressingBoundary =
      (nextScroll <= 0 && targetVelocity < 0) ||
      (nextScroll >= maxScroll && targetVelocity > 0)

    if (pressingBoundary) {
      archiveVelocityRef.current = 0
      archiveAnimationRef.current = null
      return
    }

    archiveAnimationRef.current = window.requestAnimationFrame(animateArchiveFromPointer)
  }

  const startArchivePointerAnimation = () => {
    if (archiveAnimationRef.current === null) {
      archiveAnimationRef.current = window.requestAnimationFrame(animateArchiveFromPointer)
    }
  }

  const updateArchivePointerIntent = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = archiveTrackRef.current
    if (!track || event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const bounds = track.getBoundingClientRect()
    const pointerPosition = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width))
    const centeredPosition = pointerPosition * 2 - 1
    const deadZone = .2
    const activeDistance = Math.max(0, (Math.abs(centeredPosition) - deadZone) / (1 - deadZone))

    archivePointerIntentRef.current =
      Math.sign(centeredPosition) * Math.pow(activeDistance, 1.75)
    archivePointerActiveRef.current = true
    startArchivePointerAnimation()
  }

  const handleArchivePointerLeave = () => {
    archivePointerActiveRef.current = false
    archivePointerIntentRef.current = 0
    startArchivePointerAnimation()
  }

  useEffect(() => () => {
    if (archiveAnimationRef.current !== null) {
      window.cancelAnimationFrame(archiveAnimationRef.current)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [menuOpen])

  useEffect(() => {
    if (!selectedEngagement) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedEngagement(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [selectedEngagement])

  useEffect(() => {
    const stopInactivePressVideos = () => {
      const activeModalId = window.location.hash.slice(1)

      document.querySelectorAll<HTMLVideoElement>('video[data-press-video]').forEach((video) => {
        const modal = video.closest<HTMLElement>('[role="dialog"]')
        if (modal?.id === activeModalId) return

        video.pause()
        video.currentTime = 0
      })
    }

    const closePressVideoOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || !window.location.hash.startsWith('#press-video-')) return

      const pressId = window.location.hash.replace('#press-video-', '')
      window.location.hash = `press-${pressId}`
    }

    stopInactivePressVideos()
    window.addEventListener('hashchange', stopInactivePressVideos)
    window.addEventListener('keydown', closePressVideoOnEscape)

    return () => {
      window.removeEventListener('hashchange', stopInactivePressVideos)
      window.removeEventListener('keydown', closePressVideoOnEscape)
      document.querySelectorAll<HTMLVideoElement>('video[data-press-video]').forEach((video) => {
        video.pause()
      })
    }
  }, [])

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
            <h1>
              <span className={styles.heroName}>Lijun Zhang</span>
              <span className={styles.heroInstrument}>GUZHENG</span>
            </h1>
            <div className={styles.heroTagline}>
              <span>Performing across Britain.</span>
              <span>Researching how music makes belonging.</span>
            </div>
            <div className={styles.heroStatement}>
              <span aria-hidden="true" />
              <div>
                <strong>ARTIST · RESEARCHER · CULTURAL CONNECTOR</strong>
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
            <a
              href={researchReportUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read the Sonic Belonging project report"
            >
              <Image
                src="/images/research/sonic-belonging-poster.png"
                alt="Sonic Belonging project report poster"
                fill
                sizes="(max-width: 800px) 75vw, 27vw"
                loading="eager"
              />
              <span className={styles.researchPosterAction}>
                Read report <ArrowUpRight size={13} />
              </span>
            </a>
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
              href={researchReportUrl}
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
            <h2>Rooms remembered,<br /><em>in sound and colour.</em></h2>
            <p>
              A travelling memoir of performances, workshops, collaborations,
              and the people encountered along the way.
            </p>
          </div>

          <div className={styles.memoirWall}>
            <div className={styles.memoirControls} aria-label="Memoir wall controls">
              <button type="button" onClick={() => scrollArchive(-1)} aria-label="Earlier in the timeline">
                <ChevronLeft size={18} />
              </button>
              <button type="button" onClick={() => scrollArchive(1)} aria-label="Later in the timeline">
                <ChevronRight size={18} />
              </button>
            </div>
            <div
              className={styles.memoirTrack}
              ref={archiveTrackRef}
              tabIndex={0}
              aria-label="Activity memoir, newest to oldest"
              onPointerEnter={updateArchivePointerIntent}
              onPointerMove={updateArchivePointerIntent}
              onPointerLeave={handleArchivePointerLeave}
            >
              {sortedEngagements.map((item, index) => {
                const isPortrait = portraitArchiveImages.has(item.images[0])
                const isWide = wideArchiveImages.has(item.images[0])
                const isTall = tallArchiveImages.has(item.images[0])
                const cardStyle = {
                  '--memoir-tilt': `${memoirTilts[index % memoirTilts.length]}deg`,
                  '--memoir-lift': `${memoirOffsets[index % memoirOffsets.length]}px`,
                } as CSSProperties

                return (
                  <button
                    type="button"
                    className={[
                      styles.memoirCard,
                      isPortrait ? styles.memoirCardPortrait : '',
                      isWide ? styles.memoirCardWide : '',
                      isTall ? styles.memoirCardTall : '',
                    ].filter(Boolean).join(' ')}
                    style={cardStyle}
                    onClick={() => setSelectedEngagement(item)}
                    key={item.id}
                    aria-label={`Open memory: ${item.event}`}
                  >
                    <span className={styles.memoirPin} aria-hidden="true" />
                    <span className={styles.memoirPhoto}>
                      <Image
                        src={item.images[0]}
                        alt={item.event}
                        fill
                        sizes="(max-width: 800px) 82vw, (max-width: 1100px) 40vw, 28vw"
                        loading={index < 2 ? 'eager' : 'lazy'}
                      />
                    </span>
                    <span className={styles.memoirCaption}>
                      <span className={styles.memoirMetaRow}>
                        <time dateTime={item.date}>{formatEngagementDate(item.date)}</time>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                      </span>
                      <strong>{item.event}</strong>
                      <small><MapPin size={11} />{item.venue}</small>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
          <p className={styles.archiveCount}>
            {engagementArchive.length} engagements · February 2024—June 2026
          </p>
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
                    src={video.thumbnailUrl || `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt=""
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null
                      event.currentTarget.src = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`
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
                      src={video.thumbnailUrl || `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                      alt=""
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null
                        event.currentTarget.src = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`
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
                  <div
                    className={[
                      styles.pressFeatureVisual,
                      item.videoUrl ? styles.pressFeatureVideo : styles.pressFeatureEditorial,
                      item.id === '2' ? styles.pressFeaturePortrait : '',
                    ].filter(Boolean).join(' ')}
                  >
                    {item.posterUrl || item.screenshotUrl ? (
                      item.videoUrl ? (
                        <a
                          className={styles.pressVideoTrigger}
                          href={`#press-video-${item.id}`}
                          aria-label={`Play ${item.name} coverage video`}
                        >
                          <Image
                            src={item.posterUrl || item.screenshotUrl || ''}
                            alt=""
                            aria-hidden="true"
                            fill
                            className={styles.pressVisualBackdrop}
                            sizes="(max-width: 800px) 100vw, 48vw"
                          />
                          <Image
                            src={item.posterUrl || item.screenshotUrl || ''}
                            alt={`${item.name} coverage preview`}
                            fill
                            className={styles.pressVisualSubject}
                            sizes="(max-width: 800px) 100vw, 48vw"
                          />
                          <span><Play size={18} fill="currentColor" /></span>
                        </a>
                      ) : (
                        <>
                          <Image
                            src={item.posterUrl || item.screenshotUrl || ''}
                            alt=""
                            aria-hidden="true"
                            fill
                            className={styles.pressVisualBackdrop}
                            sizes="(max-width: 800px) 100vw, 48vw"
                          />
                          <Image
                            src={item.posterUrl || item.screenshotUrl || ''}
                            alt={`${item.name} coverage preview`}
                            fill
                            className={styles.pressVisualSubject}
                            sizes="(max-width: 800px) 100vw, 48vw"
                          />
                        </>
                      )
                    ) : null}
                    <span className={styles.pressVisualLabel}>
                      {item.videoUrl ? 'Broadcast film' : 'Print edition'}
                    </span>
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

          {/* Future accessibility: replace the CSS :target press and QR overlays with native dialog elements using showModal() for focus trapping, Escape handling, and clean history. */}
          {pressItems.filter((item) => item.videoUrl).map((item) => (
            <div
              className={styles.pressVideoModal}
              id={`press-video-${item.id}`}
              role="dialog"
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
                <video
                  controls
                  playsInline
                  poster={item.posterUrl || item.screenshotUrl}
                  data-press-video={item.id}
                >
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
              <div className={styles.socialProfiles} aria-label="Social media profiles">
                {socialProfiles.map((profile) => {
                  const SocialIcon = profile.icon
                  return (
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit Lijun Zhang on ${profile.name}`}
                      key={profile.name}
                    >
                      <SocialIcon size={17} />
                      <span>{profile.name}</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )
                })}
              </div>
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

      {selectedEngagement && (
        <div className={styles.memoirModal} role="dialog" aria-modal="true" aria-label={selectedEngagement.event}>
          <button
            type="button"
            className={styles.memoirModalBackdrop}
            onClick={() => setSelectedEngagement(null)}
            aria-label="Close memory"
          />
          <div className={styles.memoirModalPanel}>
            <button
              type="button"
              className={styles.memoirModalClose}
              onClick={() => setSelectedEngagement(null)}
              aria-label="Close memory"
            >
              <X size={19} />
            </button>
            <div className={styles.memoirModalImage}>
              <Image
                src={selectedEngagement.images[0]}
                alt={selectedEngagement.event}
                fill
                sizes="(max-width: 800px) 92vw, 56vw"
              />
            </div>
            <div className={styles.memoirModalCopy}>
              <span>
                {formatEngagementDate(selectedEngagement.date)} · {selectedEngagement.tags.join(' · ')}
              </span>
              <h3>{selectedEngagement.event}</h3>
              <p>{describeEngagement(selectedEngagement.tags)}</p>
              <small>{selectedEngagement.venue}</small>
              {selectedEngagement.link && (
                <a href={selectedEngagement.link} target="_blank" rel="noopener noreferrer">
                  Read the full event <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {socialLinks.map((social) => (
        <div
          className={styles.qrModal}
          id={`qr-${social.id}`}
          role="dialog"
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
