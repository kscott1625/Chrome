let myLeads = [];

let oldLeads = [];

const inputEl = document.getElementById('input-el');

const inputBtn = document.getElementById('input-btn');

const ulEl = document.getElementById('ul-el');

const deleteBtn = document.getElementById('delete-btn');

const saveBtn = document.getElementById('tab-btn');

localStorage.clear();

const leadsLocalStorage = JSON.parse(localStorage.getItem('myLeads'));

if (leadsLocalStorage) {
  myLeads = leadsLocalStorage;
  render(myLeads);
}

saveBtn.addEventListener('click', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    render(myLeads);
  });
});
function render(leads) {
  let listItem = '';

  for (let r = 0; r < leads.length; r++) {
    listItem += `<li>
      <a target='_blank' href='${leads[r]}'> ${leads[r]}
      </a>
      </li>`;
  }

  ulEl.innerHTML = listItem;
}

deleteBtn.addEventListener('dblclick', function () {
  console.log('double clicked!');
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener('click', function () {
  myLeads.push(inputEl.value);
  inputEl.value = '';
  localStorage.setItem('myLeads', JSON.stringify(myLeads));

  render(myLeads);
});
