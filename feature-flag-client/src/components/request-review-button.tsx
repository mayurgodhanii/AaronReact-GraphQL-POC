import { useFlags } from 'launchdarkly-react-client-sdk';
import React from 'react';

// Problem: 
//     This should be coloured based on FF value
// Feature flag name: 
//     details-section-cta-colour
// Setup: 
//     Fill background color with flag value.
export const RequestReviewButton = () => {
  const {detailsSectionCtaColour} = useFlags()
  const backgroundColor = detailsSectionCtaColour === 'blue' ? '#0000ff' : '#FFFFFF';

  return(
    <button style={{backgroundColor}}>Request doctor review</button>
  )
}