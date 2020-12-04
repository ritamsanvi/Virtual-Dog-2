class Food {
    constructor() {
       
        this.image = loadImage("images/Milk.png")
        this.foodStock=0;
        this.lastFed;

    }
    display() {
        var x = 80, y = 100
        console.log("in display")
        imageMode(CENTER)
        //image(this.image, 720, 220, 70, 70)
        if (this.foodStock != 0) {
            for (var i = 0; i < this.foodStock; i++) {
                if (i % 10 == 0) {
                    x = 720;
                    y = y + 50;
                }

                image(this.image, x, y, 50, 50);
                x = x + 30

            }
        }

    }
       
    updateFoodStock(foodStock){
       this.foodStock= foodStock;
    }

    getFoodStock(){
        return this.foodStock
    }
};
