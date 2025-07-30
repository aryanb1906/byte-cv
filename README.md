# Resume Builder

This is a web application for building professional resumes. Users can fill out a form with their information, and the application will generate a formatted resume that can be previewed and downloaded as a DOCX file.

## Features

*   Create and edit multiple sections of a resume (e.g., work experience, education, skills).
*   Drag-and-drop to reorder sections.
*   Live preview of the resume as you type.
*   Download the resume in PDF or DOCX format.
*   Light and dark theme support.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (built on Radix UI)
*   **Form Management**: [React Hook Form](https://react-hook-form.com/)
*   **Schema Validation**: [Zod](https://zod.dev/)
*   **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF) & [html2canvas](https://html2canvas.hertzen.com/)
*   **DOCX Generation**: [docx](https://docx.js.org/)

## Prerequisites

Make sure you have the following installed on your machine:

*   [Node.js](https://nodejs.org/en/) (v18 or later recommended)
*   [pnpm](https://pnpm.io/installation)

## Getting Started

Follow these steps to get the project up and running on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/resume-builder.git
cd resume-builder
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
