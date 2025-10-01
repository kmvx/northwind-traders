import React from 'react';
import Image from 'next/image';
import { ExternalLinkIcon } from 'lucide-react';
import { Button } from '@/components/ui';

const About: React.FC = () => {
  return (
    <div className="flex flex-col xl:flex-row h-full bg-blue-950 text-[max(1.5rem,1vw)]">
      <div className="w-full xl:w-3/5">
        <Image
          alt=""
          src="https://images.unsplash.com/photo-1508185066415-13f4acf9b564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1959&q=80"
          className="w-full h-full object-cover"
          width="1959"
          height="1073"
        />
      </div>
      <div className="flex flex-col justify-center text-white xl:w-2/5 sm:p-[2vw]">
        <h1 className="m-2 my-5 text-[max(3rem,3vw)] tracking-widest">
          North&shy;wind Traders
        </h1>
        <div className="m-2 text-gray-300">
          <p>
            <span>This is a demo web application client for </span>
            <Button
              variant="link"
              asChild
              className="text-blue-400 inline-flex items-center gap-1 text-[length:inherit] h-auto p-0 has-[>svg]:px-0"
            >
              <a
                href="https://en.wikiversity.org/wiki/Database_Examples/Northwind"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 inline-flex items-center gap-1"
              >
                Northwind database <ExternalLinkIcon size={16} />
              </a>
            </Button>
            .
          </p>
          <p>
            See{' '}
            <Button
              variant="link"
              asChild
              className="text-blue-400 inline-flex items-center gap-1 text-[length:inherit] h-auto p-0 has-[>svg]:px-0"
            >
              <a
                href="https://kmvx.pages.dev/projects/northwind-traders"
                target="_blank"
                rel="noreferrer"
              >
                project description <ExternalLinkIcon size={16} />
              </a>
            </Button>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
