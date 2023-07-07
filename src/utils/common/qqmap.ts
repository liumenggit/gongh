import QQMapWX from '@/utils/common/qqmap-wx-jssdk';


export async function reverseGeocoder(longitude?: number, latitude?: number) {
    return new Promise<{
        address: string,
        street: string,
        area: string,
        city: string,
        province: string
        latitude: number
        longitude: number,
        raw: any
    }>((resolve, reject) => {
        //位置信息默认数据
        const location = {
            longitude: 0, latitude: 0, province: '', city: '', area: '', street: '', address: '', raw: {}
        };
        uni.getLocation({
            type: 'gcj02', success(res) {

                location.longitude = res.longitude;
                location.latitude = res.latitude;
                // 腾讯地图Api
                const qqmapsdk = new QQMapWX({
                    key: '744BZ-M4J6P-OMDDB-LQPFD-OGWS2-3MFQ7'
                });
                qqmapsdk.reverseGeocoder({
                    location,
                    success(response) {
                        const info = response.result;
                        location.province = info.address_component.province;
                        location.city = info.address_component.city;
                        location.area = info.address_component.district;
                        location.street = info.address_component.street;
                        location.address = info.address;
                        location.raw = response.result;
                        resolve(location);
                    },
                });
            }, fail(err) {
                console.log(err);
                reject(err);
            },
        });
    });
}

export async function locationInfo(longitude?: number, latitude?: number) {
    return new Promise<{
        address: string,
        street: string,
        area: string,
        city: string,
        province: string
    }>((resolve, reject) => {
        const qqmapsdk = new QQMapWX({
            key: '744BZ-M4J6P-OMDDB-LQPFD-OGWS2-3MFQ7'
        });
        qqmapsdk.reverseGeocoder({
            location: longitude ? {
                longitude: longitude,
                latitude: latitude
            } : {}, success(response) {
                const info = response.result;
                location.province = info.address_component.province;
                location.city = info.address_component.city;
                location.area = info.address_component.district;
                location.street = info.address_component.street;
                location.address = info.address;
                resolve(location);
            },
        })
        ;
    });

}


export function calculateDistance() {
    const qqmapsdk = new QQMapWX({
        key: '744BZ-M4J6P-OMDDB-LQPFD-OGWS2-3MFQ7'
    });
    return new Promise<{ address: string }>((resolve, reject) => {
        qqmapsdk.calculateDistance({
            to: [{
                latitude: 39.984060,
                longitude: 116.307520
            }], //终点坐标
            success: (res: any) => {//成功后的回调
                console.log(res);
                resolve(res);
            },
            fail: (error: any) => {
                console.error(error);
            },
            complete: (res: any) => {
                console.log(res);
            }
        });
    });
}
