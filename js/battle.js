/*
    Start by collecting your game data from your cookie(s) and assigning it to variable(s)...
    keep in mind that cookie data is stored as a string - be sure to use Number() if passing integers
    and JSON.parse if passing JSON as cookie data.
*/


/*    
    Deal with your "battle sequence" by:
        - Subtracting player attack damage from the CPU's health.
        - Record this action in your "battlelog" (tip: an array works well for the battlelog)
        - Subtracting CPU attack damage from the Player's health.
        - Record this action in your "battlelog"
        - Determining if there has been a win, loss, or draw.
        - Record the result in your "battlelog"
        - Save the updated game state (ie. player/cpu pokemon and health) to a cookie(s)
*/


/*
    - Use selectors to target and fill in the img, .name, and .health elements on battle.html
    - Display the .battlelog contents
    - If the battle is over, present the user with a button to go back to index.html to start a new round
      and also wipe the cookies. 
    - Otherwise, present the user with a button to refresh the page and complete the next battle sequence.
*/

const pokemonCookie = JSON.parse(Cookies.get("pokemon-battle"));

Object.keys(pokemonCookie).map((key) => {
  var element = document.querySelector(`.${key}`);
  var img = element.querySelector("img");

  img.src = pokemonCookie[key].pokemon.image;
});

const startGameButton = document.querySelector(".game-button");
const battlelog = document.querySelector(".battlelog");

function setGameButtonText() {
  startGameButton.textContent = "Play Again!";
}

startGameButton.addEventListener("click", (e) => {
  const playerAttack = pokemonCookie.player.pokemon.attack;
  const playerCurrentHealth = pokemonCookie.player.currentHealth;

  const cpuAttack = pokemonCookie.cpu.pokemon.attack;
  const cpuCurrentHealth = pokemonCookie.cpu.currentHealth;

  if (startGameButton.textContent === "Play Again!") {
      window.location.href = "/";
    }
  

  if (cpuCurrentHealth <= 0 && playerCurrentHealth <= 0) {
      battlelog.innerHTML = `DRAW!!!`;
  
      setGameButtonText();
  
      return;
    }
  

  if (cpuCurrentHealth <= 0) {
      battlelog.innerHTML = `${pokemonCookie.player.pokemon.name} WINNER!!!`;
  
      setGameButtonText();
  
      return;
    }
  

  if (playerCurrentHealth <= 0) {
      battlelog.innerHTML = `${pokemonCookie.cpu.pokemon.name} WINNER!!!`;
  
      setGameButtonText();
  
      return;

    }
  

  pokemonCookie.cpu.currentHealth = cpuCurrentHealth - playerAttack;
  pokemonCookie.player.currentHealth = playerCurrentHealth - cpuAttack;

  Cookies.set("pokemon-battle", pokemonCookie);

  window.location.href = "/battle.html";
});

battlelog.innerHTML = `cpu current health: ${pokemonCookie.cpu.currentHealth} / player current health: ${pokemonCookie.player.currentHealth}`;
