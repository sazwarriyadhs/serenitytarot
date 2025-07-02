'use client';

import * as icons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

// This creates a type with all the icon names from lucide-react.
// It excludes non-icon exports.
export type IconName = keyof Omit<typeof icons, 'createLucideIcon' | 'LucideIcon' | 'default'>;


interface DynamicIconProps extends LucideProps {
  name: IconName;
}

export const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    // Fallback for icons that might not exist
    return null;
  }

  return <IconComponent {...props} />;
};
