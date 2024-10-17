

alert("Loaded Basket JS");

/*
Create a function that takes two objects,
basket and prices as parameters
where basket is a mapping from products (string) to quantities (number)
and prices is a mapping from products(String) to prices (number)
and returns the total cost of the basket
*/

let basketCost=(b,p)=>{
    alert("doing something");
    return 0; //clearly wrong!
}

alert(basketCost({},{}))

let basketCost = (basket, prices) => {
    let totalCost = 0;


    for (let product in basket) {
        if (basket.hasOwnProperty(product) && prices.hasOwnProperty(product)) {
            // Multiply the quantity of the product by its price
            totalCost += basket[product] * prices[product];
        }
    }

    return totalCost;
}

let basket = {
    "apple": 2,
    "banana": 3,
    "orange": 1
};

let prices = {
    "apple": 1.5,
    "banana": 0.75,
    "orange": 1.25
};

alert("Total cost: $" + basketCost(basket, prices));