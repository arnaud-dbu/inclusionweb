import AvatarComponent from '@/components/avatar/AvatarComponent';
import WebDivisionLine from '@/components/web/WebDivisionLine';
import WebSliceNaming from '@/components/web/WebSliceNaming';
import Image from 'next/image';

type Props = {
  data: any;
};

const Web = ({ data }: Props) => {
  return (
    <div className="w-[70%] absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
      <div className={`web w-[60rem]`}>
        <div className="web-inner z-20 opacity-10 scale-[1.04]"></div>
        <div className="web-inner opacity-20 scale-[.95]"></div>
        <div className="web-inner opacity-20 scale-[.75]"></div>
        <div className="web-inner opacity-20 scale-[.55]"></div>
        <div className="web-inner opacity-25 scale-[.35]"></div>

        {data.image_path && (
          <Image
            className="absolute-center z-50 w-[10rem] rounded-full aspect-square object-cover"
            alt="test"
            src={`${process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_URL}${data.image_path}`}
            width={700}
            height={700}
          />
        )}
        {data.avatar && (
          <AvatarComponent
            data={data.avatar}
            className="absolute-center w-[10rem] z-50 h-[10rem] bg-primary-500 mb-2 rounded-full object-cover"
          />
        )}

        <WebDivisionLine className="rotate-[0deg]" />
        <WebSliceNaming name="Wonen" className="rotate-[20deg]" />
        <WebDivisionLine className="rotate-[40deg]" />
        <WebSliceNaming
          name="Hulpverlening, diensten"
          className="rotate-[60deg]"
        />
        <WebDivisionLine className="rotate-[80deg]" />
        <WebSliceNaming name="Buurt, gemeenschap" className="rotate-[100deg]" />
        <WebDivisionLine className="rotate-[120deg]" />
        <WebSliceNaming name="Familie" className="rotate-[140deg]" />
        <WebDivisionLine className="rotate-[160deg]" />
        <WebSliceNaming name="Onderwijs" className="rotate-[180deg]" />
        <WebDivisionLine className="rotate-[200deg]" />
        <WebSliceNaming name="Onderwijs" className="rotate-[220deg]" />
        <WebDivisionLine className="rotate-[240deg]" />
        <WebSliceNaming name="Vrije tijd" className="rotate-[260deg]" />
        <WebDivisionLine className="rotate-[280deg]" />
        <WebSliceNaming name="Levensbeschouwing" className="rotate-[300deg]" />
        <WebDivisionLine className="rotate-[320deg]" />
        <WebSliceNaming name="Internet" className="rotate-[340deg]" />
      </div>
    </div>
  );
};

export default Web;
