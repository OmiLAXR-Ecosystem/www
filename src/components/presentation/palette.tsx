export function PalettePresentation() {
  return (
    <div className="h-full w-full place-items-center bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="container mx-auto grid items-center relative">
        <div className="text-center lg:text-left">
          <p className="flex items-center justify-center lg:justify-start font-bold text-lg mb-5 text-blue">
            Attention to our design
          </p>
          <h2 className="mb-8 leading-tight text-gray-900 text-3xl font-bold">
            Simple and modular structure
          </h2>
          <p className="text-gray-600 lg:pr-20">
            Modular extensible design enabled to realize all kind of tracking mechanism in a strict structure.
          </p>
        </div>
        <div>
          <img src="/pipeline/OmiLAXR_Pipeline.drawio.webp" alt="OmiLAXR Pipeline" width={2400} height={498} loading="lazy" decoding="async" style={{width: '100%'}}/>
        </div>
      </div>
    </div>
  );
}

export default PalettePresentation;
