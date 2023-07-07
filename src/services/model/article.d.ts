declare interface ArticleType {
    create_time: string;
    id: number;
    sass_id: number;
    status: number;
    title: string;
}


declare interface ArticleItem  {
    category?: number;
    category_title?: string;
    content?: string;
    cover?: string;
    create_time?: string;
    id?: number;
    sass_id?: number;
    status?: number;
    title?: string;
}
