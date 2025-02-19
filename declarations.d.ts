declare module 'framer-motion' {
  export const motion: any;
  export const AnimatePresence: any;
  export * from 'framer-motion/types';
}

declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  
  interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number;
  }

  export const Heart: FC<IconProps>;
  export const ShoppingBasket: FC<IconProps>;
  export const Search: FC<IconProps>;
  export const User: FC<IconProps>;
  export const Menu: FC<IconProps>;
  export const ChevronDown: FC<IconProps>;
  export const ChevronRight: FC<IconProps>;
  export const ArrowDown: FC<IconProps>;
  export const Facebook: FC<IconProps>;
  export const Instagram: FC<IconProps>;
  export const Twitter: FC<IconProps>;
  export const Utensils: FC<IconProps>;
  export const ShirtIcon: FC<IconProps>;
  export const LucideImage: FC<IconProps>;
  export const X: FC<IconProps>;
  export const LogOut: FC<IconProps>;
  export const Eye: FC<IconProps>;
  export const EyeOff: FC<IconProps>;
  export const ArrowRight: FC<IconProps>;
  export const Star: FC<IconProps>;
  export const TrendingUp: FC<IconProps>;
  export const Mail: FC<IconProps>;
  export const Trash2: FC<IconProps>;
  export const Plus: FC<IconProps>;
  export const Minus: FC<IconProps>;
  export const Truck: FC<IconProps>;
  export const Headphones: FC<IconProps>;
  export const CreditCard: FC<IconProps>;
  export const MapPin: FC<IconProps>;
  export const Phone: FC<IconProps>;
  export const Clock: FC<IconProps>;
  export const ChevronLeft: FC<IconProps>;
  export const Percent: FC<IconProps>;
}
