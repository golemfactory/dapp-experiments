export const FooterItem = ({ item }) => {
  return (
    <li>
      <a
        href={item.href}
        target="_blank"
        className="text-sm leading-6 text-gray-400 hover:text-gray-600"
      >
        {item.name}
      </a>
    </li>
  );
};
