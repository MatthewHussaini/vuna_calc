/**
 * VUNA-Calc — UI wiring
 * Reads from / writes to the DOM. Calls evaluateExpression() and percentOf()
 * which are loaded from calculator.js via a <script> tag before this file.
 */

(function () {
  'use strict';

  const display = document.getElementById('display');
  let expression = '';
  let justEvaluated = false;
  let feedbackTimer = null;

  function updateDisplay(value) {
    display.textContent = value || '0';
  }

  function showError(msg) {
    display.textContent = msg;
    display.classList.add('error');
    if (feedbackTimer) {
      clearTimeout(feedbackTimer);
    }
    feedbackTimer = setTimeout(function () {
      display.classList.remove('error');
      expression = '';
      updateDisplay('');
    }, 1500);
  }

  function handleButton(value) {
    if (value === 'AC') {
      expression = '';
      justEvaluated = false;
      updateDisplay('');
      return;
    }

    if (value === 'CE') {
      expression = expression.slice(0, -1);
      updateDisplay(expression);
      return;
    }

    if (value === '%') {
      // Custom feature: calculate what % the current number is of the previous number
      // e.g. user types "25%200" → 25 is what % of 200?
      const parts = expression.split('%');
      if (parts.length === 2 && parts[0] !== '' && parts[1] !== '') {
        try {
          const result = percentOf(parseFloat(parts[0]), parseFloat(parts[1]));
          expression = String(result);
          updateDisplay(expression);
          justEvaluated = true;
        } catch (err) {
          void err;
          showError('Error');
        }
      } else {
        expression += '%';
        updateDisplay(expression);
      }
      return;
    }

    if (value === '=') {
      if (expression === '') { return; }
      try {
        const result = evaluateExpression(expression);
        // Avoid floating-point noise (e.g. 0.1+0.2)
        expression = String(parseFloat(result.toFixed(10)));
        updateDisplay(expression);
        justEvaluated = true;
      } catch (err) {
        void err;
        showError('Error');
      }
      return;
    }

    // If last action was = and user presses a number, start fresh
    if (justEvaluated && /[0-9.]/.test(value)) {
      expression = '';
    }
    justEvaluated = false;

    expression += value;
    updateDisplay(expression);
  }

  // Button click events
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      handleButton(btn.dataset.value);
    });
  });

  // Keyboard support
  document.addEventListener('keydown', function (e) {
    const map = {
      'Enter': '=', 'Backspace': 'CE', 'Escape': 'AC',
      '+': '+', '-': '-', '*': '*', '/': '/',
      '0':'0','1':'1','2':'2','3':'3','4':'4',
      '5':'5','6':'6','7':'7','8':'8','9':'9',
      '.': '.', '%': '%',
    };
    if (map[e.key] !== undefined) {
      e.preventDefault();
      handleButton(map[e.key]);
    }
  });

  // Initialise
  updateDisplay('');
}());
