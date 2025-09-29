# Starter Pack (TypeScript Edition)

[![Build Status](https://codebuild.ap-southeast-2.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiK2RUODZJTEw1YStIMDBhQmoyNGZuQmJzVi9FZFRoVGIrWWxCZVRuRlRZUlVOeFRLZzl1azA0Sm1mUEVLU3d6YWxoR2c4bHlpNHZVNnBpb09aOEVUMUdFPSIsIml2UGFyYW1ldGVyU3BlYyI6IjdKSzZqbGtVVHRDY2xjemoiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=typescript)](https://starter-pack-typescript.603.nz)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing-)

Modern React + Auth0 + Redux Saga + Webpack setup for quickly prototyping secure single‑page applications.

## Why this project?

Spinning up a serious front‑end often means repeating the same plumbing: auth flows, routing, state management, async side effects, code splitting, build optimisation, and a decent component baseline. Starter Pack gives you an opinionated, production‑leaning foundation so you can focus on your idea—not on wiring boilerplate.

You get:

* Robust authentication via Auth0 Universal Login (JWT-based, ready to pair with any API)
* A protected example route (Books) demonstrating gated content & token handling
* Sensible architecture with Redux + Redux Saga for predictable async workflows
* Modern React (hooks + lazy loading) with granular code splitting & long‑term caching
* TypeScript everywhere for safer refactors and discoverable APIs
* Fast, cache‑friendly Webpack build geared for dev velocity and production reliability

## Key Features

* 🔐 Auth0 Universal Login integration (easily swap provider if needed)
* 🔄 Redux + Redux Saga side‑effect model
* 🧩 Code splitting with `React.lazy` + Webpack SplitChunks + CSS extraction
* 🏗 Strong type safety (TypeScript) + linting (ESLint + css‑modules validation)
* 🎯 Example domain (books) incl. protected route + JSON data stub
* 🚀 Hot‑reload dev server
* 🐳 Docker support for parity & deployment experiments
* 📦 Production build with hashed assets & manifest inlining

## Live Demo

Visit: <https://starter-pack-typescript.603.nz>

Screenshots:

| Main | Login | Protected Content |
|------|-------|-------------------|
| ![Main](https://img.jch254.com/Main.png) | ![Modal](https://img.jch254.com/Login.png) | ![Recommended](https://img.jch254.com/Books.png) |

## Quick Start (Copy & Paste)

```bash
git clone https://github.com/jch254/starter-pack.git
cd starter-pack
git checkout typescript
yarn install
AUTH0_CLIENT_ID=YOUR_CLIENT_ID \
AUTH0_DOMAIN=YOUR_DOMAIN \
yarn run dev
```

Open <http://localhost:3001>

Don't have Auth0 values yet? See Configuration below—you can still explore most of the UI without logging in.

## Installation

Prerequisites:

* Node.js (LTS recommended)
* Yarn (or adapt commands to npm/pnpm)
* Auth0 account (for full auth flow)

Install dependencies:

```bash
yarn install
```

## Configuration (Environment Variables)

Two environment variables are required for authentication to function:

| Variable | Description | Example |
|----------|-------------|---------|
| `AUTH0_CLIENT_ID` | SPA application Client ID | `abc123XYZ` |
| `AUTH0_DOMAIN` | Your Auth0 tenant domain | `your-tenant.eu.auth0.com` |

Set them inline when running scripts:

```bash
AUTH0_CLIENT_ID=abc AUTH0_DOMAIN=your-tenant.eu.auth0.com yarn run dev
```

Or export them (macOS/Linux):

```bash
export AUTH0_CLIENT_ID=abc
export AUTH0_DOMAIN=your-tenant.eu.auth0.com
yarn run dev
```

Auth0 Setup:

1. Create a Single Page Application in the Auth0 dashboard
2. Add `http://localhost:3001` to Allowed Callback URLs & Allowed Web Origins
3. Save changes and copy the Client ID + Domain

## Available Scripts

| Script | Purpose | Notes |
|--------|---------|-------|
| `yarn run dev` | Start dev server with hot reload | Serves at <http://localhost:3001> |
| `yarn run build` | Production bundle | Outputs to `/dist` |
| `yarn run prod` | Serve built production bundle | Requires prior build (invokes build if necessary) |

## Development Workflow

Start locally (auth enabled):

```bash
AUTH0_CLIENT_ID=abc AUTH0_DOMAIN=your-tenant.eu.auth0.com yarn run dev
```

Build production assets:

```bash
yarn run build
```

Serve production build locally:

```bash
yarn run prod
```

## Docker Usage

Build image:

```bash
docker build -t starter-pack .
```

Run (choose an npm script: `dev` or `prod`):

```bash
docker run \
  -p 3001:3001 \
  -e AUTH0_CLIENT_ID=abc \
  -e AUTH0_DOMAIN=your-tenant.eu.auth0.com \
  starter-pack dev
```

If you omit the script name the container will exit and list available commands.

## Architecture & Tech Stack

Core stack:

* React (hooks) + React Router
* Redux + Redux Saga + Reselect
* Auth0 SPA SDK
* TypeScript (strict-ish typing) + ESLint
* Rebass (primitive UI components) + CSS Modules
* Webpack (dev server, SplitChunks, manifest inlining, MiniCssExtractPlugin)

Notable implementation details:

* Code splitting: dynamic `React.lazy` boundaries (see `src/app/App.tsx`)
* Protected route pattern via Auth0 wrapper (`src/auth` directory)
* Example data service abstraction (`src/apiService.ts`)
* Separate reducers & sagas by domain (`src/books`, `src/app`)
* Type definitions in `typings/` for external modules without bundled types

Directory snapshot:

```text
src/
  app/               # App shell & root component
  auth/              # Auth0 integration + route guard
  books/             # Example protected feature module
  shared-components/ # Reusable UI pieces
infrastructure/   # Terraform + scripts for infra & deployment
```

## Extending / Customisation Ideas

* Swap Auth0 for another OIDC/OAuth provider
* Add API layer + real network calls (fetch/axios + token refresh)
* Introduce testing (Jest + React Testing Library)
* Add performance budgets / bundle analyzer
* Implement dark mode theme toggle

## Contributing 🙌

Contributions are very welcome—whether it's a bug report, feature idea, documentation tweak, or a pull request.

1. Fork the repo & create a branch: `git checkout -b feature/your-thing`
2. Make changes (keep commits purposeful)
3. Run lint/build locally
4. Open a Pull Request describing the change & rationale

Guidelines:
Guidelines:

* Keep scope minimal—small PRs are easier to review
* Add comments where intent isn't obvious
* Prefer TypeScript strictness over `any`
* Match existing code style (lint will help)

Feel free to open an issue first to discuss bigger ideas.

## Reporting Issues

When filing an issue, please include:

* What you expected vs what happened
* Steps to reproduce
* Environment (OS, Node version) if relevant
* Logs or screenshots (if helpful)

## FAQ

**Q: Can I use npm instead of yarn?**  
A: Yes—adapt commands (`npm install`, `npm run dev`, etc.).

**Q: Do I need Auth0 to try it?**  
A: You can run the app without environment variables; protected routes will simply not authenticate.

**Q: Where do I plug in an API?**  
A: Start in `src/apiService.ts` and replace the mocked JSON flow with real fetch logic.

## License

MIT © 2016–present Jordan Hornblow. See [LICENSE](./LICENSE) for full text.

## Acknowledgements

* Auth0 for the SPA SDK
* React, Redux, Saga & broader OSS ecosystem

---

Enjoying this starter? A star ⭐ helps others discover it.

---

Looking for the plain JavaScript version? See the [master branch](https://github.com/jch254/starter-pack/tree/master).
