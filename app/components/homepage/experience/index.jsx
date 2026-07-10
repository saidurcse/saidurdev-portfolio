// @flow strict

"use client";

import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import codeAnim from '../../../assets/lottie/code.json';
import codingAnim from '../../../assets/lottie/coding.json';
import dynamic from 'next/dynamic';
import GlowCard from "../../helper/glow-card";

const AnimationLottie = dynamic(
  () => import("@/app/components/helper/animation-lottie"),
  { ssr: false }
);

function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative z-10 border-t my-12 lg:my-24 border-[#25213b] scroll-mt-20">
      <Image
        src="/section.svg"
        alt=""
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
        priority={false}
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <h2 id="experience-heading" className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Experiences
          </h2>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col justify-start items-center gap-6 lg:sticky lg:top-24 lg:self-start order-1">
            <div className="w-full">
              <AnimationLottie animationPath={codeAnim} />
            </div>
            <div className="w-full">
              <AnimationLottie animationPath={codingAnim} />
            </div>
          </div>

          <div className="order-2">
            <div className="flex flex-col gap-6">
              {
                experiences.map(experience => (
                  <GlowCard key={experience.id} identifier={`experience-${experience.id}`}>
                    <div className="p-3 relative">
                      <Image
                        src="/blur-23.svg"
                        alt=""
                        width={1080}
                        height={200}
                        className="absolute bottom-0 opacity-80"
                        priority={false}
                      />
                      <div className="flex justify-center">
                        <p className="text-xs sm:text-sm text-[#16f2b3]">
                          {experience.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-8 px-3 py-5">
                        <div className="text-violet-500  transition-all duration-300 hover:scale-125">
                          <BsPersonWorkspace size={36} aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-xl mb-2 font-medium uppercase">
                            {experience.title}
                          </h3>
                          <p className="text-sm sm:text-base">
                            {experience.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;