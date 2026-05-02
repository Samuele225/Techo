const monthYear = document.getElementById("monthYear");
const datesContainer = document.getElementById("dates");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentDate = new Date();
let selectedDay = null;

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const today = new Date();

    monthYear.textContent = currentDate.toLocaleDateString("it-IT", {
        month: "long",
        year: "numeric"
    });

    datesContainer.innerHTML = "";

    const startDay = (firstDay === 0) ? 6 : firstDay - 1;

    for (let i = 0; i < startDay; i++) {
        datesContainer.appendChild(document.createElement("div"));
    }

    for (let i = 1; i <= lastDate; i++) {
        const day = document.createElement("div");
        day.textContent = i;

        // oggi
        if (
            i === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            day.classList.add("today");
        }

        // click selezione
       day.addEventListener("click", () => {

    // rimuove selezione e anche "oggi"
    document.querySelectorAll(".dates div").forEach(el => {
        el.classList.remove("selected");
        el.classList.remove("today");
         window.location.href = `todo.html?day=${i}&month=${month + 1}&year=${year}`;
    });

    // seleziona il giorno cliccato
    day.classList.add("selected");

    selectedDay = {
        day: i,
        month: month + 1,
        year: year
    };

    console.log("Selezionato:", selectedDay);
});
        

        datesContainer.appendChild(day);
    }
}

prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}