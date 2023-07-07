declare interface GoodsType {
    create_time: string;
    id: number;
    sass_id: number;
    status: number;
    title: string;
}


declare interface GoodsItem {
    content?: string;
    cover?: string;
    create_time?: string;
    id?: number;
    is_must?: number;
    item?: GoodsSku[];
    price?: number;
    sass_id?: number;
    status?: number;
    title?: string;
    type?: number;
    type_title?: string;
}


interface GoodsSku {
    create_time: string;
    goods_id: number;
    id: number;
    price: number;
    sass_id: number;
    status: number;
    title: string;
    type: string;
}
