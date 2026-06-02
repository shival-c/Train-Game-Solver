# Train Game Solver

## Build Requirements

* Operating System: Windows, macOS, or Linux
* Node.js 22.22.0
* npm 10.9.4

## Setup

Clone the repository:

```bash
git clone https://github.com/shival-c/Train-Game-Solver.git
cd Train-Game-Solver
```

Install dependencies:

```bash
npm install
```

## Build

Create a production build:

```bash
npm run build
```

The build output will be generated in the `build/` directory.

To create the extension package, zip the contents of the `build/` directory so that `manifest.json` is located at the root of the ZIP archive.
