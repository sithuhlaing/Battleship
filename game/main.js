

class Game {
  attackerTurn = true;

  constructor(attacker, defender){
    this.attacker = attacker;
    this.defender = defender;
  }

  getAttackerHint(){

  }

  getDefenderHint(){

  }

  attack(row, col){
    if(this.attackerTurn) {
      checkDefender(row, col);
    }
  }
}




