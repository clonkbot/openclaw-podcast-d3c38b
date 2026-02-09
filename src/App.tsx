import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Animated Claw Component
const AnimatedClaw = () => {
  const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGrabbing(true);
      setTimeout(() => setIsGrabbing(false), 1500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-48 h-64 md:w-64 md:h-80 mx-auto">
      {/* Cable */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-zinc-600 to-zinc-400 origin-top"
        initial={{ height: 40 }}
        animate={{ height: isGrabbing ? 100 : 40 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Claw mechanism */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        initial={{ y: 40 }}
        animate={{ y: isGrabbing ? 100 : 40 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Center piece */}
        <div className="w-8 h-6 bg-gradient-to-b from-zinc-400 to-zinc-600 rounded-t-lg mx-auto shadow-lg" />

        {/* Claw arms container */}
        <div className="relative flex justify-center">
          {/* Left arm */}
          <motion.div
            className="absolute origin-top"
            style={{ left: -8 }}
            animate={{ rotate: isGrabbing ? -30 : -15 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="w-2 h-12 bg-gradient-to-b from-zinc-500 to-zinc-700 rounded-b-full" />
            <div className="w-3 h-4 bg-cyan-400 rounded-full -ml-0.5 shadow-[0_0_10px_rgba(0,245,255,0.6)]" />
          </motion.div>

          {/* Right arm */}
          <motion.div
            className="absolute origin-top"
            style={{ right: -8 }}
            animate={{ rotate: isGrabbing ? 30 : 15 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="w-2 h-12 bg-gradient-to-b from-zinc-500 to-zinc-700 rounded-b-full" />
            <div className="w-3 h-4 bg-cyan-400 rounded-full -mr-0.5 shadow-[0_0_10px_rgba(0,245,255,0.6)]" />
          </motion.div>

          {/* Center arm */}
          <motion.div
            className="origin-top"
            animate={{ scaleY: isGrabbing ? 1.1 : 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="w-2 h-14 bg-gradient-to-b from-zinc-500 to-zinc-700 rounded-b-full" />
            <div className="w-3 h-4 bg-cyan-400 rounded-full -ml-0.5 shadow-[0_0_10px_rgba(0,245,255,0.6)]" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// Glowing button component
const GlowButton = ({ children, href, variant = 'primary' }: { children: React.ReactNode; href: string; variant?: 'primary' | 'secondary' }) => {
  const baseClasses = "relative px-6 py-4 md:px-8 md:py-4 font-mono font-bold text-sm md:text-base uppercase tracking-widest transition-all duration-300 overflow-hidden group min-h-[48px] flex items-center justify-center";
  const variants = {
    primary: "bg-cyan-500 text-black hover:bg-cyan-400 shadow-[0_0_30px_rgba(0,245,255,0.4)] hover:shadow-[0_0_50px_rgba(0,245,255,0.6)]",
    secondary: "bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black shadow-[0_0_20px_rgba(255,107,53,0.3)] hover:shadow-[0_0_40px_rgba(255,107,53,0.5)]"
  };

  return (
    <a href={href} className={`${baseClasses} ${variants[variant]}`}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
    </a>
  );
};

// Episode card component
const EpisodeCard = ({ number, title, guest, delay }: { number: string; title: string; guest: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="relative bg-zinc-900/80 border border-zinc-700 p-4 md:p-6 group hover:border-cyan-500/50 transition-all duration-300"
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-orange-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="flex items-start gap-3 md:gap-4">
      <div className="text-3xl md:text-4xl font-display font-bold text-zinc-700 group-hover:text-cyan-500 transition-colors duration-300">
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-base md:text-lg text-white mb-1 truncate">{title}</h3>
        <p className="font-mono text-xs md:text-sm text-orange-400">with {guest}</p>
      </div>
    </div>
    <div className="mt-3 md:mt-4 flex items-center gap-2 text-zinc-500 font-mono text-xs">
      <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
      <span>STREAMING</span>
    </div>
  </motion.div>
);

// Floating particle effect
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
        initial={{
          x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
          y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
        }}
        animate={{
          y: [null, -100],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: Math.random() * 3 + 2,
          repeat: Infinity,
          delay: Math.random() * 2,
        }}
      />
    ))}
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      {/* Grid background */}
      <div
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <FloatingParticles />

      {/* Gradient orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[150px]" />

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <header className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 md:mb-12"
          >
            <div className="inline-block px-3 py-1 md:px-4 md:py-2 border border-orange-500/50 text-orange-400 font-mono text-xs tracking-[0.2em] md:tracking-[0.3em] mb-6 md:mb-8">
              NOW ACCEPTING GUESTS
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AnimatedClaw />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-8 md:mt-12"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4 md:mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-orange-400">
                OPEN
              </span>
              <span className="text-white">CLAW</span>
            </h1>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl text-zinc-400 tracking-widest mb-4 md:mb-6">
              THE PODCAST
            </h2>
            <p className="font-mono text-sm md:text-base text-zinc-500 max-w-lg mx-auto leading-relaxed px-4">
              Where builders, makers, and robotics enthusiasts<br className="hidden md:block" />
              share their journey building the OpenClaw army.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mt-10 md:mt-12 w-full sm:w-auto px-4 sm:px-0"
          >
            <GlowButton href="#episodes">Latest Episodes</GlowButton>
            <GlowButton href="#apply" variant="secondary">Be A Guest</GlowButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-zinc-600 rounded-full flex justify-center pt-2"
            >
              <div className="w-1 h-2 bg-cyan-400 rounded-full" />
            </motion.div>
          </motion.div>
        </header>

        {/* Episodes Section */}
        <section id="episodes" className="py-16 md:py-24 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4"
            >
              <div>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-2">
                  EPISODES
                </h2>
                <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-cyan-500 to-orange-500" />
              </div>
              <p className="font-mono text-xs md:text-sm text-zinc-500 tracking-wide">
                STORIES FROM THE CLAW BUILDERS
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <EpisodeCard
                number="01"
                title="Building My First OpenClaw"
                guest="Anonymous Builder"
                delay={0.1}
              />
              <EpisodeCard
                number="02"
                title="Scaling to 100 Machines"
                guest="The Arcade King"
                delay={0.2}
              />
              <EpisodeCard
                number="03"
                title="Prize Optimization Strategies"
                guest="Claw Master X"
                delay={0.3}
              />
              <EpisodeCard
                number="04"
                title="The Future of Autonomous Claws"
                guest="[Your Name Here?]"
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* Apply Section */}
        <section id="apply" className="py-16 md:py-24 px-4 md:px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
                JOIN THE
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-cyan-400">
                  CLAW ARMY
                </span>
              </h2>
              <p className="font-mono text-sm md:text-base text-zinc-400 mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed px-4">
                Are you building an OpenClaw setup? We want to hear your story.
                From single-machine hobbyists to full arcade operators — every builder has a tale worth telling.
              </p>

              <div className="bg-zinc-900/60 border border-zinc-700 p-6 md:p-10 backdrop-blur-sm mx-4 md:mx-0">
                <div className="flex flex-col gap-6">
                  <div className="text-left">
                    <label className="font-mono text-xs text-cyan-400 tracking-wider block mb-2">
                      YOUR SETUP
                    </label>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {['1-5 Claws', '5-20 Claws', '20+ Claws', 'Just Planning'].map((opt) => (
                        <button
                          key={opt}
                          className="px-3 py-2 md:px-4 md:py-2 border border-zinc-600 text-zinc-400 font-mono text-xs hover:border-cyan-500 hover:text-cyan-400 transition-all duration-200 min-h-[44px]"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-left">
                    <label className="font-mono text-xs text-cyan-400 tracking-wider block mb-2">
                      YOUR HANDLE
                    </label>
                    <input
                      type="text"
                      placeholder="@yourusername"
                      className="w-full bg-zinc-950 border border-zinc-700 px-4 py-3 md:py-3 font-mono text-white placeholder-zinc-600 focus:border-cyan-500 focus:outline-none transition-colors min-h-[48px]"
                    />
                  </div>

                  <button className="w-full bg-gradient-to-r from-orange-500 to-cyan-500 text-black font-display font-bold text-base md:text-lg py-4 hover:from-orange-400 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_30px_rgba(255,107,53,0.3)] hover:shadow-[0_0_50px_rgba(0,245,255,0.4)] min-h-[52px]">
                    GRAB YOUR SPOT
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 px-4 md:px-8 border-t border-zinc-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {[
                { value: '∞', label: 'CLAWS TO BUILD' },
                { value: '24+', label: 'EPISODES' },
                { value: '1M+', label: 'PRIZES WON' },
                { value: 'YOU?', label: 'NEXT GUEST' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="font-display text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 mb-2">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] md:text-xs text-zinc-500 tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 md:py-16 px-4 md:px-8 border-t border-zinc-800">
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            <div className="font-display text-xl md:text-2xl font-bold text-zinc-600 mb-4">
              OPEN<span className="text-zinc-500">CLAW</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 font-mono text-xs md:text-sm text-zinc-500 mb-8">
              <a href="#" className="hover:text-cyan-400 transition-colors py-2">Twitter</a>
              <a href="#" className="hover:text-cyan-400 transition-colors py-2">YouTube</a>
              <a href="#" className="hover:text-cyan-400 transition-colors py-2">Spotify</a>
              <a href="#" className="hover:text-cyan-400 transition-colors py-2">Apple Podcasts</a>
            </div>
            <p className="font-mono text-[10px] md:text-xs text-zinc-700 tracking-wider mb-6">
              {new Date().getFullYear()} — BUILT FOR THE BUILDERS
            </p>
            <p className="font-mono text-[10px] text-zinc-600">
              Requested by <a href="https://twitter.com/0xPaulius" className="hover:text-zinc-400 transition-colors">@0xPaulius</a> · Built by <a href="https://twitter.com/clonkbot" className="hover:text-zinc-400 transition-colors">@clonkbot</a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
