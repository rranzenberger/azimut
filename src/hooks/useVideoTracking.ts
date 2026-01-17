// ════════════════════════════════════════════════════════════
// HOOK: useVideoTracking - Tracking completo de vídeos
// ════════════════════════════════════════════════════════════
// Track: play, pause, complete, progress (25%, 50%, 75%, 100%)

import { useEffect, useRef } from 'react'
import { trackVideoEvent } from '../utils/analytics'

interface UseVideoTrackingProps {
  videoId: string
  videoUrl: string
  platform?: 'youtube' | 'vimeo' | 'custom'
  enabled?: boolean
}

export function useVideoTracking({
  videoId,
  videoUrl,
  platform = 'custom',
  enabled = true
}: UseVideoTrackingProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const progressTracked = useRef<Set<number>>(new Set())
  const hasPlayed = useRef(false)
  const hasCompleted = useRef(false)

  useEffect(() => {
    if (!enabled || !videoRef.current) return

    const video = videoRef.current

    // Play event
    const handlePlay = () => {
      if (!hasPlayed.current) {
        hasPlayed.current = true
        trackVideoEvent(videoId, videoUrl, 'play', {
          platform,
          duration: video.duration,
        })
      }
    }

    // Pause event
    const handlePause = () => {
      trackVideoEvent(videoId, videoUrl, 'pause', {
        platform,
        currentTime: video.currentTime,
        duration: video.duration,
        progress: Math.round((video.currentTime / video.duration) * 100),
      })
    }

    // Progress tracking (25%, 50%, 75%, 100%)
    const handleTimeUpdate = () => {
      if (!video.duration) return

      const progress = Math.round((video.currentTime / video.duration) * 100)
      const milestones = [25, 50, 75, 100]

      milestones.forEach((milestone) => {
        if (progress >= milestone && !progressTracked.current.has(milestone)) {
          progressTracked.current.add(milestone)
          trackVideoEvent(videoId, videoUrl, 'progress', {
            platform,
            currentTime: video.currentTime,
            duration: video.duration,
            progress: milestone,
          })
        }
      })
    }

    // Complete event
    const handleEnded = () => {
      if (!hasCompleted.current) {
        hasCompleted.current = true
        trackVideoEvent(videoId, videoUrl, 'complete', {
          platform,
          duration: video.duration,
          progress: 100,
        })
      }
    }

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
    }
  }, [videoId, videoUrl, platform, enabled])

  return { videoRef }
}
