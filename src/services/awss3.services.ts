import Aws from "aws-sdk";
import { BucketName, region, accessKeyId, secretAccessKey } from "../config";

class AwsS3Services {
  private s3;

  constructor() {
    this.s3 = new Aws.S3({
      region,
      accessKeyId,
      secretAccessKey,
    });
  }

  public async upload(file: any): Promise<any> {
    try {
      const fileSplit = file.name.split(".");
      const fileType = fileSplit[fileSplit.length - 1];
      const fileName = `${new Date().getTime()}.${fileType}`;
      const params = {
        Bucket: BucketName,
        Key: fileName,
        Body: file?.data,
        ContentType: file.mimetype,
      };
      const data = await this.s3.upload(params).promise();
      console.log(data);

      return data;
    } catch (error) {
      new Error();
      return false;
    }
  }

  async get(key: string) {
    const params = {
      Bucket: BucketName,
      Key: key,
    };
    const data = await this.s3.getObject(params).promise();
    return data;
  }

  async delete(key: string): Promise<any> {
    try {
      const params = {
        Bucket: BucketName,
        Key: key,
      };
      const data = await this.s3.deleteObject(params).promise();
      return data;
    } catch (error) {
      console.log("er", error);
      new Error();
      return false;
    }
  }
}

export default AwsS3Services;
