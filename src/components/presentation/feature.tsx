import { Card, CardBody, Typography } from "@material-tailwind/react";
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
      "This template comes packed with designer files based on Figma.",
  },
  {
    icon: (
      <img className="w-32 mx-auto mb-4" src="icon2.png" />
    ),
    title: "For Developers",
    description:
      "Save months of work when you use our fully coded components and pages.",
  },
  {
    icon: (
      <img className="w-32 mx-auto mb-4" src="icon3.png" />
    ),
    title: "For Virtual & Augmented Reality",
    description:
      "Save time and money by helping your team focus on customization and features.",
  }
];

export default function FeatureLanding() {
  return (
    <section className="px-4 mt-12">
      <div className="container mx-auto mb-20 text-center">
        <div className="flex justify-center align-center relative z-5">
          <Typography color="dark" className="text-xs mr-2 font-normal">
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

