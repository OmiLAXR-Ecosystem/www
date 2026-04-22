export function DevPresentation() {
  return (
    <div className="h-full w-screen place-items-center bg-white py-20">
      <div className="container mx-auto grid items-center relative lg:grid-cols-2">
        <div className="mb-3">
          <p className="flex items-center font-bold text-lg mb-5 text-blue">
            Attention to high-quality and consistent xAPI statements
          </p>
          <h2 className="mb-7 leading-tight text-gray-900 text-3xl font-bold">
            We use xAPI consistent and IDE-supported.
          </h2>
          <p className="text-gray-900 lg:pr-32">
            Using our ecosystem you can get high-quality xAPI statements and ensure consistency. As your xAPI definitions are transformed to C# code, you get full IDE support.
          </p>
        </div>
        <video src="Using_xAPI_v2.webm" autoPlay={true} controls={true} className="mx-auto hidden md:flex" />
      </div>
    </div>
  );
}

export default DevPresentation;
