const main = document.querySelector(".main");
const container = document.querySelector(".container");
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

function addDrawing(image) {
  const drawing = document.createElement("div");
  drawing.className = "drawing";
  drawing.innerHTML = `<div class="tools">
            <div class="toolbox">
              <div class="btn" id="decrease">-</div>
              <span class="btn" id="size">10</span>
              <div class="btn" id="increase">+</div>
              <input class="btn" type="color" id="color" />
              <div class="btn" id="clear">X</div>
            </div>

            <div class="delete btn"><i class="fas fa-trash-alt"></i></div>
          </div>
          <canvas class="canvas" width="200" height="170"></canvas>`;

  const deleteBtn = drawing.querySelector(".delete");
  const myCanvas = document.querySelector(".canvas");

  console.log(myCanvas);
  deleteBtn.addEventListener("click", () => {
    drawing.remove();

    updateLS();
  });

  container.appendChild(drawing);
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

  container.appendChild(note);
}

function updateLS() {
  const notesText = document.querySelectorAll("textarea");

  const notes = [];

  notesText.forEach((note) => notes.push(note.value));

  localStorage.setItem("notes", JSON.stringify(notes));
}
