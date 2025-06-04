import { db } from './firebase-config.js';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const usersRef = collection(db, "users");

async function loadUsers() {
  const snapshot = await getDocs(usersRef);
  const ul = document.getElementById('userList');
  ul.innerHTML = '';
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const li = document.createElement('li');
    li.textContent = `${data.name} (${data.email})`;
    li.innerHTML += ` <button onclick="deleteUser('${docSnap.id}')">Delete</button>`;
    li.innerHTML += ` <button onclick="editUser('${docSnap.id}', '${data.name}', '${data.email}')">Edit</button>`;
    ul.appendChild(li);
  });
}

async function addUser(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  if (!name || !email) return;

  await addDoc(usersRef, { name, email });
  e.target.reset();
  loadUsers();
}

async function deleteUser(id) {
  if (!confirm('Delete this user?')) return;
  await deleteDoc(doc(db, "users", id));
  loadUsers();
}

async function editUser(id, oldName, oldEmail) {
  const name = prompt('New name:', oldName);
  const email = prompt('New email:', oldEmail);
  if (!name || !email) return;

  await updateDoc(doc(db, "users", id), { name, email });
  loadUsers();
}

document.getElementById('addForm').addEventListener('submit', addUser);
window.deleteUser = deleteUser;
window.editUser = editUser;
loadUsers();
