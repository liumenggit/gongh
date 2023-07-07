<template>
    <view class="flex flex-col" v-if="lazy">
        <scroll-view @refresherpulling="pulling" @refresherrestore="tipShow = false" @refresherabort="tipShow=false"
                     @refresherrefresh="pullStart"
                     refresher-default-style="none"
                     :refresher-enabled="true"
                     :refresher-threshold="20"
                     :refresher-triggered="Loading"
                     :scroll-y="true" :style="[
        {
          height:`${props.height}rpx`,
          'overflow-anchor': 'auto',
          width: `${props.width}rpx`,
        },
      ]">
            <tm-sheet :height="30" unit="px" v-if="tipShow" :margin="[0, 0]" :padding="[12,12]"
                      _class="flex flex-col flex-col-center-center">
                <slot name="top" :status="status">
                    <tm-icon :color="props.color" :font-size="24" v-if="status === 'loading'" spin
                             name="tmicon-shuaxin"></tm-icon>
                    <view @click="reset" v-if="status === 'error'" class="flex flex-row flex-center">
                        <tm-icon :userInteractionEnabled="false" color="red" :font-size="24"
                                 name="tmicon-times-circle-fill"></tm-icon>
                        <tm-text :userInteractionEnabled="false" color="red" :font-size="24" _class="pl-16"
                                 label="加载失败,点我重试"></tm-text>
                    </view>
                </slot>
            </tm-sheet>
            <slot name="default" :data="props.data" v-if="first"></slot>
            <!--      <view class="flex flex-col relative" v-if="first">-->
            <!--        <view :style="{ width: `${props.width}rpx` }">-->
            <!--         -->
            <!--        </view>-->
            <!--      </view>-->
        </scroll-view>
    </view>
</template>
<script lang="ts" setup>
import {ref, computed, Ref, PropType, onMounted, ComputedRef, watch} from "vue";
import {scrollDetailFace, statusType} from "./interface";
import tmIcon from "@/tmui/components/tm-icon/tm-icon.vue"
import tmSheet from "@/tmui/components/tm-sheet/tm-sheet.vue"
import tmText from "@/tmui/components/tm-text/tm-text.vue"
const emits = defineEmits(["pullEnd", "pullStart", "status"]);
const props = defineProps({
    lazy: {
        type: Boolean,
        default: true,
    },
    width: {
        type: Number,
        default: 300,
    },
    height: {
        type: Number,
        default: 500,
    },
    data: {
        type: [Object, Array<any>],
        default: () => {},
    },
    load: {
        type: [Function, Boolean],
        default: () => true,
    },
    //首次加载渲染时，是否触发加载数据事件。
    firstLoad: {
        type: Boolean,
        default: true,
    },
    tipText: {
        type: String,
        default: '首次提示',
    },
    color: {
        type: String,
        default: "primary",
    },
});
const scrollTop = ref(0);
const Loading = ref(false);
const lazy = ref(false)
const first = ref(false)
const tipShow = ref(false)
const status: Ref<statusType> = ref("never");
const pulling = function (e: any) {
    tipShow.value = true
    status.value = status.value == "error" ? "error" : "loading"
}
const pullStart = async () => {
    if (typeof props.load === "function") {
        if (Loading.value) return
        Loading.value = true
        status.value = "loading"
        tipShow.value = true
        let p = await props.load();
        if (typeof p === "function") {
            p = await p();
        }
        if (!p) {
            status.value = "error"
            return;
        }
        Loading.value = false;
        status.value = "success"
        tipShow.value = false
        first.value = true
    }
};

const reset = function () {
    Loading.value = false;
    pullStart();
};

watch(
    () => props.lazy,
    () => {
        if (!lazy.value) pullStart();
        lazy.value = true
    }
);

onMounted(() => {
    if (props.firstLoad && props.lazy) {
        lazy.value = true
        pullStart();
    }
});
</script>