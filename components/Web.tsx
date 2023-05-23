'use client';

import Image from 'next/image';
import Avatar from 'avataaars';

type Props = {
  className: string;
  image: string;
  skinColor: any;
  accessoriesType: any;
  hairColor: any;
  facialHairType: any;
  clotheType: any;
  eyeType: any;
  eyebrowType: any;
  mouthType: any;
  topType: any;
  showOnWeb: string;
};

const Web = ({
  className,
  showOnWeb,
  image = '',
  skinColor,
  topType,
  accessoriesType,
  hairColor,
  facialHairType,
  clotheType,
  eyeType,
  eyebrowType,
  mouthType,
}: Props) => {
  return (
    <>
      <div className={`web ${className}`}>
        <div className="web-inner opacity-20"></div>
        <div className="web-inner opacity-20 scale-[.8]"></div>
        <div className="web-inner opacity-25 scale-[.6]"></div>
        {showOnWeb === 'default' && (
          <div className="absolute rounded-full object-cover left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"></div>
        )}
        {showOnWeb === 'image' && (
          <Image
            className="absolute rounded-full w-[20rem] aspect-square object-cover left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
            alt="test"
            src={image || '/'}
            width={700}
            height={700}
          />
        )}
        {showOnWeb === 'avatar' && (
          <Avatar
            className="absolute bg-white rounded-full w-[20rem] h-[20rem]  object-cover left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
            avatarStyle=""
            topType={topType}
            skinColor={skinColor}
            accessoriesType={accessoriesType}
            hairColor={hairColor}
            facialHairType={facialHairType}
            clotheType={clotheType}
            eyeType={eyeType}
            eyebrowType={eyebrowType}
            mouthType={mouthType}
          />
        )}
        <div className="web-inner opacity-30 scale-[.4]"></div>
        <div className="web-inner opacity-30 scale-[.2]"></div>
      </div>
    </>
  );
};

export default Web;
