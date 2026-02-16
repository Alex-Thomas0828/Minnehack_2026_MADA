import { mergeProps, useRender } from "@base-ui/react";
import { cva } from "class-variance-authority";

const cardVariants = cva("rounded-2xl border-3 border-border", {
  variants: {
    variant: {
      raised: "shadow-raised",
      inset: "shadow-inset",
    },
  },
  defaultVariants: {
    variant: "raised",
  },
});

export function Card(props) {
  const mergedProps = mergeProps(props, {
    className: cardVariants({
      variant: props.variant,
    }),
  });

  const element = useRender({
    defaultTagName: "div",
    render: props.render,
    props: mergedProps,
  });

  return element;
}
//Card Header
const cardHeaderVariants = cva("flex flex-col space-y-1.5 p-6");

export function CardHeader(props) {
  const mergedProps = mergeProps(props, {
    className: cardHeaderVariants(),
  });

  const element = useRender({
    defaultTagName: "div",
    render: props.render,
    props: mergedProps,
  });

  return element;
}
//Card Title
const cardTitleVariants = cva("font-semibold tracking-tight leading-none");

export function CardTitle(props) {
  const mergedProps = mergeProps(props, {
    className: cardTitleVariants(),
  });

  const element = useRender({
    defaultTagName: "div",
    render: props.render,
    props: mergedProps,
  });

  return element;
}
//Card Description
const cardDescriptionVariants = cva("text-muted-foreground text-sm");

export function CardDescription(props) {
  const mergedProps = mergeProps(props, {
    className: cardDescriptionVariants(),
  });

  const element = useRender({
    defaultTagName: "div",
    render: props.render,
    props: mergedProps,
  });

  return element;
}
//card content
const cardContentVariants = cva("p-6 pt-0");

export function CardContent(props) {
  const mergedProps = mergeProps(props, {
    className: cardContentVariants(),
  });

  const element = useRender({
    defaultTagName: "div",
    render: props.render,
    props: mergedProps,
  });

  return element;
}
//card footer
const cardFooterVariants = cva("p-6 pt-0");

export function CardFooter(props) {
  const mergedProps = mergeProps(props, {
    className: cardFooterVariants(),
  });

  const element = useRender({
    defaultTagName: "div",
    render: props.render,
    props: mergedProps,
  });

  return element;
}
