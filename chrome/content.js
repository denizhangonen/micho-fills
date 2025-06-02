chrome.storage.sync.get('rules', ({ rules }) => {
  if (!rules || rules.length === 0) return;

  const inputs = document.querySelectorAll('input, textarea');

  inputs.forEach((input) => {
    const name = (input.name || '').toLowerCase();
    const placeholder = (input.placeholder || '').toLowerCase();
    const id = (input.id || '').toLowerCase();
    const ariaLabel = (input.getAttribute('aria-label') || '').toLowerCase();

    rules.forEach(({ tags, value }) => {
      const tagList = tags.split(',').map((t) => t.trim().toLowerCase());

      if (
        tagList.some(
          (tag) =>
            name.includes(tag) ||
            placeholder.includes(tag) ||
            id.includes(tag) ||
            ariaLabel.includes(tag)
        )
      ) {
        input.value = value;
      }
    });
  });
});

