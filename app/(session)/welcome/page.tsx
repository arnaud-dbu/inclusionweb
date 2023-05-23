import { Btn } from '@/components/Buttons';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import illustration from '@/public/images/illustration-1.png';
import Image from 'next/image';
import { H1 } from '@/components/Headings';

const WelcomePage = async () => {
  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  });

  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    return redirect('/auth/login');
  }

  return (
    <section className="flex flex-col items-center gap-5 absolute left-1/2 top-[45%] -translate-y-1/2 -translate-x-1/2 w-[35rem]">
      <Image src={illustration} alt="Logo" width={700} height={700} />
      <div className="flex flex-col items-center gap-2 w-[75%]">
        <H1>Welkom</H1>
        <p className="text-center mb-4 font-secondary">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea
        </p>
        <Btn primary href="/web">
          Maak je eerste Web
        </Btn>
        <Btn secondary href="/dashboard">
          Ga naar het dashboard
        </Btn>
      </div>
    </section>
  );
};
export default WelcomePage;
