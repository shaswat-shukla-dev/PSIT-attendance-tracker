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

  if (percentage >= 99) {
    msg.style.color = "green";
    msg.textContent = "99% effort, 100% reward — ₹5000 unlocked! 🏳💚";
  } 
  else if(percentage>=97 &&percentage<99)
  {
    msg.style.color="lightgreen";
    msg.textContent= "🏫✨97–99% attendance isn’t just discipline, it’s ₹3000 discipline!";

  }
  else if(percentage>=90)
  {
    msg.style.color="lightgreen";
    msg.textContent="Above 90% attendance — no fines, only smiles!😄";
  }
  else if (percentage >= 85) {
    msg.style.color = "red";
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

  
  const percentage = academic > 0 ? 100-((( absent-delegation)/academic)*100) : NaN;

  document.getElementById('attendancePercentage').textContent = formatPercentage(percentage);
  displayStatus(percentage);
}

function calculateFutureAttendance() {
  const academic = parseFloat(document.getElementById('totalAcademicDays').value) || 0;
  const absent = parseFloat(document.getElementById('totalAbsentDays').value) || 0;
  const delegation = parseFloat(document.getElementById('totalDelegations').value) || 0;
  const futureAcademic = parseFloat(document.getElementById('futureAcademicDays').value) || 0;
  const futureDelegation = parseFloat(document.getElementById('futureDelegations').value) || 0;

  const MINIMUM_ATTENDANCE_PERCENTAGE = 90; // fixed threshold

  const totalFutureAcademic = academic + futureAcademic;

  // Current effective absences (absent - delegation)
  const currentEffectiveAbsences = absent - delegation;

  // Required maximum absences to maintain 90%
  const maxAllowedAbsences = ((100 - MINIMUM_ATTENDANCE_PERCENTAGE) / 100) * totalFutureAcademic;

  // Future holidays you can take = maxAllowedAbsences - currentEffectiveAbsences - futureDelegation
  const allowableHolidays = Math.max(0, Math.floor(maxAllowedAbsences - currentEffectiveAbsences - futureDelegation));

  document.getElementById('futureResult').textContent =
    `You can take nearly ${allowableHolidays} lectures holidays and still maintain ${MINIMUM_ATTENDANCE_PERCENTAGE}% attendance.`;
}


