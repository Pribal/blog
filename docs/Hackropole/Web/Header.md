---
title: Header
tags:
    - web
    - nodejs
    - intro
---
[Header](https://hackropole.fr/fr/challenges/web/fcsc2022-web-header/) est un challenge orienté Web sur la plateforme [Hackropole](https://hackropole.fr). 

Ce challenge faisait partie du FCSF 2022. Il est noté comme difficulté **Intro**.

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

La page d'accueil du challenge contient peu d'informations. Cependant une barre de navigation est présente avec le titre du challenge et un lien nommé **Source**.

En cliquant sur ce lien, ceci s'affiche:

```js
const fs = require('fs');
const express = require('express');
const escape = require('escape-html')
var favicon = require('serve-favicon');
const app = express();

app.use(favicon('favicon.ico'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    var verif = req.header("X-FCSC-2022");
    if (verif == "Can I get a flag, please?") {
        var flag = fs.readFileSync("flag.txt");
        res.status(200);
        res.render("pages/index", {
            type: "success",
            msg: "Here it is: " + flag,
        });
        return res.end();
    } else {
        res.status(200);
        res.render("pages/index", {
            type: "warning",
            msg: "No flag for you. Want a meme instead?",
        });
        return res.end();
    }
});

app.get('/source', async (req, res) => {
    const source = fs.readFileSync(__filename);
    res.render("pages/source", {
        source: escape(source),
    });
    return res.end();
});

app.listen(8000);
```

Il semblerait que ce soit le code source du site que nous visitons actuellement. Découpons le ensemble.

L'application est une application [**NodeJs**](https://nodejs.org/en) utilisant le framework [**ExpressJs**](https://expressjs.com).

On peut y voir 2 routes principales:
- /, plus communément appelé la racine du site
- /source, qui est la route sur laquelle nous sommes

Intéressont nous à la racine:
```js
app.get('/', async (req, res) => {
    var verif = req.header("X-FCSC-2022");
    if (verif == "Can I get a flag, please?") {
        var flag = fs.readFileSync("flag.txt");
        res.status(200);
        res.render("pages/index", {
            type: "success",
            msg: "Here it is: " + flag,
        });
        return res.end();
    } else {
        res.status(200);
        res.render("pages/index", {
            type: "warning",
            msg: "No flag for you. Want a meme instead?",
        });
        return res.end();
    }
});
```
L'application commence par récupérer un **header** nommé **X-FCSC-2022** dans la requête que nous lui faisons.
```js
var verif = req.header("X-FCSC-2022");
```
L'application vérifie ensuite si ce header a la valeur **"Can I get a flag, please?"**.

Si oui, elle lit le fichier **flag.txt** puis nous le renvoie.
```js
var flag = fs.readFileSync("flag.txt");
res.status(200);
res.render("pages/index", {
    type: "success",
    msg: "Here it is: " + flag,
});
return res.end();
```
Dans l'autre cas, elle nous renvoie la page d'accueil.
```js
res.status(200);
res.render("pages/index", {
    type: "warning",
    msg: "No flag for you. Want a meme instead?",
});
return res.end();
```

## Exploitation

On comprends alors qu'il faut envoyer une requête avec le header **"X-FCSC-2022: Can I get a flag, please?"** pour recevoir le flag. C'est ce que nous allons faire.

Pour cela, nous pouvons faire une requête avec *cURL* en incluant le paramètre *--header*.
```bash
curl --header "X-FCSC-2022: Can I get a flag, please?" http://localhost:8000
```

Le serveur nous renvoie ceci:

```html
--snip--
<div class="container">
        <div class="starter-template">
                <div id="alert" class="alert alert-success">
                        <strong>Here it is: FCSC{9ec57a4a72617c4812002726750749dd193d5fbbfeef54a27a9b536f00d89dfb}</strong>
                </div>
                <img src="meme.jpeg" class="img-fluid" />
        </div>
</div>
--snip--
```

**Bravo !** , vous avez réussi ce challenge. Copiez le flag et entrez le sur le site d'Hackropole pour confirmer votre victoire.