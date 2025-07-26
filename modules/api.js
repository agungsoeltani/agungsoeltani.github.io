const weatherIconMap = {
    '01d': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
    '01n': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
    '02d': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
    '02n': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
    '03d': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
    '03n': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
    '04d': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
    '04n': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
    '09d': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
    '09n': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
    '10d': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
    '10n': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
    '11d': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 2 9 14 15 12 11 22"></polyline></svg>',
    '11n': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="13 2 9 14 15 12 11 22"></polyline></svg>',
    '13d': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>',
    '13n': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>',
    '50d': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',
    '50n': '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',
};
export async function initWeatherWidget() {
    const widget = document.getElementById('weather-widget');
    if (!widget) return;
    widget.innerHTML = `<span style="font-size: 0.9em; color: var(--secondary-text-color);">Loading...</span>`;
    try {
        const response = await fetch('https://agungsoeltani.netlify.app/.netlify/functions/cuaca');
        if (!response.ok) throw new Error('Weather API response not OK');
        const weatherData = await response.json();
        if (!weatherData || weatherData.length === 0) {
            widget.innerHTML = `<span style="font-size: 0.9em; color: var(--secondary-text-color);">Data N/A</span>`;
            return;
        }
        let currentIndex = 0;
        const updateWeather = () => {
            const currentCity = weatherData[currentIndex];
            const iconCode = String(currentCity.icon);
            let mappedIconCode = iconCode.slice(0, -1) + 'd';
            if (iconCode === '01n') mappedIconCode = '01n';
            const iconSvg = weatherIconMap[mappedIconCode] || weatherIconMap['01d'];
            widget.innerHTML = `<div class="weather-content"><div class="weather-icon">${iconSvg}</div><span class="weather-text">${currentCity.kota} <strong>${currentCity.suhu}°C</strong></span></div>`;
            currentIndex = (currentIndex + 1) % weatherData.length;
        };
        updateWeather();
        setInterval(updateWeather, 6000);
    } catch (error) {
        console.error('Failed to load weather data:', error);
        widget.innerHTML = `<span style="font-size: 0.9em; color: var(--secondary-text-color);">Load failed</span>`;
    }
}

// --- LOGIKA DISCORD PRESENCE ---
export async function initDiscordPresence() {
    const discordUserId = '438025232150822914';
    const card = document.getElementById('lanyard-card');
    if (!card) return;

    let activityInterval = null;

    const formatDuration = (ms) => {
        if (!ms) return '';
        const totalSeconds = Math.floor((Date.now() - ms) / 1000);
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds} elapsed`;
    };

    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`);
        if (!response.ok) throw new Error('Failed to fetch Lanyard data');
        const { data } = await response.json();
        if (!data || !data.discord_user) throw new Error('Incomplete Lanyard data');

        const avatarEl = card.querySelector('#discord-avatar');
        const usernameEl = card.querySelector('#discord-username');
        const statusTextEl = card.querySelector('#discord-status');
        const statusIndicatorEl = card.querySelector('#discord-status-indicator');
        const activityEl = card.querySelector('#discord-activity');
        
        if (!avatarEl || !usernameEl || !statusTextEl || !statusIndicatorEl || !activityEl) return;

        avatarEl.src = `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`;
        usernameEl.textContent = data.discord_user.username;
        statusIndicatorEl.className = 'discord-status-indicator ' + data.discord_status;
        statusTextEl.textContent = data.discord_status.charAt(0).toUpperCase() + data.discord_status.slice(1);

        const spotifyActivity = data.activities.find(act => act.name === 'Spotify');
        
        if (spotifyActivity && spotifyActivity.assets) {
            activityEl.classList.add('visible');
            activityEl.innerHTML = `
                <img src="${spotifyActivity.assets.large_image_url}" alt="Album Art" class="activity-album-art">
                <div class="activity-details">
                    <p class="activity-song">${spotifyActivity.details || ''}</p>
                    <p class="activity-artist">by ${spotifyActivity.state || ''}</p>
                    <p class="activity-artist" id="activity-timer"></p>
                </div>`;
            statusTextEl.textContent = "Listening to Spotify";
            
            if (spotifyActivity.timestamps && spotifyActivity.timestamps.start) {
                const timerEl = activityEl.querySelector('#activity-timer');
                if (timerEl) {
                    activityInterval = setInterval(() => {
                        timerEl.textContent = formatDuration(spotifyActivity.timestamps.start);
                    }, 1000);
                }
            }
        } else {
            activityEl.classList.remove('visible');
            activityEl.innerHTML = '';
        }
    } catch (error) {
        console.error('Error fetching Discord presence:', error);
        card.innerHTML = `<p style="color: var(--secondary-text-color);">Failed to load Discord status.</p>`;
    }
}