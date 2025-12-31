'use client'

import { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import type Player from 'video.js/dist/types/player'

interface VideoPlayerProps {
  videoUrl: string
  title: string
  onComplete?: () => void
}

export function VideoPlayer({ videoUrl, title, onComplete }: VideoPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<Player | null>(null)

  useEffect(() => {
    if (!videoRef.current) return

    // Initialize Video.js player
    const player = videojs(videoRef.current, {
      controls: true,
      responsive: true,
      fluid: true,
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      sources: [
        {
          src: videoUrl,
          type: 'video/mp4',
        },
      ],
    })

    playerRef.current = player

    // Handle video end
    player.on('ended', () => {
      if (onComplete) {
        onComplete()
      }
    })

    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [videoUrl, onComplete])

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
        {title}
      </h2>
      <div className="flex-1 bg-black rounded-lg overflow-hidden">
        <div data-vjs-player>
          <div ref={videoRef} className="video-js vjs-big-play-centered" />
        </div>
      </div>
    </div>
  )
}

