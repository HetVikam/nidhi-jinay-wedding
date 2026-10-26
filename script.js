const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const weddingDate = new Date('2026-12-04T09:00:00+05:30').getTime();
function updateCountdown() {
  const distance = weddingDate - Date.now();
  if (distance <= 0) {
    document.querySelector('.countdown').innerHTML = '<p class="gujarati">શુભ લગ્ન દિવસ! આજે ઉજવણીનો દિવસ છે.</p>';
    return;
  }
  const units = {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance % 86400000) / 3600000),
    minutes: Math.floor((distance % 3600000) / 60000),
    seconds: Math.floor((distance % 60000) / 1000)
  };
  Object.entries(units).forEach(([id, value]) => {
    const node = document.getElementById(id);
    if (node) node.textContent = String(value).padStart(2, '0');
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

const progressBar = document.getElementById('progressBar');
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

document.getElementById('shareButton').addEventListener('click', async () => {
  const shareData = {
    title: 'Nidhi & Jinay — Wedding Invitation',
    text: 'With love and blessings, you are invited to celebrate Nidhi & Jinay on 4 December 2026 in Mumbai.',
    url: window.location.href
  };
  try {
    if (navigator.share) await navigator.share(shareData);
    else if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      const button = document.getElementById('shareButton');
      button.innerHTML = 'LINK COPIED <span>✓</span>';
      setTimeout(() => button.innerHTML = 'SHARE THIS INVITATION <span>↗</span>', 2200);
    } else window.prompt('Copy this invitation link:', window.location.href);
  } catch (error) {
    if (error.name !== 'AbortError') window.prompt('Copy this invitation link:', window.location.href);
  }
});
