// To be honest I want to create ImageProvider like assetsGen in Flutter....

class ImageElement {
  public imgPath: string;
  public imgObject: any;
  constructor(imgPath: string, imgObject: any) {
    this.imgPath = imgPath;
    this.imgObject = imgObject;
  }
}

class ImageProvider {
  static imgMountain1 = new ImageElement(
    "./assets/images/mountains-1.jpg",
    require("../assets/images/mountains-1.jpg")
  );
  static imgMountain2 = new ImageElement(
    "./assets/images/mountains-2.jpg",
    require("../assets/images/mountains-2.jpg")
  );
  static imgMountain3 = new ImageElement(
    "./assets/images/mountains-3.jpg",
    require("../assets/images/mountains-3.jpg")
  );
  static imgMountain4 = new ImageElement(
    "./assets/images/mountains-4.jpg",
    require("../assets/images/mountains-4.jpg")
  );
  static imgMountain5 = new ImageElement(
    "./assets/images/mountains-5.jpg",
    require("../assets/images/mountains-5.jpg")
  );
}

export default ImageProvider;
