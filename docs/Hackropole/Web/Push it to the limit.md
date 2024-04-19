---
title: Push it to the limit
tags:
    - web
    - php
    - intro
---
[Push it to the limit](https://hackropole.fr/fr/challenges/web/fcsc2021-web-push-it-to-the-limit/) est un challenge orienté Web sur la plateforme [Hackropole](https://hackropole.fr). 

Il est noté comme difficulté **Intro**.

## Installation

Téléchargez le _docker-compose.yml_ sur leur site ou alors via la commande:

```bash
curl https://hackropole.fr/challenges/fcsc2021-web-push-it-to-the-limit/docker-compose.public.yml -o docker-compose.yml
```

Lancez le challenge en exécutant la commande:

```docker
docker compose up
```

Vous pouvez alors accéder au challenge via l'URL http://localhost:8000.

## Exploration
:::note[Description du challenge]
Exploitez une injection SQL afin de vous connecter sur l’application web.
:::

Une injection SQL est le fait d'arriver à modifier, via des paramètres, une requête SQL pour la dévier de sa fonction principale.

Ici il faut dévier la requête afin qu'elle nous permette de nous connecter.

La page d'accueil du challenge nous affiche un page d'authentification.

![page_accueil](/img/Push_it_to_the_limit/authPage)

Nous allons tester des identifiants basiques de connexion:
- admin
- admin

L'application nous renvoie que les identifiants sont invalides. En regardant dans la console développeur dans l'onglet *Elements*, on apperçoit un commentaire avec la requête que nous faisons.

![sql_request](/img/Push_it_to_the_limit/explorateur)

Décortiquons la requête SQL ensemble:

```sql
SELECT * FROM users WHERE username="admin" AND password="admin"
```

La requête commence par **SELECT**, son but est de récupérer des informations et plus précisement toutes comme l'indique <b>*</b>. Elle les récupère depuis la table **users** avec la condition (**WHERE**) que le nom d'utilisateur soit égal à **admin** et le mot de passe à **admin**.

## Exploitation

Pour dévier cette requête de sa fonction, nous allons essayer de *désactiver* la condition du mot de passe ainsi si l'utilisateur **admin** existe l'application nous laissera nous connecter.

Pour cela, nous allons commenter la deuxième conditon grâce aux caractères **--**. 

Nos entrées seront:
- admin" --
- admin (car l'application nous oblige à inserer un mot de passe)

Ainsi la requête sera:
```sql
SELECT * FROM users WHERE username="admin" --" AND password="admin"
```

On voit bien la partie grisée qui ne sera pas interprétée par la base de données.

Si l'on rentre ces identifiants, l'application nous renvoie:

![flag](/img/Push_it_to_the_limit/flag)

**Bravo !** Vous venez de réussir le challenge. Copiez le flag et entrez le sur le site d'Hackropole pour confirmer votre victoire.