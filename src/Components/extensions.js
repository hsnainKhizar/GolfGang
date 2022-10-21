export const getFilename = url => {
    return url.substr(url.lastIndexOf('/') + 1);
  };
  
export const getExtention = mime => {
switch (mime) {
  case 'application/pdf':
    return '.pdf';
  case 'image/jpeg':
    return '.jpg';
  case 'image/jpg':
    return '.jpg';
  case 'image/png':
    return '.png';
  default:
    return '.jpg';
}
};