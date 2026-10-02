const adviceId = document.querySelector('#advice-id');
const adviceText = document.querySelector('#advice-text');
const diceButton = document.querySelector('.dice-button');

async function fetchAdvice() {
  diceButton.disabled = true;

  adviceId.textContent = 'Advice #...';
  adviceText.textContent = 'Loading...';

  try {
    const response = await fetch('https://api.adviceslip.com/advice', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const slip = data.slip;

    if (!slip || !slip.advice) {
      throw new Error('Advice not found');
    }

    adviceId.textContent = `Advice #${slip.id}`;
    adviceText.textContent = `"${slip.advice}"`;
  } catch (error) {
    adviceId.textContent = 'Advice';
    adviceText.textContent = 'Something went wrong. Please try again.';
  } finally {
    diceButton.disabled = false;
  }
}

diceButton.addEventListener('click', fetchAdvice);

fetchAdvice();
