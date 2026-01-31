const alarms = [];

const pad = (n) => n.toString().padStart(2, '0');

function updateClock() {
  const now = new Date();

  const hours24 = now.getHours();
  const ampm = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;

  const hours = pad(hours12);
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());
  const month = pad(now.getMonth() + 1);
  const date = pad(now.getDate());
  const year = now.getFullYear();

  const currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;
  const currentDate = `${month}/${date}/${year}`;

  const timeEl = document.getElementById('current_time');
  const dateEl = document.getElementById('current_Date');
  if (timeEl) timeEl.textContent = currentTime;
  if (dateEl) dateEl.textContent = currentDate;
}

updateClock();
setInterval(updateClock, 1000);

const addBtn = document.getElementById('add');
if (addBtn) {
  addBtn.addEventListener('click', () => {
    const alarmTime = document.getElementById('time')?.value;
    const alarmDate = document.getElementById('date')?.value;
    const noteText = document.getElementById('note')?.value || '';

    if (!alarmTime || !alarmDate) {
      alert('Set both a date and time!');
      return;
    }

    const alarmDateTime = new Date(`${alarmDate}T${alarmTime}`);
    alarms.push({ time: alarmDateTime, note: noteText, triggered: false });

    const alarm = document.createElement('div');
    alarm.className = 'alarm';
    alarm.style.animation = 'fade-in 0.5s';
    alarm.innerHTML = `
      <div class="alarm-time">${alarmDate} ${alarmTime}</div>
      <div class="alarm-note">${noteText}</div>
      <button class="delete-btn">Delete</button>
    `;

    const delBtn = alarm.querySelector('.delete-btn');
    delBtn.addEventListener('click', () => {
      alarm.style.animation = 'fade-out 0.5s';
      setTimeout(() => alarm.remove(), 500);
      const idx = alarms.findIndex(a => a.time.getTime() === alarmDateTime.getTime() && a.note === noteText);
      if (idx !== -1) alarms.splice(idx, 1);
    });

    const container = document.getElementById('alarms') || document.body;
    container.appendChild(alarm);

    const noteEl = document.getElementById('note');
    if (noteEl) noteEl.value = '';
  });
}

function checkAlarms() {
  const now = new Date();
  alarms.forEach(alarm => {
    if (!alarm.triggered && now >= alarm.time) {
      alarm.triggered = true;
      alert('⏰ Reminder: ' + alarm.note);
    }
  });
}

setInterval(checkAlarms, 1000);
