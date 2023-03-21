import Search from "../components/Search";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen pt-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Search />
        <Footer />
      </div>
    </div>
  );
}
