---
title: "What's a Makefile for?"
description: "Why use a Makefile (or just) to centralize your project's commands."
tags: ["makefile","tooling","devops"]
publishedAt: 2024-02-15
lang: "en"
urlSlug: "makefile"
---
As our software projects grow, it quickly becomes hard to remember every command you can run.

For example, a basic web project usually has commands for:

- Running a dev version
- Generating a build
- Compiling assets or static files
- Running docker containers
- Running tests
- Etc.

A fairly basic solution would be creating a README.md at the project root listing the commands — very simple to do, and it works!
Yes, but I'm a web developer, and I'm lazy! 😔

A slightly more technical solution would be writing small scripts to run our commands, but again that's not necessarily a great fit.

Imagine creating a bash file just to run a `docker compose up -d` — feels slightly overkill, right?

The solution to all our problems is [Makefile](https://en.wikipedia.org/wiki/Make_(software))!

That's all well and good, but what does it actually look like?<br />
Let's take the [Makefile](https://github.com/Sonny93/my-links/blob/main/Makefile) from my project [MyLinks](https://www.mylinks.app/) as an example.

```yml
db:
	docker compose -f dev.docker-compose.yml up -d

dev:
	npm run dev

prod:
	docker compose up -d --build
```

also worth checking out: [just](https://github.com/casey/just)
