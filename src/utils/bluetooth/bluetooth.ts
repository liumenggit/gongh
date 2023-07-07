class Bluetooth {
    private deviceId = '';
    private serviceId = '0000FFE0-0000-1000-8000-00805F9B34FB';
    private characteristicId = '0000FFE1-0000-1000-8000-00805F9B34FB';
    private notify: (weight: number) => void;

    /**
     * 回调
     * @param {(weight: number) => void} notify
     */
    constructor(notify: (weight: number) => void) {
        this.notify = notify;
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
            fail(err) {
                throw new Error('初始化失败：某个条件不满足', err);
            }
        });
    }

    startBluetoothDevicesDiscovery() {
        uni.startBluetoothDevicesDiscovery({
            success: () => {
                uni.onBluetoothDeviceFound((res) => this.found(res));
            },
            fail(err) {
                throw new Error('搜索设备失败', err);
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
            success(res) {
                console.log('停止搜索', res);
            }, fail(err) {
                console.error('停止搜索', err);
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
            this.notify(Number(this.hexCharCodeToStr(this.ab2hex(res.value))));
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

export {Bluetooth};
