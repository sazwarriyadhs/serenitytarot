import Image from 'next/image';
import type { ComponentProps } from 'react';

export function Logo(props: Omit<ComponentProps<typeof Image>, 'src' | 'alt'>) {
  return (
    <Image
      src="/images/logo.png"
      alt="Mystic Agenda Logo"
      width={32}
      height={32}
      {...props}
    />
  );
}
