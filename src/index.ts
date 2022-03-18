import { TerraformStack } from "cdktf";

export class TFModuleStack extends TerraformStack {
  public toTerraform(): any {
    const tf = super.toTerraform();
    delete tf.provider;
    return tf;
  }
}
