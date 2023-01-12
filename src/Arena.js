class Arena {
  constructor(hero, monsters, size = 10) {
    this.hero = hero;
    this.monsters = monsters;
    this.size = size;
    this.message = "";
  }

  getDistance(fighter1, fighter2) {
    const dist = Math.sqrt(Math.pow(fighter2.x - fighter1.x, 2) + Math.pow(fighter2.y - fighter1.y, 2)).toFixed(2);
    return dist
  }

  isTouchable(attacker, defender) {
    const touch = this.getDistance(attacker, defender) <= attacker.getRange();
    return this.getDistance(attacker, defender) <= attacker.getRange()
  }

  move(direction) {
    let y = this.hero.y;
    let x = this.hero.x;
    if (direction === "N") this.hero.y -= 1;
    if (direction === "S") this.hero.y += 1;
    if (direction === "E") this.hero.x -= 1;
    if (direction === "W") this.hero.x += 1;

    if (!this.checkOnMap(this.hero.x, this.hero.y)) {
      this.message = "Déplacement hors de la carte impossible";
    } else if (!this.CheckNoMonster(this.hero.x, this.hero.y)) {
      this.message = "Déplacement sur une case déjà occupée impossible";
    } else {
      return { x, y };
    }

    document.getElementById('error').innerHTML = this.message;
    this.hero.x = x;
    this.hero.y = y;
    return this.hero;
  }

  checkOnMap(x, y) {
    return (x >= 0 && x < this.size) && (y >= 0 && y < this.size)
  }

  CheckNoMonster(x, y) {
    return !this.monsters.some(monster => (monster.x === x && monster.y === y))
  }
}
