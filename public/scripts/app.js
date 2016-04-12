const startPrice = 5;
const startMoney = 100; 
// 15 sec round with 12 rounds
const roundTime = 15000;  
const fruitPriceMin = .01;
const fruitPriceMax = 9.99;  

//game variable
var gameComplete = false; 



// functions  
// generates a random price change      
function priceChange () {
    const min = 1;
    const max = 100;
    
  var num = Math.floor(Math.random()*(1 + max - min)+1);
    if(num >= 50) {
        num = num - 50;
        num = num / 100;
        return parseFloat(num.toFixed(2));
    }
    if(num < 50) {
        return num / (-100);
    }
}       
       
// fruit object       
function Fruit (name, price, image){
        this.name = name;
        this.price = price;
}
       
Fruit.prototype = {
    get fruitPrice () {
        return this.price;
    },
    set fruitPrice (num) {
        return this.price = this.price + num;
    },
    set fruitImage (url) {
        return this.image = url;
    },
    get FruitImage () {
        return this.image;
    }
}
       
// player object
function Player (name, money) {
    this.name = name;
    this.money = money;
    this.inventory = [];
    this.current = {};
}

Player.prototype = {
    get playerMoney () {
        return this.money;
    },
    set playerMoney (num) {
        return this.money = this.money + num;
    },
    get playerInventory () {
        return this.inventory;
    },
    
    set playerInventory (item) {
        return this.inventory.push(item)
    }
}  

// purchase object

function Purchase (name, price) {
    this.price = price;
    this.name = name;
}
       
Purchase.prototype = {
    get purchaseName () {
        return this.name;
    },
    get purchasePrice () {
        return this.price;
    },
    set purchasePrice (num) {
        return this.price = this.price + num;
    }
}       
       
// GAME SETUP                 
 // player setup 
       var player;      
       var joe = new Player("Joe", startMoney);
       var player = joe;
 //fruit setup      
       var gameFruit = [];
       
       var apple = new Purchase("Apple", startPrice);
       apple.fruitImage = '../media/apple.png';
       gameFruit.push(apple);
       
       var pear = new Purchase("Pear", startPrice);
       pear.fruitImage = '../media/pear.png';
       gameFruit.push(pear);
       
       var bananas = new Purchase("Bananas", startPrice);
       bananas.fruitImage = '../media/bananas.png';
       gameFruit.push(bananas);
       
       var orange = new Purchase("Orange", startPrice);
       orange.fruitImage = '../media/orange.png';
       gameFruit.push(orange);
       
// GAME MECHANICS

//buy function
function buyButton (self) {
    var index = $(self).parent().attr('data-fruit-number');
    var name = gameFruit[index].name;
    var price = gameFruit[index].price;
 // funds check pre-buy

 if ((player.money - price || gameComplete === true) < 0) {
     return;
 }   else {
    
    var purchase = new Purchase(name, price);
    player.inventory.push(purchase);
    player.money = player.money - price;
 // adds fruit to player's current    
        if (!player.current[name]) {
            player.current[name] = 1;
        } else {
            player.current[name]++;
        }

 }  

}
 // sell function   
 function sellButton (self) {
     var index = $(self).parent().attr('data-fruit-number');
     var name = gameFruit[index].name;
     var price = gameFruit[index].price;
 // pre-sell inventory check
    if (!player.current[name] || player.current[name] < 1 || gameComplete === true) {
        return;
    }   else {
        player.money = player.money + price;
        player.current[name]--;
    }    
   
 }
 
// game length interval 
 function gameInterval () {
    var counter = 0;
     setInterval(function(){
         if ( counter > 12) {
            gameOver(); 
             return;
            } else {
         priceChanger();
         updateMarketFruits();
         counter++; 
            }
         
     }, 2000); // change back to roundtime variable
     
 }
 

//price change interval
function priceChanger () {
    
 //// testObj potential fix for final money problem    
   var testObj = {};
    for (var i = 0; i < gameFruit.length; i++) {
     
        gameFruit[i].price = gameFruit[i].price + priceChange();
        var key = gameFruit[i].name;
        testObj[key] = gameFruit[i].price; 
    }
    console.log(testObj);
    return;
} 

function init () {
 //these two functions change the price at game start
 priceChanger();
 updateMarketFruits();
 // game 
 gameInterval(); 
}
     
//DOM

function updateMarketFruits () {
     $('#market-ticker').empty();
   for (var i = 0; i < gameFruit.length; i++) { 
    var el = '<div data-fruit-number ="'+i+'" class = "col-md-3">'+
            '<h5>Fruit: '+gameFruit[i].name+'</h5>'+
            '<img src=" ' + gameFruit[i].fruitImage + ' " alt="fruit image">'+
            '<h6>Price: $'+(gameFruit[i].price).toFixed(2)+'</h6>'+
            '<button class="buy btn btn-primary btn-lg">Buy</button>'+
            '<button class="sell btn btn-info btn-lg">Sell</button>' +
            '</div>';
     
       
        $('#market-ticker').append(el);
    }  
}

function addPlayer () {
    var el = '<h4>Name: '+player.name+'</h4>'+
             '<h5>Money: $'+(player.money).toFixed(2)+'</h5'; 
 
     $('#player-inventory').append(el);
}

function updatePlayer () {
   var el = '<h4>Name: '+player.name+'</h4>'+
            '<h5>Money: $'+(player.money).toFixed(2)+'</h5><br>';  
       
  
  // fruit inventory display
  for (var i in player.current){
      el = el + '<h5>'+ i + " : " + player.current[i] +'</h5>';
 //     $('#player-inventory').append(el2); 
  }
    $('#player-inventory').empty();
    $('#player-inventory').append(el);
}

// changes directions to game over
function gameOver () {
    
    gameComplete = true;
    return gameStats();
    
}

function gameStats () {
  var money = player.money;
  for (var i in player.current) {
      money = money + (player.current[i])
  }  
    
  var profit =1;  
  var el = '<h1>Game Over!</h1>'+
             '<h5>Transactions: '+player.inventory.length+'</h5>'+
             '<h5>Final money: $'+player.money.toFixed(2)+'</h5>'+
             '<h5>Profit: $'+profit.toFixed(2)+'</h5>';
             
    $('#directions').empty();
    $('#directions').append(el);
}


$(document).ready(function(){
    
 // inital dom config
 updateMarketFruits(); 
 addPlayer();  
 // listeners
 $('#market-ticker').on('click','.buy', function (){
     var self = this;
     buyButton(self);
     updatePlayer();
 });   
 
 $('#market-ticker').on('click', '.sell', function(){
    var self = this; 
    sellButton(self);
    updatePlayer();
 });

 
 // game logic
 //init fires game logic when START is clicked
 $('.jumbotron').on('click', '#start', function(){
    init();
 });
  
});  
       