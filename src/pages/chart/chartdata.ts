const colorList = ['rgb(255, 97, 105)', 'rgb(255, 145, 97)', 'rgb(255, 194, 97)', 'rgb(30, 197, 144)', 'rgb(35, 154, 229)']
const img="https://picsum.photos/200/300?id=666"
const datas = [
    {
        value: 1330000,
        name: '陈巴尔虎旗',
    },
    {
        value: 52,
        name: '海拉尔',
    },
    {
        value: 48,
        name: '扎兰屯',
    },
    {
        value: 36,
        name: '牙克石',
    },
    {
        value: 30,
        name: '鄂温克',
    },
    {
        value: 30,
        name: '根河',
    },
    {
        value: 30,
        name: '额尔古纳',
    },
    {
        value: 30,
        name: '满洲里',
    },
    {
        value: 30,
        name: '阿荣旗',
    },
    {
        value: 30,
        name: '东旗',
    },
];
const maxArr = new Array(datas.length).fill(datas[0].value * 1.5);
export const chartdata = {

    lineChart: {
        backgroundColor: '#11283a',
        title: {
            text: '排名',
            top: 0,

            left: 'center',
            textStyle: {
                color: '#fff',
                fontSize: 20,
            },
        },
        tooltip: {
            show: true,
        },
        legend: {
            show: false,
        },
        grid: {
            left: '-5%',
            right: '2%',
            bottom: '-9%',
            top: '2%',
            containLabel: true,
        },
        xAxis: {
            show: false,
            type: 'value',
        },
        yAxis: [
            {
                type: 'category',
                inverse: true,
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisPointer: {
                    label: {
                        show: true,
                        margin: 30,
                    },
                },
                data: datas.map((item) => item.name),
                axisLabel: {
                    margin: 35,
                    fontSize: 12,
                    align: 'left',
                    color: '#fff',
                    rich: {
                        a: {
                            padding: [0, 0, 10, 10],
                        },
                        a6: {
                            color: '#fff',
                            backgroundColor: {
                                image: img,
                            },
                            width: 30,
                            height: 30,
                            align: 'center',
                            borderRadius: 30,
                        },
                        a1: {
                            color: '#fff',
                            backgroundColor: 'rgba(255, 97, 105, 0.6)',
                            width: 30,
                            height: 30,
                            align: 'center',
                            borderRadius: 30,
                        },
                        a2: {
                            color: '#fff',
                            backgroundColor: 'rgba(255, 145, 97, 0.6)',
                            width: 30,
                            height: 30,
                            align: 'center',
                            borderRadius: 30,
                        },
                        a3: {
                            color: '#fff',
                            backgroundColor: 'rgba(255, 194, 97, 0.6)',
                            width: 30,
                            height: 30,
                            align: 'center',
                            borderRadius: 30,
                        },
                        a4: {
                            color: '#fff',
                            backgroundColor: 'rgba(30, 197, 144, 0.6)',
                            width: 30,
                            height: 30,
                            align: 'center',
                            borderRadius: 30,
                        },
                        a5: {
                            color: '#fff',
                            backgroundColor: 'rgba(35, 154, 229, 0.6)',
                            width: 30,
                            height: 30,
                            align: 'center',
                            borderRadius: 30,
                        },
                    },
                    formatter: function (params) {
                        let index = datas
                            .map((item) => item.name)
                            .indexOf(params);
                        index = index + 1;
                        return ['{a' + index + '|' + index + '}' + '  ' + '{a|' + '}'].join('\n');
                    },
                },
            },
            {
                type: 'category',
                inverse: true,
                axisTick: 'none',
                axisLine: 'none',
                axisLabel: {
                    show: true,
                    fontSize: 14,
                    color: '#aae9ff',
                    inside: true,
                    formatter: function (value, index) {
                        return datas[index].name + '   ' + datas[index].value;
                    },
                    rich: {
                        a: {
                            padding: [0, 0, 0, 0],
                        },
                    },
                },
                data: datas.map((item) => item.value),
            },
        ],
        series: [
            {
                z: 2,
                name: '数量',
                type: 'bar',
                barWidth: 7,
                zlevel: 1,
                data: datas.map((item, i) => {
                    return {
                        value: item.value,
                        itemStyle: {
                            color: colorList[i],
                        },
                    };
                }),
            },
            {
                name: '背景',
                type: 'bar',
                barWidth: 7,
                barGap: '-100%',
                itemStyle: {
                    color: 'rgba(118, 111, 111, 0.1)',
                },
                tooltip: {
                    show: false,
                },
                data: maxArr,
            },
        ],
    }
};
