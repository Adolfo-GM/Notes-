const buttons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.content-section');
const textarea = document.getElementById('note-input');
const noteDisplay = document.getElementById('note-display');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let notes = [];
let currentIndex = 0;

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes() {
  const savedNotes = localStorage.getItem('notes');
  if (savedNotes) {
    notes = JSON.parse(savedNotes);
  }
}

function updateNoteDisplay() {
  if (notes.length > 0) {
    noteDisplay.textContent = notes[currentIndex];
  } else {
    noteDisplay.textContent = 'Your note will appear here.';
  }
}

textarea.addEventListener('input', () => {
  notes = textarea.value.split('\n');
  saveNotes();
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateNoteDisplay();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentIndex < notes.length - 1) {
    currentIndex++;
    updateNoteDisplay();
  }
});

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const targetSection = button.getAttribute('data-target');
    sections.forEach(section => section.classList.remove('active-content'));
    document.getElementById(targetSection).classList.add('active-content');
  });
});

window.addEventListener('load', () => {
  loadNotes();
  textarea.value = notes.join('\n');
  updateNoteDisplay();
});