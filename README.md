# Paridirect Tech Test Monorepo

This is a monorepo containing the code for the Paridirect Tech Test.

It is built using [Nx](https://nx.dev) as monorepo manager and [PnPm](https://pnpm.io) as package manager.

This project follows Clean Architecture and SOLID principles.

## Structure

The monorepo is structured as follows:
- `apps/`: contains the applications
- `libs/`: contains the shared libraries

Applications:
- `apps/website/`: A small website that interacts with it's BFF
- `apps/website-bff/`: A small BFF API that serves the website application

Libraries:
- `libs/business/`: Contains the business logic of the application
- `libs/toolbox/`: Contains the shared utilities to be used across the project

## Getting Started

Read the README.md of each application to know how they are structured and how to run them.

Install dependencies:

```bash
pnpm install
```

To run a single app:

```bash
pnpm nx run <app_name>:serve
```

Run tests:

```bash
pnpm nx run <package_name>:test
```
