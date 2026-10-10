import { Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Download, Maximize, Minimize, Pause, Play, X, Orbit, Mail, Phone, Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { destinations, education, experience, profile, results, skills, standards, type Destination } from '@/lib/portfolio';
import { Universe } from './Universe';

const paths = { about: '/about', skills: '/skills', experience: '/experience', education: '/education', contact: '/contact' } as const;

function downloadCV() {
  const text = [profile.name.toUpperCase(), `IT Support & Systems Development\n${profile.phone}\n${profile.email}`, 'CAREER OBJECTIVE', profile.objective,
    'SKILLS', ...skills.map(s => `${s.name}: ${s.items.join(', ')}`), 'EXPERIENCE', ...experience.map(e => `${e.company}\n${e.role}\n${e.date}\n${e.details.map(d => `• ${d}`).join('\n')}`),
    'EDUCATION & CERTIFICATIONS', ...education.map(e => `${e.year} — ${e.title}\n${e.institution}\n${e.detail}${e.url ? `\n${e.url}` : ''}`),
    'MICTSETA UNIT STANDARDS — NQF LEVEL 5', ...standards.map(s => `${s.code} — ${s.title} — ${s.credits} credits`),
    '2021 ACADEMIC RESULTS — NELSON MANDELA UNIVERSITY', ...results.map(r => `${r.code} ${r.title} (${r.month}): year ${r.year}, exam ${r.exam}, final ${r.final} — Pass`), 'Academic results may change.',
  ].join('\n\n');
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const a = document.createElement('a'); a.href = url; a.download = 'Olwethu-Ngalo-CV.txt'; a.click(); URL.revokeObjectURL(url);
}

function Content({ active }: { active: Destination }) {
  const [copied, setCopied] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('Java');
  if (active === 'about') return <>
    <p className="panel-lead">Technology is my medium.<br />Problem-solving is my craft.</p>
    <p className="body-copy">{profile.objective}</p>
    <div className="fact-line"><span>FOCUS</span><strong>IT Support / Systems Development</strong></div>
    <div className="fact-line"><span>FOUNDATION</span><strong>Oracle-certified Java associate</strong></div>
    <div className="fact-line"><span>APPROACH</span><strong>Hands-on. Analytical. People-first.</strong></div>
  </>;
  if (active === 'skills') return <>
    <div className="skill-selection"><Orbit size={22} /><span>{selectedSkill}</span></div>
    {skills.map(group => <section className="content-section" key={group.name}><h3>{group.name}</h3><div className="skill-list">{group.items.map(skill => <Button key={skill} variant="navigation" className={selectedSkill === skill ? 'skill-active' : ''} onClick={() => setSelectedSkill(skill)}><span>{skill}</span><ArrowUpRight size={14} /></Button>)}</div></section>)}
  </>;
  if (active === 'experience') return <>{experience.map((job, index) => <section className="content-section job" key={job.company}><div className="record-meta"><span>0{index + 1}</span><span>{job.date}</span></div><h3>{job.company}</h3><p className="record-role">{job.role}</p><ul>{job.details.map(detail => <li key={detail}>{detail}</li>)}</ul></section>)}</>;
  if (active === 'education') return <>
    {education.map(record => <section className="content-section qualification" key={record.title}><span className="record-year">{record.year}</span><div><p className="record-institution">{record.institution}</p><h3>{record.title}</h3><p className="body-copy">{record.detail}</p>{record.url && <Button variant="link" asChild><a href={record.url} target="_blank" rel="noreferrer">{record.institution.includes('Coursera') ? 'Verify credential' : 'University validation'}<ArrowUpRight size={14} /></a></Button>}</div></section>)}
    <section className="content-section"><p className="record-institution">MICTSETA · NQF LEVEL 5</p><h3>31 credits. Four building blocks.</h3>{standards.map(s => <div className="unit-standard" key={s.code}><span>{s.code}</span><p>{s.title}</p><strong>{s.credits} cr.</strong></div>)}</section>
    <section className="content-section"><p className="record-institution">NELSON MANDELA UNIVERSITY · 2021</p><h3>Academic record</h3><div className="results-scroll"><table><thead><tr><th>Subject / exam month</th><th>Year</th><th>Exam</th><th>Final</th></tr></thead><tbody>{results.map(r => <tr key={r.code}><td>{r.title}<small>{r.code} · {r.month} · Pass</small></td><td>{r.year}</td><td>{r.exam}</td><td>{r.final}</td></tr>)}</tbody></table></div><p className="record-note">All four subjects passed. Results may change.</p></section>
  </>;
  return <>
    <p className="panel-lead">Let’s build<br />what comes next.</p>
    <p className="body-copy">IT Support. Systems Development. A new challenge worth solving.</p>
    <a className="contact-link" href={`mailto:${profile.email}`}><Mail size={19} /><span>{profile.email}</span><ArrowUpRight size={18} /></a>
    <a className="contact-link" href="tel:+27750211548"><Phone size={19} /><span>{profile.phone}</span><ArrowUpRight size={18} /></a>
    <Button variant="cosmic" className="contact-cta" asChild><a href={`mailto:${profile.email}`}>Start a conversation<ArrowUpRight /></a></Button>
    <Button variant="navigation" className="copy-email" onClick={async () => { try { await navigator.clipboard.writeText(profile.email); setCopied(true); } catch { setCopied(false); } }}>{copied ? <Check /> : <Copy />}{copied ? 'Email copied' : 'Copy email address'}</Button>
  </>;
}

export function Portfolio({ active = null }: { active?: Destination | null }) {
  const navigate = useNavigate();
  const [paused, setPaused] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const node = destinations.find(d => d.id === active);
  const index = destinations.findIndex(d => d.id === active);
  const next = destinations[(index + 1) % destinations.length] ?? destinations[0];
  const select = (id: Destination) => navigate({ to: paths[id] });
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPaused(true);
    const changed = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', changed);
    return () => document.removeEventListener('fullscreenchange', changed);
  }, []);
  useEffect(() => {
    if (!panel.current || paused) return;
    const tween = gsap.fromTo(panel.current, { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.65, ease: 'power3.out' });
    return () => { tween.kill(); };
  }, [active, paused]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && active) navigate({ to: '/' }); };
    window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler);
  }, [active, navigate]);
  return <div className={`portfolio-shell ${active ? 'destination-open' : ''}`} ref={shell}>
    <Universe active={active} paused={paused} onSelect={select} />
    <div className="scene-vignette" />
    <header className="site-header">
      <Link to="/" className="identity"><span className="monogram">on<span>.</span></span><span className="identity-name">OLWETHU NGALO<span>DEVELOPER & IT PROFESSIONAL</span></span></Link>
      <nav aria-label="Main navigation">{destinations.slice(0, 4).map(d => <Button key={d.id} variant="navigation" className={active === d.id ? 'nav-active' : ''} asChild><Link to={paths[d.id]}>{d.id === 'about' ? 'About' : d.label}</Link></Button>)}</nav>
      <Button variant="cosmic" className="header-contact" asChild><Link to="/contact">Let’s connect<ArrowUpRight size={15} /></Link></Button>
    </header>
    <main className="portfolio-main">
      {!active ? <div className="intro" ref={panel}>
        <div className="eyebrow"><span className="status-light" /> A UNIVERSE OF POSSIBILITIES</div>
        <h1>Olwethu<br />Ngalo<span>.</span></h1>
        <p className="intro-role">IT professional.<br /><span>Developer. Problem solver.</span></p>
        <p className="intro-copy">Turning complex challenges into<br />simple, meaningful solutions.</p>
        <Button variant="cosmic" className="explore-button" onClick={() => select('about')}>Explore my universe<ArrowRight size={17} /></Button>
        <Button variant="navigation" className="download-button" onClick={downloadCV}><Download size={15} />Download CV</Button>
      </div> : node && <div className="destination-panel" ref={panel}>
        <div className="panel-topline"><Button variant="navigation" onClick={() => navigate({ to: '/' })}><ArrowLeft size={15} />Universe</Button><span>0{index + 1} / 05</span><Button variant="instrument" size="icon" aria-label="Close destination" onClick={() => navigate({ to: '/' })}><X /></Button></div>
        <div className="eyebrow">{node.tag}</div><h1>{node.title}<span>.</span></h1><p className="panel-subtitle">{node.subtitle}</p>
        <div className="panel-content"><Content active={active} /></div>
        <div className="panel-next"><Button variant="navigation" onClick={() => select(next.id)}>Next destination<span>{next.label}</span><ArrowRight /></Button></div>
      </div>}
      <div className="scene-caption"><span className="crosshair">+</span><span>{active ? node?.tag : 'THE ORIGIN'}<small>01. A CONNECTED MIND</small></span></div>
      {!active && <div className="scene-coordinates">SYSTEM 01 / PERSONAL UNIVERSE<span>LOGIC · CURIOSITY · CRAFT</span></div>}
    </main>
    <footer className="site-footer"><div className="availability"><span className="status-light" /><span>OPEN TO OPPORTUNITIES</span></div><div className="footer-center"><span className="footer-line" /><span>{active ? 'YOUR NEXT DESTINATION AWAITS' : 'EVERY CONNECTION HAS A STORY'}</span><ArrowDown size={13} /></div><div className="scene-tools"><Button variant="instrument" size="icon" aria-label={paused ? 'Resume animations' : 'Pause animations'} title={paused ? 'Resume animations' : 'Pause animations'} onClick={() => setPaused(!paused)}>{paused ? <Play /> : <Pause />}</Button><Button variant="instrument" size="icon" aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} title={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} onClick={async () => { try { if (document.fullscreenElement) await document.exitFullscreen(); else await shell.current?.requestFullscreen(); } catch { setFullscreen(false); } }}>{fullscreen ? <Minimize /> : <Maximize />}</Button><span>© 2026 ON</span></div></footer>
  </div>;
}

export function portfolioHead(title: string, description: string) {
  return { meta: [{ title: `${title} · Olwethu Ngalo` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} · Olwethu Ngalo` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] };
}