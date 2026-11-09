import type React from "react";

interface FeatureCardProps {
  icon: React.ReactNode,
  title: string,
  children: React.ReactNode
}

function FeatureCard({ icon, title, children }: FeatureCardProps) {
  return (
    <div>
      <div className="grid justify-center text-center p-4">
        {icon}
        <h5 className="mb-2 font-semibold text-gray-900 text-xl">
          {title}
        </h5>
        <p className="px-8 font-normal text-gray-700">
          {children}
        </p>
      </div>
    </div>
  );
}

const features = [
  {
    icon: (
      <img className="w-32 mx-auto mb-4" width={128} height={128} loading="lazy" decoding="async" src="/icon1.webp" alt="Researchers" />
    ),
    title: "For Researchers",
    description:
      "Ensure consistent and standardized XR data according FAIR principles.",
  },
  {
    icon: (
      <img className="w-32 mx-auto mb-4" width={128} height={128} loading="lazy" decoding="async" src="/icon2.webp" alt="Developers" />
    ),
    title: "For Developers",
    description:
      "Save a lot of repetitive work and use your time for more complex tasks.",
  },
  {
    icon: (
      <img className="w-32 mx-auto mb-4" width={128} height={128} loading="lazy" decoding="async" src="/icon3.webp" alt="XR" />
    ),
    title: "For Virtual, Mixed & Augmented Reality",
    description:
      "Compatible with several XR technologies.",
  }
];

export default function FeatureLanding() {
  return (
    <section className="px-4 mt-12">
      <div className="container mx-auto mb-20 text-center">
        <div className="flex justify-center align-center relative z-5">
          {/*<Typography color="blue" className="text-xs mr-2 font-normal">
            Framework Design, Concept & Code by Sergej Görzen, Birte Heinemann, Sam Mattiussi, Ulrik Schroeder @ RWTH Aachen University
          </Typography>*/}
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon, title, description }) => (
          <FeatureCard key={title} icon={icon} title={title}>
            {description}
          </FeatureCard>
        ))}
      </div>
    </section>
  );
}

