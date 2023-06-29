
# Projet AI16 (CHEMANACK && CHASSIGNET)





### Bonjour cher visiteur, dans le cadre de la réalisation de notre projet de AI16 où il question de créer une application de recrutement, de nombreux dossiers et fichiers ont ete crées en vue d'obtenir le resultat final.  


Dans le dossier ***model*** on a créé toutes les **fonctions CRUD** dont on aura besoin.

Dans le fichier ***routes***, on **gère toutes les routes** de notre application.

Dans le dossier ***view***, on **gère les vues** de notre application

Dans le fichier ***app.js***,  on **initialise l'application**, les routes et les middlewares

particulièrement, c'est dans le fichier */routes/users* qu'on gère les routes et requêtes qui concernent les utilisateurs.

## Page principale

Dans la page principale, il ya 2 boutons, un pour pouvoir créer un compte, et l'autre pour pouvoir se connecter (si l'utilisateur n'a pas de compte). En effet, en cliquant sur le bouton *signin*, l'utilisateur est directement envoyé sur la page de connexion, En cliquant sur le bouton *signup* il est envoyé sur la page de création de compte. 
Pour créer ces boutons, nous avons utilisé des balises de lien <a></a> coté front et un paramétrage de routes coté back.

Pour la création de compte coté front, on a utilisé un formulaire crée à l'aide de la balise <form></form> avec pour attributs et valeurs: method="post" (pour pouvoir envoyer les données saisies dans le formulaire) et action="/signup"(c'est dans cette page que se fera le traitement).
Coté back, on utilise la fonction *createUser*(l'une des fonctions CRUD pour créer un utilisateur) dans le dossier model et le fichier users.js.  c'est dans le fichier index.js que ceci est fait et on  utilise *router.post('/signup', function (req, res, next) {....}* pour pouvoir recupérer et envoyer les données de l'utilisateur dans la base de données. En ce qui concerne le mot de passe, celui ci est *hashé* avant d'etre envoyé dans la bdd afin de garantir plus de sureté si la bdd se retrouve un jour entre de mauvaises mains.



Pour la connexion de l'utilisateur coté front, on a utilisé un formulaire créé à l'aide de la balise <form></form> avec pour attributs method="post" (pour pouvoir envoyer les données saisies dans le formulaire) et action="/signin". Si l'utilisateur existe (Cette partie a été realisé grâce à la fonction **areValid**) dans la base de données, il est dirigé dans une page d'accueil bien specifique en fonction de son type:
-la page d'accueil candidat s'il est candidat(l'affichage est fait dans pageCandidat.ejs)
-la page d'accueil recruteur s'il est recruteur(l'affichage est fait dans pageRecruteur.ejs)
-la page d'accueil admin s'il est admin
(l'affichage est fait dans pageAdmin.ejs)


Une fois authentifié une session est créée pour cet utilisateur.



## Administrateur
Il pourra consulter la liste des utilisateurs de l'application(grâce à la fonction **readAll**, et cette liste sera affichée dans **userlist.ejs** dans users.js dans le dossier model). Il pourrait modifier(grâce à la fonction **updateUser**) et supprimer(grâce à la fonction **delete**) des utilisateurs. 

Aussi, il pourra consulter la liste des organisations( grâce à la fonction **readAll** dans le fichier model/organisation.js, et l'affichage se fera dans **organisationlist.ejs** ), des offres (grâce à la fonction **readAll** dans le fichier model/offre.js, et l'affichage se fera dans **offrelist.ejs** )
, celles valides (grâce à la fonction **readAllval** dans le fichier model/offre.js, et l'affichage se fera dans **offreVal.ejs** ) 
celles expirées (grâce à la fonction **readAllex** dans le fichier model/offre.js, et l'affichage se fera dans **offreEx.ejs** ). La fonction *now()* pour donner la date actuelle; elle est utilisée dans ces fonctions dans le fichier model/offre.js, et permet ainsi de savoir si une offre est encore valide ou pas.



 L'affichage de ces élements précedement enumerés a été rendu possible grace à la fonction ***forEach***
 pour pouvoir selectionner tous les elements.

 Le paramétrage des routes s'est fait dans le fichier ***users.js*** dans le dossier *routes*




## Recruteur
Il pourra créer une offre(grâce à la fonction **createOffre** dans model/offre.js, et l'affichage de la liste des offres se fera dans *offrelistR.ejs*) afin que les candidats puissent y candidater. Apres avoir créée une offre, on s'assure que le serveur puisse recupérer l'id de l'offre pour ainsi créer la fiche de poste de cette offre.
Il pourra créer une fiche de poste(grâce à la fonction **createFiche_poste** dans model/fiche_poste.js, et l'affichage de la liste des fiches de postes se fera dans *fiche_poste.ejs*)

Le recruteur pourra également voir la liste des offres valides et des offres qui ne sont plus valides. 

 Le recruteur a cette possibilité de supprimer des offres(grâce à la fonction *delete* dans model/offre.ejs). 
 On a egalement mis sur pied un filtre sur la date de validite des offres(Faute de temps on a pas pu le faire pour les autres champs).

 Le recruteur peut aussi ajouter une nouvelle organisation (grâce à **createOrganisation** dans model/organisation.js) et consulter la liste des candidatures( l'affichage se fera dans **candidaturelist.ejs**)


 Le paramétrage des routes s'est fait dans le fichier ***users.js*** dans le dossier *routes*



 ## Candidat

 Celui ci peut acceder à la liste des offres( uniquement celles qui sont encore valides), et de pouvoir ainsi y candidater, mais pour televerser les documents on pas pu le rendre operationnel
 Pour le faire coté serveur on peut recuperer l'id de l'offre, utiliser le template upload fourni par le prof afin d'envoyer les documents:CV,letttre de motivation. 

 Le candidat peut également acceder aux differentes fiches de postes des offres(grâce notamment à **readAll** dans le fichier model/fiche_poste.js, et l'affichage se fera sur **fiche_poste.ejs** ).


 Le paramétrage des routes s'est fait dans le fichier ***users.js*** dans le dossier *routes*

## Changement de Type
 Les candidats et recruteurs peuvent changer de type: le recruteur peut devenir admin, et le candidat peut devenir admin et recruteur. pour le changement de type il se fait automatiquement sans que l'admin ne puisse y interférer. Le changement est fait grâce à la fonction **updateType** dans model/users.js

 ## les routes
//pour ajouter une organisation
 users/ajoutOrg

Ajout d'une offre par un recruteur
users/ajoutOffre

//Ajout d'une fiche de poste par un recruteur
users/ajoutFiche_poste

//pour afficher la liste des organisations à l'utilisateur
users/organisationlist

//aller à la page admin en quittant de la page users
users/admin

//aller à la page recruteur en quittant de la page users
users/recruteur

//aller à la page candidat en quittant de la page users
users/candidat

//pour afficher la liste des utilisateurs à l'admin
users/admin/userslist

//le candidat qui accede a la liste des offres
users/offrelist

//listes des offres expirees
users/offresEx

//le recruteur qui accede à la liste des offres
users/offrelistR

//le recruteur qui accede à la liste des offres encore valides 
/offresValides

//listes des candidatures affichés à un recruteur
users/candidaturelist

//le candidat qui accede à la liste des fiches de postes
users/fiche_postelist

// le recruteur accede a la liste des pieces
users/piecelist

//un user qui accede à son compte
users/moncompte

//modifier une offre
users/modifierOffre

//pour candidater
users/candidature/:id

//pour changer de type
users/changer-type


## Rapport de securité

En ce qui concerne la securite de notre application,

#### on a eu  à mettre en place des requetes paramétrées afin de pouvoir eviter les injections SQL.

#### gerer la session afin que un user puisse avoir et controler sa session

#### hashé le mot de passe afin que lorsqu'un utilisateur cree son compte, lorsque son mot de passe est envoyé dans la base de donnée, celui ci puisse être chiffré et ainsi illisible par des cybercrimels s'il venait à avoir accès à la bdd

##### Comme vulnerabilité il peut y avoir une violation d'acces: en effet, les url de notre application sont facilement comprehensibles et les attaquants peuvent s'appuyer sur cela pour essayer de violer l'acces 

