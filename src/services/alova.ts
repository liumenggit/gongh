// import {usePagination} from '@alova/scene-vue';
// import {getCollectionOrder} from '@/services/api/reclaim';
// import {ref, Ref} from 'vue';
// import {useRequest} from 'alova';
// import {getCityTree} from '@/services/api/location';
//
// const collectionOrderListParams: Ref<CollectionOrderListParams> = ref({
//     type: 1,
//     status: 0,
//     page: 1,
//     limit: 10
// });
//
// /*
// 分页方法
//  */
// const {
//     loading,
//     data: collectionOrderList,
//     isLastPage,
//     page,
//     reload,
//     onSuccess
// } = usePagination(
//     (page: number) =>
//         getCollectionOrder({...collectionOrderListParams.value, page}),
//     {
//         watchingStates: [collectionOrderListParams],
//         preloadPreviousPage: false, // 关闭预加载上一页数据
//         preloadNextPage: false,
//         append: true,
//         debounce: [500],
//         data: (res) => res.order_list,
//         initialPage: 1, // 初始页码，默认为1
//         initialPageSize: 10
//     }
// );
//
// /**
//  * 立即发送
//  */
// const {
//     loading,
//     data: countryList,
// } = useRequest(() => getCityTree(), {
//     initialData: [],
//     immediate: true,
// });
