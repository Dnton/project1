// Make a game where dice rolls determine damage and the human player fights
// against a computer. Make sure that the functionality which deducts hp after
// dice has been rolled.
// To-do-list: background music
// ask shi hao regarding canvas, attack animation

// bonus: animation movement, victory music, encounter system.

var currentPlayer = 1
var enemyRoster = [{ max: 80, src: 'images/monster.png'}, {max: 100, src: 'images/Kefka.gif'},
  {max: 120, src: 'images/Sephiroth.png'}, {max: 160, src: 'images/SaferSephiroth.png'}]
var $playerHp = $('#playerHealth')
var $enemyHp = $('#enemyHealth')
var level = -1

var background = $('#intro')

function startMusic () {
  background[0].play()
}

function stopIntro () {
  background[0].pause()
  background[0].currentTime = 0
}

var firstSong = $('#battle')

function playFirstSong () {
  firstSong[0].play()
}

function pauseFirstSong () {
  firstSong[0].pause()
  firstSong[0].currentTime = 0
}

var secondSong = $('#battleTwo')

function playSecondSong () {
  secondSong[0].play()
}

function pauseSecondSong () {
  secondSong[0].pause()
  secondSong[0].currentTime = 0
}

var thirdSong = $('#battleThree')

function playThirdSong () {
  thirdSong[0].play()
}
function pauseThirdSong () {
  thirdSong[0].pause()
  thirdSong[0].currentTime = 0
}

var lastSong = $('#battleFour')

function playLastSong () {
  lastSong[0].play()
}
function pauseLastSong () {
  lastSong[0].pause
  lastSong[0].currentTime = 0
}

function init () {
  $playerHp[0].value = 60
  $playerHp[0].max = 60
  $enemyHp[0].value = 60
  $enemyHp[0].max = 60
  $('#hpbar').text($playerHp[0].value + '/' + $playerHp[0].max + ' HP')
  $('#enemybar').text($enemyHp[0].value + '/' + $enemyHp[0].max + ' HP')
  var $initialImageOne = $('img').eq(0)
  $initialImageOne.attr('src', 'images/Cloud.png')
  var $initialImageTwo = $('img').eq(1)
  $initialImageTwo.attr('id', 'enemy')
  $initialImageTwo.attr('src', 'images/Belias.gif')
  startMusic()
}

init()

// var ctx = document.getElementById('ctx').getContext('2d')
//
// var charList = {};
//
// var img = {}
// img.fireball = new Image()
// img.fireball.src = 'images/fireball.png'
//
// function fire() {
//   var fire = {
//   id:1,
//   x:10,
//   spdX: 50,
//   y:100,
//   spdY:0,
//   width: 40,
//   height: 40,
//   img: img.fireball
//   }
//  charList[1] = fire
// }
//
// function fireGenerator() {
//   fire();
// }
//
// function update() {
//   fireGenerator()
//   updatePosition(fire)
//
//
//
//   ctx.clearRect(0,0, 500, 200)
//
//   for(var key in charList) {
//     updateObject(charList[key])
//   }
// }
//
// function drawObject (something) {
//   ctx.drawImage(something.img, something.x, something.y, something.width, something.height)
// }
//
// function updatePosition (something) {
//   something.x += something.spdX
//   something.y += something.spdY
// }
//
// function updateObject(something) {
//   drawObject(something)
//   updatePosition(something)
// }


function dmgRoll (result) {
  switch (result) {
    case 1:
    case 2:
    case 3:
      return 2
      break
    case 4:
    case 5:
    case 6:
      return 4
      break
    case 6:
    case 7:
    case 8:
      return 6
      break
    case 9:
    case 10:
    case 11:
      return 8
      break
    case 12:
    case 13:
    case 14:
      return 10
      break
    case 15:
    case 16:
    case 17:
      return 12
      break
    case 18:
      return 15
      break
    case 19:
      return 16
      break
    case 20:
      return 20
      break
  }
}

var $dice = $('.roll')

$dice.on('click', clickHandler)
$dice.on('mouseover', attackIcon)

function attackIcon () {
  return 'Attack'
}

function roll () {
  return Math.floor(Math.random() * 20) + 1
}

function generateEnemy (enemyIndex) {
  $enemyHp[0].value = enemyRoster[enemyIndex].max
  $enemyHp[0].max = enemyRoster[enemyIndex].max
  var $enemyImage = $('#enemy')
  $enemyImage.attr('src', enemyRoster[enemyIndex].src)
  dangerZone()
}

function powerUp () {
  $playerHp[0].value = $playerHp[0].value + 20
  $playerHp[0].max = $playerHp[0].max + 20
}

function dangerZone () {
  if ($playerHp[0].value <= 20) {
    $('#playerHealth').addClass('critical')
  } if ($enemyHp[0].value <= 20) {
    $('#enemyHealth').addClass('critical')
  } if ($playerHp[0].value > 20) {
    $('#playerHealth').removeClass('critical')
  } if ($enemyHp[0].value > 20) {
    $('#enemyHealth').removeClass('critical')
  }
}

var hitSound =$('#hit')

function onHit() {
  hitSound[0].play()
}

function clickHandler () {
  onHit()
  applyDmg()
  dangerZone()
  turnChange()
  checker()
  backgroundMusic()
  $('#hpbar').text($playerHp[0].value + '/' + $playerHp[0].max + 'HP')
  $('#enemybar').text($enemyHp[0].value + '/' + $enemyHp[0].max + 'HP')

  function applyDmg () {
    var damage = dmgRoll(roll())
    flashingText(currentPlayer, damage)
    if (currentPlayer === 1) {
      return $enemyHp[0].value = $enemyHp[0].value - damage
    } else {
      return $playerHp[0].value = $playerHp[0].value - damage
    }
  }

  function turnChange () {
    if (currentPlayer === 1) {
      currentPlayer = 2
    } else {
      currentPlayer = 1
    }
  }

  function checker () {
    if ($playerHp[0].value < 1) {
      alert('You have lost, try again!!')
      window.location.reload()
    }
    else if ($enemyHp[0].value < 1) {
      alert('You have won, here comes the next challenger')
      level++
      alert('You have leveled!')
      powerUp()
      if (level === 4) {
        alert('You have won the game!!')
        window.location.reload()
      }
      generateEnemy(level)
    }
  }
  function backgroundMusic () {
    if (level === -1) {
      stopIntro()
      playFirstSong()
    }

    if (level === 0) {
      pauseFirstSong()
      playSecondSong()
    }

    if (level === 1) {
      pauseSecondSong()
      playThirdSong()
    }

    if (level === 2) {
      pauseThirdSong()
      playSecondSong()
    }

    if (level === 3) {
      pauseSecondSong()
      playLastSong()
    }
  }
}

var $potion = $('.potion')

$potion.on('click', heal)

var healSound = $('#cure')

function cure() {
  healSound[0].play()
}

function heal () {
  cure()
  var damage = dmgRoll(roll())
  if ($playerHp[0].value <= 20) {
    $playerHp[0].value = $playerHp[0].value + 25
    $playerHp[0].value = $playerHp[0].value - damage
    $('#cloud').css('display', 'block')
    $('#cloud').text("I'M DOWN BUT NOT OUT!!").fadeOut(3000)
    $('#opponent').css('display', 'block')
    $('#opponent').text('DIE!! DIE!! DIE!!').fadeOut(3000)
  }
  $('#hpbar').text($playerHp[0].value + '/' + $playerHp[0].max + 'HP')
  dangerZone()
}

var $limitBreak = $('.limitBreak')

$limitBreak.on('click', kaboom)

var breakSound = $('#limitbreak')

function hitLimit() {
  breakSound[0].play()
}

function kaboom () {
  var damage = dmgRoll(roll())
  hitLimit()
  bladeDraw()
  dangerZone()
  checker()
  backgroundMusic()
  $('#hpbar').text($playerHp[0].value + '/' + $playerHp[0].max + 'HP')
  $('#enemybar').text($enemyHp[0].value + '/' + $enemyHp[0].max + 'HP')

  function bladeDraw () {
    if ($playerHp[0].value <= 20) {
      $enemyHp[0].value = $enemyHp[0].value - 25
      $playerHp[0].value = $playerHp[0].value - damage
      // $('#cloud').css('display', 'block')
      // $('#cloud').text('Breaking my limits!! This is it!!').fadeOut(1000)
      $('#cloud').css('display', 'block')
      $('#cloud').text('SUPREME MARTIAL GOD STRIKE!! OMNISLASH!!').fadeOut(5000)
      $('#opponent').css('display', 'block')
      $('#opponent').text('WARGHHH!!').fadeOut(5000)
    }
    // setInterval(update, 100)
  }

  function checker () {
    if ($playerHp[0].value < 1) {
      alert('You have lost, try again!!')
      window.location.reload()
    }
    else if ($enemyHp[0].value < 1) {
      alert('You have won, here comes the next challenger')
      level++
      alert('You have leveled!')
      powerUp()
      if (level === 4) {
        alert('You have won the game!!')
        window.location.reload()
      }
      generateEnemy(level)
    }
  }
  function backgroundMusic () {
    if (level === -1) {
      stopIntro()
      playFirstSong()
    }

    if (level === 0) {
      pauseFirstSong()
      playSecondSong()
    }

    if (level === 1) {
      pauseSecondSong()
      playThirdSong()
    }

    if (level === 2) {
      pauseThirdSong()
      playSecondSong()
    }

    if (level === 3) {
      pauseSecondSong()
      playLastSong()
    }
  }
}

// create h3 function between player and hp bar, when damage occurs
// set a function that will record the damage and

function flashingText (myTurn, dmg) {
  if (myTurn === 1 && dmg < 10) {
    $('#cloud').css('display', 'block')
    $('#cloud').text('I NEED TO TRY HARDER!!').fadeOut(1000)
  } if (myTurn === 1 && dmg > 10) {
    $('#cloud').css('display', 'block')
    $('#cloud').text('TAKE THAT!!').fadeOut(1000)
  } if (myTurn === 1 && dmg === 15) {
    $('#cloud').css('display', 'block')
    $('#cloud').text('FINISHING TOUCH!!').fadeOut(1000)
  } if (myTurn === 1 && dmg === 16) {
    $('#cloud').css('display', 'block')
    $('#cloud').text('CLIMHAZZARD!!').fadeOut(1000)
  } if (myTurn === 1 && dmg === 20) {
    $('#cloud').css('display', 'block')
    $('#cloud').text('METEORAIN!!').fadeOut(1000)
  }

  if (myTurn === 2 && dmg < 10) {
    $('#opponent').css('display', 'block')
    $('#opponent').text('TCH, LUCKY!!').fadeOut(1000)
  } if (myTurn === 2 && dmg > 10) {
    $('#opponent').css('display', 'block')
    $('#opponent').text('HAHAHA!!').fadeOut(1000)
  } if (myTurn === 2 && dmg === 15) {
    $('#opponent').css('display', 'block')
    $('#opponent').text('MEGAFLARE!!').fadeOut(1000)
  } if (myTurn === 2 && dmg === 16) {
    $('#opponent').css('display', 'block')
    $('#opponent').text('GAIA RAGE!!').fadeOut(1000)
  } if (myTurn === 2 && dmg === 20) {
    $('#opponent').css('display', 'block')
    $('#opponent').text('CONSUMING DARKNESS!!!').fadeOut(1000)
  }

  if (myTurn === 2) {
    $('#cloud').css('display', 'block')
    $('#cloud').text('Lost ' + dmg + 'hp!').fadeOut(1000)
  } if (myTurn === 1) {
    $('#opponent').css('display', 'block')
    $('#opponent').text('Lost ' + dmg + 'hp!').fadeOut(1000)
  }
}
// add percentages to health activators instead of using a flat number
