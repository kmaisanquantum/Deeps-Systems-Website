import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, ArrowRight, ArrowUpRight, Award, BarChart3, Briefcase, Building2, Check, CheckCircle2,
  Cloud, Download, FileSearch, Flame, MapPin, Menu, Route, ShieldCheck, TrendingUp, Users, X,
} from 'lucide-react';

const nav = [
  ['discovery', 'Product discovery'], ['profile', 'Organization profile'], ['assessment', 'Maturity assessment'],
  ['roadmap', 'Roadmap generator'], ['engagement', 'Engagement planner'], ['reports', 'Reports & export'],
] as const;

type DomainKey = 'infrastructure' | 'security' | 'cloud' | 'data' | 'skills';
type CompanyProfile = { name: string; industry: string; size: string; systems: string };
type DemoState = { company: CompanyProfile; assessment: Record<string, number>; services: string[] };

const DOMAIN_LABELS: Record<DomainKey, string> = {
  infrastructure: 'Infrastructure', security: 'Security', cloud: 'Cloud adoption', data: 'Data', skills: 'Digital skills',
};

const QUESTIONS: { id: string; domain: DomainKey; text: string }[] = [
  { id: 'Q1', domain: 'infrastructure', text: 'How modern and reliable is your core network and server infrastructure?' },
  { id: 'Q2', domain: 'infrastructure', text: 'Can your infrastructure scale as demand and services grow?' },
  { id: 'Q3', domain: 'security', text: 'How well is your organisation protected against cyber threats?' },
  { id: 'Q4', domain: 'security', text: 'How ready are your backup, recovery, and incident response?' },
  { id: 'Q5', domain: 'cloud', text: 'How much of your workload runs on cloud or hosted platforms?' },
  { id: 'Q6', domain: 'data', text: 'How accessible and well governed is your core business data?' },
  { id: 'Q7', domain: 'data', text: 'Do you have the data you need for planning and reporting?' },
  { id: 'Q8', domain: 'skills', text: 'How strong are your team\u2019s digital skills and change readiness?' },
];

const DOMAIN_ICONS: Record<DomainKey, React.ComponentType<{ className?: string }>> = {
  infrastructure: Building2, security: ShieldCheck, cloud: Cloud, data: BarChart3, skills: Users,
};

const DOMAIN_INITIATIVES: Record<DomainKey, { foundation: string; modernization: string; growth: string }> = {
  infrastructure: { foundation: 'Stabilise core network and server reliability', modernization: 'Refresh aging hardware and standardise platforms', growth: 'Adopt resilient, scalable infrastructure across all sites' },
  security: { foundation: 'Implement baseline security controls and tested backups', modernization: 'Introduce monitoring, incident response, and access governance', growth: 'Build a continuous security improvement program' },
  cloud: { foundation: 'Assess which workloads suit cloud or hosting', modernization: 'Migrate priority workloads to a cloud or hybrid model', growth: 'Optimise cloud cost, resilience, and automation' },
  data: { foundation: 'Consolidate core business data into one trusted source', modernization: 'Introduce reporting and data governance practices', growth: 'Enable analytics-driven planning and decisions' },
  skills: { foundation: 'Identify critical digital skill gaps', modernization: 'Deliver targeted training and change enablement', growth: 'Embed a culture of continuous digital learning' },
};

const HORIZONS: { key: 'foundation' | 'modernization' | 'growth'; label: string; window: string }[] = [
  { key: 'foundation', label: 'Foundation', window: '0–6 months' },
  { key: 'modernization', label: 'Modernization', window: '6–15 months' },
  { key: 'growth', label: 'Growth', window: '15–30 months' },
];

const SERVICE_OPTIONS = ['Roadmap workshop', 'Architecture review', 'Vendor selection', 'Cloud migration planning'];

const DEFAULT_STATE: DemoState = {
  company: { name: '', industry: '', size: '1–50 staff', systems: '' }, assessment: {}, services: [],
};

const SAMPLE_STATE: DemoState = {
  company: { name: 'Pacific Island Utilities Ltd', industry: 'Energy & Utilities', size: '251–500 staff', systems: 'Legacy on-premise ERP, ageing servers, Excel-based reporting, limited cloud use' },
  assessment: { Q1: 3, Q2: 2, Q3: 2, Q4: 3, Q5: 2, Q6: 3, Q7: 2, Q8: 4 },
  services: ['Roadmap workshop', 'Architecture review'],
};

const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-emerald-900';
const labelClass = 'mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300';
const Button: React.FC<React.PropsWithChildren<{ onClick?: () => void; secondary?: boolean; className?: string; type?: 'button' | 'submit' }>> = ({ children, onClick, secondary = false, className = '', type = 'button' }) => <button type={type} onClick={onClick} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${secondary ? 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200' : 'bg-emerald-600 text-white hover:bg-emerald-700'} ${className}`}>{children}</button>;
const Panel: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900 ${className}`}>{children}</div>;
const SectionTitle: React.FC<{ eyebrow: string; title: string; detail?: string }> = ({ eyebrow, title, detail }) => <div className="mb-6"><p className="mb-2 text-[11px] font-bold uppercase tracking-[.2em] text-emerald-600">{eyebrow}</p><h2 className="text-2xl font-black tracking-tight md:text-3xl">{title}</h2>{detail && <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">{detail}</p>}</div>;
const Badge: React.FC<React.PropsWithChildren<{ tone?: 'green' | 'amber' | 'red' | 'slate' }>> = ({ children, tone = 'green' }) => { const styles = { green: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300', amber: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300', red: 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300', slate: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300' }; return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles[tone]}`}>{children}</span>; };
const Field: React.FC<React.PropsWithChildren<{ label: string }>> = ({ label, children }) => <label className="block"><span className={labelClass}>{label}</span>{children}</label>;
const csvCell = (value: string) => `"${String(value).replaceAll('"', '""')}"`;
const maturityTone = (score: number): 'green' | 'amber' | 'red' | 'slate' => score >= 4 ? 'green' : score >= 2.5 ? 'amber' : score > 0 ? 'red' : 'slate';
const DomainIcon: React.FC<{ domain: DomainKey; className?: string }> = ({ domain, className }) => { const Icon = DOMAIN_ICONS[domain]; return <Icon className={className} />; };

const DeepsAdvisory360DemoPage: React.FC = () => {
  const [active, setActive] = useState('discovery');
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState<DemoState>(() => {
    if (typeof window === 'undefined') return DEFAULT_STATE;
    try {
      // A unique key so this workspace never collides with other product demos.
      const saved = window.localStorage.getItem('deepsadvisory360-demo-state');
      if (!saved) return DEFAULT_STATE;
      const parsed = JSON.parse(saved) as Partial<DemoState>;
      return { ...DEFAULT_STATE, ...parsed, company: { ...DEFAULT_STATE.company, ...parsed.company }, assessment: parsed.assessment ?? {}, services: parsed.services ?? [] };
    } catch { return DEFAULT_STATE; }
  });

  useEffect(() => { window.localStorage.setItem('deepsadvisory360-demo-state', JSON.stringify(data)); }, [data]);
  const updateCompany = (patch: Partial<CompanyProfile>) => setData(prev => ({ ...prev, company: { ...prev.company, ...patch } }));
  const setScore = (id: string, value: number) => setData(prev => ({ ...prev, assessment: { ...prev.assessment, [id]: value } }));
  const toggleService = (service: string) => setData(prev => ({ ...prev, services: prev.services.includes(service) ? prev.services.filter(item => item !== service) : [...prev.services, service] }));
  const jump = (id: string) => { setActive(id); setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const resetDemo = () => { setData(DEFAULT_STATE); window.localStorage.removeItem('deepsadvisory360-demo-state'); };
  const loadSample = () => setData(SAMPLE_STATE);

  const answers = QUESTIONS.map(question => data.assessment[question.id]).filter((value): value is number => typeof value === 'number' && value >= 1);
  const overallScore = answers.length ? answers.reduce((sum, value) => sum + value, 0) / answers.length : 0;
  const domainScores = (Object.keys(DOMAIN_LABELS) as DomainKey[]).map(domain => { const questions = QUESTIONS.filter(question => question.domain === domain); const values = questions.map(question => data.assessment[question.id]).filter((value): value is number => typeof value === 'number' && value >= 1); return { domain, label: DOMAIN_LABELS[domain], score: values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0, answered: values.length, total: questions.length }; });
  const weakDomains = useMemo(() => domainScores.filter(domain => domain.answered > 0 && domain.score < 4).sort((a, b) => a.score - b.score), [domainScores]);
  const roadmap = { foundation: weakDomains.map(domain => DOMAIN_INITIATIVES[domain.domain].foundation), modernization: weakDomains.map(domain => DOMAIN_INITIATIVES[domain.domain].modernization), growth: weakDomains.map(domain => DOMAIN_INITIATIVES[domain.domain].growth) };
  const roadmapCount = roadmap.foundation.length + roadmap.modernization.length + roadmap.growth.length;
  const assessmentComplete = answers.length === QUESTIONS.length;
  const setupSteps = [
    { label: '1. Complete your organization profile', done: Boolean(data.company.name), target: 'profile' },
    { label: '2. Complete the maturity assessment', done: answers.length === QUESTIONS.length, target: 'assessment' },
    { label: '3. Select advisory services', done: data.services.length > 0, target: 'engagement' },
  ];
  const setupDone = setupSteps.filter(step => step.done).length;
  const setupProgress = Math.round((setupDone / setupSteps.length) * 100);
  const dayStreak = answers.length;
  const engagementXp = answers.length * 60 + data.services.length * 80 + roadmapCount * 40;

  const downloadCsv = () => {
    const rows = [
      ['Record type', 'Category', 'Item', 'Value 1', 'Value 2', 'Value 3', 'Value 4'],
      ['Profile', 'Organization', data.company.name || 'Not set', data.company.industry, data.company.size, data.company.systems, ''],
      ...QUESTIONS.map(question => ['Assessment', DOMAIN_LABELS[question.domain], question.text, data.assessment[question.id] ? `${data.assessment[question.id]}/5` : 'Not answered', '', '', '']),
      ...domainScores.map(domain => ['Domain score', domain.label, `${domain.score.toFixed(1)}/5`, `${domain.answered}/${domain.total} answered`, '', '', '']),
      ['Overall', 'Maturity score', overallScore ? `${overallScore.toFixed(2)}/5` : 'Not scored', '', '', '', ''],
      ...HORIZONS.flatMap(horizon => roadmap[horizon.key].map(item => ['Roadmap', horizon.label, horizon.window, item, '', '', ''])),
    ];
    const csv = rows.map(row => row.map(csvCell).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'deepsadvisory360-assessment-report.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-[#080d12] dark:text-slate-100">
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-slate-950/95"><div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 md:px-6"><a href="#discovery" className="flex min-w-0 items-center gap-3" onClick={event => { event.preventDefault(); jump('discovery'); }}><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white"><FileSearch className="h-5 w-5" /></div><div className="min-w-0"><p className="truncate text-sm font-black">DeepsAdvisory360</p><p className="truncate text-[10px] text-slate-500">{data.company.name || 'Your organization'}</p></div></a><div className="hidden items-center gap-2 md:flex"><Badge tone="amber"><Activity className="h-3 w-3" /> Your data stays in this browser</Badge><Badge tone="slate"><Flame className="h-3 w-3" />Day {dayStreak} streak · {engagementXp.toLocaleString()} XP</Badge><Button secondary className="px-3 py-2 text-xs" onClick={loadSample}>Load sample data</Button><Button secondary className="px-3 py-2 text-xs" onClick={resetDemo}>Clear workspace data</Button><Link to="/deepsadvisory360" className="text-xs font-semibold text-emerald-700">Product page <ArrowUpRight className="inline h-3 w-3" /></Link></div><button className="rounded-lg border border-slate-200 p-2 md:hidden" onClick={() => setMenuOpen(value => !value)} aria-label="Toggle demo menu">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button></div><div className="flex items-center justify-between gap-2 px-4 pb-3 md:hidden"><Badge tone="amber">Your data stays in this browser</Badge><Badge tone="slate"><Flame className="h-3 w-3" />Day {dayStreak} streak · {engagementXp.toLocaleString()} XP</Badge><div className="flex items-center gap-3"><button onClick={loadSample} className="text-xs font-bold text-emerald-700">Load sample data</button><button onClick={resetDemo} className="text-xs font-bold text-emerald-700">Clear workspace data</button></div></div></header>
    <div className="mx-auto grid max-w-[1500px] gap-6 px-4 py-6 md:grid-cols-[230px_minmax(0,1fr)] md:px-6"><aside className={`${menuOpen ? 'block' : 'hidden'} md:block`}><nav className="sticky top-[78px] grid max-h-[calc(100vh-100px)] gap-1 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-slate-900"><p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-slate-400">Workspace · 6 sections</p>{nav.map(([id, label], index) => <button key={id} onClick={() => jump(id)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition ${active === id ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'}`}><span className="w-5 text-[10px] text-slate-400">{String(index + 1).padStart(2, '0')}</span>{label}</button>)}</nav></aside>
      <main className="min-w-0 space-y-12">
        <section id="discovery" className="scroll-mt-24 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-7 text-white md:p-12"><div className="grid items-center gap-8 lg:grid-cols-[1.2fr_.8fr]"><div><Badge><FileSearch className="h-3 w-3" /> Strategic ICT Advisory</Badge><h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight md:text-6xl">Your digital strategy, aligned with PNG&apos;s opportunities.</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">Explore a hands-on advisory workspace. Profile your organisation, complete a maturity assessment, generate a 3-horizon roadmap, and plan engagements; your data stays in this browser.</p><div className="mt-6 flex flex-wrap gap-3"><Button onClick={() => jump('profile')}>Set up your workspace <ArrowRight className="h-4 w-4" /></Button><Button secondary onClick={loadSample}>Load sample data</Button></div></div><div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"><div className="mb-5 flex items-center justify-between"><span className="text-sm font-bold">Assessment snapshot</span><Badge>Live workspace</Badge></div><div className="grid grid-cols-2 gap-3">{[['Questions answered', `${answers.length}/${QUESTIONS.length}`], ['Maturity score', overallScore ? `${overallScore.toFixed(1)}/5` : '—'], ['Services selected', data.services.length], ['Roadmap items', roadmapCount]].map(([label, value]) => <div key={label} className="rounded-xl bg-white/5 p-4"><p className="text-xs text-slate-400">{label}</p><p className="mt-2 text-2xl font-black">{value}</p></div>)}</div><div className="mt-5"><div className="mb-2 flex items-center justify-between"><p className="text-[11px] font-bold uppercase tracking-[.2em] text-slate-300">Setup checklist</p><span className="text-[11px] font-bold text-white">{setupDone}/{setupSteps.length}</span></div><div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${setupProgress}%` }} /></div><div className="space-y-2">{setupSteps.map(step => <div key={step.label} className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-3 py-2"><span className="flex items-center gap-2 text-xs font-semibold">{step.done ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <span className="h-4 w-4 rounded-full border border-white/30" />}{step.label}</span><button onClick={() => jump(step.target)} className="text-[11px] font-bold text-emerald-300 hover:text-emerald-200">Go</button></div>)}</div><div className="mt-4"><p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-slate-400">Milestones</p><div className="flex flex-wrap gap-2">{setupSteps.map(step => <span key={step.label} className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${step.done ? 'bg-emerald-500/15 text-emerald-300' : 'bg-white/5 text-slate-500'}`}>{step.done ? <CheckCircle2 className="h-3 w-3" /> : <span className="h-3 w-3 rounded-full border border-white/20" />}{step.label.replace(/^\d+\.\s*/, '')}</span>)}</div></div></div></div></div></section>

        <section id="profile" className="scroll-mt-24"><SectionTitle eyebrow="02 · Get started" title="Organization profile" detail="Tell us about your organisation so the assessment and roadmap reflect your context." /><Panel><div className="grid gap-4 md:grid-cols-2"><Field label="Organization name"><input className={inputClass} value={data.company.name} onChange={event => updateCompany({ name: event.target.value })} placeholder="e.g. Pacific Island Utilities Ltd" /></Field><Field label="Industry"><input className={inputClass} value={data.company.industry} onChange={event => updateCompany({ industry: event.target.value })} placeholder="e.g. Energy & Utilities" /></Field><Field label="Organization size"><select className={inputClass} value={data.company.size} onChange={event => updateCompany({ size: event.target.value })}>{['1–50 staff', '51–250 staff', '251–500 staff', '500+ staff'].map(size => <option key={size}>{size}</option>)}</select></Field><Field label="Current systems"><textarea className={`${inputClass} min-h-[76px]`} value={data.company.systems} onChange={event => updateCompany({ systems: event.target.value })} placeholder="Describe your current core systems, hosting, and tools" /></Field></div><div className="mt-5 flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300"><Check className="h-4 w-4" /> {data.company.name ? `Profile saved for ${data.company.name}.` : 'Nothing saved yet — fill in the profile above.'}</div></Panel></section>

        <section id="assessment" className="scroll-mt-24"><SectionTitle eyebrow="03 · Baseline" title="Maturity assessment" detail="Score each statement from 1 (weak) to 5 (strong). Scores feed your maturity profile and roadmap." /><div className="mb-4 flex flex-wrap items-center gap-4"><div className="min-w-[240px] rounded-2xl border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-slate-900"><div className="flex items-center justify-between gap-4 text-sm"><span className="font-bold">Maturity level</span><span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">{overallScore ? `${overallScore.toFixed(1)}/5` : 'not scored'}</span></div><div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${(overallScore / 5) * 100}%` }} /></div><p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{answers.length} of {QUESTIONS.length} questions answered</p></div>{assessmentComplete && <Badge><Award className="h-3 w-3" />Assessment complete</Badge>}</div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{domainScores.map(domain => <Panel key={domain.domain}><div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><DomainIcon domain={domain.domain} className="h-4 w-4 text-emerald-600" /><p className="text-sm font-bold">{domain.label}</p></div><Badge tone={maturityTone(domain.score)}>{domain.answered ? `${domain.score.toFixed(1)}/5` : 'Not scored'}</Badge></div><div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${(domain.score / 5) * 100}%` }} /></div><p className="mt-2 text-[11px] text-slate-400">{domain.answered}/{domain.total} answered</p></Panel>)}</div><Panel className="mt-4"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-bold">Questionnaire</h3><p className="text-xs text-slate-500">{QUESTIONS.length - answers.length} of {QUESTIONS.length} questions remaining</p></div><Badge tone={maturityTone(overallScore)}>Overall {overallScore ? `${overallScore.toFixed(1)}/5` : 'not scored'}</Badge></div><div className="space-y-4">{(Object.keys(DOMAIN_LABELS) as DomainKey[]).map(domain => <div key={domain}><div className="mb-2 flex items-center gap-2"><DomainIcon domain={domain} className="h-4 w-4 text-emerald-600" /><p className="text-xs font-bold uppercase tracking-wider text-slate-500">{DOMAIN_LABELS[domain]}</p></div><div className="space-y-3">{QUESTIONS.filter(question => question.domain === domain).map(question => <div key={question.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 px-4 py-3 dark:border-white/10"><p className="max-w-xl text-sm">{question.text}</p><div className="flex gap-1.5">{[1, 2, 3, 4, 5].map(value => { const selected = data.assessment[question.id] === value; return <button key={value} type="button" onClick={() => setScore(question.id, value)} className={`h-9 w-9 rounded-lg text-sm font-bold transition ${selected ? 'bg-emerald-600 text-white' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300'}`}>{value}</button>; })}</div></div>)}</div></div>)}</div></Panel></section>

        <section id="roadmap" className="scroll-mt-24"><SectionTitle eyebrow="04 · Plan" title="Roadmap generator" detail="A phased 3-horizon roadmap, generated from the areas that scored lowest in your assessment." />{answers.length === 0 ? <Panel className="text-center text-sm text-slate-500">Complete the maturity assessment to generate your roadmap.</Panel> : <div className="grid gap-4 md:grid-cols-3">{HORIZONS.map((horizon, index) => <Panel key={horizon.key}><div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Horizon 0{index + 1}</p><h3 className="text-lg font-black">{horizon.label}</h3><p className="text-xs text-slate-500">{horizon.window}</p></div><Route className="h-5 w-5 text-emerald-600" /></div><ul className="space-y-3">{roadmap[horizon.key].map(item => <li key={item} className="flex gap-3 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /><span>{item}</span></li>)}{roadmap[horizon.key].length === 0 && <li className="text-sm text-slate-500">No priority initiatives for this horizon — your scores here are already strong.</li>}</ul></Panel>)}</div>}<Panel className="mt-4"><h3 className="mb-2 font-bold">How this roadmap is built</h3><p className="text-sm text-slate-500">Domains scoring below 4/5 are prioritised, weakest first, and mapped to the horizon where that work fits best: stabilise in the foundation, modernise next, then scale for growth.</p></Panel></section>

        <section id="engagement" className="scroll-mt-24"><SectionTitle eyebrow="05 · Engage" title="Engagement planner" detail="Select the advisory services you would like to start with. Your choices are stored in this workspace." /><div className="grid gap-4 sm:grid-cols-2">{SERVICE_OPTIONS.map(service => { const selected = data.services.includes(service); return <button key={service} type="button" onClick={() => toggleService(service)} className={`flex items-center justify-between gap-4 rounded-2xl border p-5 text-left transition ${selected ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900'}`}><div className="flex items-center gap-3"><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${selected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500 dark:bg-white/10'}`}><Briefcase className="h-5 w-5" /></span><div><p className="font-bold">{service}</p><p className="text-xs text-slate-500">{selected ? 'Selected for your engagement' : 'Tap to add to your plan'}</p></div></div><span className={`flex h-6 w-6 items-center justify-center rounded-full border ${selected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 text-transparent'}`}><Check className="h-3.5 w-3.5" /></span></button>; })}</div><Panel className="mt-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-bold">Selected services ({data.services.length})</h3>{data.services.length ? <div className="mt-3 flex flex-wrap gap-2">{data.services.map(service => <Badge key={service}>{service}</Badge>)}</div> : <p className="mt-2 text-sm text-slate-500">No services selected yet — pick one or more above.</p>}</div>{data.services.length > 0 && <Button secondary onClick={() => setData(prev => ({ ...prev, services: [] }))}>Clear selection</Button>}</div></Panel></section>

        <section id="reports" className="scroll-mt-24"><SectionTitle eyebrow="06 · Insights" title="Reports & export" detail="Export the actual assessment results and generated roadmap from this browser workspace." /><div className="grid gap-4 md:grid-cols-2"><Panel><BarChart3 className="mb-4 h-6 w-6 text-emerald-600" /><h3 className="font-bold">Assessment report</h3><p className="mt-2 text-sm text-slate-500">{answers.length} of {QUESTIONS.length} questions scored, overall maturity {overallScore ? `${overallScore.toFixed(2)}/5` : 'not yet scored'}, with {roadmapCount} roadmap initiatives across {HORIZONS.length} horizons{data.services.length ? ` and ${data.services.length} selected service${data.services.length === 1 ? '' : 's'}` : ''} for {data.company.name || 'your organization'}.</p><Button className="mt-5" onClick={downloadCsv}><Download className="h-4 w-4" />Download CSV</Button></Panel><Panel><FileSearch className="mb-4 h-6 w-6 text-emerald-600" /><h3 className="font-bold">Data included</h3><ul className="mt-3 space-y-2 text-sm text-slate-500"><li>Organization profile: name, industry, size and current systems</li><li>Each assessment question, its domain and score</li><li>Per-domain and overall maturity scores</li><li>Generated roadmap initiatives by horizon</li></ul></Panel></div><div className="mt-4 grid gap-4 md:grid-cols-3"><Panel><TrendingUp className="mb-3 h-5 w-5 text-emerald-600" /><p className="text-xs text-slate-500">Overall maturity score</p><p className="mt-1 text-2xl font-black">{overallScore ? `${overallScore.toFixed(1)}/5` : '—'}</p></Panel><Panel><MapPin className="mb-3 h-5 w-5 text-emerald-600" /><p className="text-xs text-slate-500">Weakest domain</p><p className="mt-1 text-2xl font-black">{weakDomains.length ? weakDomains[0].label : '—'}</p></Panel><Panel><Route className="mb-3 h-5 w-5 text-emerald-600" /><p className="text-xs text-slate-500">Roadmap initiatives</p><p className="mt-1 text-2xl font-black">{roadmapCount}</p></Panel></div><div className="mt-4 flex items-center gap-2 text-xs text-slate-500"><Activity className="h-4 w-4" /><span>Your workspace data persists in this browser only.</span></div></section>

        <section className="scroll-mt-24 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-7 text-white md:p-12"><div className="flex flex-wrap items-center justify-between gap-6"><div><p className="text-[11px] font-bold uppercase tracking-[.2em] text-emerald-400">Get started</p><h2 className="mt-2 max-w-2xl text-3xl font-black leading-tight md:text-4xl">Ready to align your digital strategy? Book an advisory session.</h2></div><div className="flex flex-wrap items-center gap-3"><Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">Book an advisory session <ArrowRight className="h-4 w-4" /></Link><Link to="/deepsadvisory360" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20">Back to product page</Link></div></div></section>
      </main>
    </div>
  </div>;
};

export default DeepsAdvisory360DemoPage;
