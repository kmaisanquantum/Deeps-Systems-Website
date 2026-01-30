import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, FileJson, LineChart, Monitor, Download, Lock, CheckCircle2, Zap, Coins, Clock, AlertTriangle, ShieldAlert, Cpu, Shield, Activity, Eye, EyeOff, Terminal, Fingerprint, Search, RefreshCw, BarChart, Loader2 } from 'lucide-react';

const AdvancedSolutions: React.FC = () => {
  // Global states
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeThreats, setActiveThreats] = useState(0);
  
  // SEC-aaS States
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState<string[]>([]);
  
  // AI Inventory States
  const [inventoryLoading, setInventoryLoading] = useState(false);
  const [inventoryData, setInventoryData] = useState([45, 60, 40, 85, 30, 95, 50, 70, 40, 60]);
  const [optimizationMetric, setOptimizationMetric] = useState(34);

  // VDI States
  const [loginStep, setLoginStep] = useState(0); // 0: Idle, 1: Connecting, 2: Secured
  const [loginProgress, setLoginProgress] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [encryptionBits, setEncryptionBits] = useState(0);

  // Simulate active threat monitoring for SEC-aaS background
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveThreats(Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // SEC-aaS Scan Logic
  const handleScanInfrastructure = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);
    setScanResults([]);
    
    const logs = [
      "Initializing Cloud Node Inspection...",
      "Mapping Virtual Network Topology...",
      "Inspecting TCP/UDP Entry Points...",
      "Cross-referencing Global Threat Feed...",
      "Analyzing Latency Anomalies...",
      "Infrastructure Verified: SECURE"
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      setScanProgress(prev => {
        const next = prev + 2;
        if (next % 20 === 0 && currentLog < logs.length) {
          setScanResults(r => [...r, logs[currentLog]]);
          currentLog++;
        }
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsScanning(false), 2000);
          return 100;
        }
        return next;
      });
    }, 40);
  };

  // AI Inventory Optimization Logic
  const runOptimization = () => {
    if (inventoryLoading) return;
    setInventoryLoading(true);
    
    // Simulate complex calculation
    setTimeout(() => {
      const newData = Array.from({ length: 10 }, () => Math.floor(Math.random() * 70) + 30);
      setInventoryData(newData);
      setOptimizationMetric(Math.floor(Math.random() * 15) + 30); // 30-45% range
      setInventoryLoading(false);
    }, 1500);
  };

  // Handle VDI Login Animation Sequence
  useEffect(() => {
    let interval: any;
    if (loginStep === 1) {
      setLoginProgress(0);
      setEncryptionBits(0);
      interval = setInterval(() => {
        setLoginProgress(prev => {
          const next = prev + (Math.random() > 0.7 ? 1 : 4);
          if (next >= 100) {
            clearInterval(interval);
            setLoginStep(2);
            return 100;
          }
          return next;
        });
        setEncryptionBits(prev => Math.min(prev + (Math.floor(Math.random() * 64)), 4096));
      }, 50);
    } else if (loginStep === 2) {
      const timer = setTimeout(() => {
        setLoginStep(0);
        setLoginProgress(0);
        setEncryptionBits(0);
      }, 6000);
      return () => clearTimeout(timer);
    }
    return () => clearInterval(interval);
  }, [loginStep]);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const handleVDILogin = () => {
    if (loginStep !== 0) return;
    setLoginStep(1);
  };

  const getStatusText = (progress: number) => {
    if (progress < 15) return "Handshake...";
    if (progress < 40) return "Token Exchange...";
    if (progress < 65) return "Tunneling...";
    if (progress < 90) return "Syncing Environment...";
    return "Bound";
  };

  return (
    <section id="advanced-solutions" className="py-24 relative bg-[#0a0a0a] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.05)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-bold uppercase tracking-widest mb-6">
            <Cpu className="w-3.5 h-3.5" />
            The New Standard for PNG
          </div>
          <h2 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 tracking-tight">
            Disruptive <span className="quantum-text-gradient">Advanced Solutions</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
            While legacy providers focus on managing complex physical infrastructure, Deeps Systems delivers instant, high-performance SaaS outcomes. No physical footprint, no legacy limitations.
          </p>
        </div>

        {/* 4-Card Disruptive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          
          {/* Module 1: SEC-aaS (Managed MXDR) */}
          <div className="glass rounded-[2.5rem] p-8 md:p-10 border border-white/5 group hover:border-teal-500/30 transition-all duration-500 shadow-2xl reveal-on-scroll">
            <div className="flex items-start justify-between mb-8">
              <div className="p-4 rounded-2xl bg-teal-500/10 text-teal-400 group-hover:bg-teal-500/20 transition-colors">
                <ShieldCheck className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-1">
                   <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                   <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">Live Monitor</span>
                </div>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">MXDR Status: active</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">SEC-aaS (Managed MXDR)</h3>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
              24/7 Managed Extended Detection & Response. We provide a total security posture with zero hardware overhead.
            </p>
            
            <div className="bg-black/60 rounded-2xl p-6 border border-white/10 relative overflow-hidden group/widget min-h-[220px] flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Security Console</span>
                <ShieldAlert className={`w-4 h-4 text-teal-500 ${isScanning ? 'animate-spin' : 'animate-pulse'}`} />
              </div>
              
              {!isScanning && scanResults.length === 0 ? (
                <div className="flex-grow flex flex-col justify-center items-center text-center">
                  <p className="text-xs text-slate-500 mb-6 font-medium italic">No active scan in progress. Verify cloud perimeter?</p>
                  <button 
                    onClick={handleScanInfrastructure}
                    className="px-6 py-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest hover:bg-teal-500 hover:text-white transition-all btn-cta-pulse active-click flex items-center gap-2"
                  >
                    <Search className="w-3.5 h-3.5" />
                    Scan Infrastructure
                  </button>
                </div>
              ) : (
                <div className="flex-grow space-y-2 font-mono text-[10px] overflow-hidden">
                   {scanResults.map((log, i) => (
                     <div key={i} className="text-teal-400/80 animate-in fade-in slide-in-from-left-2 duration-300">
                       <span className="text-teal-500 mr-2">√</span> {log}
                     </div>
                   ))}
                   {isScanning && (
                     <div className="text-blue-400 animate-pulse flex items-center gap-2">
                        <Loader2 className="w-2.5 h-2.5 animate-spin" />
                        Analyzing Nodes... {scanProgress}%
                     </div>
                   )}
                </div>
              )}
              
              {isScanning && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-teal-900">
                  <div className="h-full bg-teal-400 transition-all duration-100" style={{ width: `${scanProgress}%` }}></div>
                </div>
              )}
            </div>
          </div>

          {/* Module 2: Localized Compliance ERP */}
          <div className="glass rounded-[2.5rem] p-8 md:p-10 border border-white/5 group hover:border-blue-500/30 transition-all duration-500 shadow-2xl reveal-on-scroll">
            <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 w-fit mb-8 group-hover:bg-blue-500/20 transition-colors">
              <FileJson className="w-8 h-8 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Localized Compliance ERP</h3>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
              Automated PNG IRC/GST tax engine and Nasfund reporting. Remove manual overhead—our engine is built for local PNG laws.
            </p>
            
            <div className="bg-blue-600/5 rounded-2xl border border-blue-500/20 p-6 text-center">
              <div className="mb-6">
                 <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Compliance Status</div>
                 <div className="flex justify-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[9px] font-bold">GST</span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[9px] font-bold">Nasfund</span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[9px] font-bold">PAYE</span>
                 </div>
              </div>
              <button 
                onClick={handleGenerateReport}
                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-3 btn-cta-pulse active-click transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-[0_0_25px_rgba(59,130,246,0.6),0_0_40px_rgba(34,211,238,0.5),0_0_10px_rgba(255,255,255,0.2)] border border-transparent hover:border-blue-400/40 group/btn"
              >
                {isGenerating ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    Compiling PDF...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 group-hover/btn:animate-[download-spring_1.2s_cubic-bezier(0.175,0.885,0.32,1.275)_infinite] transition-transform" />
                    One-Click IRC Report
                  </>
                )}
              </button>
              <p className="text-[9px] text-slate-500 mt-4 uppercase tracking-widest font-bold">Forms G1, G2, & S1 generated in seconds</p>
            </div>
          </div>

          {/* Module 3: AI Inventory Optimizer */}
          <div className="glass rounded-[2.5rem] p-8 md:p-10 border border-white/5 group hover:border-teal-500/30 transition-all duration-500 shadow-2xl reveal-on-scroll">
            <div className="p-4 rounded-2xl bg-teal-500/10 text-teal-400 w-fit mb-8 group-hover:bg-teal-500/20 transition-colors">
              <LineChart className="w-8 h-8 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold mb-4">AI Inventory Optimizer</h3>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
              Use quantum-inspired supply chain logic to reduce waste. Built for the unique logistics of the Highlands.
            </p>
            
            <div className="bg-black/40 rounded-[2rem] border border-white/5 p-6 flex flex-col relative overflow-hidden group/chart-widget">
              {inventoryLoading && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-20 flex items-center justify-center">
                   <div className="flex flex-col items-center gap-3">
                      <RefreshCw className="w-8 h-8 text-teal-400 animate-spin" />
                      <span className="text-[10px] font-bold text-teal-400 uppercase tracking-[0.3em]">Processing Scenario...</span>
                   </div>
                </div>
              )}
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Inventory Visualization</span>
                <span className="text-teal-400 text-[10px] font-bold transition-all animate-pulse">{optimizationMetric}% Optimization</span>
              </div>
              
              <div className="flex items-end gap-2 h-24 mb-6 px-2">
                {inventoryData.map((h, i) => (
                  <div key={i} className="flex-grow flex flex-col justify-end gap-1">
                    <div className="w-full bg-teal-500/40 rounded-t-sm transition-all duration-700 hover:bg-teal-400" style={{ height: `${h}%` }}></div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={runOptimization}
                disabled={inventoryLoading}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-teal-500 hover:border-teal-400 transition-all flex items-center justify-center gap-2 group/opt-btn active-click"
              >
                <BarChart className="w-3.5 h-3.5 group-hover/opt-btn:scale-125 transition-transform" />
                Run Dynamic Scenario
              </button>
            </div>
          </div>

          {/* Module 4: Virtual Secure Workspace */}
          <div className="glass rounded-[2.5rem] p-8 md:p-10 border border-white/5 group hover:border-blue-500/30 transition-all duration-500 shadow-2xl reveal-on-scroll">
            <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 w-fit mb-8 group-hover:bg-blue-500/20 transition-colors">
              <Monitor className="w-8 h-8 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Virtual Secure Workspace</h3>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
              Cloud-based VDI for remote PNG workforces. Secure your data by keeping it in the cloud, isolated from personal devices.
            </p>
            
            {/* Visual: CINEMATIC Secure Login Interface Widget */}
            <div className="bg-[#0b0f1a] rounded-[2.5rem] border border-white/10 p-6 flex flex-col items-center text-center relative overflow-hidden h-[340px] justify-center shadow-inner group/login">
              {/* Login Background Texture */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.02)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
              
              {/* Continuous Subtle Scan-line Effect */}
              {loginStep === 1 && (
                <>
                  <div className="absolute top-0 left-0 w-full h-[4px] bg-blue-400/20 blur-[3px] z-20 animate-[scan_2s_linear_infinite]"></div>
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-300/60 z-20 animate-[scan_2s_linear_infinite]"></div>
                </>
              )}

              {/* SUCCESS OVERLAY - HIGH IMPACT PULSING */}
              <div className={`absolute inset-0 z-30 flex flex-col items-center justify-center transition-all duration-1000 ${loginStep === 2 ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-125 pointer-events-none'}`}>
                 <div className="absolute inset-0 bg-teal-500/90 backdrop-blur-md animate-[success-pulse_4s_ease-in-out_infinite]"></div>
                 
                 <div className="relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 bg-white/10 rounded-full border-2 border-white/30 flex items-center justify-center mb-6 relative group/success-icon">
                       <ShieldCheck className="w-12 h-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,1)] animate-[success-icon-pop_0.6s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]" />
                       <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-40"></div>
                       <Fingerprint className="absolute -top-2 -right-2 w-6 h-6 text-white/50 animate-pulse" />
                    </div>
                    <h4 className="text-white font-montserrat font-extrabold text-2xl tracking-tight mb-2 animate-[fade-in-up_0.8s_ease-out_forwards]">ACCESS GRANTED</h4>
                    <div className="h-[2px] w-32 bg-white/30 mb-6 rounded-full overflow-hidden">
                       <div className="h-full bg-white animate-[loading_2s_linear_infinite]"></div>
                    </div>
                    <div className="text-[10px] text-white/80 font-bold uppercase tracking-[0.5em] animate-pulse">Establishing Secure Stream...</div>
                 </div>
              </div>

              {/* Standard Interface - Centered Content */}
              <div className="relative z-10 flex flex-col items-center w-full max-w-[260px]">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-all duration-700 relative ${loginStep === 1 ? 'bg-blue-500/20 text-blue-400 scale-110 rotate-[360deg]' : 'bg-slate-800/50 text-slate-500 border border-white/5'}`}>
                  {loginStep === 1 ? (
                    <Activity className="w-10 h-10 animate-pulse" />
                  ) : (
                    <Lock className="w-10 h-10" />
                  )}
                  {loginStep === 1 && (
                    <div className="absolute inset-0 border-2 border-blue-400/40 rounded-3xl animate-[ping_1.5s_infinite] opacity-40"></div>
                  )}
                </div>
                
                <div className="w-full space-y-3 mb-8">
                  <div className="flex justify-between items-end px-1 mb-1">
                    <div className="flex flex-col items-start">
                       <span className={`text-[8px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${loginStep === 1 ? 'text-blue-400' : 'text-slate-600'}`}>
                         {loginStep === 1 ? getStatusText(loginProgress) : "Status: Ready"}
                       </span>
                       {loginStep === 1 && (
                         <span className="text-[7px] text-blue-500/60 font-mono mt-0.5">AES-{encryptionBits}bit Active</span>
                       )}
                    </div>
                    {loginStep === 1 && (
                      <span className="text-[10px] font-mono text-blue-400 font-bold">{loginProgress}%</span>
                    )}
                  </div>
                  
                  <div className="h-12 w-full bg-black/60 rounded-xl border border-white/5 flex flex-col justify-center px-4 relative overflow-hidden group/input shadow-inner">
                     <div className={`absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px] transition-opacity duration-500 ${loginStep === 1 ? 'opacity-100' : 'opacity-0'}`}></div>
                     
                     <div 
                      className={`absolute left-4 h-1 bg-blue-500 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.8)] ${loginStep === 1 ? 'opacity-100' : 'opacity-0'}`}
                      style={{ width: `calc(${loginProgress}% - 32px)` }}
                     ></div>
                     
                     {loginStep === 0 && (
                       <div className="flex items-center justify-between w-full relative z-10">
                          <div className="flex gap-1.5 items-center">
                             {showPassword ? (
                               <span className="text-[10px] font-mono text-slate-400 tracking-wider">SECURE_WORKSPACE_01</span>
                             ) : (
                               [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                 <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-700 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>
                               ))
                             )}
                          </div>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowPassword(!showPassword);
                            }}
                            className="p-1.5 text-slate-600 hover:text-teal-400 transition-all active:scale-90 bg-white/5 rounded-lg"
                          >
                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                       </div>
                     )}
                  </div>
                </div>

                <button 
                  onClick={handleVDILogin}
                  disabled={loginStep !== 0}
                  className={`w-full py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-xl relative overflow-hidden group/btn ${
                    loginStep === 0 
                      ? 'bg-blue-600 hover:bg-blue-500 text-white btn-cta-pulse active-click' 
                      : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-white/5'
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loginStep === 0 && "Access Secure Node"}
                    {loginStep === 1 && (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Authenticating...
                      </>
                    )}
                    {loginStep === 2 && "Linked"}
                  </span>
                  {loginStep === 0 && (
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:animate-[btn-shine_1s_ease-out_forwards]"></div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Why We Win */}
        <div className="relative mt-16 reveal-on-scroll">
          <div className="glass rounded-[3rem] p-10 md:p-16 border border-white/10 shadow-3xl overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-4xl md:text-5xl font-montserrat font-extrabold mb-10 leading-tight">
                  Why We <span className="text-teal-400 italic">Win</span>
                </h3>
                <div className="space-y-10">
                  <div className="flex items-start gap-6 group">
                    <div className="p-4 rounded-2xl bg-teal-500/10 text-teal-400 group-hover:scale-110 transition-transform shadow-lg shadow-teal-500/5">
                      <Coins className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 group-hover:text-teal-400 transition-colors">Zero Infrastructure CAPEX</h4>
                      <p className="text-slate-400 leading-relaxed text-sm">Eliminate heavy upfront infrastructure costs. No legacy hardware procurement cycles, no deployment delays.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-6 group">
                    <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/5">
                      <Zap className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">BITC Agility</h4>
                      <p className="text-slate-400 leading-relaxed text-sm">Deployments that take legacy providers months take us minutes to spin up. Rapid scaling.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative glass border border-white/10 rounded-[3rem] p-8 md:p-12 text-center overflow-hidden">
                   <div className="mb-10">
                      <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] mb-10">Value to Market Ratio</h5>
                      <div className="flex items-end justify-center gap-8 h-56">
                         <div className="flex flex-col items-center gap-4 group/bar">
                            <span className="text-[9px] font-bold text-slate-500">Legacy Providers</span>
                            <div className="w-20 bg-slate-800 rounded-t-2xl h-16 border-t border-slate-700"></div>
                            <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest mt-2">CAPEX Heavy</span>
                         </div>
                         <div className="flex flex-col items-center gap-4 group/bar">
                            <div className="p-2 rounded-lg quantum-gradient mb-2 animate-bounce"><Zap className="w-4 h-4 text-white" /></div>
                            <span className="text-[10px] font-bold text-teal-400">DEEPS</span>
                            <div className="w-20 quantum-gradient rounded-t-2xl h-44 shadow-[0_0_30px_rgba(20,184,166,0.2)]"></div>
                            <span className="text-[8px] text-teal-400 font-bold uppercase tracking-widest mt-2">OPEX Optimized</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: -5%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 105%; opacity: 0; }
        }
        @keyframes success-pulse {
          0%, 100% { filter: brightness(1) hue-rotate(0deg); opacity: 0.95; }
          50% { filter: brightness(1.2) hue-rotate(5deg); opacity: 1; }
        }
        @keyframes success-icon-pop {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in-up {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes btn-shine {
          from { transform: translateX(-100%) skewX(-15deg); }
          to { transform: translateX(200%) skewX(-15deg); }
        }
        @keyframes download-spring {
          0%, 100% { transform: translateY(0) scale(1); }
          30% { transform: translateY(5px) scale(0.95); }
          60% { transform: translateY(-2px) scale(1.05); }
        }
        .loader-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </section>
  );
};

export default AdvancedSolutions;