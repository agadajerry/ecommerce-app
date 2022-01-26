"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
function Cart(initItems) {
    this.items = initItems.items;
    this.totalQty = 0;
    this.totalPrice = 0;
    console.log(this.items);
    if (Object.keys(this.items).length > 0) {
        for (let key in this.items) {
            this.totalQty += this.items[key].qty;
            this.totalPrice += this.items[key].qty * Number(this.items[key].item.product_price);
        }
    }
    this.add = (item, id) => {
        let storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { qty: 0, item: item, price: 0 };
        }
        storedItem.qty++;
        storedItem.price = Number(storedItem.item.product_price) * storedItem.qty;
        this.totalQty++;
        this.totalPrice += Number(storedItem.price);
    };
    this.generateArray = () => {
        let arr = [];
        for (let id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
}
exports.Cart = Cart;
;
exports.default = Cart;
