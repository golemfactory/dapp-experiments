import { FooterItem } from "./FooterItem";

export const FooterList = ({ links, classes }) => {
  return (
    <ul role="list" className={`${classes} mt-6 space-y-4`}>
      {links.map((item) => (
        <FooterItem key={item.name} item={item} />
      ))}
    </ul>
  );
};
