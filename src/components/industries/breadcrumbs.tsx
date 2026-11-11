import { Fragment } from "react";
import Link from "next/link";

/** Visible breadcrumb trail. Pass the same items to BreadcrumbJsonLd so the two always match. */
export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={item.path}>
              {i > 0 && (
                <li aria-hidden="true" className="text-input">
                  &rsaquo;
                </li>
              )}
              <li>
                {last ? (
                  <span aria-current="page" className="font-semibold text-ink">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className="inline-block py-2 hover:text-primary">
                    {item.name}
                  </Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
