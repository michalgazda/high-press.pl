/*
 * Holiday / break notice bar.
 * To announce a seasonal break (summer, Christmas, holidays), edit the JS object below.
 * Set isActive to true and update the message. The bar shows on every page.
 */
(function () {
  var notice = {
    isActive: false,          // <- set to true to show the notice bar
    message: '',             // text shown in the bar, e.g. "Informujemy, że w dniach 27.07.2026 – 16.08.2026 biuro będzie nieczynne."
  };

  try {
    var bar = document.getElementById('holiday-notice');
    var text = document.getElementById('holiday-text');
    var closeBtn = document.getElementById('holiday-close');

    if (!notice.isActive) return;

    if (bar && text) {
      text.textContent = notice.message;
      bar.style.display = 'block';
      document.body.style.paddingTop = (parseInt(getComputedStyle(document.body).paddingTop || 70) + 40) + 'px';
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        bar.style.display = 'none';
        document.body.style.paddingTop = '';
      });
    }
  } catch (e) { /* no-op */ }
})();