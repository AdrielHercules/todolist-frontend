import { Injectable } from '@angular/core';
import { Icons, iconsFile } from '../../shared/icons';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  icons = Icons;

  getIcon(icon: Icons) {
    return iconsFile + icon;
  }
}
