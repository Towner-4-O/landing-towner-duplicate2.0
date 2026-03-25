'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Smartphone,
  Shield,
  Zap,
  MapPin,
} from 'lucide-react';

// Extend Window for YouTube IFrame API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const features = [
  {
    icon: Smartphone,
    title: 'Seamless Experience',
    description:
      'An intuitive app designed for both drivers and riders with real-time tracking and instant booking.',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description:
      'Verified drivers, trip sharing, and SOS features ensure complete safety for every ride.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Get matched with the nearest driver in seconds. No waiting, no hassle.',
  },
  {
    icon: MapPin,
    title: 'Smart Navigation',
    description:
      'AI-powered routes that save time and fuel, giving you the most efficient trips every time.',
  },
];

const YOUTUBE_VIDEO_ID = 'EoO8PHpIPTY';

// Format seconds to MM:SS
const formatTime = (seconds: number): string => {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isAPIReady, setIsAPIReady] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const timeUpdateRef = useRef<NodeJS.Timeout | null>(null);

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setIsAPIReady(true);
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      setIsAPIReady(true);
    };

    return () => {
      window.onYouTubeIframeAPIReady = () => {};
    };
  }, []);

  // Initialize YouTube Player
  useEffect(() => {
    if (!isAPIReady) return;

    playerRef.current = new window.YT.Player('yt-player', {
      videoId: YOUTUBE_VIDEO_ID,
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: 1,
        mute: 1,
        loop: 1,
        playlist: YOUTUBE_VIDEO_ID,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        origin: typeof window !== 'undefined' ? window.location.origin : '',
      },
      events: {
        onReady: (event: any) => {
          event.target.playVideo();
          setIsPlayerReady(true);
          const dur = event.target.getDuration();
          if (dur) setDuration(dur);
        },
        onStateChange: (event: any) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            const dur = playerRef.current?.getDuration();
            if (dur) setDuration(dur);
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
          }
        },
      },
    });

    return () => {
      if (playerRef.current?.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [isAPIReady]);

  // Poll current time for progress bar
  useEffect(() => {
    if (!isPlayerReady) return;

    timeUpdateRef.current = setInterval(() => {
      if (playerRef.current?.getCurrentTime && !isSeeking) {
        const time = playerRef.current.getCurrentTime();
        setCurrentTime(time);
        const dur = playerRef.current.getDuration();
        if (dur && dur !== duration) setDuration(dur);
      }
    }, 300);

    return () => {
      if (timeUpdateRef.current) clearInterval(timeUpdateRef.current);
    };
  }, [isPlayerReady, isSeeking, duration]);

  const togglePlay = useCallback(() => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  }, [isMuted]);

  // Seek on progress bar click
  const handleSeek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current || !playerRef.current || !duration) return;
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      const seekTime = percentage * duration;
      playerRef.current.seekTo(seekTime, true);
      setCurrentTime(seekTime);
    },
    [duration]
  );

  // Drag-to-seek on progress bar
  const handleSeekMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsSeeking(true);
      handleSeek(e);

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!progressRef.current || !playerRef.current || !duration) return;
        const rect = progressRef.current.getBoundingClientRect();
        const clickX = moveEvent.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, clickX / rect.width));
        const seekTime = percentage * duration;
        setCurrentTime(seekTime);
      };

      const handleMouseUp = (upEvent: MouseEvent) => {
        if (progressRef.current && playerRef.current && duration) {
          const rect = progressRef.current.getBoundingClientRect();
          const clickX = upEvent.clientX - rect.left;
          const percentage = Math.max(0, Math.min(1, clickX / rect.width));
          const seekTime = percentage * duration;
          playerRef.current.seekTo(seekTime, true);
          setCurrentTime(seekTime);
        }
        setIsSeeking(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [duration, handleSeek]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className="py-5 md:py-24 relative overflow-hidden">
      {/* Background Design Elements */}
      <div className="absolute inset-0" />
      <div className="absolute inset-0 opacity-20 bg-[length:30px_30px] bg-grid-pattern" />

      {/* Decorative gradient blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#A8FF01]/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8dc720]/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 relative">
        {/* Section Title */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            See Towner in <span className="text-[#8dc720]">Action</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-2 text-lg">
            Watch how Towner transforms the taxi experience for drivers and
            riders alike
          </p>
          <svg
            width="100"
            height="20"
            viewBox="0 0 100 20"
            className="mx-auto"
          >
            <path
              d="M0 10 Q50 0 100 10"
              stroke="#a8ff01"
              strokeWidth="3.5"
              fill="none"
            />
          </svg>
        </div>

        {/* Content Grid: Left content + Right video */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16 max-w-7xl mx-auto">
          {/* Left Side - Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="space-y-2 mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                The Future of{' '}
                <span className="text-[#8dc720]">Taxi Business</span> is Here
              </h3>
              <p className="text-gray-500 text-base md:text-lg">
                Discover how our platform empowers every driver to build their
                own independent business with cutting-edge technology.
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-green-100 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-11 w-11 bg-green-50 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-5 w-5 text-[#8dc720]" />
                  </div>
                  <h4 className="text-lg font-bold mb-1.5 group-hover:text-[#8dc720] transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Phone Mockup with Video */}
          <div
            className="w-full lg:w-1/2 flex items-center justify-center relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
          >
            {/* Background glow effects */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[560px] bg-[#A8FF01]/25 blur-[60px] rounded-full animate-pulse" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[340px] h-[640px] bg-gradient-to-br from-[#A8FF01]/15 via-transparent to-cyan-400/10 blur-[80px] rounded-full" />

            {/* Phone Frame */}
            <div
              className="relative w-[280px] h-[580px] md:w-[300px] md:h-[620px] bg-black border-[8px] border-gray-900 rounded-[3rem] shadow-2xl overflow-hidden z-20 ring-1 ring-gray-700/50 transition-all duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
              }}
            >
              {/* Side Buttons */}
              <div className="absolute left-[-10px] top-[100px] w-[3px] h-[50px] bg-gray-800 rounded-l-sm" />
              <div className="absolute left-[-10px] top-[160px] w-[3px] h-[60px] bg-gray-800 rounded-l-sm" />
              <div className="absolute left-[-10px] top-[230px] w-[3px] h-[60px] bg-gray-800 rounded-l-sm" />
              <div className="absolute right-[-10px] top-[180px] w-[3px] h-[80px] bg-gray-800 rounded-r-sm" />

              {/* Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-32 bg-gray-900 rounded-b-xl z-30 flex items-center justify-center gap-2">
                <div className="w-12 h-1 bg-gray-700 rounded-full mt-2" />
              </div>

              {/* YouTube Video — scaled to fill phone screen for 9:16 vertical video */}
              <div className="relative w-full h-full bg-black rounded-[2.5rem] overflow-hidden">
                {/*
                  YouTube renders ALL videos inside a 16:9 player.
                  A 9:16 vertical video gets pillarboxed (black bars on sides).
                  The actual video content occupies the center ~31.6% of the width.
                  To fill our ~9:19 phone frame with the 9:16 video content:
                  - We scale the iframe width by ~3.2x so the video portion fills the frame width.
                  - We let overflow:hidden clip the black bars.
                */}
                <div
                  className="absolute top-1/2 left-1/2"
                  style={{
                    width: '320%',
                    height: '100%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div id="yt-player" className="w-full h-full" />
                </div>

                {/* Clickable overlay to prevent YouTube click-through */}
                <div className="absolute inset-0 z-10" />

                {/* Video Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 z-20 pb-5 pt-10 px-3">
                  {/* Gradient fade for controls area */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-[2.5rem] pointer-events-none" />

                  <div className="relative space-y-2.5">
                    {/* Timeline / Progress Bar */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-white/70 font-mono min-w-[28px] text-right">
                        {formatTime(currentTime)}
                      </span>
                      <div
                        ref={progressRef}
                        className="flex-1 h-[6px] bg-white/20 rounded-full cursor-pointer group relative"
                        onMouseDown={handleSeekMouseDown}
                      >
                        {/* Buffered/progress track */}
                        <div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#8dc720] to-[#A8FF01] rounded-full transition-all duration-100"
                          style={{ width: `${progressPercent}%` }}
                        />
                        {/* Seek thumb */}
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#A8FF01] rounded-full shadow-lg shadow-[#A8FF01]/40 transition-transform duration-100 group-hover:scale-125"
                          style={{
                            left: `${progressPercent}%`,
                            transform: `translate(-50%, -50%)`,
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-white/70 font-mono min-w-[28px]">
                        {formatTime(duration)}
                      </span>
                    </div>

                    {/* Controls row */}
                    <div className="flex items-center justify-between">
                      {/* Play/Pause */}
                      <button
                        onClick={togglePlay}
                        className="w-9 h-9 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/25 transition-all duration-200 hover:scale-110 active:scale-95"
                        aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      >
                        {isPlaying ? (
                          <Pause className="h-3.5 w-3.5 text-white" />
                        ) : (
                          <Play className="h-3.5 w-3.5 text-white ml-0.5" />
                        )}
                      </button>

                      {/* Live indicator */}
                      <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#A8FF01] animate-pulse" />
                        <span className="text-white/90 text-[10px] font-medium">
                          Live Demo
                        </span>
                      </div>

                      {/* Mute/Unmute */}
                      <button
                        onClick={toggleMute}
                        className="w-9 h-9 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/25 transition-all duration-200 hover:scale-110 active:scale-95"
                        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      >
                        {isMuted ? (
                          <VolumeX className="h-3.5 w-3.5 text-white" />
                        ) : (
                          <Volume2 className="h-3.5 w-3.5 text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Reflection/Glare Effect */}
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-[3rem] z-30" />
              <div className="absolute top-[20%] right-[10%] w-[100px] h-[100px] bg-white/5 blur-2xl rounded-full pointer-events-none z-30" />

              {/* Bottom Home Indicator */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-100/50 rounded-full z-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
