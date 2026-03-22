const allFilterBtn = document.getElementById('All-filter-btn');
const openFilterBtn = document.getElementById('Open-filter-btn');
const closedFilterBtn = document.getElementById('Closed-filter-btn');

const allSection = document.getElementById('All-section');
const openSection = document.getElementById('Open-section');
const closedSection = document.getElementById('Closed-section');

const spinner = document.getElementById('spinner');

let number = document.getElementById('num');

function toggle(name) {
  spinner.classList.remove('hidden');

  setTimeout(() => {   
    
    allFilterBtn.classList.remove('btn-primary');
    openFilterBtn.classList.remove('btn-primary');
    closedFilterBtn.classList.remove('btn-primary');
  
    allFilterBtn.classList.add('btn-soft');
    openFilterBtn.classList.add('btn-soft');
    closedFilterBtn.classList.add('btn-soft');
  
    const selectedBtn = document.getElementById(name)
    selectedBtn.classList.remove('btn-soft');
    selectedBtn.classList.add('btn-primary');
  
    if(name == 'Open-filter-btn'){
      allSection.classList.add('hidden')
      closedSection.classList.add('hidden')
      openSection.classList.remove('hidden')
      number.innerText = openSection.childElementCount;
    }
    else if(name == 'All-filter-btn'){
      allSection.classList.remove('hidden')
      openSection.classList.add('hidden')
      closedSection.classList.add('hidden')
      number.innerText = allSection.childElementCount;
    }
    else if(name == 'btn-search'){
      allSection.classList.remove('hidden')
      openSection.classList.add('hidden')
      closedSection.classList.add('hidden')
      allFilterBtn.classList.remove('btn-soft');
      allFilterBtn.classList.add('btn-primary');
    }
    else{
      allSection.classList.add('hidden')
      openSection.classList.add('hidden')
      closedSection.classList.remove('hidden')
      number.innerText = closedSection.childElementCount;
    }
    spinner.classList.add('hidden');
  }, 200);
}

const loadIssues = () => {
  spinner.classList.remove('hidden');

  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res => res.json())
    .then(json => {
      displayIssues(json.data);
      number.innerText = json.data.length;
    })
    .finally(() => {
      spinner.classList.add('hidden');
    });
};

const displayIssues = (Issues) => {
  allSection.innerHTML = "";
  openSection.innerHTML = "";
  closedSection.innerHTML = "";
  Issues.forEach((Issue) => {
    let card = document.createElement('div');
    card.className = ""
    if(Issue.status == 'open'){
      card.innerHTML =`
      <div onclick="loadDetails(${Issue.id})" id="Job-container-${Issue.id}" class="border-t-3 border-green-500 rounded-lg shadow-md p-8 h-105">
        <div class="flex justify-between items-center">
          <img src="assets/Open-Status.png" alt="" class="w-6 h-6">
          <p class="badge badge-dash badge-error rounded-full px-4 py-2 text-xs">${Issue.priority}</p>
        </div>
        <br>
        <h1 class="text-xl font-bold">${Issue.title}</h1>
        <br>
        <p>
          ${Issue.description}
        </p>
        <br>
        <div class="flex gap-2">
          ${Issue.labels.map(label => `<p class="badge badge-warning">${label}</p>`).join('')}
        </div>
        <br>
        <hr class="text-gray-300">
        <br>
        <div class="text-gray-500 flex flex-col items-center md:flex-row justify-between">
          <p class="text-xs">#${Issue.id} by ${Issue.author}</p>
          <p class="text-xs">${new Date(Issue.createdAt).toLocaleDateString()}</p>
        </div>
        <br>
        <div class="text-gray-500 flex flex-col items-center md:flex-row justify-between">
          <p class="text-xs">Assignee:${Issue.assignee}</p>
          <p class="text-xs">Updated:${new Date(Issue.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
      `
      allSection.appendChild(card);
      const clone = card.cloneNode(true);
      openSection.appendChild(clone);
    }
    else{
      card.innerHTML =`
      <div onclick="loadDetails(${Issue.id})" id="Job-container-${Issue.id}" class="border-t-3 border-purple-500 rounded-lg shadow-md p-8 h-105">
      <div class="flex justify-between items-center">
      <img src="assets/Closed- Status .png" alt="" class="w-6 h-6">
      <p class="badge badge-dash badge-error rounded-full px-4 py-2 text-xs">${Issue.priority}</p>
      </div>
      <br>
      <h1 class="text-xl font-bold">${Issue.title}</h1>
      <br>
      <p>
      ${Issue.description}
      </p>
      <br>
      <div class="flex gap-2">
      ${Issue.labels.map(label => `<p class="badge badge-warning">${label}</p>`).join('')}
      </div>
      <br>
      <hr class="text-gray-300">
      <br>
      <div class="text-gray-500 flex flex-col items-center md:flex-row justify-between">
      <p class="text-xs">#${Issue.id} by ${Issue.author}</p>
      <p class="text-xs">${new Date(Issue.createdAt).toLocaleDateString()}</p>
      </div>
      <br>
      <div class="text-gray-500 flex flex-col items-center md:flex-row justify-between">
      <p class="text-xs">Assignee:${Issue.assignee}</p>
      <p class="text-xs">Updated:${new Date(Issue.updatedAt).toLocaleDateString()}</p>
      </div>
      </div>
      `
      allSection.appendChild(card);
      const clone = card.cloneNode(true);
      closedSection.appendChild(clone);
    }
  })
}

const loadDetails = async (id)=>{
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
  const res = await fetch(url)
  const details = await res.json()
  displayDetails(details.data);
}

const displayDetails = (detail)=>{
  const modal = document.createElement('dialog');
  modal.id = `my_modal_${detail.id}`;
  modal.className = "modal modal-bottom sm:modal-middle";
  if(detail.status == 'open'){
    modal.innerHTML =`
      <div class="modal-box p-10">
        <h3 class="text-lg font-bold">${detail.title}</h3>
        <br>
        <ul class="flex gap-7">
          <li class="list-none badge badge-success rounded-full py-3 px-4">Open</li>
          <li class="list-disc">Opened by ${detail.author}</li>
          <li class="list-disc">${new Date(detail.createdAt).toLocaleDateString()}</li>
        </ul>
        <br>
        <div class="flex gap-2">
         ${detail.labels.map(label => `<p class="badge badge-warning">${label}</p>`).join('')}
        </div>
        <br>
        <p class="py-4">
          ${detail.description}
        </p>
        <br>
        <div class="bg-gray-200 rounded px-5 py-3">
        <div class="text-xs flex justify-between">
          <p>Assignee:</p>
          <p>Priority:</p>
        </div>
        <div class="flex justify-between">
          <p>${detail.assignee}</p>
          <p class="badge badge-dash badge-error rounded-full px-4 py-2 text-xs">
            ${detail.priority}
          </p>
        </div>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn btn-primary">Close</button>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.showModal();
  }
  else{
    modal.innerHTML =`
      <div class="modal-box p-10">
        <h3 class="text-lg font-bold">${detail.title}</h3>
        <br>
        <ul class="flex gap-7">
          <li class="list-none badge badge-error rounded-full py-3 px-4">Closed</li>
          <li class="list-disc">Opened by ${detail.author}</li>
          <li class="list-disc">${new Date(detail.createdAt).toLocaleDateString()}</li>
        </ul>
        <br>
        <div class="flex gap-2">
         ${detail.labels.map(label => `<p class="badge badge-warning">${label}</p>`).join('')}
        </div>
        <br>
        <p class="py-4">
          ${detail.description}
        </p>
        <br>
        <div class="bg-gray-200 rounded px-5 py-3">
        <div class="text-xs flex justify-between">
          <p>Assignee:</p>
          <p>Priority:</p>
        </div>
        <div class="flex justify-between">
          <p>${detail.assignee}</p>
          <p class="badge badge-dash badge-error rounded-full px-4 py-2 text-xs">
            ${detail.priority}
          </p>
        </div>
        </div>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn btn-primary">Close</button>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.showModal();
  }
  return
}

loadIssues();


document.getElementById('btn-search').addEventListener('click', function () {
  const input = document.getElementById('input-search');
  const searchValue = input.value.trim();

  spinner.classList.remove('hidden');

  if (searchValue === "") {
    loadIssues();
    return;
  }

  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
    .then(res => res.json())
    .then(data => {
      let search = data.data;
      displayIssues(search);
      number.innerText = search.length;
    })
    .finally(() => {
      spinner.classList.add('hidden');
    });
});