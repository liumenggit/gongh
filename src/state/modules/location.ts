import {defineStore} from 'pinia';
// @ts-ignore
import QQMapWX from '@/utils/common/qqmap-wx-jssdk';

const qqmapsdk = new QQMapWX({
    key: '744BZ-M4J6P-OMDDB-LQPFD-OGWS2-3MFQ7'
});

interface LocationStore {
    auto: boolean;
    location: LocationInfo;
}

interface LocationInfo {
    latitude?: number;
    longitude?: number;
    address: Address;
}

interface Address {
    /**
     * 行政区划代码
     */
    adcode: number;
    /**
     * 市 / 地级区 及同级行政区划
     */
    city: string;
    /**
     * 城市代码
     */
    city_code: number;
    /**
     *    区 / 县级市 及同级行政区划
     */
    district: string;
    /**
     * 行政区划名称
     */
    name: string;
    /**
     * 国家
     */
    nation: string;
    /**
     * 国家代码
     */
    nation_code: number;
    /**
     * 电话区号
     */
    phone_area_code: number;
    /**
     * 省 / 直辖市
     */
    province: string;
    /**
     * 位置信息格式化
     */
    address: string;
    /**
     * 行政区划中心点坐标
     */
    location: object;
}

export const useLocationStore = defineStore('location', {
    state: (): LocationStore => ({
        auto: true,
        location: {}
    }),
    getters: {
        getRoutes(state) {
            return state.location;
        },
        getCurrentRoute(state) {
            return state.location;
        },
        getWarpAndLatitude(state) {
            return state.location.latitude ? {
                latitude: state.location.latitude,
                longitude: state.location.longitude
            } : {};
        }
    },
    actions: {
        /**
         * 初始化位置信息
         */
        initialize() {
            return new Promise((resolve, reject) => {
                uni.authorize({
                    scope: 'scope.userLocation',
                    success: () => {
                        uni.startLocationUpdate({
                            success: (res) => {
                                // console.log('开启小程序接收位置消息成功', res);
                                uni.onLocationChange((location) => {
                                    console.log('位置发生变化', location);
                                    // console.log('纬度：' + location.latitude);
                                    // console.log('经度：' + location.longitude);
                                    this.$state.location.latitude = location.latitude;
                                    this.$state.location.longitude = location.longitude;
                                    //
                                    qqmapsdk.reverseGeocoder({
                                        location,
                                        success: (address) => {
                                            // console.log('地理位置信息', address);
                                            this.$state.location.address = {
                                                ...address.result.ad_info,
                                                address: address.result.address
                                            };
                                            resolve(true);
                                        },
                                    });
                                });
                                uni.onLocationChangeError((err) => {
                                    // toast('监听错误' + err);
                                });
                            },
                            fail: err => {
                                // console.error('开启小程序接收位置消息失败：', err);
                                reject(false);
                            },
                            complete: msg => {
                                // console.log('调用开启小程序接收位置消息 API 完成', msg)
                            }
                        });
                    }, fail: () => {
                        console.log('拒绝授权', Object.keys(this.$state.location));
                        if (Object.keys(this.$state.location)) {
                            this.setDefaultLocation();
                        }
                        reject(false);
                    }
                });
            });
        },
        /**
         * 设置授权
         */
        setAuthorize() {
            return new Promise((resolve, reject) => {
                uni.authorize({
                    scope: 'scope.userLocation',
                    success: () => {
                        console.log('userLocation');
                        this.initialize().then(() => {
                            resolve(true);
                        }).catch(() => {
                            reject(false);
                        });
                    }, fail: () => {
                        uni.showModal({
                            title: '地理位置未授权',
                            content: '如需正常使用，请点击确认并在设置页允许"使用我的地理位置"',
                            confirmText: '确认',
                            success: (res) => {
                                if (res.confirm) {
                                    //打开小程序设置页面
                                    uni.openSetting({
                                        success: (resSetting) => {
                                            this.initialize().then(() => {
                                                resolve(true);
                                            }).catch(() => {
                                                reject(false);
                                            });
                                        }, fail: () => {
                                            reject(false);
                                        }
                                    });
                                }
                            }, fail: () => {
                                reject(false);
                            }
                        });
                    }
                });
            });
        },
        /**
         * 设置位置
         */
        setDefaultLocation(location: LocationInfo = null) {
            this.$state.auto = !(location === null);
            console.log('设置定位', location, this.$state.auto);
            this.$state.location = location || {
                latitude: 49.209741,
                longitude: 119.738552,
                address: {
                    adcode: '',
                    city: '默认城市',
                    city_code: '',
                    district: '系统默认位置',
                    name: '',
                    nation: '',
                    nation_code: '',
                    phone_area_code: '',
                    province: '',
                    address: '',
                }
            };
            console.log('location', this.$state.location);
        },
        /**
         * 计算位置距离
         */
        calculateDistance(markers: any) {
            console.log('calculateDistance', markers);
            return new Promise((resolve, reject) => {
                qqmapsdk.calculateDistance({
                    from: this.$state.location,
                    mode: 'straight',
                    to: markers,
                    success: (res: any, data: any) => {
                        console.log('计算记录', res, data);
                        resolve(res.result.elements);
                    },
                    fail: function (error: any) {
                        reject(error);
                    },
                });
            });
        },
        /**
         * 将距离信息写入到标记列表
         * @param markers
         * @param distance
         * @returns {any}
         */
        appendDistance(markers: any, distance: any) {
            return markers.map((ele, index, arr) => {
                return {...ele, ...distance[index]};
            });
        },
        /**
         * 转换距离
         * @param {number} rice
         * @returns {string}
         */
        conversionDistance(rice: number) {
            const length = rice.toString().length;
            switch (length) {
                case 1:
                    return rice.toString() + '米';
                    break;
                case 2:
                    return rice.toString() + '米';
                    break;
                case 3:
                    return rice.toString() + '米';
                    break;
                case 4:
                    return (rice / 1000).toFixed(1).toString() + '公里';
                    break;
                case 5:
                    return (rice / 1000).toFixed(1).toString() + '公里';
                    break;
                case 6:
                    return (rice / 1000).toFixed(0).toString() + '公里';
                    break;
                default:
                    return (rice / 1000).toFixed(0).toString() + '公里';
                    break;
            }
        }
    },
});

// uni.getLocation({
//     geocode: true,
//     type: 'gcj02',
//     success: (location) => {
//         console.log('getLocation', location);
//         this.$state.location.latitude = location.latitude;
//         this.$state.location.longitude = location.longitude;
//         resolve(true);
//     }, fail: (err) => {
//         console.log('获取定位失败');
//         reject('Location');
//     }
// });
