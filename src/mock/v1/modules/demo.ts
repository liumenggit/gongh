import {defineMock} from '@alova/mock';
import Mock from 'mockjs';
import {createMock} from '@/mock/utils';
import {ResultEnum} from '@/enums/httpEnum';

export const indexInfo = defineMock({
    '/ArticleList2': ({query}) => {
        let {page = 1, pageSize = 10, studentName, clsName} = query;
        page = Number(page);
        pageSize = Number(pageSize);
        const start = (page - 1) * pageSize;
        const filteredStudents = allStudents.slice().reverse().filter(({
            name,
            cls
        }) => (studentName ? name.toLocaleLowerCase().indexOf(studentName.toLocaleLowerCase()) >= 0 : true) && (clsName ? clsName === cls : true));
        return {
            data: {
                total: filteredStudents.length,
                list: filteredStudents.slice(start, start + pageSize)
            }
        };
    },
    '/ArticleList': () => {
        return createMock(
            Mock.mock({
                'data': {
                    total: 45,
                    'list|20': [
                        {
                            'title|+1': 1,
                            'label|0-100': 1,
                            'status|1': [true, false],
                        },
                    ],
                },
                'message': '修改成功',
                'code': ResultEnum.SUCCESS,
            }),
        );
    },
});

const allStudents = [
    {
        name: 'August',
        cls: 'class 1'
    },
    {
        name: 'Marshall',
        cls: 'class 3'
    },
    {
        name: 'Maxwell',
        cls: 'class 1'
    },
    {
        name: 'Kevin',
        cls: 'class 1'
    },
    {
        name: 'Julian',
        cls: 'class 2'
    },
    {
        name: 'Maxwell',
        cls: 'class 2'
    },
    {
        name: 'August',
        cls: 'class 1'
    },
    {
        name: 'Maxwell',
        cls: 'class 3'
    },
    {
        name: 'Marshall',
        cls: 'class 1'
    },
    {
        name: 'William',
        cls: 'class 1'
    },
    {
        name: 'Maxwell',
        cls: 'class 3'
    },
    {
        name: 'Marshall',
        cls: 'class 1'
    },
    {
        name: 'Kevin',
        cls: 'class 1'
    },
    {
        name: 'Julian',
        cls: 'class 2'
    },
    {
        name: 'Maxwell',
        cls: 'class 2'
    },
    {
        name: 'Marshall',
        cls: 'class 3'
    },
    {
        name: 'Maxwell',
        cls: 'class 1'
    },
    {
        name: 'Kevin',
        cls: 'class 1'
    },
    {
        name: 'Julian',
        cls: 'class 2'
    },
    {
        name: 'Maxwell',
        cls: 'class 2'
    },
    {
        name: 'Kevin',
        cls: 'class 1'
    },
    {
        name: 'Julian',
        cls: 'class 2'
    },
    {
        name: 'Maxwell',
        cls: 'class 2'
    },
    {
        name: 'Kevin',
        cls: 'class 1'
    },
    {
        name: 'Kevin',
        cls: 'class 1'
    },
    {
        name: 'Julian',
        cls: 'class 2'
    },
    {
        name: 'Maxwell',
        cls: 'class 2'
    },
    {
        name: 'Kevin',
        cls: 'class 1'
    },
    {
        name: 'Kevin',
        cls: 'class 1'
    },
    {
        name: 'Julian',
        cls: 'class 2'
    },
    {
        name: 'Kevin',
        cls: 'class 1'
    },
    {
        name: 'Julian',
        cls: 'class 2'
    },
    {
        name: 'Kevin',
        cls: 'class 1'
    },
    {
        name: 'Julian',
        cls: 'class 2'
    },
    {
        name: 'Maxwell',
        cls: 'class 2'
    },
    {
        name: 'Julian',
        cls: 'class 2'
    },
    {
        name: 'Kevin',
        cls: 'class 1'
    },
    {
        name: 'Kevin',
        cls: 'class 1'
    },
    {
        name: 'Julian',
        cls: 'class 2'
    },
    {
        name: 'Kevin',
        cls: 'class 1'
    }
].map((item, i) => ({
    id: i + 1,
    ...item
}));
