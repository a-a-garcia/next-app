import React from 'react'
import Script from 'next/script'

const GoogleAnalyticsScript = () => {
  return (
    <>
           {/* google analytics should be as high as possible, before body */}
          
      <Script async src="https://www.googletagmanager.com/gtag/js?id=TAG_ID" />
      {/* we must set a strategy for the Script */}
      {/* beforeInteractive - the script is loaded before next.js injects and client side code to our pages. only use for scripts that should be loaded early on like bot detectors, cookie consent managers */}
      {/* afterInteractive - defauly value, script becomes active AFTER next.js injects client side code - good for tag managers and analytics*/}
      {/* lazyOnload - loaded after all resources on page have been fetched. good for low priority scripts - social media widgets, chatbots*/}
      {/* when you use inline scripts, you must give the Script an id */}
      <Script id="google-analytics">
        {/* wrap this javascript in curly braces and backticks. it's a trick to handle something like dataLayer being unknown because it's a global object*/}
        {/* we are now passing this string to the script component */}
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'TAG_ID');`}
      </Script>
    </>
  )
}

export default GoogleAnalyticsScript