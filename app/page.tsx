'use client';

import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, duration = 1500, decimals = 0) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(parseFloat((eased * target).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, decimals]);

  return { ref, value };
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const layers = [
    { desktop: '/header/Header4-Bottom.png', mobile: '/header/mobile/mHeader4-Bottom.png', alt: 'Background' },
    { desktop: '/header/Header1-Top.png', mobile: '/header/mobile/mHeader1-Top.png', alt: 'Foreground' },
    { desktop: '/header/Header3-Text.png', mobile: '/header/mobile/mHeader3-Text.png', alt: 'Title' },
    { desktop: '/header/Header2-CTA.png', mobile: '/header/mobile/mHeader2-CTA.png', alt: 'CTA' },
  ];

  return (
    <section
      className="relative w-full transition-opacity duration-[800ms]"
      style={{ opacity: mounted ? 1 : 0 }}
    >
      {/* Desktop */}
      <div className="hidden md:block relative w-full" style={{ aspectRatio: '1268 / 460' }}>
        {layers.map((layer, i) => (
          <img
            key={i}
            src={layer.desktop}
            alt={layer.alt}
            className={`absolute top-0 left-0 w-full h-full object-cover ${i === 0 ? '' : 'object-contain'}`}
            style={i === 0 ? {} : { objectFit: 'contain', objectPosition: 'center' }}
          />
        ))}
      </div>
      {/* Mobile */}
      <div className="md:hidden relative w-full">
        <img
          src="/header/mobile/mHeader4-Bottom.png"
          alt="Background"
          className="w-full block"
        />
        <img src="/header/mobile/mHeader1-Top.png" alt="Foreground" className="absolute top-0 left-0 w-full" />
        <img src="/header/mobile/mHeader3-Text.png" alt="Title" className="absolute top-0 left-0 w-full" />
        <img src="/header/mobile/mHeader2-CTA.png" alt="CTA" className="absolute top-0 left-0 w-full" />
      </div>
    </section>
  );
}

function StatsSection() {
  const left = useCountUp(400, 1500, 0);
  const right = useCountUp(8.24, 1500, 2);

  return (
    <section className="w-full py-16 px-4" style={{ background: '#0a1628' }}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <div
          ref={left.ref}
          className="rounded-2xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg, #111d35, #1a2d50)' }}
        >
          <p className="text-gray-300 text-sm md:text-base mb-4">
            寶佳入主華建後改善經營股價翻倍
          </p>
          <p className="text-6xl md:text-8xl font-black" style={{ color: '#f5c542' }}>
            {left.value}%
          </p>
          <p className="text-gray-400 mt-4 text-sm">每股$15至每股$60</p>
        </div>
        <div
          ref={right.ref}
          className="rounded-2xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg, #111d35, #1a2d50)' }}
        >
          <p className="text-gray-300 text-sm md:text-base mb-4">
            中工市場派經營不當過去10年股價平均
          </p>
          <p className="text-6xl md:text-8xl font-black text-white">
            ${right.value.toFixed(2)}
          </p>
          <p className="text-gray-400 mt-4 text-sm">2015/11 至 2025/10</p>
        </div>
      </div>
      <p
        className="text-center text-lg md:text-xl font-bold mt-10"
        style={{ color: '#f5c542' }}
      >
        如何選擇，股東的眼睛是雪亮的
      </p>
    </section>
  );
}

const strategies = [
  { char: '加', text: '加入寶佳專業經營，活化中工' },
  { char: '減', text: '減少既有中工罰款醜習，改善公司治理' },
  { char: '乘', text: '乘倍效應，實現華建中工乘效' },
  { char: '除', text: '去除重大賄賂與爭議事件，維護誠信經營' },
];

function StrategySection() {
  return (
    <section
      className="w-full py-16 px-4"
      style={{ background: 'linear-gradient(180deg, #dbeafe, #ffffff)' }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-blue-400" />
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 whitespace-nowrap">
            翻轉中工：加減乘除
          </h2>
          <div className="flex-1 h-px bg-blue-400" />
        </div>
        <div className="space-y-6">
          {strategies.map((item, i) => (
            <StrategyItem key={item.char} item={item} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StrategyItem({ item, delay }: { item: typeof strategies[0]; delay: number }) {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className="border-l-4 border-blue-600 pl-6 py-4 transition-all duration-700"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <p className="text-lg md:text-xl text-gray-800">
        <span className="font-bold text-blue-700 text-2xl mr-2">{item.char}</span>
        ：{item.text}
      </p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full py-12 px-4 text-center" style={{ background: '#0a1628' }}>
      <div className="max-w-md mx-auto">
        <img
          src="/header/mobile/mHeader2-CTA.png"
          alt="LINE QR Code"
          className="mx-auto mb-6 w-48 h-48 object-contain"
        />
        <span className="inline-block bg-green-600 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
          @99-2515
        </span>
        <p className="text-gray-300 text-sm md:text-base mb-6">
          以實際行動翻轉經營，強化公司治理，並提升營運績效
        </p>
        <p className="text-gray-500 text-xs">&copy; 2025 救救2515</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <StatsSection />
      <StrategySection />
      <Footer />
    </main>
  );
}
