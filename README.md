# 📝 To-Do List App

A simple and functional To-Do List web application built using **Node.js**, **Express**, **EJS**, and **TailwindCSS (via CDN)**. It allows users to add, edit, delete, and view tasks in a clean, server-rendered UI.

All task data is stored as individual text files inside a `tasks/` directory located in the root folder of the project, simulating file-based persistent storage without using a database.

---

## ✨ Features

- ✅ Add tasks with title and description  
- ✏️ Edit task title and description  
- 🗑️ Delete tasks  
- 📋 View all tasks in a styled layout  
- 🧠 Server-side rendering using EJS  
- 🎨 Responsive UI using TailwindCSS (via CDN)  
- 💾 File-based storage with task files in `tasks/` folder  

---

## 🛠 Tech Stack

| Layer         | Technology                   |
|---------------|-------------------------------|
| Backend       | Node.js, Express.js           |
| Templating    | EJS                           |
| Styling       | TailwindCSS (via CDN)         |
| Storage       | Text files in `/tasks` folder |
| Runtime       | Node.js                       |

---

## ⚠️ Note

This app uses **TailwindCSS via CDN**, so an **active internet connection is required** to properly load and display the UI styles.

---

## 💾 File-Based Storage

- Task data is stored as **text files**, one per task  
- Files are saved inside the `tasks/` directory at the root  
- Each file contains the task title and description  
- File read/write is handled via Node.js `fs` module  

---