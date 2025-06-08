const form = document.getElementById('hungerForm');
const steps = form.querySelectorAll('.step');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resultDiv = document.getElementById('result');
let currentStep = 0;

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
  });
  prevBtn.disabled = index === 0;
  nextBtn.textContent = (index === steps.length - 1) ? 'Get Result' : 'Next';
  resultDiv.style.display = 'none';
  nextBtn.disabled = false;
  // Focus first input on step
  const firstInput = steps[index].querySelector('input[type="radio"]');
  if (firstInput) firstInput.focus();
}

function validateStep(index) {
  const radios = steps[index].querySelectorAll('input[type="radio"]');
  return Array.from(radios).some(r => r.checked);
}

prevBtn.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
    nextBtn.disabled = false; // re-enable Next button when going back
  }
});

nextBtn.addEventListener('click', () => {
  if (!validateStep(currentStep)) {
    alert('Please select an answer to continue.');
    return;
  }
  if (currentStep === steps.length - 1) {
    let totalScore = 0;
    const maxRawScore = 29; // Correct max total score for your steps
    steps.forEach(step => {
      const checked = step.querySelector('input[type="radio"]:checked');
      totalScore += parseInt(checked.value, 10);
    });

    // Normalize totalScore to a 1-10 scale:
    let hungerScore = Math.round((totalScore / maxRawScore) * 9) + 1;

    let advice = '';
    if (hungerScore >= 8) {
      advice = "You are very hungry. It's best to eat a full meal now.";
    } else if (hungerScore >= 5) {
      advice = "You feel somewhat hungry. Having a healthy snack or small meal is recommended.";
    } else if (hungerScore >= 3) {
      advice = "You might need a light snack or drink to stay comfortable.";
    } else {
      advice = "You are not hungry right now. No need to eat or snack.";
    }

    resultDiv.textContent = `Your Hunger Score: ${hungerScore} — ${advice}`;
    resultDiv.style.display = 'block';
    nextBtn.disabled = true;
  } else {
    currentStep++;
    showStep(currentStep);
  }
});

showStep(currentStep);
