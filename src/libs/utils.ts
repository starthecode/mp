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
