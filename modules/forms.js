export function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const showToast = (message, type) => {
        const toastNotification = document.getElementById('toast-notification');
        if (!toastNotification) return;

        const toastMessage = toastNotification.querySelector('.toast-message');
        const toastIcon = toastNotification.querySelector('.toast-icon');
        if (!toastMessage || !toastIcon) return;

        toastMessage.textContent = message;
        toastNotification.className = 'toast-notification'; // Reset classes
        toastNotification.classList.add(type); // 'success' or 'error'
        
        if (type === 'success') {
            toastIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
        } else {
            toastIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
        }

        toastNotification.classList.add('show');
        setTimeout(() => toastNotification.classList.remove('show'), 5000);
    };

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = button.textContent;
        
        button.disabled = true;
        button.textContent = 'Sending...';

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: new FormData(contactForm)
            });
            const result = await response.json();
            if (result.success) {
                showToast('Message sent successfully!', 'success');
                contactForm.reset();
            } else {
                console.error('Error from Web3Forms:', result);
                showToast(result.message || 'An error occurred.', 'error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            showToast('Could not send message. Please try again.', 'error');
        } finally {
            button.disabled = false;
            button.textContent = originalButtonText;
        }
    });
}