class Hero extends Fighter {
  constructor(name, strength, dexterity, image, x, y, range) {
      super(name, strength, dexterity, image, x, y, range)
      this.weapon = null;
      this.shield = null;
  }


  // Calculate the total attack capacity of the fighter
  // Calcule la capacité d'attaque totale du combattant
  getDamage() {
    return this.strength + (this.weapon ? this.weapon.damage : 0)
  }


  // Calculate the total defense capacity of the fighter
  // Calcule la capacité de défense totale du combattant
  getDefense() {
    return this.dexterity + (this.shield ? this.shield.protection : 0)
  }

  getRange() {
    return this.range + (this.weapon ? this.weapon.range : 0)
  }
}
