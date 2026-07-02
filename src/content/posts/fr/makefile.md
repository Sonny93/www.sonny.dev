---
title: 'Makefile à quoi ça sert ?'
description: 'Pourquoi utiliser un Makefile (ou just) pour centraliser les commandes de projet.'
tags: ['makefile', 'tooling', 'devops']
publishedAt: 2024-02-15
lang: 'fr'
urlSlug: 'makefile'
---

À mesure que nos projets informatique grossissent, il devient rapidement complexe de se souvenir de toutes les commandes que l'on peut utiliser.

Par exemple pour un projet web basique, on retrouve généralement des commandes pour :

- Lancer une version de dev
- Générer un build
- Compiler des assets ou des fichiers statiques
- Lancer des containers docker
- Lancer des tests
- Etc.

Une solution assez basique serait de créer un README.md à la racine de son projet avec la liste des commandes, c'est très simple à faire et ça fonctionne !
Oui mais je suis développeur web, je suis un flemmard ! 😔

Une autre solution un peu plus technique serait de créer de petits scripts pour exécuter nos commandes mais une fois encore, ce n'est pas forcément adapté.

Imaginez créer un fichier bash pour faire simplement un `docker compose up -d`, ça semble légérement overkill non?

La solution à tous nos problèmes c'est [Makefile](https://fr.wikipedia.org/wiki/Make) !

C'est bien beau tout ça, mais à quoi ça ressemble ?<br />
Prenons pour exemple le fichier [Makefile](https://github.com/Sonny93/my-links/blob/main/Makefile) de mon projet [MyLinks](https://www.mylinks.app/).

```yml
db:
	docker compose -f dev.docker-compose.yml up -d

dev:
	npm run dev

prod:
	docker compose up -d --build
```

à voir également [just](https://github.com/casey/just)
