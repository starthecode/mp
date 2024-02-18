import { UserSessionParams } from '@/types';

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function getNameInitials(name: string) {
  const nameParts = name?.split(' ');

  let firstName = '';
  let lastName = '';
  let fullName = '';

  if (nameParts?.length >= 2) {
    firstName = nameParts[0].charAt(0);
    lastName = nameParts[1].charAt(0);
    fullName = firstName + lastName;
  }

  return fullName;
}

export const handleError = (error: unknown) => {
  console.error(error);
  throw new Error(`Error adding category: ${error}`);
  // throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
};

//for download link generation

export function genDownloadUrl(url: string) {
  if (url) {
    const anchor = document.createElement('a');
    anchor.href = `/assets/product/downloads/${url}`;
    anchor.download = ''; // Optional: set the default download filename
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
}

export function setPathName(pathName: string) {
  window.localStorage.setItem('path', pathName);
}

export const isAdmin = (user: UserSessionParams): boolean => {
  return user?.roles?.includes('admin');
};
