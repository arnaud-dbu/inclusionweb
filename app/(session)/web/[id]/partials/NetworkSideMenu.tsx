import { Btn } from '@/components/Buttons';
import DivisionLine from '@/components/DivisionLine';
import { H1 } from '@/components/Headings';
import AvatarComponent from '@/components/avatar/AvatarComponent';
import { AddUserIcon, GridIcon, ListIcon, SearchIcon } from '@/public/icons';
import Image from 'next/image';

type Props = {
  data: any;
  setModalVisible: any;
};

const NetworkSideMenu = ({ data, setModalVisible }: Props) => {
  return (
    <aside className="bg-primary-200 flex flex-col shadow-lg absolute left-24 w-[25%] h-full px-16 pt-12">
      <div className="flex flex-col">
        <span className="text-3xl text-neutral-800">Inclusieweb</span>
        <H1 underline>{data.name}</H1>
      </div>
      <div className="form-input relative my-6">
        <SearchIcon className="w-6 fill-neutral-900 absolute right-4 top-1/2 -translate-y-1/2 opacity-30" />
        <input placeholder="Zoek" />
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center">
          <button className="bg-primary-400 text-primary-800 px-4 py-[.5rem] font-semibold rounded-full whitespace-nowrap">
            Niet geplaatst
          </button>
          <button className="text-neutral-800 px-4 py-[.5rem] font-semibold rounded-full whitespace-nowrap">
            Geplaatst
          </button>
        </div>
        <DivisionLine />
        <div className="flex items-center gap-2 ml-4">
          <button>
            <ListIcon className="fill-neutral-600 w-8" />
          </button>
          <button>
            <GridIcon className="fill-neutral-600 w-8" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-y-4 my-5">
        <div className="bg-white w-[48%] flex flex-col items-center justify-center shadow-lg rounded-xl h-[14rem]">
          <AvatarComponent
            data={data.avatar}
            className="w-24 h-24 bg-primary-500 mb-2 rounded-full shadow-lg object-cover"
          />
          <span className="font-bold text-neutral-800 text-xl">Jane Doe</span>
          <span className="text-neutral-800 font-light">Babysit</span>
        </div>
        <div className="bg-white w-[48%] flex flex-col items-center justify-center shadow-lg rounded-xl h-[14rem]">
          <AvatarComponent
            data={data.avatar}
            className="w-24 h-24 bg-primary-500 mb-2 rounded-full shadow-lg object-cover"
          />

          <span className="font-bold text-neutral-800 text-xl">Jane Doe</span>
          <span className="text-neutral-800 font-light">Babysit</span>
        </div>
        <div className="bg-white w-[48%] flex flex-col items-center justify-center shadow-lg rounded-xl h-[14rem]">
          <AvatarComponent
            data={data.avatar}
            className="w-24 h-24 bg-primary-500 mb-2 rounded-full shadow-lg object-cover"
          />

          <span className="font-bold text-neutral-800 text-xl">Jane Doe</span>
          <span className="text-neutral-800 font-light">Babysit</span>
        </div>
        <div className="bg-white w-[48%] flex flex-col items-center justify-center shadow-lg rounded-xl h-[14rem]">
          <AvatarComponent
            data={data.avatar}
            className="w-24 h-24 bg-primary-500 mb-2 rounded-full shadow-lg object-cover"
          />

          <span className="font-bold text-neutral-800 text-xl">Jane Doe</span>
          <span className="text-neutral-800 font-light">Babysit</span>
        </div>
      </div>

      <Btn
        onClick={() => setModalVisible(true)}
        className="w-full mt-auto mb-8"
        primary
        submit
      >
        <AddUserIcon className="w-6 fill-white mr-2" />
        Nieuw
      </Btn>
    </aside>
  );
};

export default NetworkSideMenu;
