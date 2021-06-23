export type Size = 'xxs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  src?: string;
  size?: Size;
  name: string;
}

export const HashSize: Record<Size, number> = {
  xxs: 30,
  sm: 60,
  md: 80,
  lg: 100,
  xl: 162,
};
