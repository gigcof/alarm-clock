document.addEventListener("DOMContentLoaded", function () {
    const clock = document.getElementById("clock");
    const alarmHr = document.getElementById("alarm-hr");
    const alarmMin = document.getElementById("alarm-min");
    const alarmSec = document.getElementById("alarm-sec");
    const alarmPeriod = document.getElementById("alarm-period");
    const setAlarmButton = document.getElementById("set-alarm");
    const alarmsList = document.getElementById("alarms-list");

    let alarms = [];

    function updateClock() {
        const now = new Date();
        const hours = now.getHours() % 12 || 12;
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const period = now.getHours() >= 12 ? 'PM' : 'AM';

        const currentTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${period}`;
        clock.textContent = currentTime;

        checkAlarms(currentTime);
    }

    function padZero(num) {
        return num < 10 ? '0' + num : num;
    }

    function checkAlarms(currentTime) {
        alarms.forEach(alarm => {
            if (alarm.time === currentTime) {
                alert("Alarm ringing!");
                deleteAlarm(alarm.id);
            }
        });
    }

    function setAlarm() {
        const hr = alarmHr.value;
        const min = alarmMin.value;
        const sec = alarmSec.value;
        const period = alarmPeriod.value;
        console.log(hr, min, sec, period);

        if (!hr || !min || !sec) {
            alert("Please enter a valid time.");
            return;
        }

        const id = Date.now();
        const time = `${padZero(hr)}:${padZero(min)}:${padZero(sec)} ${period}`;
        alarms.push({ id, time });

        displayAlarms();
        clearInputs();
    }

    function displayAlarms() {
        alarmsList.innerHTML = '';
        alarms.forEach(alarm => {
            const alarmItem = document.createElement("div");
            alarmItem.className = "alarm-item";
            alarmItem.innerHTML = `
                <span>${alarm.time}</span>
                <button class="btn btn-danger btn-sm" onclick="deleteAlarm(${alarm.id})">Delete</button>
            `;
            alarmsList.appendChild(alarmItem);
        });
    }

    function deleteAlarm(id) {
        alarms = alarms.filter(alarm => alarm.id !== id);
        displayAlarms();
    }

    function clearInputs() {
        alarmHr.value = '';
        alarmMin.value = '';
        alarmSec.value = '';
        alarmPeriod.value = 'AM';
    }

    setAlarmButton.addEventListener("click", setAlarm);
    setInterval(updateClock, 1000);

    window.deleteAlarm = deleteAlarm; // Make deleteAlarm globally accessible
});
