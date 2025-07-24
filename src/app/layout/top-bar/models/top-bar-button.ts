import { TopBarButtonType } from './top-bar-button-type';

export interface TopBarButton {
  callback?: () => void;
  type: TopBarButtonType;
}
