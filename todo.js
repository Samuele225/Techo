const params = new URLSearchParams(window.location.search);

const day = params.get("day");
const month = params.get("month");
const year = params.get("year");

const dateTitle = document.getElementById("dateTitle");
const taskInput = document.getElementById("taskInput");
const timeInput = document.getElementById("timeInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const list = document.getElementById("list");

const key = `tasks-${day}-${month}-${year}`;

dateTitle.textContent = `Attività: ${day}/${month}/${year}`;

let tasks = JSON.parse(localStorage.getItem(key)) || [];

function sortTasks() {
    tasks.sort((a, b) => a.time.localeCompare(b.time));
}

function render() {
    list.innerHTML = "";

    sortTasks();

    tasks.forEach((t, index) => {

        const div = document.createElement("div");

        div.innerHTML = `
            <span class="${t.done ? "done" : ""}">
                ${t.time} - ${t.text}
            </span>

            <div>
                <button class="doneBtn" data-i="${index}">✔</button>
                <button class="deleteBtn" data-i="${index}">🗑</button>
            </div>
        `;

        list.appendChild(div);
    });

    // ✔ fatto
    document.querySelectorAll(".doneBtn").forEach(btn => {
        btn.onclick = (e) => {
            const i = e.target.dataset.i;
            tasks[i].done = !tasks[i].done;
            save();
        };
    });

    // 🗑 elimina singolo
    document.querySelectorAll(".deleteBtn").forEach(btn => {
        btn.onclick = (e) => {
            const i = e.target.dataset.i;
            tasks.splice(i, 1);
            save();
        };
    });
}

function save() {
    localStorage.setItem(key, JSON.stringify(tasks));
    render();
}

addBtn.onclick = () => {

    if (!taskInput.value || !timeInput.value) return;

    tasks.push({
        text: taskInput.value,
        time: timeInput.value,
        done: false
    });

    taskInput.value = "";
    timeInput.value = "";

    save();
};

clearBtn.onclick = () => {

    if (!confirm("Eliminare tutto?")) return;

    tasks = [];
    localStorage.removeItem(key);

    render();
};

render();