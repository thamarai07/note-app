import React from "react";

export default function Home() {
  return (
    <div className="container">


      <header >
        <div >
          <h1 >📝 SmartNote</h1>
          <span >React + Redux</span>
        </div>
      </header>

      <main >
        <section >
          <h2 >Your Smart, Minimal Note-Taking App</h2>
          <p >
            Built with React.js & Redux, SmartNote helps you pin, organize, and manage notes with a cool UI and fast performance.
          </p>
        </section>

        <section>
          <h3 >🚀 Features</h3>
          <ul >
            <li >
              ✅ <strong>Add, Edit & Delete:</strong> Create and manage notes easily.
            </li>
            <li >
              📌 <strong>Pin Notes:</strong> Keep important notes at the top.
            </li>
            <li >
              🗑️ <strong>Trash System:</strong> Soft-delete with restore option.
            </li>
            <li >
              🔍 <strong>Search & Filter:</strong> Instantly locate your notes.
            </li>
            <li >
              💾 <strong>localStorage:</strong> Persistent notes even after refresh.
            </li>
            <li >
              🎨 <strong>Responsive UI:</strong> Built with Tailwind CSS & custom effects.
            </li>
          </ul>
        </section>

        <section>
          <h3 >🛠 Tech Stack</h3>
          <div >
            <span >React.js</span>
            <span >Redux</span>
            <span >localStorage</span>
            <span >Tailwind CSS</span>
            <span >Framer Motion</span>
            <span >SCSS (optional)</span>
          </div>
        </section>

        <section>
          <h3 >📦 Getting Started</h3>
          <pre >
            git clone https://github.com/yourusername/smartnote.git
            cd smartnote
            npm install
            npm start
          </pre>
        </section>

        <section>
          <h3 >🙌 Author</h3>
          <p >
            Made with 💙 by <strong>Thamarai Kannan B</strong> <br />
            <a href="https://github.com/thamarai07/" target="_blank" class="text-indigo-500 underline">GitHub</a> |
            <a href="https://www.linkedin.com/in/thamarai-kannan-2181881a0/" target="_blank" class="text-indigo-500 underline">LinkedIn</a>
          </p>
        </section>


      </main>


    </div>
  );
}
