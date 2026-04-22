export function PublicationsPresentation() {
    return (
        <div className="h-full w-screen place-items-center bg-white py-20">
            <div className="container mx-auto grid items-center relative lg:grid-cols-2">
                <div className="mb-8">
                    <p className="flex items-center font-bold text-lg mb-5 text-blue">
                        Attention to high-quality code
                    </p>
                    <h2 className="mb-4 leading-tight text-gray-900 text-3xl font-bold">
                        Develop consistently using Astro architecture principles
                    </h2>
                    <p className="text-gray-900 lg:pr-32">
                        Using AstroLaunch UI you get everything you need to start creating your fully functional and responsive Ecommerce website in days, not months.
                    </p>
                </div>
                <img src="consistenly.png" alt="components" className="mx-auto hidden md:flex" />
            </div>
        </div>
    );
}

export default PublicationsPresentation;
