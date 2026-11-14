import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, AlertTriangle, ArrowRight, ArrowUpRight, Award, BarChart3, Building2, Check, CheckCircle2,
  Clock3, Cloud, Cpu, Download, FileText, Flame, Link2, Menu, Play, Plus, Search, TrendingUp, Wallet,
  Workflow, X, Zap,
} from 'lucide-react';

const nav = [
  ['discovery', 'Product discovery'], ['registration', 'Company registration'], ['subscription', 'Subscription'],
  ['dashboard', 'Automation dashboard'], ['workflows', 'Workflow builder'], ['integrations', 'Integrations'],
  ['runs', 'Automation runs'], ['approvals', 'Approvals queue'], ['reports', 'Reports & analytics'],
] as const;

type CompanyProfile = { name: string; code: string; plan: string; contactEmail: string; adminName: string };
type WorkflowStatus = 'Active' | 'Paused' | 'Draft';
type Workflow = { id: string; name: string; trigger: string; steps: string; status: WorkflowStatus; runs: number; minutesSaved: number; xp: number; streak: number };
type Integration = { id: string; system: string; category: string; status: 'Connected' | 'Available' };
type RunStatus = 'Success' | 'Running' | 'Failed';
type Run = { id: string; workflowId: string; status: RunStatus; startedAt: string; durationSeconds: number };
type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected';
type Approval = { id: string; title: string; requestedBy: string; status: ApprovalStatus; createdAt: string };
type DemoState = { company: CompanyProfile; workflows: Workflow[]; integrations: Integration[]; runs: Run[]; approvals: Approval[] };

const DEFAULT_STATE: DemoState = {
  company: { name: '', code: '', plan: 'Starter', contactEmail: '', adminName: '' },
  workflows: [], integrations: [], runs: [], approvals: [],
};

const WORKFLOW_STATUSES: WorkflowStatus[] = ['Draft', 'Active', 'Paused'];

const SAMPLE_STATE: DemoState = {
  company: { name: 'Morobe Freight & Logistics', code: 'MFL-2043', plan: 'Growth', contactEmail: 'ops@morobefreight.example', adminName: 'Lena Alu' },
  workflows: [
    { id: 'W-5001', name: 'Invoice approval & post to accounting', trigger: 'New invoice email', steps: 'Extract → match PO → route approval', status: 'Active', runs: 128, minutesSaved: 640, xp: 1280, streak: 7 },
    { id: 'W-5002', name: 'Driver job sheet sync', trigger: 'Job completed in app', steps: 'Sync → notify customer', status: 'Active', runs: 86, minutesSaved: 258, xp: 860, streak: 5 },
    { id: 'W-5003', name: 'Weekly KPI report', trigger: 'Schedule (Mon 7am)', steps: 'Collect → compile → email', status: 'Paused', runs: 12, minutesSaved: 60, xp: 120, streak: 2 },
    { id: 'W-5004', name: 'New supplier onboarding', trigger: 'Manual', steps: 'Collect docs → risk check → notify', status: 'Draft', runs: 0, minutesSaved: 0, xp: 0, streak: 0 },
  ],
  integrations: [
    { id: 'I-01', system: 'Microsoft 365 (Email)', category: 'Email', status: 'Connected' },
    { id: 'I-02', system: 'Xero', category: 'Accounting', status: 'Connected' },
    { id: 'I-03', system: 'SAP Business One', category: 'ERP', status: 'Available' },
    { id: 'I-04', system: 'Twilio SMS', category: 'Messaging', status: 'Connected' },
  ],
  runs: [
    { id: 'R-9001', workflowId: 'W-5001', status: 'Success', startedAt: '6/4/2024, 9:02:00 AM', durationSeconds: 42 },
    { id: 'R-9002', workflowId: 'W-5002', status: 'Success', startedAt: '6/4/2024, 8:41:00 AM', durationSeconds: 18 },
    { id: 'R-9003', workflowId: 'W-5001', status: 'Failed', startedAt: '6/3/2024, 4:17:00 PM', durationSeconds: 7 },
    { id: 'R-9004', workflowId: 'W-5003', status: 'Success', startedAt: '6/3/2024, 7:00:00 AM', durationSeconds: 55 },
  ],
  approvals: [
    { id: 'A-7001', title: 'Invoice INV-2291 over 5,000 PGK', requestedBy: 'Accounts', status: 'Pending', createdAt: '6/4/2024, 9:05:00 AM' },
    { id: 'A-7002', title: 'New supplier: Hagen Parts Ltd', requestedBy: 'Procurement', status: 'Approved', createdAt: '6/3/2024, 2:30:00 PM' },
    { id: 'A-7003', title: 'Discount policy change', requestedBy: 'Sales', status: 'Pending', createdAt: '6/2/2024, 11:12:00 AM' },
  ],
};

const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-white/10 dark:bg-slate-900 dark:text-slate-100 dark:focus:ring-indigo-900';
const labelClass = 'mb-1.5 block text-xs font-semibold text-slate-600 dark:text-slate-300';
const Button: React.FC<React.PropsWithChildren<{ onClick?: () => void; secondary?: boolean; className?: string; type?: 'button' | 'submit' }>> = ({ children, onClick, secondary = false, className = '', type = 'button' }) => <button type={type} onClick={onClick} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${secondary ? 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-900 dark:text-slate-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'} ${className}`}>{children}</button>;
const Panel: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900 ${className}`}>{children}</div>;
const SectionTitle: React.FC<{ eyebrow: string; title: string; detail?: string }> = ({ eyebrow, title, detail }) => <div className="mb-6"><p className="mb-2 text-[11px] font-bold uppercase tracking-[.2em] text-indigo-600">{eyebrow}</p><h2 className="text-2xl font-black tracking-tight md:text-3xl">{title}</h2>{detail && <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">{detail}</p>}</div>;
const Badge: React.FC<React.PropsWithChildren<{ tone?: 'green' | 'amber' | 'red' | 'slate' }>> = ({ children, tone = 'green' }) => { const styles = { green: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300', amber: 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300', red: 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300', slate: 'bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300' }; return <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles[tone]}`}>{children}</span>; };
const Field: React.FC<React.PropsWithChildren<{ label: string }>> = ({ label, children }) => <label className="block"><span className={labelClass}>{label}</span>{children}</label>;
const csvCell = (value: string) => `"${String(value).replaceAll('"', '""')}"`;
const workflowTone = (status: WorkflowStatus): 'green' | 'amber' | 'slate' => status === 'Active' ? 'green' : status === 'Paused' ? 'amber' : 'slate';
const runTone = (status: RunStatus): 'green' | 'amber' | 'red' => status === 'Success' ? 'green' : status === 'Running' ? 'amber' : 'red';
const approvalTone = (status: ApprovalStatus): 'green' | 'amber' | 'red' => status === 'Approved' ? 'green' : status === 'Rejected' ? 'red' : 'amber';

const DeepsFlowDemoPage: React.FC = () => {
  const [active, setActive] = useState('discovery');
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState<DemoState>(() => {
    if (typeof window === 'undefined') return DEFAULT_STATE;
    try {
      const saved = window.localStorage.getItem('deepsflow-demo-state');
      if (!saved) return DEFAULT_STATE;
      const parsed = JSON.parse(saved) as Partial<DemoState>;
      return { ...DEFAULT_STATE, ...parsed, company: { ...DEFAULT_STATE.company, ...parsed.company }, workflows: parsed.workflows ?? [], integrations: parsed.integrations ?? [], runs: parsed.runs ?? [], approvals: parsed.approvals ?? [] };
    } catch { return DEFAULT_STATE; }
  });
  const [registrationStep, setRegistrationStep] = useState(0);
  const [registration, setRegistration] = useState({ name: '', email: '', admin: '', password: '', plan: 'Starter' });
  const [subActive, setSubActive] = useState(true);
  const [workflowForm, setWorkflowForm] = useState({ name: '', trigger: '', steps: '', status: 'Draft' as WorkflowStatus });
  const [query, setQuery] = useState('');

  useEffect(() => { window.localStorage.setItem('deepsflow-demo-state', JSON.stringify(data)); }, [data]);
  const updateCompany = (patch: Partial<CompanyProfile>) => setData(prev => ({ ...prev, company: { ...prev.company, ...patch } }));
  const workflowName = (id: string) => data.workflows.find(workflow => workflow.id === id)?.name ?? 'Unknown workflow';
  const tasksAutomated = data.workflows.reduce((sum, workflow) => sum + workflow.runs, 0);
  const minutesSaved = data.workflows.reduce((sum, workflow) => sum + workflow.minutesSaved, 0);
  const hoursSaved = minutesSaved / 60;
  const costSavings = Math.round(hoursSaved * 45);
  const activeWorkflows = data.workflows.filter(workflow => workflow.status === 'Active').length;
  const pendingApprovals = data.approvals.filter(approval => approval.status === 'Pending').length;
  const championId = [...data.workflows].sort((a, b) => b.runs - a.runs)[0]?.id ?? '';
  const automationStreak = data.workflows.reduce((max, workflow) => Math.max(max, workflow.streak ?? 0), 0);
  const totalXp = data.workflows.reduce((sum, workflow) => sum + (workflow.xp ?? 0), 0);
  const filteredWorkflows = useMemo(() => data.workflows.filter(workflow => `${workflow.name} ${workflow.trigger} ${workflow.id}`.toLowerCase().includes(query.toLowerCase())), [data.workflows, query]);
  const jump = (id: string) => { setActive(id); setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const resetDemo = () => { setData(DEFAULT_STATE); setRegistrationStep(0); setRegistration({ name: '', email: '', admin: '', password: '', plan: 'Starter' }); window.localStorage.removeItem('deepsflow-demo-state'); };
  const loadSample = () => setData(SAMPLE_STATE);
  const setupSteps = [
    { label: '1. Register your company', done: Boolean(data.company.name), target: 'registration' },
    { label: '2. Create workflows', done: data.workflows.length > 0, target: 'workflows' },
    { label: '3. Connect a system', done: data.integrations.some(integration => integration.status === 'Connected'), target: 'integrations' },
  ];

  const addWorkflow = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); if (!workflowForm.name.trim()) return;
    const id = `W-${Date.now().toString().slice(-6)}`;
    setData(prev => ({ ...prev, workflows: [...prev.workflows, { id, name: workflowForm.name.trim(), trigger: workflowForm.trigger.trim() || 'Manual', steps: workflowForm.steps.trim() || 'No steps yet', status: workflowForm.status, runs: 0, minutesSaved: 0 }] }));
    setWorkflowForm({ name: '', trigger: '', steps: '', status: 'Draft' });
  };
  const runWorkflow = (id: string) => setData(prev => ({
    ...prev,
    workflows: prev.workflows.map(workflow => workflow.id === id ? { ...workflow, runs: workflow.runs + 1, minutesSaved: workflow.minutesSaved + 5, status: workflow.status === 'Draft' ? 'Active' : workflow.status } : workflow),
    runs: [{ id: `R-${Date.now().toString().slice(-6)}`, workflowId: id, status: 'Success' as RunStatus, startedAt: new Date().toLocaleString(), durationSeconds: 20 + (Date.now() % 40) }, ...prev.runs],
  }));
  const toggleIntegration = (id: string) => setData(prev => ({ ...prev, integrations: prev.integrations.map(integration => integration.id === id ? { ...integration, status: integration.status === 'Connected' ? 'Available' : 'Connected' } : integration) }));
  const setApprovalStatus = (id: string, status: ApprovalStatus) => setData(prev => ({ ...prev, approvals: prev.approvals.map(approval => approval.id === id ? { ...approval, status } : approval) }));
  const downloadCsv = () => {
    const rows = [
      ['Record type', 'ID', 'Name', 'Detail 1', 'Detail 2', 'Detail 3', 'Detail 4'],
      ...data.workflows.map(workflow => ['Workflow', workflow.id, workflow.name, workflow.trigger, workflow.steps, workflow.status, `${workflow.runs} runs`]),
      ...data.integrations.map(integration => ['Integration', integration.id, integration.system, integration.category, integration.status, '', '']),
      ...data.runs.map(run => ['Run', run.id, workflowName(run.workflowId), run.status, `${run.durationSeconds}s`, run.startedAt, '']),
      ...data.approvals.map(approval => ['Approval', approval.id, approval.title, approval.requestedBy, approval.status, approval.createdAt, '']),
    ];
    const csv = rows.map(row => row.map(csvCell).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'deepsflow-workspace-report.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-[#080d12] dark:text-slate-100">
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-white/10 dark:bg-slate-950/95"><div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-3 md:px-6"><a href="#discovery" className="flex min-w-0 items-center gap-3" onClick={event => { event.preventDefault(); jump('discovery'); }}><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white"><Workflow className="h-5 w-5" /></div><div className="min-w-0"><p className="truncate text-sm font-black">DeepsFlow</p><p className="truncate text-[10px] text-slate-500">{data.company.name || 'Your company'}</p></div></a><div className="hidden items-center gap-2 md:flex"><Badge tone="amber"><Activity className="h-3 w-3" /> Your data stays in this browser</Badge><Button secondary className="px-3 py-2 text-xs" onClick={loadSample}>Load sample data</Button><Button secondary className="px-3 py-2 text-xs" onClick={resetDemo}>Clear workspace data</Button><Link to="/deepsflow" className="text-xs font-semibold text-indigo-700">Product page <ArrowUpRight className="inline h-3 w-3" /></Link></div><button className="rounded-lg border border-slate-200 p-2 md:hidden" onClick={() => setMenuOpen(value => !value)} aria-label="Toggle demo menu">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button></div><div className="flex items-center justify-between gap-2 px-4 pb-3 md:hidden"><Badge tone="amber">Your data stays in this browser</Badge><div className="flex items-center gap-3"><button onClick={loadSample} className="text-xs font-bold text-indigo-700">Load sample data</button><button onClick={resetDemo} className="text-xs font-bold text-indigo-700">Clear workspace data</button></div></div></header>
    <div className="mx-auto grid max-w-[1500px] gap-6 px-4 py-6 md:grid-cols-[230px_minmax(0,1fr)] md:px-6"><aside className={`${menuOpen ? 'block' : 'hidden'} md:block`}><nav className="sticky top-[78px] grid max-h-[calc(100vh-100px)] gap-1 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-slate-900"><p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-slate-400">Workspace · 9 sections</p>{nav.map(([id, label], index) => <button key={id} onClick={() => jump(id)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition ${active === id ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'}`}><span className="w-5 text-[10px] text-slate-400">{String(index + 1).padStart(2, '0')}</span>{label}</button>)}</nav></aside>
      <main className="min-w-0 space-y-12">
        <section id="discovery" className="scroll-mt-24 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-7 text-white md:p-12"><div className="grid items-center gap-8 lg:grid-cols-[1.2fr_.8fr]"><div><Badge><Cloud className="h-3 w-3" /> Cloud & Automation</Badge><h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight md:text-6xl">Automate the work that slows you down.</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">Explore a hands-on workspace for your team. Design workflows, connect the systems you already use, track automation runs, and measure the hours and costs you save; your data stays in this browser.</p><div className="mt-6 flex flex-wrap gap-3"><Button onClick={() => jump('registration')}>Set up your workspace <ArrowRight className="h-4 w-4" /></Button><Button secondary onClick={loadSample}>Load sample data</Button></div></div><div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"><div className="mb-5 flex items-center justify-between"><span className="text-sm font-bold">Automation snapshot</span><Badge>Live workspace</Badge></div><div className="grid grid-cols-2 gap-3">{[['Workflows', data.workflows.length], ['Integrations', data.integrations.length], ['Runs', data.runs.length], ['Approvals', pendingApprovals]].map(([label, value]) => <div key={label} className="rounded-xl bg-white/5 p-4"><p className="text-xs text-slate-400">{label}</p><p className="mt-2 text-2xl font-black">{value}</p></div>)}</div><div className="mt-5"><p className="mb-2 text-[11px] font-bold uppercase tracking-[.2em] text-slate-300">Setup checklist</p><div className="space-y-2">{setupSteps.map(step => <div key={step.label} className="flex items-center justify-between gap-3 rounded-xl bg-white/5 px-3 py-2"><span className="flex items-center gap-2 text-xs font-semibold">{step.done ? <CheckCircle2 className="h-4 w-4 text-indigo-400" /> : <span className="h-4 w-4 rounded-full border border-white/30" />}{step.label}</span><button onClick={() => jump(step.target)} className="text-[11px] font-bold text-indigo-300 hover:text-indigo-200">Go</button></div>)}</div></div></div></div></section>

        <section id="registration" className="scroll-mt-24"><SectionTitle eyebrow="02 · Get started" title="Company registration" detail="Create the tenant profile for your company." /><Panel><form className="grid gap-4 md:grid-cols-2" onSubmit={event => { event.preventDefault(); updateCompany({ name: registration.name.trim(), contactEmail: registration.email.trim(), adminName: registration.admin.trim(), plan: registration.plan }); setRegistrationStep(1); }}><Field label="Company name"><input className={inputClass} required value={registration.name} onChange={event => setRegistration({ ...registration, name: event.target.value })} placeholder="e.g. Morobe Freight & Logistics" /></Field><Field label="Business email"><input className={inputClass} required type="email" value={registration.email} onChange={event => setRegistration({ ...registration, email: event.target.value })} placeholder="you@company.com" /></Field><Field label="Admin name"><input className={inputClass} required value={registration.admin} onChange={event => setRegistration({ ...registration, admin: event.target.value })} placeholder="Workspace administrator" /></Field><Field label="Password"><input className={inputClass} required minLength={8} type="password" value={registration.password} onChange={event => setRegistration({ ...registration, password: event.target.value })} placeholder="At least 8 characters" autoComplete="new-password" /></Field><Field label="Select a plan"><select className={inputClass} value={registration.plan} onChange={event => setRegistration({ ...registration, plan: event.target.value })}>{['Starter', 'Growth', 'Professional', 'Enterprise'].map(plan => <option key={plan}>{plan}</option>)}</select></Field><div className="flex items-end"><Button type="submit"><CheckCircle2 className="h-4 w-4" /> Complete registration</Button></div></form>{registrationStep >= 1 && <div className="mt-5 rounded-xl bg-indigo-50 p-4 text-sm text-indigo-800 dark:bg-indigo-500/10 dark:text-indigo-300"><Check className="mr-2 inline h-4 w-4" />Workspace updated for {data.company.name} ({data.company.plan}). Your password is not saved.</div>}</Panel></section>

        <section id="subscription" className="scroll-mt-24"><SectionTitle eyebrow="03 · Billing" title="Subscription management" detail="Choose a plan by workflow capacity and model subscription activation." /><Panel className="flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-3"><div className="rounded-xl bg-indigo-50 p-3 text-indigo-700 dark:bg-indigo-500/10"><Wallet className="h-5 w-5" /></div><div><p className="font-bold">{data.company.plan} plan</p><p className="text-xs text-slate-500">{data.company.name || 'Your company'} · workspace subscription</p></div></div><div className="flex items-center gap-3"><select className={inputClass} value={data.company.plan} onChange={event => updateCompany({ plan: event.target.value })}>{['Starter', 'Growth', 'Professional', 'Enterprise'].map(plan => <option key={plan}>{plan}</option>)}</select><Button secondary onClick={() => setSubActive(value => !value)}>{subActive ? 'Pause plan' : 'Activate plan'}</Button><Badge tone={subActive ? 'green' : 'slate'}>{subActive ? 'Active' : 'Paused'}</Badge></div></Panel></section>

        <section id="dashboard" className="scroll-mt-24"><SectionTitle eyebrow="04 · Company workspace" title={`${data.company.name || 'Your company'} dashboard`} detail="Live totals calculated from the data in this browser." /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{[{ label: 'Workflows active', value: activeWorkflows, icon: Workflow }, { label: 'Tasks automated', value: tasksAutomated, icon: Zap }, { label: 'Hours saved', value: Number(hoursSaved.toFixed(1)), icon: Clock3 }, { label: 'Cost savings (PGK)', value: costSavings, icon: TrendingUp }, { label: 'Pending approvals', value: pendingApprovals, icon: CheckCircle2 }].map(item => <Panel key={item.label}><item.icon className="mb-3 h-5 w-5 text-indigo-600" /><p className="text-xs text-slate-500">{item.label}</p><p className="mt-1 text-3xl font-black">{item.value}</p></Panel>)}</div><div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 dark:border-indigo-500/20 dark:bg-indigo-500/10"><Flame className="h-4 w-4 text-indigo-600" /><span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">{automationStreak}-day automation streak</span><span className="ml-auto text-xs font-semibold text-indigo-700 dark:text-indigo-300">{totalXp.toLocaleString()} XP earned</span></div><div className="mt-4 grid gap-4 md:grid-cols-2"><Panel><h3 className="font-bold">Company profile</h3><p className="mt-2 text-sm text-slate-500">{data.company.contactEmail || 'Add a business email during registration'}</p><p className="mt-1 text-xs text-slate-500">{data.company.plan} plan · {data.company.adminName || 'Admin not set'}</p></Panel><Panel><h3 className="font-bold">Connected systems</h3>{data.integrations.filter(integration => integration.status === 'Connected').length ? <div className="mt-3 flex flex-wrap gap-2">{data.integrations.filter(integration => integration.status === 'Connected').map(integration => <Badge key={integration.id} tone="slate"><Cloud className="h-3 w-3" />{integration.system}</Badge>)}</div> : <p className="mt-2 text-sm text-slate-500">No systems connected yet — connect one in the integrations section.</p>}</Panel></div></section>

        <section id="workflows" className="scroll-mt-24"><SectionTitle eyebrow="05 · Automation" title="Workflow builder" detail="Create workflows from a trigger and a set of steps, then run them and track the time saved. Everything is kept in this browser only." /><Panel><form className="grid gap-3 md:grid-cols-2 xl:grid-cols-4" onSubmit={addWorkflow}><Field label="Workflow name"><input className={inputClass} required value={workflowForm.name} onChange={event => setWorkflowForm({ ...workflowForm, name: event.target.value })} placeholder="e.g. Invoice approval" /></Field><Field label="Trigger"><input className={inputClass} value={workflowForm.trigger} onChange={event => setWorkflowForm({ ...workflowForm, trigger: event.target.value })} placeholder="Event or schedule" /></Field><Field label="Steps"><input className={inputClass} value={workflowForm.steps} onChange={event => setWorkflowForm({ ...workflowForm, steps: event.target.value })} placeholder="Comma-separated steps" /></Field><div className="flex items-end gap-3"><Field label="Status"><select className={inputClass} value={workflowForm.status} onChange={event => setWorkflowForm({ ...workflowForm, status: event.target.value as WorkflowStatus })}>{WORKFLOW_STATUSES.map(status => <option key={status}>{status}</option>)}</select></Field><Button type="submit"><Plus className="h-4 w-4" />Add</Button></div></form></Panel><Panel className="mt-4"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><h3 className="font-bold">Workflows ({data.workflows.length})</h3><div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input className={`${inputClass} pl-9`} value={query} onChange={event => setQuery(event.target.value)} placeholder="Search workflows" /></div></div><div className="space-y-3">{filteredWorkflows.map(workflow => <div key={workflow.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-100 px-4 py-3 dark:border-white/10"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h4 className="font-bold">{workflow.name}</h4><Badge tone={workflowTone(workflow.status)}>{workflow.status}</Badge>{championId === workflow.id && <Badge><Award className="h-3 w-3" />Workflow champion</Badge>}</div><p className="mt-2 text-xs text-slate-500">{workflow.id} · {workflow.trigger} · {workflow.steps}</p><p className="mt-1 text-xs text-slate-500">{workflow.runs} runs · {workflow.minutesSaved} min saved · {(workflow.xp ?? 0).toLocaleString()} XP</p></div><Button secondary onClick={() => runWorkflow(workflow.id)}><Play className="h-4 w-4" />Run now</Button></div>)}{filteredWorkflows.length === 0 && <p className="py-6 text-center text-sm text-slate-500">{data.workflows.length === 0 ? 'No workflows yet — create your first workflow using the form above.' : 'No workflows match your search.'}</p>}</div></Panel></section>

        <section id="integrations" className="scroll-mt-24"><SectionTitle eyebrow="06 · Connections" title="Integrations" detail="Connect the systems you already use so workflows can move data between them." /><div className="grid gap-4 md:grid-cols-2">{data.integrations.map(integration => <Panel key={integration.id} className="flex flex-wrap items-center justify-between gap-4"><div className="flex items-center gap-3"><div className="rounded-xl bg-indigo-50 p-3 text-indigo-700 dark:bg-indigo-500/10"><Link2 className="h-5 w-5" /></div><div><p className="font-bold">{integration.system}</p><p className="text-xs text-slate-500">{integration.category} · {integration.id}</p></div></div><div className="flex items-center gap-3"><Badge tone={integration.status === 'Connected' ? 'green' : 'slate'}>{integration.status}</Badge><Button secondary onClick={() => toggleIntegration(integration.id)}>{integration.status === 'Connected' ? 'Disconnect' : 'Connect'}</Button></div></Panel>)}{data.integrations.length === 0 && <Panel className="text-center text-sm text-slate-500">No integrations yet — load the sample data to see connected systems, or connect one when available.</Panel>}</div></section>

        <section id="runs" className="scroll-mt-24"><SectionTitle eyebrow="07 · Activity" title="Automation runs" detail="A log of every workflow run, with status and duration. New runs appear at the top." /><Panel><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="text-xs text-slate-400"><tr><th className="pb-3">Run</th><th className="pb-3">Workflow</th><th className="pb-3">Started</th><th className="pb-3">Duration</th><th className="pb-3">Status</th></tr></thead><tbody>{data.runs.map(run => <tr key={run.id} className="border-t border-slate-100 dark:border-white/5"><td className="py-3 font-bold">{run.id}</td><td className="py-3">{workflowName(run.workflowId)}</td><td className="py-3">{run.startedAt}</td><td className="py-3">{run.durationSeconds}s</td><td className="py-3"><Badge tone={runTone(run.status)}>{run.status === 'Failed' ? <AlertTriangle className="h-3 w-3" /> : <Check className="h-3 w-3" />}{run.status}</Badge></td></tr>)}</tbody></table>{data.runs.length === 0 && <p className="py-6 text-center text-sm text-slate-500">No runs yet — run a workflow to see activity here.</p>}</div></Panel></section>

        <section id="approvals" className="scroll-mt-24"><SectionTitle eyebrow="08 · Human in the loop" title="Approvals queue" detail="Approve or reject the items automation has escalated for a human decision." /><div className="space-y-3">{data.approvals.map(approval => <Panel key={approval.id} className="flex flex-wrap items-center justify-between gap-4"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h4 className="font-bold">{approval.title}</h4><Badge tone={approvalTone(approval.status)}>{approval.status}</Badge></div><p className="mt-2 text-xs text-slate-500">{approval.id} · requested by {approval.requestedBy} · {approval.createdAt}</p></div><div className="flex items-center gap-2"><Button secondary onClick={() => setApprovalStatus(approval.id, 'Rejected')}>Reject</Button><Button onClick={() => setApprovalStatus(approval.id, 'Approved')}><Check className="h-4 w-4" />Approve</Button></div></Panel>)}{data.approvals.length === 0 && <Panel className="text-center text-sm text-slate-500">No approvals waiting — nothing needs a human decision right now.</Panel>}</div></section>

        <section id="reports" className="scroll-mt-24"><SectionTitle eyebrow="09 · Insights & scale" title="Reports, analytics & multi-company SaaS" detail="Export the actual workflows, integrations, runs, and approvals in this browser workspace." /><div className="grid gap-4 md:grid-cols-2"><Panel><BarChart3 className="mb-4 h-6 w-6 text-indigo-600" /><h3 className="font-bold">Workspace report</h3><p className="mt-2 text-sm text-slate-500">{data.workflows.length} workflows, {data.integrations.length} integrations, {data.runs.length} runs and {data.approvals.length} approvals for {data.company.name || 'your company'}.</p><Button className="mt-5" onClick={downloadCsv}><Download className="h-4 w-4" />Download CSV</Button></Panel><Panel><FileText className="mb-4 h-6 w-6 text-indigo-600" /><h3 className="font-bold">Data included</h3><ul className="mt-3 space-y-2 text-sm text-slate-500"><li>Workflow ID, name, trigger, steps and status</li><li>Integration ID, system, category and status</li><li>Run ID, workflow, status, duration and timestamp</li><li>Approval ID, title, requester, status and timestamp</li></ul></Panel></div><div className="mt-4 grid gap-4 md:grid-cols-3"><Panel><Clock3 className="mb-3 h-5 w-5 text-indigo-600" /><p className="text-xs text-slate-500">Total minutes saved</p><p className="mt-1 text-2xl font-black">{minutesSaved}</p></Panel><Panel><TrendingUp className="mb-3 h-5 w-5 text-indigo-600" /><p className="text-xs text-slate-500">Estimated cost savings</p><p className="mt-1 text-2xl font-black">PGK {costSavings.toLocaleString()}</p></Panel><Panel><Zap className="mb-3 h-5 w-5 text-indigo-600" /><p className="text-xs text-slate-500">Tasks automated</p><p className="mt-1 text-2xl font-black">{tasksAutomated}</p></Panel></div><div className="mt-4 flex items-center gap-2 text-xs text-slate-500"><Building2 className="h-4 w-4" /><span>Your workspace data persists in this browser only.</span></div></section>

        <section className="scroll-mt-24 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-7 text-white md:p-12"><div className="flex flex-wrap items-center justify-between gap-6"><div><p className="text-[11px] font-bold uppercase tracking-[.2em] text-indigo-400">Get started</p><h2 className="mt-2 max-w-2xl text-3xl font-black leading-tight md:text-4xl">Like what you see? Let&apos;s set up DeepsFlow for your team.</h2></div><div className="flex flex-wrap items-center gap-3"><Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-700">Request a demo <ArrowRight className="h-4 w-4" /></Link><Link to="/deepsflow" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/20">Back to product page</Link></div></div></section>
      </main>
    </div>
  </div>;
};

export default DeepsFlowDemoPage;
