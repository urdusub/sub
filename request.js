document.querySelectorAll('.mugi-type-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.mugi-type-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

document.getElementById('mugi-req-submit')?.addEventListener('click', function() {
  const name = document.getElementById('mugi-req-name').value.trim();
  if (!name) { alert('Anime ka naam toh likho!'); return; }
  
  const type = document.querySelector('.mugi-type-btn.active')?.dataset.type || 'TV Series';
  const detail = document.getElementById('mugi-req-detail').value.trim();
  const contact = document.getElementById('mugi-req-contact').value.trim();

  // Yahan apna backend/email/Discord webhook call kar sako
  console.log({ name, type, detail, contact });

  document.getElementById('mugi-req-success').style.display = 'block';
  this.disabled = true;
});