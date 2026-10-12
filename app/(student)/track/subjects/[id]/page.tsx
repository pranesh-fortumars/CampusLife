export { default } from '@/app/(student)/track/subjects/dbms/page';

export function generateStaticParams() {
  return [
    { id: 'sub-1' },
    { id: 'sub-2' },
    { id: 'sub-3' },
    { id: 'sub-4' },
    { id: 'sub-5' },
    { id: 'dbms' },
    { id: 'os' },
    { id: 'cn' }
  ];
}

export const dynamicParams = true;
