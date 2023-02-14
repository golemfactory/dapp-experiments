import FooterLinkItem from "./FooterLinkItem";

const FooterLinkList = ({ navigation, classes }) => (
  <ul role="list" className={`mt-6 space-y-4 ${classes}`}>
    {navigation.map((item, index) => (
      <FooterLinkItem key={index} item={item} />
    ))}
  </ul>
);

export default FooterLinkList;
