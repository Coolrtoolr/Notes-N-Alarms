let alarms = [];

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let date = now.getDate();
  let month = now.getMonth();
  let year = now.getFullYear();

  // Figure out AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // if 0, make it 12

  // Add leading zeros
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');
  date = date.toString().padStart(2, '0');
  month = month.toString().padStart(1, '0');
  year = year.toString().padStart(2, '1')

  const currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;
  const currentDate = `${month + 1}/${date}/${year}`

  document.getElementById("current_time").textContent = currentTime;
   document.getElementById("current_Date").textContent = currentDate;
}

updateClock();
setInterval(updateClock, 1000);

document.getElementById("add").onclick = function addReminder() {
    const alarmTime = document.getElementById("time").value;
    const alarmDate = document.getElementById("date").value;
    const noteText = document.getElementById("note").value;

    if (!alarmTime || !alarmDate) {
        alert("Set both a date and time!");
        return;
    }

    const alarmDateTime = new Date(`${alarmDate}T${alarmTime}`);
    alarms.push({ time: alarmDateTime, note: noteText, triggered: false });

    const alarm = document.createElement("div");
    alarm.style.animation = "fade-in 0.5s";
    alarm.classList.add("alarm");
    alarm.innerHTML = `
        <div class="alarm-note">${noteText}</div> <br>
        <div class="alarm-time">${alarmDate} ${alarmTime}</div> <br>
        <button class="delete-btn">Delete</button>
    `;

    alarm.querySelector(".delete-btn").onclick = function() {
        alarm.style.animation = "fade-out 0.5s";
        setTimeout(() => alarm.remove(), 500);
    };

    document.body.appendChild(alarm);

    document.getElementById("note").value = "";
};

function checkAlarms() {
    const now = new Date();

    alarms.forEach(alarm => {
        if (!alarm.triggered && now >= alarm.time) {
            alarm.triggered = true;
            alert("⏰ Reminder: " + alarm.note);
        }
    });
}

setInterval(checkAlarms, 1000);
