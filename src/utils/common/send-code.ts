import {isPhone, toast} from '@/tmui/tool/function/util';
import {
    VERIFY_CODE_FAIL,
    VERIFY_CODE_PHONE_ERROR,
    VERIFY_CODE_PHONE_NULL,
    VERIFY_CODE_SUCCESS
} from '@/enums/verifyEnum';   // 显示信息

// 发送验证码
const sendPhoneCode = (phone: number, sendCode: (...args: any[]) => Promise<any>) => {
    if (phone) {
        if (!isPhone(phone as number)) {   // 是否是手机号码
            toast(VERIFY_CODE_PHONE_ERROR);   // 显示信息
        } else {
            sendCode(phone).then(() => {
                toast(VERIFY_CODE_SUCCESS);   // 显示信息
            }).catch(() => {
                toast(VERIFY_CODE_FAIL);   // 显示信息
            }).finally(() => {
                // TODO 倒计时
            });
        }
    } else {
        toast(VERIFY_CODE_PHONE_NULL);   // 显示信息
    }
};

export {sendPhoneCode};

