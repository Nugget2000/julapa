document.addEventListener('DOMContentLoaded', () => {
    // Snowfall effect
    const snowContainer = document.getElementById('snow-container');
    if (snowContainer) {
        function createSnowflake() {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.innerHTML = '❄';
            snowflake.style.left = Math.random() * 100 + 'vw';
            snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
            snowflake.style.opacity = Math.random();
            snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';

            snowContainer.appendChild(snowflake);

            setTimeout(() => {
                snowflake.remove();
            }, 5000);
        }

        setInterval(createSnowflake, 100);
    }

    // Campaign Popup Logic
    const popup = document.getElementById('campaign-popup');
    if (popup) {
        // Show popup after 1.5 seconds
        setTimeout(() => {
            popup.style.display = 'flex';
        }, 1500);

        const closeBtn = popup.querySelector('.close-popup');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                popup.style.display = 'none';
            });
        }

        const buyBtn = popup.querySelector('.popup-cta');
        if (buyBtn) {
            buyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                alert("Varför har apor aldrig fickpengar?\n\nFör att de äter upp alla bananer! 🍌\n\n(Och tyvärr har vi sålt slut på aporna också, så du får behålla dina pengar!)");
            });
        }
    }

    // Countdown Timer (1 Hour)
    const timerElement = document.getElementById('countdown-timer');
    if (timerElement) {
        let totalSeconds = 3600; // 1 hour

        function updateTimer() {
            if (totalSeconds <= 0) {
                timerElement.innerText = "00:00:00";
                return;
            }

            const h = Math.floor(totalSeconds / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            const s = totalSeconds % 60;

            timerElement.innerText =
                `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

            totalSeconds--;
        }

        setInterval(updateTimer, 1000);
        updateTimer(); // Initial call
    }

    // Visitor Counter
    const visitorElement = document.getElementById('visitor-count');
    if (visitorElement) {
        let currentVisitors = 142;

        function updateVisitors() {
            const change = Math.floor(Math.random() * 10) - 4; // Random change between -4 and +5
            currentVisitors += change;
            if (currentVisitors < 50) currentVisitors = 50; // Minimum limit
            if (currentVisitors > 500) currentVisitors = 500; // Maximum limit
            visitorElement.innerText = currentVisitors;
        }

        setInterval(updateVisitors, 2500); // Update every 2.5 seconds
    }

    // Other Buttons
    // "Köp Din Julapa Nu" - Hero section
    const heroCta = document.querySelector('.hero .cta-button');
    if (heroCta) {
        heroCta.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Tyvärr, aporna är slut för i år! 🎅🐒');
        });
    }

    // "Köp en Julhamster" - Hamster section
    const hamsterCta = document.querySelector('.hamster-content .cta-button');
    if (hamsterCta) {
        hamsterCta.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Hamstrarna sover just nu! 🐹💤');
        });
    }
});
