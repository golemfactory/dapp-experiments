import FooterLinkList from "./FooterLinkList";

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
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com/golemproject",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/golemfactory",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@GolemNetwork",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

const Footer = () => {
  return (
    <footer
      className="bg-primary border-t border-gray-500 mt-64 mb-16"
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
          <p className="text-sm leading-6 text-white">
            Golem Network is a decentralized computing marketplace that supports
            Web3 in a most efficient way possible
          </p>
          <div className="flex space-x-6">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                className="text-gray-600 hover:text-gray-500"
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
              <h3 className="text-sm font-semibold leading-6 text-white">
                Developers
              </h3>
              <FooterLinkList navigation={navigation.first} />
            </div>
            <div className="">
              <h3 className="text-sm font-semibold leading-6 text-white">
                Community
              </h3>
              <FooterLinkList
                navigation={navigation.second}
                classes={"col-span-4"}
              />
            </div>
            <div className="mt-10 md:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-white">
                Resources
              </h3>
              <FooterLinkList
                navigation={navigation.third}
                classes={"col-span-4"}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
