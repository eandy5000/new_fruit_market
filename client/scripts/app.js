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
       var joe = new Player("Joe", startMoney);
 //fruit setup      
       var gameFruit = [];
       var apple = new Purchase("Apple",5);
       apple.fruitImage = '../media/apple.png';
       
       gameFruit.push(apple);
       
// GAME MECHANICS

        
//DOM

function addMarketFruits () {
    
    var el = '<h5>Fruit: '+apple.name+'</h5>'+
            '<img src=" ' + apple.fruitImage + ' " alt="fruit image">'+
            '<h6>Price: $'+apple.price+'</h6>'+
            '<button class="sell btn btn-primary btn-lg">Buy</button>'+
            '<button class="sell btn btn-info btn-lg">Sell</button>';
    
    
    $('#market-ticker').append(el);
}

function addPlayer () {
    var el = '<h5>Name: '+joe.name+'</h5>'+
             '<h5>Money: $'+joe.money+'</h5';
    
    $('#player-screen').append(el);
}

$(document).ready(function(){
    
 // inital dom config
 addMarketFruits(); 
 addPlayer();  
    
    
});  
       