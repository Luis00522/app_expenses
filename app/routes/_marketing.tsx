import { Outlet } from "@remix-run/react";

import marketingStyles from "../styles/marketing.css?url";
import sharedStyles from "../styles/shared.css?url";
import MainHeader from "../components/navigation/MainHeader";
import { LoaderFunctionArgs } from "@remix-run/node";
import { getUserFromSession } from "../data/auth.server";

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />;
    </>
  );
}

export function links() {
  return [
    { rel: "stylesheet", href: marketingStyles },
    {
      rel: "stylesheet",
      href: sharedStyles,
    },
  ];
}

export async function loader({ request }: LoaderFunctionArgs) {
  return await getUserFromSession(request);
}
