import { TopBarButton } from './top-bar-button';

export interface TopBarConfig {
  title: string;
  centerTitle: boolean;
  transparent: boolean;
  leftButtons: TopBarButton[];
  rightButtons: TopBarButton[];
}
