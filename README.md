# Works of Heracles #4: 🐴 the mares of Diomede

Prerequisite: clone this *repository*. Important interface management update.

The work continues for Heracles. He can move but must now defeat King Diomede's carnivorous mares.

For this new workshop, you pick up where you left off in the previous step. You have a hero who has coordinates and range management for your attacks and the ability to move.

## Let the battle begin!

The mares of Diomedes are there, in front of you, the smoking nostrils. You can move around, out of reach of their sharp teeth, hungry for fresh flesh. It's time to attack!

In the arena, the herd is made up of four mares that will have to be fought. But how do you manage who is attacking whom? There is indeed a `fight()` method in `Fighter`, but a `Fighter` does not directly know about the other fighters, it is again the `Arena` class which has this information. You will therefore implement a `battle()` method directly in `Arena`. It is possible to implement a battle in several ways, so you have to choose rules. Here's how the *gameplay* will go for your game:
- the `Hero` chooses on the map which monster he wishes to attack by clicking on it. Clicking on the monster is already implemented, and an `id` corresponding to the chosen monster is sent. Your `battle(id)` method will therefore have to take a single `id` parameter which corresponds to the index of the monster in the `monsters` array of `Arena`.
- if the monster is not within reach of the hero (use the `touchable()` method to check it), throws an error message ('This monster is not touchable, please move first') via the innerText of the div `#error`.
- Otherwise, the monster is attacked by our hero and suffers the corresponding damage points. The hero's `fight()` method is then used.
- then, if the monster is within range (use `touchable()` again but from the targeted monster's point of view), the latter responds and attacks the hero in turn.
- Once the *"fight"* is finished, also use the innerTExt of the `#error` div to display the result of the fight as in episode 2
```${arena.hero.name} 💙 ${arena.hero.life} 🗡️ ${arena.monsters[index].name} 💙 ${arena.monsters[index].life}```

## Horse butcher

Heracles must overcome monsters, he can attack and do damage. For the moment, if a monster is "defeated" (hit points <0), it stays on the map and is still attackable. Let's handle this case, still in the `battle()` method
- using the `isAlive()` method present in `Fighter`, test if the attacked monster is still alive after an attack by the hero. If yes, the method continues and the monster then attacks Heracles.
- But if the monster is dead following the hero's attack, modify the message sent to display the winner with his remaining life.
``` ${arena.hero.name} won 🗡️ ${arena.hero.life} 💙 ${arena.monsters[index].name} is dead !!!```
Therefore, he will not attack and must also "disappear" from the map, the space where he was thus becoming free.

- The monster or the hero must then disappear from the map. To do this, the `battle()` function must simply return `true`;

- The monster has disappeared but our hero still cannot move to its space. We now need to slightly modify our `move()` function to test the `isAlive()` of the character before sending our exception.

> A last point now, at the end of `battle()`, we will check if there are monsters left to beat to know if our hero has an absolute victory. To do this, implement a new `checkBattle()` method in `Arena`. That should return true if monsters are still alive and false otherwise. (uses the `some()` method). If no monster survived the massacre, display a total victory message via `#error`

## Experience

When the hero defeats an enemy, he must gain experience. After a certain number of accumulated experience points, he gains a level. This type of mechanism can again be implemented in many different ways. Here is what you will need to do here:
- Add an `experience` property in the `Fighter` class, *integer* with the default value 1000 for the hero, and 500 for the monsters.
- When a monster dies, in addition to disappearing from the map, the number of experience points of the monster will be added to the experience of the hero. To do this, add an `updateExp(exp)` method in `Fighter` which will take the experience of the loser as a parameter and add it to the winner

The hero's level will automatically be computed from the amount of XP points he has. This level calculation is not really related to the arena. It wiil be related to the `Fighter`;
- Start by creating a new `getLevel()` method in `Fighter`. The method will return the level according to `this.experience`, using the following formula: `XP / 1000, rounded up to the upper integer = LEVEL` so at 1500 points of XP, the hero is at level 2; at 6300 points, the hero is at level 7, *etc*.
To check, look in the Hero's info panel if the information appears correctly.

> Kill a monster or two, and watch your inventory panel. Your number of experience points and your level must change.

- Finally, to make level useful in *gameplay*, make `getStrength()` and `getDexterity()` return strength and dexterity, multiplied by the level of the fighter. So if Heracles has a base strength of 20, at level 1 `getStength()` will return 20, then 40 at level 2, *etc.*. Don't forget to change it on the `Fighter` and `Hero` classes.

Congratulations, this new workshop is now finished, our hero can go and rest a little before his next mission!
