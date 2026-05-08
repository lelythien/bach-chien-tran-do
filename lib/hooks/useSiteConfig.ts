'use client'

import { useEffect, useState } from 'react'
import { subscribeSiteConfig, DEFAULT_SITE_CONFIG } from '@/lib/services/siteConfigService'
import { SiteConfigDoc } from '@/lib/types/siteConfig.types'

interface SiteConfigState {
  config:  SiteConfigDoc
  loading: boolean
}

/**
 * Real-time site configuration hook.
 * Used by both admin CMS and public pages to read dynamic content.
 */
export function useSiteConfig(): SiteConfigState {
  const [config,  setConfig]  = useState<SiteConfigDoc>(DEFAULT_SITE_CONFIG)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = subscribeSiteConfig((cfg) => {
      setConfig(cfg)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  return { config, loading }
}
