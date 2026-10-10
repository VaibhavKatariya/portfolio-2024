import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import { JSX } from "react";
import { highlight } from "sugar-high";
import Counter from "./Counter";

function Code({ children, ...props }: React.ComponentPropsWithoutRef<"code">) {
  const codeHTML = typeof children === "string" ? highlight(children) : "";
  if (!codeHTML) {
    return <code {...props}>{children}</code>;
  }
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

const components = {
  code: Code,
  Counter,
};

export default function MDXContent(
  props: JSX.IntrinsicAttributes & MDXRemoteProps,
) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
