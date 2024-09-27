import { Card, CardBody, Typography } from "../../materialTailwind";
import type React from "react";

interface FeatureCardProps {
  icon: React.ReactNode,
  title: string,
  children: React.ReactNode
}

function FeatureCard({ icon, title, children }: FeatureCardProps) {
  return (
    <Card color="transparent" shadow={false}>
      <CardBody className="grid justify-center text-center">
        {icon}
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2 !font-semibold"
        >
          {title}
        </Typography>
        <Typography
          color="blue-gray"
          className="px-8 font-normal text-gray-700"
        >
          {children}
        </Typography>
      </CardBody>
    </Card>
  );
}

const features = [
  {
    icon: (
      <img className="w-32 mx-auto mb-4" src="icon1.png" />
    ),
    title: "For Researchers",
    description:
      "Ensure consistent and standardized XR data according FAIR principles.",
  },
  {
    icon: (
      <img className="w-32 mx-auto mb-4" src="icon2.png" />
    ),
    title: "For Developers",
    description:
      "Save a lot of repetitive work and use your time for more complex tasks.",
  },
  {
    icon: (
      <img className="w-32 mx-auto mb-4" src="icon3.png" />
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
          <Typography color="blue" className="text-xs mr-2 font-normal">
            Framework Design, Concept & Code by Sergej Görzen, Birte Heinemann, Sam Mattiussi, Ulrik Schroeder @ RWTH Aachen University
          </Typography>
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

