import { NullProvider, Resource } from "@cdktf/provider-null";
import { Testing } from "cdktf";
import { Construct } from "constructs";
import { TFModuleStack } from "../src";

test("synthesizes a provider", () => {
  const app = Testing.app();
  class MyStack extends TFModuleStack {
    constructor(scope: Construct, id: string) {
      super(scope, id);

      new NullProvider(this, "null");
      new Resource(this, "resource");
    }
  }
  const stack = new MyStack(app, "MyStack");
  expect(Testing.synth(stack)).toMatchInlineSnapshot(`
    "{
      \\"resource\\": {
        \\"null_resource\\": {
          \\"resource\\": {
          }
        }
      },
      \\"terraform\\": {
        \\"required_providers\\": {
          \\"null\\": {
            \\"source\\": \\"null\\",
            \\"version\\": \\"~> 2.0\\"
          }
        }
      }
    }"
  `);
});
