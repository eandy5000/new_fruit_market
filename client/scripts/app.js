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
        this.image = image;
}
       
Fruit.prototype = {
    get fruitPrice () {
        return this.price;
    },
    set fruitPrice (num) {
        return this.price = this.price + num;
    },
    set image (url) {
        return this.image = url;
    },
    get image () {
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
       
// game setup                 
       
       var joe = new Player("Joe", startMoney);
       
       var apple = new Purchase("Apple",5);
       
// game mechanics        

$(document).ready(function(){
    
});  
       