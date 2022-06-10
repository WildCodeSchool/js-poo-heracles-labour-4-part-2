# Travaux d'Héraclès #4 : 🐴 les juments de Diomède

Prérequis : cloner ce *repository*. Mise à jour de gestion de l'interface importante.

Le travail continue pour Héraclès. Il puet se déplkacer mais doit maintenant venir à bout des juments carnivores du roi Diomède.

Pour ce nouvel atelier, tu reprends là encore où tu t'étais arrêté à l'étape précédente. Tu as un héros qui possède des coordonnées et une gestion de la portée pour tes attaques et une capacité à se déplacer.

## Que la bataille commence !

Les juments de Diomède sont là, devant toi, les naseaux fumants. Tu peux te déplacer autour, te mettre hors de portée de leur dents tranchantes, avides de chair fraîche. C'est le moment de passer à l'attaque !

Sur l'arène, le troupeau est constitué de quatre juments qu'il va falloir combattre. Mais comment gérer qui attaque qui ? Il y a bien une méthode `fight()` dans `Fighter`, mais un `Fighter` n'a pas connaissance directement des autres combattants, c'est là encore la classe `Arena` qui a cette information. Tu vas donc implémenter une méthode `battle()` directement dans `Arena`. Il est possible d'implémenter une bataille de plusieurs façon, il faut donc choisir des règles. Voici comment le *gameplay* va se dérouler pour ton jeu :
- le `Hero` choisi sur la carte quel monstre il souhaite attaquer en cliquant dessus. Le clic sur le monstre est déjà implémenté, et un `id` correspondant au monstre choisi est envoyé. Ta méthode `battle(id)` devra donc prendre un unique paramètre `id` qui correspond à l'index du monstre dans le tableau `monsters` de `Arena`.
- si le monstre n'est à portée du héros (utilise la méthode `touchable()` pour le vérifier), lance un message d'erreur ('This monster is not touchable, please move first') via le innerText de la div `#error`.
- Sinon, le monstre est attaqué par notre héros et subit les points de dégâts correspondant. La méthode `fight()` du héros est alors utilisée.
- ensuite, si le monstre est à portée (utilise à nouveau `touchable()` mais du point de vue du monstre ciblé), ce dernier réplique et attaque à son tour le héros.
- Une fois le *"fight"* terminé, utilise également le innerTExt de la div  `#error` pour afficher le résultat du fight comme lors de l'épisode 2
	```${arena.hero.name} 💙 ${arena.hero.life} 🗡️  ${arena.monsters[index].name} 💙 ${arena.monsters[index].life}```

## Boucherie chevaline

Héraclès doit venir à bout des monstres, il peut attaquer et faire des dégâts. Pour le moment, si un monstre est "vaincu" (points de vie <0), il reste sur la carte et est toujours attaquable. Gérons ce cas de figure, toujours dans la méthode `battle()`
- à l'aide de la méthode `isAlive()` présente dans `Fighter`, teste après une attaque du héros, si le monstre attaqué est toujours en vie. Si oui la méthode continue et le monstre attaque alors Héraclès.
- Mais si le monstre est mort suite à l'attaque du héros, modifie le message envoyer pour afficher le vainqueur avec son reste de vie.
``` ${arena.hero.name} won 🗡️  ${arena.hero.life} 💙 ${arena.monsters[index].name} is dead !!!```
De ce fait, il n'attaquera pas et doit également "disparaître" de la carte, la case où il se trouvait devenant donc libre.

- Le monstre ou le héro doit alors disparaître de la carte. POur cela, la fonction `battle()` doit renvoyer simplement `true`;

- Le monstre a disparu mais notre héro ne peut toujours pas se déplacer sur sa case. Il faut maintenant modifier légèrement notre fonction `move()` pour tester le `isAlive()` du personnage avant d'envoyer notre exeption.

> Un dernier point maintenant, en fin de `battle()`, nous allons vérifier si il reste des monstres à battre pour savoir si notre héro a une victoire absolue. Pour cela implémenter une nouvelle méthode `checkBattle()` dans `Arena`. Celle doit renvoyer true si des monstres sont encore vivants et false dans le cas contraire. (utilise la méthode `some()`). Si aucun monstre n'a survécu au massacre, affiche un message de vistoire total via `#error`

## Expérience

Lorsque le héros terrasse un ennemi, il doit gagner de l'expérience. Au bout d'un certain nombre de points d'expérience accumulés, il gagne un niveau. Ce type de mécanisme peut là encore être implémenté de bien des manières différentes. Voici ce que tu devras faire ici :
- Ajoute une propriété `experience` dans la classe `Fighter`, *integer* avec la valeur 1000 par défaut pour le héro, et 500 pour les monstres.
- Lorsqu'un monstre meurt, en plus de disparaître de la carte, le nombre de points d'expérience du monstre sera ajouté à l'expérience du héros. POur cela, ajoute une methode `updateExp(exp)` dans fighter qui prendra en paramètre l'expérinece du vaincu et l'ajoutera au vainqueur

Le niveau du héros sera automatiquement déduit de la quantité de point d'XP qu'il possède. Ce calcul de niveau n'est pas vraiment lié à l'arène. Il pourrait être relié au `Fighter` mais nous allons essayer de respecter un peu mieux le premier principe SOLID (Single Responsability Principle), qui incite à limiter la responsabilité d'une classe et éviter d'avoir des classes qui deviennent énormes et fourre-tout.
- Commence par créer une nouvelle methode `getLevel()` dans `Fighter`. La méthode renverra le niveau en fonction du `this.experience`, selon la formule suivante: `XP / 1000, arrondi à l'entier supérieur = LEVEL ` donc à 1500 points d'XP, le héros est au niveau 2 ; à 6300 points, le héros est au niveau 7, *etc*.
Pour vérifier, Regarde dans le panel d'info du Hero si l'information apparait correctement.

> Tue un monstre ou deux, et observe ton panneau d'inventaire. Ton nombre de points d'expérience et ton niveau doivent changer.

- Enfin, pour que le niveau serve à quelque chose dans le *gameplay*, fait en sorte que `getStrength()` et `getDexterity()` retourne la force et la dextérité, multiplié par le niveau du combattant. Ainsi, si Héraclès à une force de base à 20, au niveau 1 `getStength()` renverra 20, puis 40 au niveau 2, *etc.*

Bravo, ce nouvel atelier est maintenant terminé, notre héros peut aller se reposer un peu avant sa prochaine mission !
