const FooterLinkItem = ({ item }) => (
  <li key={item.name}>
    <a
      href={item.href}
      target="_blank"
      className="text-sm leading-6 text-gray-500 hover:text-gray-300"
    >
      {item.name}
    </a>
  </li>
);

export default FooterLinkItem;
