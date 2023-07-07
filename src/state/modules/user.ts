import {USER_INFO_KEY} from '@/enums/cacheEnum';
import {defineStore} from 'pinia';
import {getCache, setCache} from '@/utils/cache';
import {getUserInfo, setUserAvatar, setUserNickName, setUserPhone, verifyUserCard} from '@/services/api/user';
import {UserCardVerifyParams, UserInfoState} from '@/services/model/userModel';
import {toast} from '@/tmui/tool/function/util';
import {uploadFileOss} from '@/utils/common/upload-file';

export const useUserStore = defineStore('userInfo', {
    state: (): UserInfoState => (getCache<UserInfoState>(USER_INFO_KEY) || {
        auth: {
            card: {
                cardId: null
            }
        },
        phone: 18647012056,
        avatar: 'https://picsum.photos/200',
        nickname: '刘老六'
    }),
    getters: {},
    actions: {
        /**
         * 更新用户信息
         * @returns {Promise<void>}
         */
        updateUserInfo() {
            console.log('更新用户信息');
            getUserInfo().send().then((userInfo) => {
                setCache(USER_INFO_KEY, userInfo);
                // @ts-ignore
                this.$state = userInfo;
            });
        },
        /**
         * 设置用户信息
         * @param {UserInfo} userInfo
         * @returns {Promise<void>}
         */
        async setUserInfo(userInfo: UserInfoState) {
            setCache(USER_INFO_KEY, userInfo);
            // @ts-ignore
            this.$state = userInfo;
        },
        setAvatar(avatarUrl: string) {
            return new Promise((resolve, reject) => {
                uploadFileOss(avatarUrl).then((res) => {
                    console.log('uploadOssFile', res);
                    setUserAvatar(res as string).send().then((res) => {
                        toast('设置成功');
                        this.updateUserInfo();
                        resolve(true);
                    }).catch(() => {
                        toast('设置失败');
                        reject(false);
                    });
                }).catch(() => {
                    toast('设置失败');
                    reject(false);
                });
            });
        },
        setNickName(nickName: string) {
            return new Promise((resolve, reject) => {
                setUserNickName(nickName).send().then(() => {
                    toast('设置成功');
                    this.updateUserInfo();
                    resolve(true);
                }).catch(() => {
                    toast('设置失败');
                    reject(false);
                });
            });
        },
        setPhone(data: { phone: number, code: number }) {
            return new Promise((resolve, reject) => {
                setUserPhone(data).send().then(() => {
                    toast('设置成功');
                    this.updateUserInfo();
                    resolve(true);
                }).catch(() => {
                    toast('设置失败');
                    reject(false);
                });
            });
        },
        /**
         * 设置用户身份
         * @param {UserCardVerifyParams} card
         * @returns {Promise<Awaited<any>>}
         */
        async setAuthCard(card: UserCardVerifyParams) {
            return new Promise((resolve, reject) => {
                verifyUserCard(card).send().then(() => {
                    toast('设置成功');
                    this.updateUserInfo();
                    resolve(true);
                }).catch(() => {
                    toast('设置失败');
                    reject(false);
                });
            });
        },
    },
});
