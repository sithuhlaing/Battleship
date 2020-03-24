# Battleship

Please refer to https://en.wikipedia.org/wiki/Battleship_(game) if you aren't familiar with Battleship game. This assignment is a simplified variation of this game.
There are two players in this game, Defender and Attacker.
The game is played with a fleet of the following ships: 1x Battleship, 2x Cruisers, 3x Destroyers and 4x Submarines.
Ships are placed on a game board. A game board is a 10x10 grid where each grid cell is
identified by unique coordinates. Each ship occupies a number of consecutive squares on the
grid, arranged either horizontally or vertically.
The number of squares for each ship is determined by the type of the ship. Ship placements
cannot overlap or be next to each other. Only one ship can occupy any given square in the grid.
Ships should have at least one square between them in all directions.
A defender must setup a game board and place all available ships on it. An attacker must then
find and destroy all ships on the board. After all ships have been placed by the Defender, the Attacker will start to attack by announcing a target square in the grid to which it is going to shoot. After the attacker has sunk all the ships placed by the defender, the game is over.

## Expected behavior and endpoints
All inputs should be validated against an interface schema and the game rules. Invalid payloads
or invalid game moves should return corresponding http response codes and messages.

### Status endpoint
Gets a state of a game board and a fleet including individualship states.

### New game endpoint
Creates a new game session.

### Ship placement endpoint
Places a single ship on a board.

### Attack endpoint
Attacks specific coordinates on a board.
Here are some of the expected responses:
  - “Miss” - when an Attacker misses.
  - “Hit” - when a ship has been hit but not sunk. Do not provide any additional info about
  what kind of ship was hit.
  - “You just sank a X” - followed by a ship type. Show this message when an Attacker has
  successfully sunk a ship, i.e. all squares making up that ship on a board has successfully
  been hit.
  - “Win! You have completed the game in X moves” - together with the number of moves
  (attacks) it took an Attacker to sink all the ships and a total of all missed shots.
