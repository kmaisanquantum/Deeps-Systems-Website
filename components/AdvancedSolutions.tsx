import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileJson, LineChart, Monitor, Download, Lock, Zap, Cpu, Shield, Activity, Eye, EyeOff, Terminal, Fingerprint, Search, RefreshCw, BarChart, Loader2, ArrowUpRight, Scale, Clock } from 'lucide-react';

const AdvancedSolutions: React.FC = () => {
  // Global states
  const [isGenerating, setIsGenerating] = useState(false);
  
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

  return (
    <section id="advanced-solutions" className="py-24 relative bg-white dark:bg-[#0a0a0a] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(22,163,74,0.03)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16 reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm">
            <Cpu className="w-3.5 h-3.5" />
            The New Standard for PNG
          </div>
          <h2 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 tracking-tight text-gray-900 dark:text-white">
            Advanced <span className="quantum-text-gradient">Outcome Suite</span>
          </h2>
          <p className="text-gray-600 dark:text-slate-300 max-w-2xl text-lg leading-relaxed font-medium">
            While traditional providers focus on managing physical infrastructure, Deeps Systems delivers instant, high-performance digital architectures.
          </p>
        </div>

        {/* 4-Card Disruptive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          
          {/* Module 1: SEC-aaS (Managed MXDR) */}
          <div className="bg-white dark:bg-white/2 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-white/5 group hover:border-emerald-500/30 transition-all duration-500 shadow-sm hover:shadow-xl reveal-on-scroll">
            <div className="flex items-start justify-between mb-8">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-500/20 transition-colors">
                <ShieldCheck className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-1">
                   <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></div>
                   <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Live Monitor</span>
                </div>
                <span className="text-[9px] font-bold text-gray-600 dark:text-slate-400 uppercase tracking-widest">Status: active</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">SEC-aaS (Managed MXDR)</h3>
            <p className="text-gray-600 dark:text-slate-300 mb-8 text-sm leading-relaxed font-medium">
              24/7 Managed Extended Detection & Response. Total security posture with zero hardware overhead.
            </p>
            
            <div className="bg-gray-50 dark:bg-black/60 rounded-2xl p-6 border border-gray-100 dark:border-white/10 relative overflow-hidden group/widget min-h-[220px] flex flex-col shadow-inner">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold text-gray-600 dark:text-slate-300 uppercase tracking-widest">Security Console</span>
                <Loader2 className={`w-4 h-4 text-emerald-600 ${isScanning ? 'animate-spin' : 'animate-pulse'}`} />
              </div>
              
              {!isScanning && scanResults.length === 0 ? (
                <div className="flex-grow flex flex-col justify-center items-center text-center">
                  <button 
                    onClick={handleScanInfrastructure}
                    className="px-6 py-3 rounded-xl bg-white dark:bg-emerald-500/10 border border-gray-200 dark:border-emerald-500/20 text-emerald-600 text-xs font-bold uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all btn-cta-pulse active-click flex items-center gap-2 shadow-sm"
                  >
                    <Search className="w-3.5 h-3.5" />
                    Scan Nodes
                  </button>
                </div>
              ) : (
                <div className="flex-grow space-y-2 font-mono text-[10px] overflow-hidden">
                   {scanResults.map((log, i) => (
                     <div key={i} className="text-emerald-600 dark:text-emerald-400/80 animate-in fade-in slide-in-from-left-2 duration-300">
                       <span className="text-emerald-600 mr-2">√</span> {log}
                     </div>
                   ))}
                   {isScanning && (
                     <div className="text-gray-600 dark:text-amber-400 animate-pulse flex items-center gap-2">
                        <Loader2 className="w-2.5 h-2.5 animate-spin" />
                        Analyzing... {scanProgress}%
                     </div>
                   )}
                </div>
              )}
              
              {isScanning && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 dark:bg-emerald-900">
                  <div className="h-full bg-emerald-600 transition-all duration-100 shadow-[0_0_8px_rgba(22,163,74,0.8)]" style={{ width: `${scanProgress}%` }}></div>
                </div>
              )}
            </div>
          </div>

          {/* Module 2: Compliance Logic Engine */}
          <div className="bg-white dark:bg-white/2 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-white/5 group hover:border-gray-900 dark:hover:border-emerald-500/30 transition-all duration-500 shadow-sm hover:shadow-xl reveal-on-scroll">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white w-fit mb-8 group-hover:bg-gray-100 dark:group-hover:bg-white/20 transition-colors">
              <FileJson className="w-8 h-8 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Compliance Logic Engine</h3>
            <p className="text-gray-600 dark:text-slate-300 mb-8 text-sm leading-relaxed font-medium">
              Automated PNG tax engine and Nasfund reporting. Built for Pacific regulatory frameworks.
            </p>
            
            <div className="bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 p-6 text-center shadow-inner">
              <button 
                onClick={handleGenerateReport}
                className="w-full py-4 rounded-xl bg-gray-900 dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-3 btn-cta-pulse active-click shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    Compiling Data...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    One-Click Report
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Module 3: Adaptive Inventory Logic */}
          <div className="bg-white dark:bg-white/2 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-white/5 group hover:border-emerald-500/30 transition-all duration-500 shadow-sm hover:shadow-xl reveal-on-scroll">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 w-fit mb-8 group-hover:bg-emerald-500/20 transition-colors">
              <LineChart className="w-8 h-8 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Adaptive Inventory Logic</h3>
            <p className="text-gray-600 dark:text-slate-300 mb-8 text-sm leading-relaxed font-medium">
              Precision supply chain logic to reduce waste. Designed for unique Pacific logistics.
            </p>
            
            <div className="bg-gray-50 dark:bg-black/40 rounded-[2rem] border border-gray-100 dark:border-white/5 p-6 flex flex-col relative overflow-hidden shadow-inner min-h-[220px]">
              {inventoryLoading && (
                <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-[2px] z-20 flex items-center justify-center">
                   <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
                </div>
              )}
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-emerald-600 text-[10px] font-bold animate-pulse">{optimizationMetric}% Precision Gain</span>
              </div>
              
              <div className="flex items-end gap-2 h-24 mb-6 px-2">
                {inventoryData.map((h, i) => (
                  <div key={i} className="flex-grow flex flex-col justify-end gap-1">
                    <div className="w-full bg-emerald-200 dark:bg-emerald-500/40 rounded-t-sm transition-all duration-700 group-hover/card:bg-emerald-500" style={{ height: `${h}%` }}></div>
                  </div>
                ))}
              </div>
              
              <button 
                onClick={runOptimization}
                disabled={inventoryLoading}
                className="w-full py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-sm active-click"
              >
                Recalculate
              </button>
            </div>
          </div>

          {/* Module 4: Secure Virtual Workspace */}
          <div className="bg-white dark:bg-white/2 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-white/5 group hover:border-gray-900 dark:hover:border-emerald-500/30 transition-all duration-500 shadow-sm hover:shadow-xl reveal-on-scroll">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white w-fit mb-8 group-hover:bg-gray-100 dark:group-hover:bg-white/20 transition-colors">
              <Monitor className="w-8 h-8 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Secure Virtual Workspace</h3>
            <p className="text-gray-600 dark:text-slate-300 mb-8 text-sm leading-relaxed font-medium">
              Cloud-based VDI for remote Pacific workforces. Isolated environments with zero local data footprint.
            </p>
            
            <div className="bg-gray-900 rounded-[2rem] border border-gray-800 p-6 flex flex-col items-center text-center relative overflow-hidden h-[220px] justify-center shadow-2xl">
              <button
                onClick={handleVDILogin}
                disabled={loginStep !== 0}
                className={`w-full py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                  loginStep === 0
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 active-click'
                    : 'bg-gray-800 text-gray-600 cursor-not-allowed'
                }`}
              >
                {loginStep === 0 && "Access Secure Hub"}
                {loginStep === 1 && "Authenticating..."}
                {loginStep === 2 && "Connected"}
              </button>
            </div>
          </div>
        </div>

        {/* Why We Win */}
        <div className="relative mt-16 reveal-on-scroll">
          <div className="bg-gray-50 dark:bg-white/2 rounded-[3rem] p-10 md:p-16 border border-gray-100 dark:border-white/10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.02] dark:bg-emerald-500/5 rounded-full blur-[100px] -z-10"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-4xl md:text-5xl font-montserrat font-extrabold mb-10 leading-tight text-gray-900 dark:text-white">
                  Why We <span className="text-emerald-600 italic">Win</span>
                </h3>
                <div className="space-y-10">
                  <div className="flex items-start gap-6 group">
                    <div className="p-4 rounded-2xl bg-white dark:bg-emerald-500/10 text-emerald-600 group-hover:scale-110 transition-transform shadow-sm">
                      <Zap className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors text-gray-900 dark:text-white">Zero CAPEX Infrastructure</h4>
                      <p className="text-gray-600 dark:text-slate-300 leading-relaxed text-sm font-medium">Deploy high-performance digital environments instantly with OPEX-based flexibility.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative bg-white dark:bg-black/20 border border-gray-100 dark:border-white/10 rounded-[3rem] p-8 md:p-12 text-center shadow-sm">
                   <div className="mb-10">
                      <h5 className="text-[10px] font-bold text-gray-600 dark:text-slate-400 uppercase tracking-[0.5em] mb-10">Proposition Ratio</h5>
                      <div className="flex items-end justify-center gap-8 h-56">
                         <div className="flex flex-col items-center gap-4">
                            <div className="w-20 bg-gray-100 dark:bg-slate-800 rounded-t-2xl h-16 border-t border-gray-200 dark:border-slate-700"></div>
                            <span className="text-[8px] text-gray-600 font-bold uppercase tracking-widest mt-2">Legacy</span>
                         </div>
                         <div className="flex flex-col items-center gap-4">
                            <div className="p-2 rounded-lg quantum-gradient mb-2 animate-bounce shadow-lg shadow-emerald-500/20"><Zap className="w-4 h-4 text-white" /></div>
                            <div className="w-20 quantum-gradient rounded-t-2xl h-44 shadow-xl shadow-emerald-500/20"></div>
                            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-2">DEEPS BITC</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedSolutions;
