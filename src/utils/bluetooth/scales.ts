import {ref} from 'vue';

class Bluetooth {
    private deviceId = '';
    private serviceId = '0000FFE0-0000-1000-8000-00805F9B34FB';
    private characteristicId = '0000FFE1-0000-1000-8000-00805F9B34FB';
    private weight: any;
    private error: any;

    /**
     * 回调
     */
    constructor(weight: any, error: any) {
        this.weight = weight;
        this.error = error;
    }

    /**
     * 关闭链接
     */

    close() {
        uni.closeBluetoothAdapter();
    }

    /**
     * 初始化
     */
    init() {
        uni.openBluetoothAdapter({
            success: () => {
                this.startBluetoothDevicesDiscovery();
            },
            fail: (err) => {
                this.error.value = '初始化失败：某个条件不满足';
                throw new Error('初始化失败：某个条件不满足', err);
            }
        });
    }

    startBluetoothDevicesDiscovery() {
        uni.startBluetoothDevicesDiscovery({
            success: () => {
                uni.onBluetoothDeviceFound((res) => this.found(res));
            },
            fail: () => {
                this.error.value = '搜索设备失败';
                throw new Error('搜索设备失败');
            }
        });
    }

    /**
     * 发现设备
     * @param res
     */
    found(res: any) {
        if (res.devices[0].name === 'BT04-A') {
            this.deviceId = res.devices[0].deviceId;
            uni.createBLEConnection({
                deviceId: this.deviceId,
                success: () => {
                    this.stopBluetooth();
                    this.getBLEDeviceServices();
                }
            });
        }
    }

    /**
     * 停止搜索
     */
    stopBluetooth() {
        uni.stopBluetoothDevicesDiscovery({
            success: () => {
                console.log('停止搜索');
            }, fail: (err) => {
                this.error.value = '停止搜索失败' + err;
            }
        });
    }

    /**
     * 获取设备服务
     */
    getBLEDeviceServices() {
        uni.getBLEDeviceServices({
            deviceId: this.deviceId,
            success: (res) => {
                console.log('设备服务', res);
                this.getBLEDevice();
            }
        });
    }

    /**
     * 获取设备特性
     */
    getBLEDevice() {
        uni.getBLEDeviceCharacteristics({
            deviceId: this.deviceId,
            serviceId: this.serviceId,
            success: (res) => {
                console.log('服务特性', res);
                this.notifyCharacteristic();
            }
        });
    }

    /**
     * 监听消息
     */
    notifyCharacteristic() {
        uni.notifyBLECharacteristicValueChange({
            deviceId: this.deviceId,
            serviceId: this.serviceId,
            characteristicId: this.characteristicId,
            state: true,
            success: () => {
                this.onBLECharacteristic();
            }
        });
    }

    /**
     * 监听结果
     */
    onBLECharacteristic() {
        uni.onBLECharacteristicValueChange((res) => {
            this.weight.value = Number(this.hexCharCodeToStr(this.ab2hex(res.value)));
        });

    }

    /**
     * 转换
     * @param buffer
     * @returns {any}
     */
    ab2hex(buffer: any) {
        const hexArr = Array.prototype.map.call(
            new Uint8Array(buffer),
            function (bit) {
                return ('00' + bit.toString(16)).slice(-2);
            }
        );
        return hexArr.join('');
    }

    /**
     * 转换
     * @returns {any}
     * @param hexCharCodeStr
     */
    hexCharCodeToStr(hexCharCodeStr: any) {
        const trimedStr = hexCharCodeStr.trim();
        const rawStr = trimedStr.substr(0, 2).toLowerCase() === '0x' ? trimedStr.substr(2) : trimedStr;
        const len = rawStr.length;
        if (len % 2 !== 0) {
            alert('存在非法字符!');
            return '';
        }
        let curCharCode;
        const resultStr = [];
        for (let i = 0; i < len; i = i + 2) {
            curCharCode = parseInt(rawStr.substr(i, 2), 16);
            resultStr.push(String.fromCharCode(curCharCode));
        }
        return resultStr.join('');
    }
}

/**
 * 电子秤工厂函数
 * @returns {{init: () => void, weight: Ref<UnwrapRef<number>>, error: Ref<UnwrapRef<null>>, close: () => void}}
 */
function Scales() {
    const weight = ref(0);
    const error = ref(null);
    const bluetooth = new Bluetooth(weight, error);

    return {
        // 时时重量
        weight,
        // 错误信息
        error,
        // 初始化
        init: bluetooth.init.bind(bluetooth),
        // 关闭
        close: bluetooth.close.bind(bluetooth)
    };
}

export {Scales};
