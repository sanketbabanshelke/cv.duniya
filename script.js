// Generate Resume function
function generateResume() {
    // Get form values
    const name = document.getElementById('name').value;
    const jobtitle = document.getElementById('jobtitle').value;
    const summary = document.getElementById('summary').value;
    const location = document.getElementById('location').value;
    const linkedin = document.getElementById('linkedin').value;
    const experience = document.getElementById('experience').value;
    const achievement = document.getElementById('achievement').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const skills = document.getElementById('skills').value;
    const education = document.getElementById('education').value;
    const interests = document.getElementById('interests').value;

    // Populate resume preview
    document.getElementById('r-name').textContent = name || 'Your Name';
    document.getElementById('r-jobtitle').textContent = jobtitle || 'Job Title';
    document.getElementById('r-location').textContent = location || '';
    document.getElementById('r-summary').textContent = summary || '';
    document.getElementById('r-experience').textContent = experience || '';
    document.getElementById('r-skills').textContent = formatList(skills);
    document.getElementById('r-education').textContent = education || '';
    document.getElementById('r-achievement').textContent = formatList(achievement);
    document.getElementById('r-interests').textContent = formatList(interests);
    document.getElementById('r-email').textContent = email ? `Email: ${email}` : '';
    document.getElementById('r-phone').textContent = phone ? `Phone: ${phone}` : '';
    document.getElementById('r-linkedin').innerHTML = linkedin ? `<a href="${linkedin}" target="_blank">LinkedIn</a>` : '';

    // Show resume preview
    document.getElementById('resume').style.display = 'block';
    document.getElementById('resume').scrollIntoView({ behavior: 'smooth' });
}

// Format text as bullet points
function formatList(text) {
    if (!text) return '';
    return text.split('\n').filter(line => line.trim()).map(line => `• ${line.trim()}`).join('\n');
}

// Download PDF function
function downloadPDF() {
    const resumeElement = document.getElementById('resume');
    
    if (resumeElement.style.display === 'none' || !document.getElementById('r-name').textContent.trim()) {
        alert('Please generate your resume first!');
        return;
    }

    const opt = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(resumeElement).save();
}

// Add real-time preview (optional enhancement)
document.addEventListener('DOMContentLoaded', function() {
    // Auto-scroll to form on page load
    document.querySelector('.form').scrollIntoView({ behavior: 'smooth' });
    
    // Add form validation
    const generateBtn = document.querySelector('button[onclick="generateResume()"]');
    generateBtn.addEventListener('click', function(e) {
        if (!document.getElementById('name').value.trim()) {
            alert('Please enter your name first!');
            e.preventDefault();
            return false;
        }
    });

    // Fix download button position - move it inside container
    const downloadBtn = document.querySelector('button[onclick="downloadPDF()"]');
    const container = document.querySelector('.container');
    downloadBtn.remove();
    container.insertAdjacentHTML('beforeend', 
        '<div style="text-align: center; margin: 20px 0;"><button onclick="downloadPDF()" class="download-btn">📄 Download PDF</button></div>'
    );
});
// लोगो प्रिव्ह्यू बदलण्यासाठी फंक्शन
function loadLogo(event) {
    const image = document.getElementById('r-logo-display'); // रिझ्युमेमधील इमेज टॅग
    image.src = URL.createObjectURL(event.target.files[0]);
    
    // मेमरी वाचवण्यासाठी इमेज लोड झाल्यावर ऑब्जेक्ट URL काढून टाका
    image.onload = function() {
        URL.revokeObjectURL(image.src); 
    }
}