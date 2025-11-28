class Wrestler {
  constructor(name, hometown, gender, strength, stamina, agility, charisma, grapple, aerial, fatigue) {
    this.name = name;
    this.hometown = hometown;
    this.gender = gender;
    this.strength = strength;
    this.stamina = stamina;
    this.agility = agility;
    this.charisma = charisma;
    this.grapple = grapple;
    this.aerial = aerial;
    this.fatigue = fatigue;
  }
}

const roster = [
  new Wrestler("Pancake Perkins", "Portland", "Male", 6, 8, 4, 9, 7, 3, 2),
  new Wrestler("The Spicy Ottoman", "Istanbul", "Male", 8, 6, 5, 7, 9, 4, 3),
  new Wrestler("Uncle Dynamite", "Nashville", "Male", 9, 7, 6, 8, 8, 5, 4),
  new Wrestler("Skyflash Solis", "Phoenix", "Female", 5, 9, 10, 6, 4, 9, 1),
  new Wrestler("Titan Breaker", "Detroit", "Male", 10, 8, 3, 5, 10, 2, 5),
  new Wrestler("Night Terror Knox", "Salem", "Male", 7, 6, 8, 9, 6, 7, 3),
  new Wrestler("Valkyrie Vega", "Las Vegas", "Female", 8, 7, 9, 8, 7, 8, 2),
  new Wrestler("Ember Thorne", "Atlanta", "Female", 6, 8, 7, 7, 5, 6, 4),
  new Wrestler("Sapphire Vandal", "Miami", "Female", 7, 6, 9, 10, 6, 8, 3),
  new Wrestler("Nova Tempest", "Seattle", "Female", 5, 9, 8, 6, 4, 9, 2),
  new Wrestler("The Vandal Saint", "New Orleans", "Male", 8, 7, 6, 9, 8, 5, 4),
  new Wrestler("Widowmaker Voss", "Chicago", "Female", 9, 6, 7, 5, 9, 6, 5),
  new Wrestler("Razor Seraph", "Boston", "Male", 7, 8, 9, 6, 7, 8, 3),
  new Wrestler("Ironjaw Magnus", "Pittsburgh", "Male", 10, 9, 4, 4, 10, 3, 6),
  new Wrestler("Brutus Avalanche", "Denver", "Male", 10, 8, 2, 6, 9, 1, 7),
  new Wrestler("Wrecktower Wade", "Dallas", "Male", 9, 7, 5, 7, 9, 4, 5),
  new Wrestler("The Comet Kid", "Houston", "Male", 4, 10, 10, 8, 3, 10, 1),
  new Wrestler("Aero Vyper", "San Diego", "Female", 6, 8, 10, 7, 5, 9, 2),
  new Wrestler("Blitz Falcon", "Minneapolis", "Male", 7, 9, 9, 6, 6, 8, 3),
  new Wrestler("Glitterbeard Greg", "San Francisco", "Male", 5, 6, 7, 10, 4, 6, 4)
];

export default Wrestler;
export { roster };