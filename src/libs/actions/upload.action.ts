'use server';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export const uploadFile = async ({ formData }: any) => {
  // const fileData = await formData.formData();

  let f = null;

  if (formData.has('downloadLink')) {
    f = formData.get('downloadLink');
  }
  if (formData.has('imageUrl')) {
    f = formData.get('imageUrl');
  }

  if (!f) {
    return NextResponse.json({}, { status: 400 });
  }

  const file = f as File;
  console.log(`File name: ${file.name}`);
  console.log(`Content-Length: ${file.size}`);

  const destinationDirPath = path.join(
    process.cwd(),
    'public/assets/product/images'
  );
  console.log(destinationDirPath);

  const fileArrayBuffer = await file.arrayBuffer();

  if (!existsSync(destinationDirPath)) {
    fs.mkdir(destinationDirPath, { recursive: true });
  }
  await fs.writeFile(
    path.join(destinationDirPath, file.name),
    Buffer.from(fileArrayBuffer)
  );

  return JSON.parse(
    JSON.stringify({
      fileName: file.name,
      size: file.size,
      lastModified: new Date(file.lastModified),
    })
  );
};
