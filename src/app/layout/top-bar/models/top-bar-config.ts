import { TopBarButton } from './top-bar-button';

export interface TopBarConfig {
  title: string;
  centerTitle: boolean;

  homeButton?: TopBarButton;
  returnButton?: TopBarButton;
  shareButton?: TopBarButton;
  deleteButton?: TopBarButton;
  checkAllButton?: TopBarButton;
  userButton?: TopBarButton;
}
