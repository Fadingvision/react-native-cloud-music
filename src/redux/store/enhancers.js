// ======================================================
// 配置 Store 增强器
// ======================================================
const enhancers = []
// const __COMPONENT_DEVTOOLS__ = false;
// if (process.env.NODE_ENV === 'development') {
//   /** Redux DevTools **/

//   /* 1. Chrome 插件 Redux DevTools（默认）
//      P.S: 独立窗口可调用 window.devToolsExtension.open() */
//   if (!__COMPONENT_DEVTOOLS__) {
//     const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
//     if (typeof devToolsExtension === 'function') {
//       enhancers.push(devToolsExtension())
//     }
//   }

//   /* 2. 内嵌在页面中的 Redux DevTools 组件 */
//   // if (__COMPONENT_DEVTOOLS__) {
//   //   const DevTools = require('COMPONENT/DevTools').default
//   //   enhancers.push(DevTools.instrument())
//   // }
// }

export default enhancers
