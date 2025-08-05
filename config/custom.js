// Place your Javascript Here

// Google Analytics 4 (GA4)
// Replace 'YOUR_GA4_MEASUREMENT_ID' with your actual Measurement ID (format: G-XXXXXXXXXX)
(function() {
    const GA4_MEASUREMENT_ID = 'G-RKEQJZMBBB'; // Example: 'G-XXXXXXXXXX'
    
    if (GA4_MEASUREMENT_ID && GA4_MEASUREMENT_ID !== 'YOUR_GA4_MEASUREMENT_ID') {
        // Load Google Analytics script
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
        document.head.appendChild(gaScript);
        
        // Initialize Google Analytics
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', GA4_MEASUREMENT_ID);
        
        console.log('Google Analytics 4 loaded successfully');
    }
})();

// Google AdSense
// Replace 'YOUR_ADSENSE_CLIENT_ID' with your actual AdSense Client ID (format: ca-pub-XXXXXXXXXXXXXXXX)
(function() {
    const ADSENSE_CLIENT_ID = 'ca-pub-1723057855582377'; // Example: 'ca-pub-1234567890123456'
    
    if (ADSENSE_CLIENT_ID && ADSENSE_CLIENT_ID !== 'ca-pub-1723057855582377') {
        // Load AdSense script
        const adScript = document.createElement('script');
        adScript.async = true;
        adScript.crossOrigin = 'anonymous';
        adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
        document.head.appendChild(adScript);
        
        console.log('Google AdSense loaded successfully');
    }
})();

// Custom event tracking function (optional)
function trackGameClick(gameName) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'game_click', {
            'game_name': gameName,
            'event_category': 'games',
            'event_label': gameName
        });
    }
}

// Additional initialization after page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Custom scripts loaded successfully');
    
    // Add other custom initialization code here
});
