import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Flame, Activity, Zap, Info, ShieldAlert } from 'lucide-react';

// Smart metadata resolver for 50+ exercises scalability
export const getExerciseMetadata = (ex) => {
  const name = (ex?.name || 'Exercise').toLowerCase();

  let illustrationType = ex?.illustrationType;
  let primaryMuscles = ex?.primaryMuscles;
  let secondaryMuscles = ex?.secondaryMuscles;
  let startingPosition = ex?.startingPosition;
  let movementPosition = ex?.movementPosition;
  let muscleHighlightInfo = ex?.muscleHighlightInfo;

  if (!illustrationType) {
    if (name.includes('squat')) illustrationType = 'squat';
    else if (name.includes('deadlift') || name.includes('romanian')) illustrationType = 'deadlift';
    else if (name.includes('bench press') || name.includes('chest press') || name.includes('push-up') && !name.includes('spider')) illustrationType = name.includes('push') ? 'pushup' : 'bench_press';
    else if (name.includes('shoulder press') || name.includes('overhead') || name.includes('lateral raise')) illustrationType = 'shoulder_press';
    else if (name.includes('bicep') || name.includes('curl')) illustrationType = 'bicep_curl';
    else if (name.includes('tricep') || name.includes('extension')) illustrationType = 'tricep_extension';
    else if (name.includes('lat pulldown') || name.includes('pulldown') || name.includes('inverted row')) illustrationType = 'lat_pulldown';
    else if (name.includes('push-up') || name.includes('pushup') || name.includes('push up')) illustrationType = 'pushup';
    else if (name.includes('spider')) illustrationType = 'spider_plank';
    else if (name.includes('plank')) illustrationType = 'plank';
    else if (name.includes('lunge') || name.includes('split squat')) illustrationType = 'lunges';
    else if (name.includes('calf') || name.includes('raise')) illustrationType = 'calf_raise';
    else if (name.includes('bent over') || (name.includes('row') && !name.includes('inverted'))) illustrationType = 'bent_over_row';
    else if (name.includes('iron cross')) illustrationType = 'iron_cross';
    else if (name.includes('kettlebell') || name.includes('swing') || name.includes('kb swing')) illustrationType = 'kb_swing';
    else if (name.includes('dip')) illustrationType = 'bench_dips';
    else illustrationType = 'general';
  }

  if (!primaryMuscles || primaryMuscles.length === 0) {
    switch (illustrationType) {
      case 'squat': primaryMuscles = ['Quadriceps', 'Glutes']; break;
      case 'deadlift': primaryMuscles = ['Hamstrings', 'Glutes', 'Lower Back']; break;
      case 'bench_press': primaryMuscles = ['Pectorals (Chest)']; break;
      case 'shoulder_press': primaryMuscles = ['Anterior & Lateral Deltoids']; break;
      case 'bicep_curl': primaryMuscles = ['Biceps Brachii']; break;
      case 'tricep_extension': primaryMuscles = ['Triceps Brachii']; break;
      case 'lat_pulldown': primaryMuscles = ['Latissimus Dorsi', 'Rhomboids']; break;
      case 'pushup': primaryMuscles = ['Pectorals (Chest)', 'Triceps Brachii']; break;
      case 'plank': primaryMuscles = ['Rectus Abdominis', 'Obliques']; break;
      case 'lunges': primaryMuscles = ['Quadriceps', 'Glutes']; break;
      case 'calf_raise': primaryMuscles = ['Gastrocnemius', 'Soleus (Calves)']; break;
      case 'bent_over_row': primaryMuscles = ['Latissimus Dorsi', 'Rhomboids']; break;
      case 'iron_cross': primaryMuscles = ['Deltoids (Shoulders)', 'Quadriceps']; break;
      case 'kb_swing': primaryMuscles = ['Glutes', 'Hamstrings']; break;
      case 'bench_dips': primaryMuscles = ['Triceps Brachii']; break;
      case 'spider_plank': primaryMuscles = ['Obliques', 'Rectus Abdominis']; break;
      default: primaryMuscles = ['Target Muscle Group']; break;
    }
  }

  if (!secondaryMuscles || secondaryMuscles.length === 0) {
    switch (illustrationType) {
      case 'squat': secondaryMuscles = ['Hamstrings', 'Calves', 'Core']; break;
      case 'deadlift': secondaryMuscles = ['Lats', 'Traps', 'Forearms']; break;
      case 'bench_press': secondaryMuscles = ['Triceps Brachii', 'Front Shoulders']; break;
      case 'shoulder_press': secondaryMuscles = ['Triceps Brachii', 'Upper Traps']; break;
      case 'bicep_curl': secondaryMuscles = ['Brachialis', 'Forearms']; break;
      case 'tricep_extension': secondaryMuscles = ['Front Shoulders', 'Forearms']; break;
      case 'lat_pulldown': secondaryMuscles = ['Biceps Brachii', 'Rear Deltoids']; break;
      case 'pushup': secondaryMuscles = ['Front Shoulders', 'Core Abdominals']; break;
      case 'plank': secondaryMuscles = ['Lower Back', 'Glutes', 'Shoulders']; break;
      case 'lunges': secondaryMuscles = ['Hamstrings', 'Calves', 'Core']; break;
      case 'calf_raise': secondaryMuscles = ['Tibialis Posterior', 'Ankle Stabilizers']; break;
      case 'bent_over_row': secondaryMuscles = ['Biceps Brachii', 'Lower Back']; break;
      case 'iron_cross': secondaryMuscles = ['Upper Traps', 'Core Abdominals']; break;
      case 'kb_swing': secondaryMuscles = ['Core Abdominals', 'Shoulders']; break;
      case 'bench_dips': secondaryMuscles = ['Pectorals', 'Front Shoulders']; break;
      case 'spider_plank': secondaryMuscles = ['Hip Flexors', 'Deltoids']; break;
      default: secondaryMuscles = ['Synergist Muscles']; break;
    }
  }

  if (!startingPosition) {
    startingPosition = `Neutral starting posture for ${ex?.name || 'exercise'}`;
  }
  if (!movementPosition) {
    movementPosition = `Peak muscle flex and contraction phase for ${ex?.name || 'exercise'}`;
  }
  if (!muscleHighlightInfo) {
    muscleHighlightInfo = `Primary: ${primaryMuscles.join(', ')} | Secondary: ${secondaryMuscles.join(', ')}`;
  }

  return {
    illustrationType,
    primaryMuscles,
    secondaryMuscles,
    startingPosition,
    movementPosition,
    muscleHighlightInfo
  };
};

export default function ExerciseVideoPlayer({ exercise, height = "h-72", autoPlay = true, showControls = true, compact = false }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [repCount, setRepCount] = useState(1);
  const [currentPhase, setCurrentPhase] = useState('Starting position');

  const meta = getExerciseMetadata(exercise);

  // Audio tone generator for repetition tempo
  const playRhythmTone = (freq = 440) => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {}
  };

  // 60FPS 2D Vector Anatomical Illustration Rendering Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;
    let localReps = 1;
    let lastPhase = '';

    const renderFrame = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Clean Neutral Studio Slate Backdrop (NO REAL PHOTOS / NO GYM CLUTTER)
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 30, width / 2, height / 2, width * 0.75);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle Vector Ground Floor Grid Line
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.84);
      ctx.lineTo(width, height * 0.84);
      ctx.stroke();

      if (isPlaying) {
        time += 0.04 * playbackSpeed;
      }

      // Smooth sinusoidal movement wave (0 = startingPosition, 1 = movementPosition)
      const cycle = (Math.sin(time) + 1) / 2;

      // Repetition tracking
      if (cycle > 0.95 && lastPhase !== 'peak') {
        lastPhase = 'peak';
        localReps += 1;
        setRepCount(localReps);
        playRhythmTone(523.25);
      } else if (cycle < 0.05 && lastPhase !== 'bottom') {
        lastPhase = 'bottom';
        playRhythmTone(392.00);
      }

      // Dynamic Phase Readout
      if (cycle > 0.5) {
        setCurrentPhase(meta.movementPosition || 'Peak Muscle Contraction');
      } else {
        setCurrentPhase(meta.startingPosition || 'Starting Form Position');
      }

      // Center Coordinates
      const cx = width / 2;
      const cy = height / 2 + 10;

      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Anatomical Color Palette
      const neutralLine = '#94a3b8';
      const neutralFill = '#1e293b';
      const primaryLine = '#f43f5e';
      const primaryFill = 'rgba(239, 68, 68, 0.75)';
      const secondaryLine = '#fbbf24';
      const secondaryFill = 'rgba(245, 158, 11, 0.6)';

      // Helper function to draw Muscle Activation Highlight Group
      const drawMuscleGroup = (x, y, radiusX, radiusY, isPrimary = true, label = '') => {
        if (!showHeatmap) return;
        ctx.save();
        const pulse = 1 + Math.sin(time * 6) * 0.08;
        const rx = radiusX * pulse;
        const ry = radiusY * pulse;

        // Glow Gradient
        const grad = ctx.createRadialGradient(x, y, 2, x, y, Math.max(rx, ry) * 1.5);
        if (isPrimary) {
          grad.addColorStop(0, 'rgba(255, 42, 85, 0.9)');
          grad.addColorStop(0.5, 'rgba(239, 68, 68, 0.5)');
          grad.addColorStop(1, 'rgba(239, 68, 68, 0)');
        } else {
          grad.addColorStop(0, 'rgba(251, 191, 36, 0.85)');
          grad.addColorStop(0.5, 'rgba(245, 158, 11, 0.45)');
          grad.addColorStop(1, 'rgba(245, 158, 11, 0)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(x, y, rx * 1.4, ry * 1.4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Muscle Contour Fill
        ctx.fillStyle = isPrimary ? primaryFill : secondaryFill;
        ctx.strokeStyle = isPrimary ? primaryLine : secondaryLine;
        ctx.lineWidth = isPrimary ? 3 : 2;
        ctx.beginPath();
        ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Optional Muscle Label Line Callout
        if (label && !compact) {
          ctx.font = 'bold 9px sans-serif';
          ctx.fillStyle = isPrimary ? '#fecdd3' : '#fef08a';
          ctx.fillText(label.toUpperCase(), x + rx + 6, y + 3);
        }
        ctx.restore();
      };

      // -------------------------------------------------------------
      // 2D HUMAN ANATOMICAL ILLUSTRATION DRAWING ROUTINES
      // -------------------------------------------------------------
      const type = meta.illustrationType;

      // 1. SQUAT ILLUSTRATION (Quadriceps 🔴, Glutes 🔴, Hamstrings 🟡)
      if (type === 'squat') {
        const squatDepth = cycle * 38;

        // Head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, cy - 65 + squatDepth, 12, 0, Math.PI * 2);
        ctx.fill();

        // Spine & Torso
        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 53 + squatDepth);
        ctx.lineTo(cx, cy - 10 + squatDepth);
        ctx.stroke();

        // Thighs / Quads (PRIMARY HIGHLIGHT 🔴)
        drawMuscleGroup(cx - 20, cy + 20 + squatDepth * 0.4, 14, 22, true, 'Quads');
        drawMuscleGroup(cx + 20, cy + 20 + squatDepth * 0.4, 14, 22, true, 'Glutes');

        // Lower Legs
        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(cx - 10, cy - 10 + squatDepth);
        ctx.lineTo(cx - 32, cy + 25 + squatDepth * 0.4);
        ctx.lineTo(cx - 24, cy + 65);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cx + 10, cy - 10 + squatDepth);
        ctx.lineTo(cx + 32, cy + 25 + squatDepth * 0.4);
        ctx.lineTo(cx + 24, cy + 65);
        ctx.stroke();

        // Calves (SECONDARY HIGHLIGHT 🟡)
        drawMuscleGroup(cx - 26, cy + 45, 8, 14, false, 'Calves');

        // Barbell
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(cx - 75, cy - 48 + squatDepth);
        ctx.lineTo(cx + 75, cy - 48 + squatDepth);
        ctx.stroke();
        ctx.fillStyle = '#334155';
        ctx.beginPath();
        ctx.arc(cx - 75, cy - 48 + squatDepth, 14, 0, Math.PI * 2);
        ctx.arc(cx + 75, cy - 48 + squatDepth, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. DEADLIFT ILLUSTRATION (Hamstrings 🔴, Glutes 🔴, Lower Back 🔴, Lats 🟡)
      else if (type === 'deadlift') {
        const p = cycle;
        const hipX = cx - 25 + p * 15;
        const hipY = cy + 10 - p * 20;
        const headX = cx + 35 - p * 35;
        const headY = cy - 10 - p * 45;

        // Head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(headX, headY, 12, 0, Math.PI * 2);
        ctx.fill();

        // Spine
        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(headX, headY + 10);
        ctx.lineTo(hipX, hipY);
        ctx.stroke();

        // Lower Back (PRIMARY HIGHLIGHT 🔴)
        drawMuscleGroup((headX + hipX) / 2, (headY + hipY) / 2, 10, 18, true, 'Lower Back');

        // Glutes & Hamstrings (PRIMARY HIGHLIGHT 🔴)
        drawMuscleGroup(hipX, hipY, 14, 16, true, 'Glutes');
        drawMuscleGroup(hipX + 5, hipY + 25, 12, 20, true, 'Hamstrings');

        // Legs
        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(hipX, hipY);
        ctx.lineTo(cx - 15, cy + 35);
        ctx.lineTo(cx - 15, cy + 65);
        ctx.stroke();

        // Arms & Barbell
        const handX = cx + 5 - p * 5;
        const handY = cy + 35 - p * 40;

        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(headX - 10, headY + 15);
        ctx.lineTo(handX, handY);
        ctx.stroke();

        // Lats (SECONDARY HIGHLIGHT 🟡)
        drawMuscleGroup(headX - 15, headY + 25, 10, 14, false, 'Lats');

        // Barbell
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(handX - 55, handY);
        ctx.lineTo(handX + 55, handY);
        ctx.stroke();
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(handX - 55, handY, 16, 0, Math.PI * 2);
        ctx.arc(handX + 55, handY, 16, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. BENCH PRESS ILLUSTRATION (Pectorals 🔴, Triceps 🟡, Front Shoulders 🟡)
      else if (type === 'bench_press') {
        const barY = cy - 25 + cycle * 30;

        // Bench
        ctx.fillStyle = '#334155';
        ctx.fillRect(cx - 85, cy + 20, 170, 20);

        // Supine Athlete Head & Torso
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx - 65, cy + 10, 11, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(cx - 55, cy + 12);
        ctx.lineTo(cx + 45, cy + 12);
        ctx.stroke();

        // Pectorals / Chest (PRIMARY HIGHLIGHT 🔴)
        drawMuscleGroup(cx - 20, cy + 10, 18, 14, true, 'Pectorals');

        // Arms flexed to bar
        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx - 20, cy + 10);
        ctx.lineTo(cx - 20, barY);
        ctx.stroke();

        // Triceps & Shoulders (SECONDARY HIGHLIGHT 🟡)
        drawMuscleGroup(cx - 32, cy - 5, 10, 12, false, 'Triceps');

        // Barbell
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(cx - 20, barY - 40);
        ctx.lineTo(cx - 20, barY + 40);
        ctx.stroke();
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(cx - 20, barY - 40, 14, 0, Math.PI * 2);
        ctx.arc(cx - 20, barY + 40, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. SHOULDER PRESS ILLUSTRATION (Deltoids 🔴, Triceps 🟡, Traps 🟡)
      else if (type === 'shoulder_press') {
        const pressY = cy - 20 - cycle * 35;

        // Head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, cy - 40, 12, 0, Math.PI * 2);
        ctx.fill();

        // Spine
        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 28);
        ctx.lineTo(cx, cy + 30);
        ctx.stroke();

        // Deltoids / Shoulders (PRIMARY HIGHLIGHT 🔴)
        drawMuscleGroup(cx - 22, cy - 25, 12, 14, true, 'Deltoids');
        drawMuscleGroup(cx + 22, cy - 25, 12, 14, true, 'Deltoids');

        // Arms holding Dumbbells
        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx - 22, cy - 25);
        ctx.lineTo(cx - 35, pressY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + 22, cy - 25);
        ctx.lineTo(cx + 35, pressY);
        ctx.stroke();

        // Triceps (SECONDARY HIGHLIGHT 🟡)
        drawMuscleGroup(cx - 30, pressY + 12, 8, 12, false, 'Triceps');
        drawMuscleGroup(cx + 30, pressY + 12, 8, 12, false, 'Triceps');

        // Dumbbells
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(cx - 45, pressY - 8, 20, 16);
        ctx.fillRect(cx + 25, pressY - 8, 20, 16);
      }

      // 5. BICEP CURL ILLUSTRATION (Biceps 🔴, Forearms 🟡)
      else if (type === 'bicep_curl') {
        const flexAngle = cycle * 1.8;

        // Head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, cy - 60, 12, 0, Math.PI * 2);
        ctx.fill();

        // Torso
        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 48);
        ctx.lineTo(cx, cy + 15);
        ctx.stroke();

        // Legs
        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(cx, cy + 15);
        ctx.lineTo(cx - 15, cy + 65);
        ctx.moveTo(cx, cy + 15);
        ctx.lineTo(cx + 15, cy + 65);
        ctx.stroke();

        // Biceps (PRIMARY HIGHLIGHT 🔴)
        drawMuscleGroup(cx + 14, cy - 25, 12, 16, true, 'Biceps');

        // Forearm flexing up
        const handX = cx + 14 + Math.sin(flexAngle) * 30;
        const handY = cy + 10 - Math.cos(flexAngle) * 35;

        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx + 14, cy - 25);
        ctx.lineTo(handX, handY);
        ctx.stroke();

        // Forearms (SECONDARY HIGHLIGHT 🟡)
        drawMuscleGroup((cx + 14 + handX) / 2, (cy - 25 + handY) / 2, 8, 12, false, 'Forearms');

        // Dumbbell
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(handX - 10, handY - 8, 20, 16);
      }

      // 6. TRICEP EXTENSION / DIPS ILLUSTRATION (Triceps 🔴, Shoulders 🟡)
      else if (type === 'tricep_extension' || type === 'bench_dips') {
        const dipDepth = cycle * 28;

        // Bench
        ctx.fillStyle = '#334155';
        ctx.fillRect(cx - 85, cy + 25, 50, 40);

        // Head & Body
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx - 45, cy - 45 + dipDepth, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(cx - 45, cy - 33 + dipDepth);
        ctx.lineTo(cx - 45, cy + 20 + dipDepth);
        ctx.stroke();

        // Triceps (PRIMARY HIGHLIGHT 🔴)
        drawMuscleGroup(cx - 62, cy - 10 + dipDepth * 0.5, 12, 18, true, 'Triceps');

        // Arms dipping
        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx - 45, cy - 25 + dipDepth);
        ctx.lineTo(cx - 65, cy - 10 + dipDepth * 0.5);
        ctx.lineTo(cx - 65, cy + 25);
        ctx.stroke();

        // Front Shoulders (SECONDARY HIGHLIGHT 🟡)
        drawMuscleGroup(cx - 45, cy - 25 + dipDepth, 10, 10, false, 'Deltoids');
      }

      // 7. LAT PULLDOWN / INVERTED ROWS ILLUSTRATION (Lats 🔴, Biceps 🟡)
      else if (type === 'lat_pulldown' || type === 'bent_over_row') {
        const pullY = cy - 35 + cycle * 35;

        // Head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, cy - 40, 12, 0, Math.PI * 2);
        ctx.fill();

        // Spine
        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 28);
        ctx.lineTo(cx, cy + 30);
        ctx.stroke();

        // Latissimus Dorsi (PRIMARY HIGHLIGHT 🔴)
        drawMuscleGroup(cx - 18, cy - 15, 14, 22, true, 'Lats');
        drawMuscleGroup(cx + 18, cy - 15, 14, 22, true, 'Lats');

        // Biceps (SECONDARY HIGHLIGHT 🟡)
        drawMuscleGroup(cx - 30, pullY + 10, 9, 14, false, 'Biceps');
        drawMuscleGroup(cx + 30, pullY + 10, 9, 14, false, 'Biceps');

        // Lat Pulldown Bar
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(cx - 75, pullY);
        ctx.lineTo(cx + 75, pullY);
        ctx.stroke();
      }

      // 8. PUSH-UP ILLUSTRATION (Chest 🔴, Triceps 🔴, Shoulders 🟡, Core 🟡)
      else if (type === 'pushup') {
        const pushDepth = cycle * 22;

        // Head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx + 60, cy + 10 + pushDepth, 12, 0, Math.PI * 2);
        ctx.fill();

        // Plank Body Spine
        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(cx + 50, cy + 15 + pushDepth);
        ctx.lineTo(cx - 70, cy + 30);
        ctx.stroke();

        // Pectorals / Chest (PRIMARY HIGHLIGHT 🔴)
        drawMuscleGroup(cx + 35, cy + 18 + pushDepth, 16, 14, true, 'Pectorals');

        // Triceps (PRIMARY HIGHLIGHT 🔴)
        drawMuscleGroup(cx + 15, cy + 22 + pushDepth, 12, 12, true, 'Triceps');

        // Core Abdominals (SECONDARY HIGHLIGHT 🟡)
        drawMuscleGroup(cx - 10, cy + 25 + pushDepth * 0.5, 14, 12, false, 'Core');
      }

      // 9. PLANK ILLUSTRATION (Core/Abs 🔴, Obliques 🔴, Lower Back 🟡)
      else if (type === 'plank') {
        // Head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx + 60, cy + 15, 12, 0, Math.PI * 2);
        ctx.fill();

        // Spine
        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(cx + 50, cy + 20);
        ctx.lineTo(cx - 70, cy + 20);
        ctx.stroke();

        // Core Abdominals & Obliques (PRIMARY HIGHLIGHT 🔴)
        drawMuscleGroup(cx - 5, cy + 20, 25, 15, true, 'Core Abs');
        drawMuscleGroup(cx + 20, cy + 20, 18, 14, true, 'Obliques');

        // Lower Back (SECONDARY HIGHLIGHT 🟡)
        drawMuscleGroup(cx - 30, cy + 14, 14, 10, false, 'Lower Back');
      }

      // 10. LUNGES ILLUSTRATION (Quads 🔴, Glutes 🔴, Hamstrings 🟡, Calves 🟡)
      else if (type === 'lunges') {
        const lungeDepth = cycle * 30;

        // Head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx - 10, cy - 55 + lungeDepth, 12, 0, Math.PI * 2);
        ctx.fill();

        // Spine
        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(cx - 10, cy - 43 + lungeDepth);
        ctx.lineTo(cx - 10, cy + 10 + lungeDepth);
        ctx.stroke();

        // Front Quad (PRIMARY HIGHLIGHT 🔴)
        drawMuscleGroup(cx + 20, cy + 20 + lungeDepth * 0.5, 14, 20, true, 'Quads');
        drawMuscleGroup(cx - 10, cy + 10 + lungeDepth, 14, 16, true, 'Glutes');

        // Hamstrings (SECONDARY HIGHLIGHT 🟡)
        drawMuscleGroup(cx - 35, cy + 30 + lungeDepth * 0.5, 10, 18, false, 'Hamstrings');
      }

      // 11. CALF RAISE ILLUSTRATION (Calves 🔴, Soleus 🔴, Ankle Stabilizers 🟡)
      else if (type === 'calf_raise') {
        const heelRaise = cycle * 25;

        // Head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, cy - 65 - heelRaise, 12, 0, Math.PI * 2);
        ctx.fill();

        // Torso & Legs
        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 53 - heelRaise);
        ctx.lineTo(cx, cy + 20 - heelRaise);
        ctx.stroke();

        // Calves (PRIMARY HIGHLIGHT 🔴)
        drawMuscleGroup(cx - 15, cy + 40 - heelRaise * 0.5, 12, 22, true, 'Gastrocnemius');
        drawMuscleGroup(cx + 15, cy + 40 - heelRaise * 0.5, 12, 22, true, 'Soleus');

        // Ankle Stabilizers (SECONDARY HIGHLIGHT 🟡)
        drawMuscleGroup(cx - 15, cy + 60, 8, 10, false, 'Ankles');
      }

      // GENERAL / DEFAULT ANATOMICAL ILLUSTRATION
      else {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(cx, cy - 60, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = neutralLine;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 48);
        ctx.lineTo(cx, cy + 15);
        ctx.stroke();

        drawMuscleGroup(cx, cy - 15, 18, 22, true, meta.primaryMuscles[0] || 'Target Muscle');
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, playbackSpeed, isMuted, showHeatmap, exercise, meta]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl ${height} group select-none flex flex-col justify-between`}
    >
      {/* 2D Anatomical Vector Canvas Frame */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-950">
        <canvas
          ref={canvasRef}
          width={640}
          height={360}
          className="w-full h-full object-cover bg-slate-950"
        />

        {/* Top Badges & Legend HUD Overlay */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-blue-600/90 text-white font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg border border-blue-400/30">
              <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
              2D ANATOMICAL ILLUSTRATION
            </span>
          </div>

          {/* Muscle Color Legend Key */}
          <div className="flex items-center gap-2 bg-slate-900/95 border border-slate-800 px-3 py-1 rounded-xl backdrop-blur-md text-[10px] font-bold text-white pointer-events-auto">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-red-300">Primary</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-amber-300">Secondary</span>
            </span>
            <span className="text-slate-600">•</span>
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {showHeatmap ? 'Highlights ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Target Muscles Badges (Top Left Sub-banner) */}
        {!compact && (
          <div className="absolute top-12 left-3 flex flex-wrap gap-1.5 max-w-[80%] pointer-events-none z-10">
            {meta.primaryMuscles.map((m, idx) => (
              <span key={idx} className="bg-red-500/20 text-red-300 border border-red-500/40 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md">
                🔴 {m}
              </span>
            ))}
            {meta.secondaryMuscles.map((m, idx) => (
              <span key={idx} className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-md">
                🟡 {m}
              </span>
            ))}
          </div>
        )}

        {/* Bottom Phase & Rep Counter HUD */}
        <div className="absolute bottom-12 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div className="bg-slate-900/90 border border-slate-800 text-white px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-2 backdrop-blur-md shadow-lg truncate max-w-[70%]">
            <Activity className="w-3.5 h-3.5 text-blue-400 shrink-0 animate-spin" />
            <span className="text-slate-400 shrink-0">Form:</span>
            <span className="text-blue-400 font-semibold truncate">{currentPhase}</span>
          </div>

          {!compact && (
            <div className="bg-slate-900/90 border border-slate-800 text-white px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-2 backdrop-blur-md shadow-lg shrink-0">
              <span className="text-slate-400">Reps:</span>
              <span className="text-emerald-400 font-black text-xs">#{repCount}</span>
            </div>
          )}
        </div>

        {/* Big Splash Play Button Overlay when Paused */}
        {!isPlaying && (
          <button
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-20"
          >
            <Play className="w-6 h-6 fill-white ml-1" />
          </button>
        )}
      </div>

      {/* Interactive Control Bar */}
      {showControls && (
        <div className="bg-slate-900 border-t border-slate-800 px-3 py-2 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-sm"
              title={isPlaying ? 'Pause Demo' : 'Play Demo'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
              title={isMuted ? 'Unmute Audio Tone' : 'Mute Audio Tone'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-blue-400" />}
            </button>

            {/* Speed Selector */}
            <div className="flex items-center gap-1 bg-slate-950 px-1.5 py-1 rounded-lg border border-slate-800 text-[10px] font-bold text-slate-300">
              <span className="text-slate-500 mr-0.5">Speed:</span>
              {[0.5, 1, 1.5, 2].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-1.5 py-0.5 rounded ${
                    playbackSpeed === spd
                      ? 'bg-blue-600 text-white font-extrabold'
                      : 'hover:text-white text-slate-400'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-[11px] text-slate-400 font-semibold truncate max-w-[140px] sm:max-w-[200px]">
              <span className="text-white font-bold">{exercise?.name || 'Exercise'}</span>
            </div>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
              title="Toggle Fullscreen"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
