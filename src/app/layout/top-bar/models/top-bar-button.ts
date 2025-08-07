import { Icons } from '../../../shared/icons';

export interface TopBarButton {
  callback?: () => void;
  icon: Icons;
}
