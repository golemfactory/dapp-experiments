import { FooterList } from "./FooterList";
import { FacebookIcon, GitHubIcon, TwitterIcon, YouTubeIcon } from "./Icons";

const navigation = {
  first: [
    { name: "Platform", href: "https://www.golem.network/platform" },
    {
      name: "Become a Provider",
      href: "https://www.golem.network/platform/#Become-a-provider",
    },
    { name: "Stats", href: "https://stats.golem.network/" },
  ],
  second: [
    { name: "SDK", href: "https://docs.golem.network/" },
    {
      name: "Requestor docs",
      href: "https://docs.golem.network/docs/quickstarts/python-quickstart",
    },
    {
      name: "Test harness",
      href: "https://docs.golem.network/docs/creators/tools/goth",
    },
    { name: "Github", href: "https://github.com/golemfactory" },
  ],
  third: [
    { name: "Feature projects", href: "https://www.golem.network/community" },
    {
      name: "Awesome Golem",
      href: "https://www.golem.network/community#Awesome-Golem",
    },
    {
      name: "Upcoming events",
      href: "https://www.golem.network/community#Upcoming-Events",
    },
    { name: "Blog", href: "http://blog.golemproject.net/" },
  ],
  social: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/golemproject/",
      icon: FacebookIcon,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/golemproject",
      icon: TwitterIcon,
    },
    {
      name: "GitHub",
      href: "https://github.com/golemfactory",
      icon: GitHubIcon,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@GolemNetwork",
      icon: YouTubeIcon,
    },
  ],
};

const Footer = () => {
  return (
    <footer
      className="bg-primary border-t border-gray-500 mt-64 pb-16"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="xl:grid xl:grid-cols-9 xl:gap-8 mt-8">
        <div className="space-y-8 col-span-3">
          <img
            className="h-14 -ml-2"
            src="golem_create.png"
            alt="Golem Factory"
          />
          <p className="text-sm leading-6 text-gray-500">
            Golem Network is a decentralized computing marketplace that supports
            Web3 in a most efficient way possible
          </p>
          <div className="flex space-x-6">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                className="text-golemblue hover:text-gray-500"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-7 w-7" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="col-span-1"></div>
        <div className="mt-16 grid grid-cols-12 gap-8 xl:mt-0 col-span-5">
          <div className="grid gap-y-8 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 col-span-12">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-500">
                Developers
              </h3>
              <FooterList links={navigation.first} />
            </div>
            <div className="">
              <h3 className="text-sm font-semibold leading-6 text-gray-500">
                Community
              </h3>
              <FooterList links={navigation.second} classes="col-span-4" />
            </div>
            <div className="mt-10 md:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-gray-500">
                Resources
              </h3>
              <FooterList links={navigation.third} classes="col-span-4" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
