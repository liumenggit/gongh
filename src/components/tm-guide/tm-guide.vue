<template>
  <view v-if="guideState">
    <view class="fulled fulled-height fixed t-0 l-0 zIndex-26"></view>
    <view class="fixed t-0 l-0 shadow-2 zIndex-n20 boxshadow"
          :style="Object.assign(renderItem.style,{width:guideItem.width + 'rpx',height:guideItem.height + 'rpx',top:guideItem.top + 'rpx',left:guideItem.left + 'rpx'})"/>
    <tm-image v-for="(imageItem,index) in renderItem.img" @click="clickImage(imageItem)"
              :round="imageItem.round"
              :src="imageItem.src" :width="imageItem.width" :height="imageItem.height" class="fixed zIndex-n20"
              :style="{top:imageItem.top + guideItem.top + 'rpx',left:imageItem.left + guideItem.left + 'rpx'}"/>
  </view>
</template>
<script lang="ts" setup>
import {
  getCurrentInstance,
  computed,
  ref,
  nextTick, Ref,
} from "vue";
import {guideTItem, guideListItem} from "./interface";
import {torpx} from "@/tmui/tool/function/util";
import tmImage from "@/tmui/components/tm-image/tm-image.vue"
let guideList: Ref<guideListItem[]> = ref([])
let guideState: Ref<boolean> = ref(false)
let guideIndex: Ref<number> = ref(0)
let guideItem: Ref<guideTItem> = ref({
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  style: {},
  clickEvent: function (): void {
  }
})
const proxy = getCurrentInstance()?.proxy ?? null;
const parentComs = getParent();
const renderItem = computed(() => guideList.value[guideIndex.value])
const renderItemCss = computed(() => guideList.value[guideIndex.value])


// 点击image事件
function clickImage(imageItem: any) {
  if (imageItem.isNextButton) clickNextButton();
  imageItem.clickEvent && imageItem.clickEvent()
}

// 下一步按钮
function clickNextButton() {
  if (guideIndex.value + 1 >= guideList.value.length) {
    guideState.value = false
    return
  }
  guideIndex.value++
  renderGuideElement(guideIndex.value)
}

//获取父级
function getParent() {
  // console.log('parent',proxy?.$parent?.$options)
  let parent = proxy?.$parent;
  while (parent) {
    if (parent?.parentNameId == "tmWaterfallId" || !parent) {
      break;
    } else {
      parent = parent?.$parent ?? undefined;
    }
  }
  return parent;
}

//开始引导
function startGuide(list: any, startIndex: number) {
  guideList.value = list
  guideIndex.value = startIndex || 0
  guideState.value = true
  renderGuideElement(guideIndex.value)
}

//渲染当前引导元素
function renderGuideElement(index: number) {
  nextTick(() => {
    getReactInfo(renderItem.value.queryClass).then((res: any) => {
      guideItem.value = {
        width: torpx(res.width),
        height: torpx(res.height),
        left: torpx(res.left),
        top: torpx(res.top),
        style: renderItem.value.style
      }
      // console.log('数据检查', guideState.value, guideItem.value)
    })
  });
}

//获取元素的信息
function getReactInfo(queryClass: string) {
  return new Promise((resolve, reject) => {
    const query = uni.createSelectorQuery().in(parentComs);
    query.select(queryClass).boundingClientRect((result) => {
      // console.log('result', result)
      if (result) {
        resolve(result);
      } else {
        reject();
      }
    }).exec();
  })
}

defineExpose({startGuide});
</script>

<style>

.boxshadow {
  box-shadow: 0 0 0 3000px rgba(0, 0, 0, 0.6);
}
</style>