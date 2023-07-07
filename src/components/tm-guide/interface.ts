export interface guideTItem {
    width: number,
    height: number,
    left: number,
    top: number,
    style?: object,
}

export interface guideListItem {
    queryClass: string,
    style?: object,
    img?: Array<img>
}

export interface img {
    width?: number,
    height?: number,
    left?: number,
    top?: number,
    src: string,
    style?: object,
    class?: string,
    round?: number,
    isNextButton: boolean,
    clickEvent?: Function
}