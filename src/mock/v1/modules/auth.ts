import {defineMock} from '@alova/mock';
import {join, sampleSize} from 'lodash-es';
import {createMock} from '@/mock/utils';
import {ResultEnum} from '@/enums/httpEnum';
import * as _ from 'lodash';
import Mock from "mockjs";

const createRandomToken = (len = 36 * 6) => {
    const token = join(sampleSize('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ._-', len), '');
    return `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.${token}`;
};


function findDataById(data: any, id: number) {
    for (const item of data) {
        console.log(item, data, Number(id));
        if (item.id === Number(id)) {
            return item;
        }
        if (item.children) {
            const result = findDataById(item.children, Number(id));
            if (result) {
                return result;
            }
        }
    }
    return null;
}

const cityData = [
    {
        text: '内蒙古',
        id: 0,
        children:
            [
                {
                    text: '呼伦贝尔市',
                    id: 8,
                    children:
                        [{text: '海拉尔', id: 102}]
                },
                {
                    text: '呼伦贝尔市',
                    id: 11,
                    children:
                        [{text: '莫旗', id: 122}]
                }
            ]
    },
    {
        text: '黑龙江',
        id: 1,
        children:
            [
                {
                    text: '哈尔滨',
                    id: 8,
                    children:
                        [{text: '哈哈哈', id: 102}]
                },
                {
                    text: '大庆',
                    id: 11,
                    children:
                        [{text: '这里', id: 122}]
                }
            ]
    }
];

export const authMocks = defineMock({

});
