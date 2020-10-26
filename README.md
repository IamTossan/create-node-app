# create-node-ts-app

---

This is a cli to quickly set up a node typescript project

## Getting Started

**With npx**

To launch the cli you can use npx:

`$> npx create-node-ts-app`

**With global npm installation**

you may install it globally:

`$> npm install -g create-node-ts-app`

and then run it:

`$> create-node-ts-app`

**Flags**

You can use flags to build a project more quickly:
  - `--name <PROJECT_NAME>` or `-n <PROJECT_NAME>`: required to use this mode
  - `--no-git`: disables git integration
  - `--no-lint`: disables linter/formatter integration
  - `--no-test`: disables testing integration

### Prerequisites

This project is built with linux/macos in mind.

You will also need `node >= 10`.

Git is optionnal but strongly recommended.

### development

To generate a project locally:

`$> npm run test`

The generated project should be under the `tmp` folder.

### Roadmap

- add a `README.md` file to the generated project
- improve the terminal styling with [chalk](https://github.com/chalk/chalk#readme)
- automated testing