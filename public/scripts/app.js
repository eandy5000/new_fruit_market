const startPrice = 5;
const startMoney = 100;       


// functions        
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
       var apple = new Purchase("apple",20);
       apple.fruitImage = '../media/apple.png';
       
       gameFruit.push(apple);
       
// GAME MECHANICS
function buyButton (self) {
  
  
    
    var index = $(self).parent().attr('data-fruit-number');
    var name = gameFruit[index].name;
    var price = gameFruit[index].price;
    var purchase = new Purchase(name, price);
    // fund check
    if((player.money - price) < 0) {
        return;
    } else {
 // checks if fruit is in inventory and increments, or creates and increments   
        if(!player.current[name]){
        player.current[name] = 1;
        } else {
            player.current[name]++;
        }
        player.inventory.push(purchase);
        player.money = player.money - price;
    }
}
        
//DOM

function addMarketFruits () {
   for (var i = 0; i < gameFruit.length; i++) { 
    var el = '<div data-fruit-number ="'+i+'">'+
            '<h5>Fruit: '+gameFruit[i].name+'</h5>'+
            '<img src=" ' + gameFruit[i].fruitImage + ' " alt="fruit image">'+
            '<h6>Price: $'+gameFruit[i].price+'</h6>'+
            '<button class="buy btn btn-primary btn-lg">Buy</button>'+
            '<button class="sell btn btn-info btn-lg">Sell</button>' +
            '</div>';
     
        $('#market-ticker').append(el);
    }  
}

function addPlayer () {
    var el = '<h5>Name: '+player.name+'</h5>'+
             '<h5>Money: $'+player.money+'</h5';
    
    $('#player-screen').append(el);
}

$(document).ready(function(){
    
 // inital dom config
 addMarketFruits(); 
 addPlayer();  
 // listeners
 $('#market-ticker').on('click','.buy', function (){
     var self = this;
     buyButton(self);
 });   
    
});  
       