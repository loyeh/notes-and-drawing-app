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

function addDrawing(image) {
  const drawing = document.createElement("div");
  drawing.className = "drawing";
  drawing.innerHTML = `<div class="tools">
            <div class="toolbox">
              <div class="btn decrease">-</div>
              <span class="btn size">10</span>
              <div class="btn increase">+</div>
              <input class="btn color" id="color" />
              <div class="btn clear">X</div>
            </div>

            <div class="delete btn"><i class="fas fa-trash-alt"></i></div>
          </div>
          <canvas class="canvas" width="200" height="170"></canvas>`;

  const deleteBtn = drawing.querySelector(".delete");
  const myCanvas = drawing.querySelector(".canvas");
  const increaseBtn = drawing.querySelector(".increase");
  const decreaseBtn = drawing.querySelector(".decrease");
  const sizeEL = drawing.querySelector(".size");
  const colorEl = drawing.querySelector("#color");
  const clearEl = drawing.querySelector(".clear");

  const ctx = myCanvas.getContext("2d");

  let size = 10;
  let isPressed = false;
  colorEl.value = "black";
  let color = colorEl.value;
  let x;
  let y;

  myCanvas.addEventListener("mousedown", (e) => {
    isPressed = true;

    x = e.offsetX;
    y = e.offsetY;
  });

  document.addEventListener("mouseup", (e) => {
    isPressed = false;

    x = undefined;
    y = undefined;
  });

  myCanvas.addEventListener("mousemove", (e) => {
    if (isPressed) {
      const x2 = e.offsetX;
      const y2 = e.offsetY;

      drawCircle(x2, y2);
      drawLine(x, y, x2, y2);

      x = x2;
      y = y2;
    }
  });

  function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }

  function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 2;
    ctx.stroke();
  }

  function updateSizeOnScreen() {
    sizeEL.innerText = size;
  }

  increaseBtn.addEventListener("click", () => {
    size += 5;

    if (size > 50) {
      size = 50;
    }

    updateSizeOnScreen();
  });

  decreaseBtn.addEventListener("click", () => {
    size -= 5;

    if (size < 5) {
      size = 5;
    }

    updateSizeOnScreen();
  });

  colorEl.addEventListener("change", (e) => (color = e.target.value));

  clearEl.addEventListener("click", () =>
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
  );

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
