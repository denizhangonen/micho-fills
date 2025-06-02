const fieldsContainer = document.getElementById('fields');
const addFieldBtn = document.getElementById('addField');
const saveBtn = document.getElementById('save');

function createFieldRow(field = { tags: '', value: '' }) {
  const div = document.createElement('div');
  div.className = 'field';

  const tagsInput = document.createElement('input');
  tagsInput.type = 'text';
  tagsInput.placeholder = 'Tags (e.g. firstName, name)';
  tagsInput.value = field.tags;

  const valueInput = document.createElement('input');
  valueInput.type = 'text';
  valueInput.placeholder = 'Value to autofill';
  valueInput.value = field.value;

  const removeBtn = document.createElement('button');
  removeBtn.textContent = '🗑️';
  removeBtn.onclick = () => fieldsContainer.removeChild(div);

  div.appendChild(tagsInput);
  div.appendChild(valueInput);
  div.appendChild(removeBtn);
  fieldsContainer.appendChild(div);
}

function loadFields() {
  chrome.storage.sync.get('rules', (data) => {
    let rules = data.rules;

    // Set default fields if no rules exist
    if (!rules || rules.length === 0) {
      rules = [
        { tags: 'first name, firstname, first_name', value: '' },
        { tags: 'last name, lastname, last_name', value: '' },
        { tags: 'full name, fullname, full_name, name', value: '' },
        { tags: 'email, email address, email_address', value: '' },
        { tags: 'phone, phone number, mobile, phone_number', value: '' },
        { tags: 'city, location, town', value: '' },
        { tags: 'country, nation, country_name', value: '' },
        { tags: 'linkedin, linkedin profile, linkedin url', value: '' },
        { tags: 'github, github profile, github url', value: '' },
        { tags: 'cover letter, motivation, message, coverletter', value: '' },
      ];
    }

    rules.forEach((field) => createFieldRow(field));
  });
}

function saveFields() {
  const rules = [];
  const fieldDivs = fieldsContainer.querySelectorAll('.field');
  fieldDivs.forEach((div) => {
    const inputs = div.querySelectorAll('input');
    const tags = inputs[0].value.trim();
    const value = inputs[1].value.trim();
    if (tags && value) {
      rules.push({ tags, value });
    }
  });

  chrome.storage.sync.set({ rules }, () => {
    alert('Saved!');
  });
}

addFieldBtn.addEventListener('click', () => createFieldRow());
saveBtn.addEventListener('click', saveFields);

loadFields();

