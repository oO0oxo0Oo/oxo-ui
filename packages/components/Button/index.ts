// 导入名为 'Button' 的 Vue 单文件组件
import Button from './Button.vue';
import ButtonGroup from './ButtonGroup.vue';

import { withInstall } from '@oxo-ui/utils';

// 使用 withInstall 函数为导入的 Button 组件添加安装功能，
// 使其可以作为 Vue 插件轻松地被其他应用安装和使用
export const OxButton = withInstall(Button);
export const OxButtonGroup = withInstall(ButtonGroup);
/**
 * 导出 './types' 文件中的所有类型定义。
 * 这个操作使得其他模块能够访问并使用 './types' 中定义的类型。
 */
export * from './types'