setTimeout(() => {
  chrome.storage.sync.get('rules', ({ rules }) => {
    if (!rules || rules.length === 0) return;

    const inputs = document.querySelectorAll('input, textarea');

    function setNativeValue(element, value) {
      const lastValue = element.value;
      element.value = value;

      const tracker = element._valueTracker;
      if (tracker) {
        tracker.setValue(lastValue);
      }

      element.dispatchEvent(new Event('input', { bubbles: true }));
      element.dispatchEvent(new Event('change', { bubbles: true }));
    }

    inputs.forEach((input) => {
      const name = (input.name || '').toLowerCase();
      const placeholder = (input.placeholder || '').toLowerCase();
      const id = (input.id || '').toLowerCase();
      const ariaLabel = (input.getAttribute('aria-label') || '').toLowerCase();
      let labelText = '';

      const label = document.querySelector(`label[for="${input.id}"]`);
      if (label) {
        labelText = label.innerText.toLowerCase();
      }

      rules.forEach(({ tags, value }) => {
        const tagList = tags.split(',').map((t) => t.trim().toLowerCase());

        if (
          tagList.some(
            (tag) =>
              name.includes(tag) ||
              placeholder.includes(tag) ||
              id.includes(tag) ||
              ariaLabel.includes(tag) ||
              labelText.includes(tag)
          )
        ) {
          setNativeValue(input, value);
        }
      });
    });
  });
}, 2000); // Delay 1 second

