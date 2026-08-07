document.addEventListener('DOMContentLoaded', () => {
    initServerFilters();
    initCopyIP();
    initAccordion();
    initLeaderboardSearch();
    initSimulatedStats();
});

// Server Category Filtering
function initServerFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serverCards = document.querySelectorAll('.server-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            serverCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 1-Click Copy IP with Toast Notification
function initCopyIP() {
    const ipBoxes = document.querySelectorAll('.ip-box');

    ipBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const ip = box.getAttribute('data-ip');
            navigator.clipboard.writeText(ip).then(() => {
                showToast(`IP хаяг амжилттай хуулагдлаа: ${ip}`);
                
                // Visual feedback on the clicked box
                const originalHTML = box.innerHTML;
                box.innerHTML = `<span style="color:#10B981; font-weight:bold;">Copied!</span> <i class="fas fa-check copy-icon" style="color:#10B981"></i>`;
                setTimeout(() => {
                    box.innerHTML = originalHTML;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    });
}

// Toast Notification Handler
function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-check-circle" style="color:#FF6B00; font-size:1.2rem;"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Rules / FAQ Accordion Toggle
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Leaderboard Search Filter
function initLeaderboardSearch() {
    const searchInput = document.getElementById('leaderboard-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('.leaderboard-table tbody tr');

        rows.forEach(row => {
            const playerName = row.querySelector('.player-cell').textContent.toLowerCase();
            if (playerName.includes(query)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Live Simulated Player Fluctuations for dynamic realism
function initSimulatedStats() {
    const playerCounters = document.querySelectorAll('.live-player-count');
    const totalOnlineEl = document.getElementById('total-online-players');

    setInterval(() => {
        let currentTotal = 0;
        playerCounters.forEach(counter => {
            const max = parseInt(counter.getAttribute('data-max'));
            let current = parseInt(counter.textContent);

            // Random slight change (-1, 0, or +1)
            const change = Math.floor(Math.random() * 3) - 1;
            let nextVal = Math.min(max, Math.max(8, current + change));
            
            counter.textContent = nextVal;
            currentTotal += nextVal;

            // Update parent progress bar
            const card = counter.closest('.server-card');
            if (card) {
                const fill = card.querySelector('.player-bar-fill');
                if (fill) {
                    fill.style.width = `${(nextVal / max) * 100}%`;
                }
            }
        });

        if (totalOnlineEl) {
            totalOnlineEl.textContent = currentTotal + 142; // Add offline/idle simulated base
        }
    }, 4000);
}

// Modal Purchase Handler
function openVipModal(tierName, price) {
    showToast(`${tierName} VIP (${price}) худалдан авах холбоос Discord сервер рүү илгээгдлээ!`);
}
