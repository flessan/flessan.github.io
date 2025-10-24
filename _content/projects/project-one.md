---
title: 'Code & Text Cleaner Pro'
description: 'A no-nonsense, offline-friendly web toolbox for cleaning, converting, and managing text and code directly in your browser.'
image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzEyODZ8MHwxfGFsbHwxfHx8fHx8fHwxNjE3MjE1NjU4&ixlib=rb-1.2.1&q=80&w=1080'
detailImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNzEyODZ8MHwxfGFsbHwxfHx8fHx8fHwxNjE3MjE1NjU4&ixlib=rb-1.2.1&q=80&w=1080'
technologies: ['JavaScript', 'HTML5', 'CSS3']
---

## Overview
**Code & Text Cleaner Pro** is a no-nonsense, offline-friendly web toolbox that helps you **clean up, convert, and manage text and code** (HTML, CSS, JS) fast—right in your browser, no internet needed. Just open it and go.

> 💡 The 5th project by [**Thio Saputra**](https://flessan.pages.dev)  
> Motto: **ATM — Amati, Tiru, Modifikasi** *(Observe, Copy, Modify)*

---

### Key Features

#### 📝 Text Tools  
- Convert text to **lowercase**, **UPPERCASE**, or **Title Case**  
- Zap extra spaces and blank lines  
- *Prettify JSON* (auto-indent + clean formatting)  
- Auto-count **words** and **characters**  
- Save, load, or reset your work using `localStorage`  
- Drag & drop `.txt` or `.md` files straight into the editor  

#### 💻 Code Cleaner  
- *Minify HTML*, *Clean CSS*, and *Clean JS*  
- Auto-remove code comments  
- Basic HTML pretty-printing (nicer indentation)  
- Live preview in a secure sandboxed iframe  
- One-click copy or export of results  

#### 🔡 HTML Decoder  
- Turn HTML entities into readable text—and vice versa.  
- Manual encode/decode toggle  
- Auto-detect and decode on the fly  
- Copy decoded/encoded output with a single click  

#### 🔀 Combine Tool  
- Merge separate HTML, CSS, and JS snippets into one neat HTML file.  
- Auto-injects CSS into `<style>` and JS into `<script>` tags  
- Preview, copy, or download the final `.html` file  

#### ✂️ Split Tool  
- Break down messy HTML files that bundle CSS and JS inside.  
- Auto-split into three clean files: HTML, CSS, JS  
- Copy or download each part individually  

### Technologies Used
- **Frontend**: Pure HTML5 for structure and CSS3 featuring a modern glassmorphism design.
- **Logic**: Implemented with clean, modular Vanilla JavaScript.
- **Storage**: Utilizes the LocalStorage API for auto-saving and offline data persistence.
- **Security**: Employs a sandboxed iframe to provide a secure environment for live code previews.

---

## 🎨 Design & UI

Built with a **Modern Glassmorphism** vibe:
- Soft base colors: `#f5f7ff` & `#f0f2ff`  
- Purple/indigo accents (`#6366f1`, `#a855f7`)  
- Subtle shadows + transparent blur layers  
- Smooth fade, slide, and hover animations  
- Fully responsive—from desktop to mobile  

---

## ⚙️ File Structure

- `index.html` → Main layout & structure  
- `style.css` → Glassmorphism styling (inline or external)  
- `sc.js` → Core logic (tabs, transforms, combine, split, etc.)

---

## 📦 How to Use It

1. Open `index.html` in any browser (**works offline!**)  
2. Pick your tool: **Text / Code / Decoder / Combine / Split**  
3. Paste your content or drag & drop a file  
4. Hit an action button (e.g., `Minify`, `Decode`, `Split`)  
5. Copy, save, or download the result  

---

## 💾 Auto-Save Magic

> Every 5 seconds, your text gets saved to `localStorage`. Close the tab or refresh? No worries—your last session loads right back up.

---

## 🔐 Privacy & Security

- **100% runs in your browser**—zero server contact  
- Your data never leaves your machine  
- Previews run in a locked-down **sandboxed iframe** for safety  

---

## 👨‍💻 Made by

**Thio Saputra**  
> Web dev • Creator • Lifelong learner who loves the “ATM” method  
> 🌐 [flessan.pages.dev](https://flessan.pages.dev)

---

## 🧭 License

This project is **free to use, learn from, and tweak** for personal stuff. Feel free to copy, remix, or add new features—as long as you credit the original creator.

---

## 🐱‍👤 GitHub Project

🔗 [the source-code](https://github.com/frgdps/fles/tree/main/ctc)

---

> “Clean your code, tidy your text, clear your mind.”  
> — *Code & Text Cleaner*

---

**Current Version**: Beta 1.8.1  
**Last Updated**: 2025  
**Maintained by**: Rekaluna Development Team
