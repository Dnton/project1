// Make a game where dice rolls determine damage and the human player fights
// against a computer. Make sure that the functionality which deducts hp after
// dice has been rolled. Insert background image, background music

// maybe create a potion function
// ask shi hao regarding canvas

// bonus: animation movement, victory music, encounter system.

var currentPlayer = 1
var enemyRoster = [{ max: 40, src: 'images/Thief.gif'}, {max: 60, src: 'images/Fighter.gif'},
   {value: 80, max: 80}, {value: 100, max: 100}]
var $playerHp = $('#healthOne')
var $enemyHp = $('#healthTwo')
var level = -1
function init(){
$playerHp[0].value = 300
$playerHp[0].max = 300
$enemyHp[0].value = 30
$enemyHp[0].max = 30
var $initialImage = $('img')
$initialImage.attr('src', 'images/Fighter.gif' )
}

init()

function dmgRoll(result) {
  switch(result) {
    case 1:
    case 2:
      return 20;
      break;
    case 3:
    case 4:
      return 30;
      break;
    case 5:
    case 6:
      return 40;
      break;
    }
}

var $dice = $('.roll');

$dice.on('click', clickHandler)

function roll() {
  return Math.floor(Math.random()*6) + 1
}

function generateEnemy(enemyIndex) {
   $enemyHp[0].value = enemyRoster[enemyIndex].max
   $enemyHp[0].max = enemyRoster[enemyIndex].max
   var $enemyImage = $('img')
   $enemyImage.attr('src', enemyRoster[enemyIndex].src )
 }

function powerUp () {
  $playerHp[0].value = $playerHp[0].max + 20
  $playerHp[0].max = $playerHp[0].max + 20
}

function clickHandler() {

  var hp = document.querySelector('.hp')

  applyDmg();
  turnChange();
  checker();

  // var $displayOne = $('.displayOne')
  // var $displayTwo = $('.displayTwo')

  function applyDmg() {
    var damage = dmgRoll(roll())
    if (currentPlayer === 1) {
      return $enemyHp[0].value = $enemyHp[0].value - damage
    } else {
      return $playerHp[0].value = $playerHp[0].value - damage
    }
  }

  function turnChange() {
    if (currentPlayer === 1) {
      currentPlayer = 2
    } else {
      currentPlayer = 1
    }
  }

  function checker() {

    if ($playerHp[0].value < 1) {
      alert("You have lost, try again!!")
      window.location.reload();
    }
    else if ($enemyHp[0].value < 1) {
      alert("You have won, here comes the next challenger")
      powerUp()
      level++
      generateEnemy(level)
    }
    if (level === 4) {
      alert("You have won the game!!")
      window.location.reload();
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
