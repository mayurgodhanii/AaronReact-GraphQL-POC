import { useFlags } from 'launchdarkly-react-client-sdk';
import React from 'react';

// Problem: 
//     This should be conditionally rendered based on feature flag enrolment.
// Feature flag name: 
//     general-render-launch-banner
// Setup: 
//     Show to users with flag value: true
const PromotionalBanner = () => (
  <div className="promotional-banner">
    <p>50% launch sale! Use code TAKEHOME</p>
  </div>
)

export const PageLayout = ({ children, className }: { children: React.ReactNode, className: string }) => {
  const {generalRenderLaunchBanner} = useFlags()
  


  return (
    <div className={`page-layout ${className}`}>
      <PromotionalBanner />
      {generalRenderLaunchBanner ? children : 'NO RECORD'}
    </div>
  )
}