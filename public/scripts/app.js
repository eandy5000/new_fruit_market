function priceChange(){var t=Math.floor(100*Math.random()+1);return t>=50?(t-=50,t/=100,parseFloat(t.toFixed(2))):50>t?t/-100:void 0}function Fruit(t,e,n){this.name=t,this.price=e}function Player(t,e){this.name=t,this.money=e,this.inventory=[]}function Purchase(t,e){this.price=e,this.name=t}function addMarketFruits(){var t="<h5>Fruit: "+apple.name+'</h5><img src=" '+apple.fruitImage+' " alt="fruit image"><h6>Price: $'+apple.price+'</h6><button class="sell btn btn-primary btn-lg">Buy</button><button class="sell btn btn-info btn-lg">Sell</button>';$("#market-ticker").append(t)}function addPlayer(){var t="<h5>Name: "+joe.name+"</h5><h5>Money: $"+joe.money+"</h5";$("#player-screen").append(t)}const startPrice=5,startMoney=100;Fruit.prototype={get fruitPrice(){return this.price},set fruitPrice(t){return this.price=this.price+t},set fruitImage(t){return this.image=t},get FruitImage(){return this.image}},Player.prototype={get playerMoney(){return this.money},set playerMoney(t){return this.money=this.money+t},get playerInventory(){return this.inventory},set playerInventory(t){return this.inventory.push(t)}},Purchase.prototype={get purchaseName(){return this.name},get purchasePrice(){return this.price},set purchasePrice(t){return this.price=this.price+t}};var joe=new Player("Joe",startMoney),gameFruit=[],apple=new Purchase("Apple",5);apple.fruitImage="../media/apple.png",gameFruit.push(apple),$(document).ready(function(){addMarketFruits(),addPlayer()});