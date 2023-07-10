import {USER_INFO_KEY} from '@/enums/cacheEnum';
import {defineStore} from 'pinia';
import {getCache, setCache} from '@/utils/cache';
import {
    bindUser,
    getUserInfo,
    setUserAvatar,
    setUserNickName,
    userPerfect,
    verifyUserCard
} from '@/services/api/user';
import {BindUserParams, UserCardVerifyParams, UserInfoState, UserPerfectParams} from '@/services/model/user';
import {toast} from '@/tmui/tool/function/util';
import {uploadFileOss} from '@/utils/common/upload-file';
import {userWxlogin} from '@/services/api/auth';
import {useAuthStore} from '@/state/modules/auth';

export const useUserStore = defineStore('userInfo', {
    state: (): UserInfoState => (getCache<UserInfoState>(USER_INFO_KEY) || {}),
    getters: {},
    actions: {
        login() {
            return new Promise((resolve, reject) => {
                uni.login({
                    provider: 'weixin', // 使用微信登录
                    success: (loginRes) => {
                        console.log('loginRes', loginRes);
                        userWxlogin(loginRes.code).send().then((userInfo) => {
                            this.$state = userInfo;
                            setCache(USER_INFO_KEY, this.$state);
                            useAuthStore().setToken(userInfo.token);
                            resolve(userInfo);
                        }).catch((err) => {
                            console.error(err);
                            reject(err);
                        });
                    },
                });
            });
        },
        bind(bindUserParams: BindUserParams) {
            return new Promise((resolve, reject) => {
                bindUser(bindUserParams).send().then((userInfo) => {
                    console.log('bindUser', userInfo);
                    this.$state = userInfo;
                    setCache(USER_INFO_KEY, this.$state);
                    resolve(userInfo);
                }).catch((err) => {
                    reject(err);
                });
            });
        },
        /**
         * 更新用户信息
         * @returns {Promise<void>}
         */
        updateUserInfo() {
            console.log('更新用户信息');
            getUserInfo().send().then((userInfo) => {
                this.$state = userInfo;
                setCache(USER_INFO_KEY, this.$state);

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
                // setUserPhone(data).send().then(() => {
                //     toast('设置成功');
                //     this.updateUserInfo();
                //     resolve(true);
                // }).catch(() => {
                //     toast('设置失败');
                //     reject(false);
                // });
            });
        },
        /**
         * 完善纤细
         * @returns {Promise<unknown>}
         * @param userPerfectParams
         */
        perfectInfo(userPerfectParams: UserPerfectParams) {
            return new Promise((resolve, reject) => {
                userPerfect(userPerfectParams).send().then(() => {
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
