document.addEventListener('DOMContentLoaded', () => {
    const createForm = document.getElementById('create-form');
    const retrieveForm = document.getElementById('retrieve-form');
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const generatedIdDisplay = document.getElementById('generated-id');
    const copyBtn = document.getElementById('copy-btn');
    const capsuleContent = document.getElementById('capsule-content');
    const capsuleIdInput = document.getElementById('capsule-id');

    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('unlock-date').min = now.toISOString().slice(0, 16);

    const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    createForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const message = document.getElementById('message').value;
        const unlockDate = document.getElementById('unlock-date').value;

        try {
            const response = await fetch('/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message, unlockDate })
            });

            const data = await response.json();

            if (response.ok) {
                generatedIdDisplay.textContent = data.id;
                successModal.classList.remove('hidden');
                void successModal.offsetWidth;
                successModal.classList.add('visible');
                createForm.reset();
            } else {
                alert(data.error || 'Failed to create capsule');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('An error occurred. Please try again.');
        }
    });

    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('visible');
        setTimeout(() => {
            successModal.classList.add('hidden');
        }, 300);
    });

    copyBtn.addEventListener('click', () => {
        const id = generatedIdDisplay.textContent;
        navigator.clipboard.writeText(id).then(() => {
            const originalIcon = copyBtn.textContent;
            copyBtn.textContent = '✅';
            setTimeout(() => {
                copyBtn.textContent = originalIcon;
            }, 2000);
        });
    });

    const loadCapsule = async (id) => {
        try {
            const response = await fetch(`/capsule/${id}`);
            const data = await response.json();

            capsuleContent.classList.remove('hidden');

            if (response.ok) {
                capsuleContent.innerHTML = `
                    <div class="card">
                        <div class="status-badge unlocked">UNLOCKED</div>
                        <h2 style="color: var(--light-blue);">${escapeHtml(data.title)}</h2>
                        <div class="capsule-message">${escapeHtml(data.message)}</div>
                        <div class="timestamp">
                            Unlocked: ${new Date(data.unlockDate).toLocaleString()}
                        </div>
                    </div>
                `;
            } else if (response.status === 403) {
                capsuleContent.innerHTML = `
                    <div class="card">
                        <div class="status-badge locked">LOCKED</div>
                        <h2 style="color: var(--light-blue);">${escapeHtml(data.title)}</h2>
                        <p style="text-align: center; margin: 2rem 0; color: var(--text-dim);">
                            This capsule is sealed until<br>
                            <strong style="color: var(--light-blue); font-size: 1.3rem;">
                                ${new Date(data.unlockDate).toLocaleString()}
                            </strong>
                        </p>
                    </div>
                `;
            } else {
                capsuleContent.innerHTML = `
                    <div class="card" style="text-align: center;">
                        <h2 style="color: var(--light-blue);">NOT FOUND</h2>
                        <p>No capsule found with ID: ${escapeHtml(id)}</p>
                    </div>
                `;
            }
        } catch (err) {
            console.error('Error:', err);
            capsuleContent.innerHTML = `
                <div class="card" style="text-align: center;">
                    <h2 style="color: var(--light-blue);">ERROR</h2>
                    <p>Failed to retrieve capsule. Please try again.</p>
                </div>
            `;
        }
    };

    retrieveForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = capsuleIdInput.value.trim();
        if (id) {
            loadCapsule(id);
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get('id');
    if (idFromUrl) {
        capsuleIdInput.value = idFromUrl;
        loadCapsule(idFromUrl);
    }
});
