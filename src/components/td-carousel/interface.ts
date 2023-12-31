export interface listItem {
    url?: string,
    type?: listItemType,
    //视频封面图片。
    img?: string,

    [key: string]: any,
}

export type listItemTypeStr = 'url' | 'type' | 'img'

export enum listItemType {
    img = 'img',
    video = 'video',
    community = 'community'
}
