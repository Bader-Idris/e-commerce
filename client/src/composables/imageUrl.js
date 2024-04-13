const getImageUrl = (name, ext = 'png') => {
  return new
    URL(`../assets/imgs/${name}.${ext}`, import.meta.url).href;
};
const assetImgUrl = (name = "skills-0", ext, n) => {
  return getImageUrl(`${name}${n !== null && n !== undefined ? n : ''}`, ext);
}
// "import.meta.url" is a native ESM code, you can make anything of path dynamical

export {
  getImageUrl,
  assetImgUrl
}