/**
 * Class parent injecting the template (Children)
 * in the DOM where root is defined
 * @param {string} root (# dans le HTML)
 */
class TemplateRoot {
  constructor(root) {
    this.rootElement = document.getElementById(root);
  }

  render(template) {
    const fragment = document.createElement('div');
    fragment.innerHTML = template;
    this.rootElement.appendChild(fragment);
  }
}

class FightersTemplate extends TemplateRoot {
  constructor(root) {
    super(root);
  }

  createTemplate(hero, enemy) {
    const fighterTemplate = `<div class="fighters">
      <a href="#hero">
        <figure class="heracles">
          <img src="${hero.image}" alt="${hero.name}" />
          <figcaption>${hero.name}</figcaption>
        </figure>
      </a>
      <div class="fight">🗡️</div>
      <figure class="monster">
        <img src="${enemy.image}" alt="${enemy.name}" />
        <figcaption>${enemy.name}</figcaption>
      </figure>
    </div>`;

    this.render(fighterTemplate)
  }
}

/**
 * Class creating the Hero Information modal
 * @param {string} root
 */
class HeroInfoTemplate extends TemplateRoot {
  constructor(root) {
    super(root)
  }

  createHeroInfoTemplate(hero) {
    const heroInfoTemplate = `<div class="hero" id="hero">
          <a href="#" class="close" onclick="closeModal()">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
          </a>
          <div class="slots equipment" id="slot">
          <div data-slot="Main weapon" class="slot">
            <img src="${hero.weapon.image}" alt="weapon">
          </div>
          <div data-slot="Shield" class="slot">
            <img src="${hero.shield.image}" alt="shield">
          </div>
          <div data-slot="Secondary weapon" class="slot"></div>
          <div data-slot="Head" class="slot"></div>
          <div data-slot="Level" class="slot">
            ${hero.getLevel ? hero.getLevel() : ""}
          </div>
          <div data-slot="Experience" class="slot">
            ${hero.experience}
          </div>
          <div data-slot="Attack" class="slot statistic">
              ${hero.getDamage ? hero.getDamage() : ""}
          </div>
          <div data-slot="Defense" class="slot statistic">
              ${hero.getDefense ? hero.getDefense() : ""}
          </div>
          <div data-slot="Life" class="slot statistic">
            ${hero.life}
          </div>
          <div data-slot="Range" class="slot statistic">
            ${hero.getRange ? hero.getRange() : ""}
          </div>
      </div>
      <div class="character">
          <h2 class="name">Heracles</h2>
          <div class="avatar">
              <img src="${hero.image}" alt="heracles">
          </div>
          <p class="level">Level 1</p>
      </div>
    </div>`;

    this.render(heroInfoTemplate)
  }
}

/**
 * Class creating the HTML structure for the Arena
 * Will include all fighters with their own coordonates from the arena class
 * @param {string} root
 */
class ArenaTemplate extends TemplateRoot {
  constructor(root) {
    super(root);
  }
  checkFighters(arena, i, j) {
    let img = '';

    arena.monsters.forEach((monster, index) => {
      if (monster.x === i && monster.y === j) {
        img = this.makeMonsterImage(arena, index)
      }
    })

    if (arena.hero.x === i && arena.hero.y === j) {
      img = this.makeHeroImage(arena)
    }
    return img;
  }

  makeHeroImage(arena) {
    if (arena.hero.isAlive()) {
      return `<img title="${arena.hero.name}, portée de ${arena.hero.getRange ? arena.hero.getRange() : ""}" alt="${arena.hero.name}" src="${arena.hero.image}" >`;
    }
    return "";
  }

  makeMonsterImage(arena, index) {
    if (arena.monsters[index].isAlive()) {
      return `<img
      id="monster_${index}"
      src="${arena.monsters[index].image}"
      title="Distance to ${arena.hero.name} ${arena.getDistance ? arena.getDistance(arena.monsters[index], arena.hero) : ""}"
      class="monster ${arena.isTouchable ? (arena.isTouchable(arena.hero, arena.monsters[index]) ? 'touchable' : 'untouchable') : ""}"
      >`;
    }
    return "";
  }

  createArena(arena) {
    const arenaDiv = [];
    for (let i = 0; i < arena.size; i++) {
      for (let j = 0; j < arena.size; j++) {
        arenaDiv.push(`<div id="pos${i}${j}">
        ${this.checkFighters(arena, i, j)}
        </div>`);
      }
    }
    const arenaTemplate = `<div class="map" style="--tiles-number: ${arena.size}">
      ${arenaDiv.join('')}
    </div>`;

    document.getElementById("arena").innerHTML = arenaTemplate;
  }

  setMoveEvent(arena) {
    document.addEventListener('keydown', (event) => {
      const keyName = event.key;
      const directions = { ArrowUp: 'N', ArrowDown: 'S', ArrowRight: 'E', ArrowLeft: 'W' };

      if (keyName in directions) {
        event.preventDefault();

        arena.move(directions[keyName])
        this.createArena(arena);
        this.setMonsterClick(arena);
      }
    });
  }

  setMonsterClick(arena) {
    document.querySelectorAll(".monster").forEach(monster => {
      monster.addEventListener('click', (e) => {
        const index = monster.id.split("_")[1];
        const dead = arena.battle(index)
        if (dead) {
          this.createArena(arena);
        }
      })
    })
  }
}

