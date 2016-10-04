// Make a game where dice rolls determine damage and the human player fights
// against a computer. Make sure that the functionality which deducts hp after
// dice has been rolled. Insert background image, background music

// maybe create a potion function
// ask shi hao regarding canvas

// bonus: animation movement, victory music, encounter system.

var currentPlayer = 1

function dmgRoll(result) {
  switch(result) {
    case 1:
    case 2:
      return 1;
      break;
    case 3:
    case 4:
      return 2;
      break;
    case 5:
    case 6:
      return 3;
      break;
    }
}

var $dice = $('.roll');

$dice.on('click', clickHandler)

function roll() {
  return Math.floor(Math.random()*6) + 1
}

function clickHandler() {

  var hpBarOne = document.querySelector('#healthOne')
  var hpBarTwo = document.querySelector('#healthTwo')
  var hpBarThree = document.createElement('progress')
  hpBarThree.id = 'healthThree'
  hpBarThree.class = 'health'
  hpBarThree.value = 30
  hpBarThree.max = 10
  var hpBarFour = document.createElement('progress')
  hpBarFour.id = 'healthFour'
  hpBarFour.value = 40
  hpBarFour.max = 40
  var hpBarFive = document.createElement('progress')
  hpBarFive.id = 'healthFive'
  var hpBarSix = document.createElement('progress')
  hpBarSix.id = 'healthSix'

  var hp = document.querySelector('.hp')

  applyDmg();
  turnChange();
  checker();

  // var $displayOne = $('.displayOne')
  // var $displayTwo = $('.displayTwo')

  function applyDmg() {
    var damage = dmgRoll(roll())
    if (currentPlayer === 1) {
      return hpBarTwo.value = hpBarTwo.value - damage
    } else {
      return hpBarOne.value = hpBarOne.value - damage
    // } else {
    //   return hpBarThree.value = hpBarThree.value - damage
    // } else {
    //   return hpBarFour.value = hpBarFour.value - damage
    }
    // if (currentPlayer === 1) {
    //   return $displayOne.text(damage + ' damage')
    // } else {
    //   return $displayTwo.text(damage + ' damage')
    // }
  }


  function turnChange() {
    if (currentPlayer === 1) {
      currentPlayer = 2
    } else {
      currentPlayer = 1
    }
  }

  function checker() {

    if (hpBarOne.value < 1) {
      alert("You have lost, try again!!")
      window.location.reload();
    }
    if (hpBarTwo.value < 1) {
      alert("You have won, here comes the next challenger")
      hpBarOne.value = 70
      hpBarOne.max = 70
      hp.removeChild(hpBarTwo)
      hp.appendChild(hpBarThree)
    }
    if (hpBarThree.value < 1) {
      alert("You have won, here comes the next challenger")
      hpBarOne.value = 80
      hpBarOne.max = 80
      hp.removeChild(hpBarThree)
      hp.appendChild(hpBarFour)
    }
    // if (hpBarTwo.value < 1) {
    //   alert("You have won, here comes the next challenger")
    //   hpBarOne.value = 90
    //   hpBarOne.max = 90
    //   hpBarTwo.value = 50
    //   console.log(hpBarOne.value)
    // }
    // if (hpBarTwo.value < 1) {
    //   alert("You have won, here comes the next challenger")
    //   hpBarOne.value = 100
    //   hpBarOne.max = 100
    //   hpBarTwo.value = 60
    //   console.log(hpBarOne.value)
    // }
  }
}

function generateEnemy() {

  // if (hpBarTwo.value < 1) {
  //   alert("You have won, here comes the next challenger")
  //   hpBarOne.value = 70
  //   hpBarOne.max = 70
  //   hpBarTwo.value = 30
  //   console.log(hpBarOne.value)
  // }
  // if (hpBarTwo.value < 1) {
  //   alert("You have won, here comes the next challenger")
  //   hpBarOne.value = 80
  //   hpBarOne.max = 80
  //   hpBarTwo.value = 40
  //   console.log(hpBarOne.value)
  // }
  // if (hpBarTwo.value < 1) {
  //   alert("You have won, here comes the next challenger")
  //   hpBarOne.value = 90
  //   hpBarOne.max = 90
  //   hpBarTwo.value = 50
  //   console.log(hpBarOne.value)
  // }
  // if (hpBarTwo.value < 1) {
  //   alert("You have won, here comes the next challenger")
  //   hpBarOne.value = 100
  //   hpBarOne.max = 100
  //   hpBarTwo.value = 60
  //   console.log(hpBarOne.value)
  // }
}
