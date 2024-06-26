const main = document.querySelector(".main");
const addNoteBtn = document.querySelector(".addNote");
const addDrawingBtn = document.querySelector(".addDrawing");

addNoteBtn.addEventListener("click", () => addNote());
addDrawingBtn.addEventListener("click", addDrawing);

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => addNote(note));
}

function addDrawing() {
  console.log("drawing");
}

function addNote(text = "") {
  const note = document.createElement("div");
  note.className = "note";

  note.innerHTML = `
  <div class="tools">
      <div class="edit btn"><i class="fas fa-edit"></i></div>
      <div class="delete btn"><i class="fas fa-trash-alt"></i></div>
  </div>

  <div class="body ${text ? "" : "hidden"}"></div>
  <textarea class="${text ? "hidden" : ""}"></textarea>
  `;
  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const body = note.querySelector(".body");
  const textArea = note.querySelector("textarea");

  textArea.value = text;
  body.innerHTML = text;

  textArea.focus();

  deleteBtn.addEventListener("click", () => {
    note.remove();

    updateLS();
  });

  editBtn.addEventListener("click", () => {
    body.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
    if (!textArea.classList.contains("hidden")) {
      textArea.focus();
    }
  });

  textArea.addEventListener("input", (e) => {
    const value = e.target.value;
    console.log(value);

    body.innerHTML = value;

    updateLS();
  });

  main.appendChild(note);
}

function updateLS() {
  const notesText = document.querySelectorAll("textarea");

  const notes = [];

  notesText.forEach((note) => notes.push(note.value));

  localStorage.setItem("notes", JSON.stringify(notes));
}
