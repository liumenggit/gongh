import {defineStore} from 'pinia';
import {getCache, setCache} from '@/utils/cache';
import {CART_ITEMS, CART_TOTAL} from '@/enums/cacheEnum';


interface CartItem {
    create_time: string;
    goods_id: number;
    goods_name: string;
    id: number;
    price: number;
    sass_id: number;
    status: number;
    title: string;
    type: string;
    num: number;
    img: string;
    checkbox: boolean,
}

export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        items: getCache<[CartItem]>(CART_ITEMS) || [],
        total: getCache<number>(CART_TOTAL) || 0
    }),
    getters: {
        /**
         * 获取购物车商品数量
         * @returns {Number}
         */
        cartCount(): Number {
            return this.items.length;
        },
        /**
         * 获取当前总价格
         * @returns {Number}
         */
        totalPrice(): Number {
            const test = this.items.reduce((total, item) => {
                return total + (item.checkbox ? item.price * item.num : 0);
            }, 0);
            console.log('total', test);
            return test;
        },
        /**
         * 获取选中订单
         * @returns {[CartItem]}
         */
        getDocument(): [CartItem] {
            // @ts-ignore
            return this.items.filter(item => item.checkbox === true);
        }
    },
    actions: {
        /**
         * 选择商品
         * @param {number} goodsId
         * @param {number} id
         */
        checkToGoods(goodsId: number, id: number) {
            const foundElement = this.items.find(item => item.goods_id === goodsId && item.id === id);
            if (foundElement) {
                foundElement.checkbox = !foundElement.checkbox;
            }
            setCache(CART_ITEMS, this.items);
            setCache(CART_TOTAL, this.total);
            console.log('foundElement', foundElement);
        },
        /**
         * 全选商品
         * @param {boolean} checkbox
         */
        allCheckGoods(checkbox: boolean) {
            this.items.forEach(item => {
                item.checkbox = checkbox;
            });
            setCache(CART_ITEMS, this.items);
            setCache(CART_TOTAL, this.total);
        },
        /**
         * 购物车添加商品
         * @param {CartItem} item
         * @returns {UnwrapRef<[CartItem]>}
         */
        addToCart(item: CartItem) {
            const existingItemIndex = this.items.findIndex(i => i.id === item.id && i.goods_id === item.goods_id);
            if (existingItemIndex !== -1) {
                this.items[existingItemIndex].num += item.num;
            } else {
                this.items.push(item);
            }
            this.total += item.price;
            setCache(CART_ITEMS, this.items);
            setCache(CART_TOTAL, this.total);
            return this.items;
        },
        /**
         * 删除商品
         * @param {CartItem} item
         * @returns {UnwrapRef<[CartItem]>}
         */
        deleteToCart(goodsId: number, id: number) {
            // @ts-ignore
            this.items = this.items.filter(item => !(item.goods_id === goodsId && item.id === id));
            setCache(CART_ITEMS, this.items);
        },
        /**
         * 清空购物车
         */
        clearToCart() {
            // @ts-ignore
            this.items = [];
            setCache(CART_ITEMS, this.items);
            setCache(CART_TOTAL, 0);
        }
    }
});
