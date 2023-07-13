import { GetStaticPropsContext } from "next";
import pick from "lodash/pick";

export const getLocaleStaticsProps = (keys?: string[]) => async ({ locale }: GetStaticPropsContext) => {
  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    props: {
      messages: keys ? pick(messages, keys) : messages
    }
  };
}