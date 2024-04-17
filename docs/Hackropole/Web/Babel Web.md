---
title: Babel Web
tags:
    - web
    - php
    - intro
---
[Babel Web](https://hackropole.fr/fr/challenges/web/fcsc2020-web-babel-web/) est un des premiers challenges orienté Web sur la plateforme [Hackropole](https://hackropole.fr). 

Ce challenge faisait partie du FCSF 2020. Il est noté comme difficulté **Intro**.

## Installation

Téléchargez le _docker-compose.yml_ sur leur site ou alors via la commande:

```bash
curl https://hackropole.fr/challenges/fcsc2020-web-babel-web/docker-compose.public.yml -o docker-compose.yml
```

Lancez le challenge en exécutant la commande:

```docker
docker compose up
```

Vous pouvez alors accéder au challenge via l'URL http://localhost:8000.

## Exploration

Pour commencer, nous allons _explorer_ l'application (fonctionnalités, contexte, etc.).

Dans notre cas, le contexte du challenge est une application web en cours de création.

![page d'accueil du challenge](/img/Babel_web/intro)

La page d'accueil du challenge ne montre pas d'indice particulier de faille ou flag possible.
Nous allons alors regarder dans la console développeur si des éléments ne nous ont pas été cachés.

![console developpeur indice1](/img/Babel_web/comment)

On y voit alors un commentaire comprenant un lien nommé **source** en commentaire.

Pour voir ce lien caché, on modifie alors l'URL du challenge en rajoutant "**?source=1**" à la fin de celui-ci.

## Premier indice

Une fois l'URL modifiée, voici ce que nous renvoie le serveur.

![source=1](/img/Babel_web/source1)

On voit le code de la page actuelle. On peut y comprendre plusieurs choses:
- Si une variable nommée **source** est présente, alors on affiche la source du site
- Si une variable nommée **code** est présente, alors on exécute cette commande sur le serveur grâce à la fonction php [system](https://www.php.net/manual/en/function.system).
- Sinon, on affiche la page d'accueil que l'on a vu au début.

Nous allons essayer d'exécuter une commande sur le serveur en y passant la commande **ls** (list) qui permet de lister les fichiers du répertoire courant.

## Exploitation

L'URL ressemblera à ceci: http://localhost:8000?code=ls

![code=ls](/img/Babel_web/code=ls)

La commande s'exécute bien et nous renvoie la liste des fichiers, ici deux:
- index.php
- flag.php

Le fichier flag est le plus intéressant car c'est notre clé de réussite du challenge. Nous allons alors essayer de voir son contenu avec la commande **cat**.

La nouvelle URL ressemblera alors à ceci: http://localhost:8000?code=cat%20flag.php

:::note[Remarque]
Notez la commande "cat flag.php" qui est changée en "cat%20flag.php". L'espace n'étant pas un caractère possible dans une URL, il faut l'encoder. Vous pouvez retrouver la liste des caractères [ici](https://www.degraeve.com/reference/urlencoding.php)
:::

**Problème**, une page vide s'affiche. Cependant, en ouvrant la console developpeur, le flag apparaît.

![flag](/img/Babel_web/cat_flagPhp)

**Bravo**!! Vous venez de finir le challenge. Vous n'avez plus qu'à copier le flag et le mettre sur le site d'Hackropole afin de confirmer votre victoire.