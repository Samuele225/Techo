let today = new Date();

// 👉 calendario parte SEMPRE da oggi
let date = new Date(today.getFullYear(), today.getMonth(), 1);

// giorno selezionato = oggi se nello stesso mese
let selectedDay = today.getDate();

let tasks = JSON.parse(localStorage.getItem("tasks") || "{}");

function getKey(d = date, day = selectedDay) {
    return `${d.getFullYear()}-${d.getMonth()}-${day}`;
}

function renderCalendar() {
    const monthNames = [
        "Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno",
        "Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"
    ];

    document.getElementById("month").innerText =
        monthNames[date.getMonth()] + " " + date.getFullYear();

    const daysContainer = document.getElementById("daysContainer");
    daysContainer.innerHTML = "";

    const daysInMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();

    for (let i = 1; i <= daysInMonth; i++) {

        const div = document.createElement("div");
        div.className = "day";

        // evidenzia giorno selezionato
        if (i === selectedDay) div.classList.add("active");

        // evidenzia oggi reale
        if (
            i === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        ) {
            div.classList.add("today");
        }

        div.innerText = i;

        div.onclick = () => {
            selectedDay = i;
            renderCalendar();
            renderTasks();
        };

        daysContainer.appendChild(div);
    }
}

function changeMonth(offset) {
    date.setMonth(date.getMonth() + offset);

    // se cambi mese, vai al giorno 1
    selectedDay = 1;

    renderCalendar();
    renderTasks();
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if (!text) return;

    const key = getKey();

    if (!tasks[key]) tasks[key] = [];

    tasks[key].push({ text, done: false });
    input.value = "";

    renderTasks();
}

function toggleDone(index) {
    const key = getKey();
    tasks[key][index].done = !tasks[key][index].done;
    renderTasks();
}

function deleteTask(index) {
    const key = getKey();
    tasks[key].splice(index, 1);
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    const key = getKey();
    const dayTasks = tasks[key] || [];

    dayTasks.forEach((t, i) => {
        const div = document.createElement("div");
        div.className = "task" + (t.done ? " done" : "");

        div.innerHTML = `
            <span>${t.text}</span>
            <div class="actions">
                <button onclick="toggleDone(${i})">
                    ${t.done ? "↩" : "✔"}
                </button>
                <button onclick="deleteTask(${i})">❌</button>
            </div>
        `;

        list.appendChild(div);
    });
}

// 🚀 avvio automatico su oggi
renderCalendar();
renderTasks();

function clearMemory() {
    if (!confirm("Vuoi eliminare tutte le attività salvate?")) return;

    tasks = {};
    localStorage.removeItem("tasks");

    renderTasks();
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
            .then(() => console.log("SW attivo"))
            .catch(err => console.log("Errore SW:", err));
    });
}