# ByteCV

ByteCV is a powerful and intuitive web-based resume builder designed to help individuals craft professional resumes effortlessly. The platform offers live previews, resume scoring, custom sections, and the ability to download Word-format resumes instantly.

🌐 **Live Site**: [https://bytecv.vercel.app/](https://bytecv.vercel.app/)  
👨‍💻 **Created by**: Aryan Bhargava & Aryan Kumar

---

## 🚀 Features

- ✅ **Live Resume Preview** as you type
- ✅ **Resume Strength Score** (0–90 points) based on industry standards
- ✅ Add and customize key sections:  
  - `Education`  
  - `Technical Skills`  
  - `Projects`  
  - `Professional Experience`  
  - `Achievements`  
  - `Extracurriculars`
- ✅ **Custom Sections** support for full flexibility
- ✅ Built-in Word Document Download (`.docx`)
- ✅ Save and Reset buttons to manage progress
- ✅ Responsive UI with light/dark theme toggle
- ✅ Real-time sync between form data and document preview

---

## 🛠️ Tech Stack

| Area                | Tech Stack                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| **Framework**       | [Next.js](https://nextjs.org/)                                              |
| **Language**        | [TypeScript](https://www.typescriptlang.org/)                              |
| **Styling**         | [Tailwind CSS](https://tailwindcss.com/)                                   |
| **UI Components**   | [Shadcn UI](https://ui.shadcn.com/) (built on Radix UI)                     |
| **Form Handling**   | [React Hook Form](https://react-hook-form.com/)                            |
| **Validation**      | [Zod](https://zod.dev/)                                                     |
| **Word Export**     | [docx](https://docx.js.org/)                                                |
| **PDF Export (TODO)**| [jsPDF](https://github.com/parallax/jsPDF), [html2canvas](https://html2canvas.hertzen.com/) |

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/resume-builder.git
cd resume-builder
der
```

### 2. Install dependencies

Install the project dependencies using `pnpm`.

```bash
pnpm install
```

### 3. Run the development server

Start the development server to view the application in your browser.

```bash
pnpm run dev
```

Open [http://localhost:3000](http.localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run the following commands:

### `pnpm run dev`

Runs the app in development mode.

### `pnpm run build`

Builds the app for production to the `.next` folder.

### `pnpm run start`

Starts a Next.js production server.

### `pnpm run lint`

Runs the Next.js linter to identify and fix code quality issues.

## Project Structure

```
.
├── app/                # Main application source code (pages, layout)
├── components/         # Reusable UI components
│   ├── ui/             # Shadcn UI components
│   └── ...
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and library configurations
├── public/             # Static assets (images, fonts)
└── ...
```

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Authors

- **Made by:**
  - [Aryan Bhargava](https://www.linkedin.com/in/aryan-bhargava-333789285/)
  - [Aryan Kumar](https://www.linkedin.com/in/aryankumar102907/)
- **Tested by:**
  - [Jatin Kabra](https://www.linkedin.com/in/jatin-kabra-723813334/)
  - [Ayush Raj](https://www.linkedin.com/in/ayush35802/)
