const form = document.getElementById('fullnessForm');
const resultDiv = document.getElementById('result');
const resetBtn = document.getElementById('resetBtn');

form.addEventListener('submit', e => {
  e.preventDefault();
  const selected = form.fullness.value;
  if (selected === '') {
    alert('Please select an option.');
    return;
  }
  const score = parseInt(selected, 10);
  let advice = '';

  if (score <= 2) {
    advice = "You are quite empty or hungry. It might be a good time to eat something nourishing.";
  } else if (score <= 4) {
    advice = "You feel comfortable and satisfied. Listen to your body for when to eat next.";
  } else if (score <= 6) {
    advice = "You are quite full. Consider stopping eating to honor your fullness.";
  } else {
    advice = "You are uncomfortably full. Try to eat slower and stop before feeling this way next time.";
  }

  resultDiv.textContent = `Fullness Level: ${score + 1} — ${advice}`;
  resultDiv.style.display = 'block';
});

resetBtn.addEventListener('click', () => {
  form.reset();
  resultDiv.style.display = 'none';
});
