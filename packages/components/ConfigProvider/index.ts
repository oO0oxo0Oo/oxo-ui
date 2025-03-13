import ConfigProvider from "./ConfigProvider.vue";
import {withInstall }from '@oxo-ui/utils'

export const OxoConfigProvider = withInstall(ConfigProvider)

export * from './types'
export * from './hooks'
