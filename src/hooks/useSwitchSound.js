import { useEffect, useRef } from 'react';

export function useSwitchSound(soundUrl) {
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);
  const gainNodeRef = useRef(null);
  const isLoadedRef = useRef(false);
  
  const pressBufferRef = useRef(null);
  const releaseBufferRef = useRef(null);

  useEffect(() => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    audioBufferRef.current = null;
    pressBufferRef.current = null;
    releaseBufferRef.current = null;
    isLoadedRef.current = false;

    if (!soundUrl) {
      return;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContextRef.current = new AudioContext({
      latencyHint: 'interactive',
      sampleRate: 48000
    });

    gainNodeRef.current = audioContextRef.current.createGain();
    gainNodeRef.current.gain.value = 0.7;
    gainNodeRef.current.connect(audioContextRef.current.destination);

    fetch(soundUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then(arrayBuffer => audioContextRef.current.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        audioBufferRef.current = audioBuffer;

        const duration = audioBuffer.duration;
        const sampleRate = audioBuffer.sampleRate;
        const numberOfChannels = audioBuffer.numberOfChannels;
        
        const splitPoint = Math.floor(duration * sampleRate * 0.5);
        
        const pressLength = splitPoint;
        pressBufferRef.current = audioContextRef.current.createBuffer(
          numberOfChannels,
          pressLength,
          sampleRate
        );
        
        const releaseLength = audioBuffer.length - splitPoint;
        releaseBufferRef.current = audioContextRef.current.createBuffer(
          numberOfChannels,
          releaseLength,
          sampleRate
        );
        
        for (let channel = 0; channel < numberOfChannels; channel++) {
          const originalData = audioBuffer.getChannelData(channel);
          const pressData = pressBufferRef.current.getChannelData(channel);
          for (let i = 0; i < pressLength; i++) {
            pressData[i] = originalData[i];
          }
          
          const releaseData = releaseBufferRef.current.getChannelData(channel);
          for (let i = 0; i < releaseLength; i++) {
            releaseData[i] = originalData[splitPoint + i];
          }
        }
        
        isLoadedRef.current = true;
        
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
      })

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [soundUrl]);

  const playPressSound = () => {
    if (!isLoadedRef.current || !audioContextRef.current || !pressBufferRef.current) {
      return;
    }

    try {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = pressBufferRef.current;
      source.connect(gainNodeRef.current);
      source.start(0);
    } catch (error) {
      console.warn('Error reproduciendo press:', error);
    }
  };
  
  const playReleaseSound = () => {
    if (!isLoadedRef.current || !audioContextRef.current || !releaseBufferRef.current) {
      return;
    }

    try {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = releaseBufferRef.current;
      source.connect(gainNodeRef.current);
      source.start(0);
    } catch (error) {
      console.warn('Error reproduciendo release:', error);
    }
  };

  return { playPressSound, playReleaseSound };
}