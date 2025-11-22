const MINIMUM_ATTENDANCE_PERCENTAGE = 90;

function formatPercentage(num) {
  if (isNaN(num)) return "NaN%";
  return num.toFixed(2) + "%";
}

function displayStatus(percentage) {
  const msg = document.getElementById('statusMessage');
  msg.style.color = "#fff";

  if (isNaN(percentage)) {
    msg.textContent = "";
    return;
  }

  if (percentage >= 80) {
    msg.style.color = "lightgreen";
    msg.textContent = "Woof! You are just on the safe side! 🏳💚";
  } 
  else if (percentage >= 70) {
    msg.style.color = "yellow";
    msg.textContent = "You are in trouble! 🚩";
  } 
  else {
    msg.style.color = "red";
    msg.textContent = "🚩 Run for your fines!! 🚩🚩🚩";
  }
}

function calculateAttendance() {
  const academic = parseFloat(document.getElementById('totalAcademicDays').value) || 0;
  const absent = parseFloat(document.getElementById('totalAbsentDays').value) || 0;
  const delegation = parseFloat(document.getElementById('totalDelegations').value) || 0;

  if (absent > academic) {
    alert("Absent days cannot exceed total academic days");
    return;
  }

  const presentDays = academic - absent + delegation;
  const percentage = academic > 0 ? (presentDays / academic) * 100 : NaN;

  document.getElementById('attendancePercentage').textContent = formatPercentage(percentage);
  displayStatus(percentage);
}

function calculateFutureAttendance() {
  const academic = parseFloat(document.getElementById('totalAcademicDays').value) || 0;
  const absent = parseFloat(document.getElementById('totalAbsentDays').value) || 0;
  const delegation = parseFloat(document.getElementById('totalDelegations').value) || 0;
  const futureAcademic = parseFloat(document.getElementById('futureAcademicDays').value) || 0;
  const futureDelegation = parseFloat(document.getElementById('futureDelegations').value) || 0;

  const totalFutureAcademic = academic + futureAcademic;
  const currentPresent = academic - absent + delegation;
  const futurePresent = currentPresent + futureAcademic + futureDelegation;

  const requiredPresent = (MINIMUM_ATTENDANCE_PERCENTAGE / 100) * totalFutureAcademic;
  const allowableDelegations = Math.max(0, futurePresent - requiredPresent);

  document.getElementById('futureResult').textContent =
    `You can take nearly ${Math.floor(allowableDelegations)} Delegations to maintain ${MINIMUM_ATTENDANCE_PERCENTAGE}%`;
}
