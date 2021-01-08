class Food{
    constructor(){
        this.foodStock = 10;
        this.image = loadImage("images/Milk.png")
        this.lastFed;
        
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    deductFood(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock - 1;
        }else{
            return this.foodStock;
        }
    }

    getFoodStock(){
        return this.foodStock;
    }

    getFedTime(lastFed){
        this.lastFed = lastFed;
    }

    display(){
        fill(255,255,254);
        textSize(15);
        if(lastFed > 12){
            text("Last Feed : " + lastFed % 12 + " PM",400,50);
          }else if(lastFed === 12){
            text("Last Fed : 12 PM",400,50);
          }else if(lastFed === 0){
            text("Last Feed : 12 AM",400,50);
          }else{
            text("Last Feed :" + lastFed + " AM",400,50);
          }

       var x = 80;
       var y = 100;

       imageMode(CENTER);
       image(this.image,2020,220,70,70);

       if(this.foodStock !== 0){
           for(var i=0;i<this.foodStock;i++){
               if(i%10 === 0){
                   x = 80;
                   y = y+50;
               }
               image(this.image,x,y,50,50);
               x=x+30;
           }
       }
    }

    bedroom(){
        background(bedroom,550,500)
    }

    garden(){
        background(garden,550,500);
    }

    washroom(){
        background(washroom,550,500);
    }
}