// 'use server';
// import fs from 'fs/promises';
// import { existsSync } from 'fs';
// import { NextResponse } from 'next/server';
// import path from 'path';

// export const uploadFile = async ({ formData }: any) => {
//   // const fileData = await formData.formData();

//   let f = null;

//   if (formData.has('downloadLink')) {
//     f = formData.get('downloadLink');
//   }
//   if (formData.has('imageUrl')) {
//     f = formData.get('imageUrl');
//   }

//   if (!f) {
//     return NextResponse.json({}, { status: 400 });
//   }

//   const file = f as File;
//   // console.log(`File name: ${file.name}`);
//   // console.log(`Content-Length: ${file.size}`);

//   const fileArrayBuffer = await file.arrayBuffer();

//   if (formData.has('imageUrl')) {

//     alert(1);

//     const destinationDirPath1 = path.join(
//       process.cwd(),
//       'public/assets/product/images'
//     );

//     if (!existsSync(destinationDirPath1)) {
//       fs.mkdir(destinationDirPath1, { recursive: true });
//     }

//     await fs.writeFile(
//       path.join(destinationDirPath1, file.name),
//       Buffer.from(fileArrayBuffer)
//     );
//   }

//   if (formData.has('downloadLink')) {
//     const destinationDirPath2 = path.join(
//       process.cwd(),
//       'public/assets/product/downloads'
//     );

//     if (!existsSync(destinationDirPath2)) {
//       fs.mkdir(destinationDirPath2, { recursive: true });
//     }

//     await fs.writeFile(
//       path.join(destinationDirPath2, file.name),
//       Buffer.from(fileArrayBuffer)
//     );
//   }

//   return JSON.parse(
//     JSON.stringify({
//       fileName: file.name,
//       size: file.size,
//       lastModified: new Date(file.lastModified),
//     })
//   );
// };

'use server';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export const uploadFile = async ({ formData }: any) => {
  let imageUrl = formData.get('imageUrl');
  let downloadLink = formData.get('downloadLink');

  if (!imageUrl && !downloadLink) {
    return NextResponse.json({}, { status: 400 });
  }

  let imageUrlFile = imageUrl as File | null;
  let downloadLinkFile = downloadLink as File | null;

  if (imageUrlFile) {
    await processFile(imageUrlFile, 'public/assets/product/images');
  }

  if (downloadLinkFile) {
    await processFile(downloadLinkFile, 'public/assets/product/downloads');
  }
  return JSON.parse(
    JSON.stringify({
      imageUrl: imageUrlFile ? getFileDetails(imageUrlFile) : null,
      downloadLink: downloadLinkFile ? getFileDetails(downloadLinkFile) : null,
    })
  );
};

async function processFile(file: File, destinationDir: string) {
  const fileArrayBuffer = await file.arrayBuffer();
  const destinationDirPath = path.join(process.cwd(), destinationDir);

  if (!existsSync(destinationDirPath)) {
    await fs.mkdir(destinationDirPath, { recursive: true });
  }

  await fs.writeFile(
    path.join(destinationDirPath, file.name),
    Buffer.from(fileArrayBuffer)
  );
}

function getFileDetails(file: File) {
  return {
    fileName: file.name,
    size: file.size,
    lastModified: new Date(file.lastModified),
  };
}
