import Search from "./Search"
import Footer from "./Footer"

function App() {
    return (
        <div className="bg-gray-50 min-h-screen pt-10">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <Search></Search>
                <Footer></Footer>
            </div>
        </div>
    )
}

export default App
