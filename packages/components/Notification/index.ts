import Notification from "./methods";
import {withInstallFunction} from '@oxo-ui/utils'

export const OxNotification = withInstallFunction(Notification, '$notify')

export * from './types'
