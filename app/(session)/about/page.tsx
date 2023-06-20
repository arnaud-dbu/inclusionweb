import Header from "@/components/Header";
import { H3, P } from "@/components/Typography";
import { MethodicIllustration } from "@/public/illustrations";
import Image from "next/image";

type Props = {};

const AboutPage = (props: Props) => {
	return (
		<>
			<Header title="Over Resokit" />
			<div className="layout-wrapper flex flex-col gap-14 md:flex-row">
				<section className={`w-[100%] md:w-[50%]`}>
					<div className={`mb-5`}>
						<P
							className="text-sm italic"
							text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse risus leo, lobortis ac eros at, eleifend rhoncus nulla. Suspendisse rhoncus accumsan nibh sit amet interdum. Integer luctus accumsan purus, sed imperdiet metus."
						/>
					</div>

					<div className={`mb-12`}>
						<H3 className={`mb-5`} title="Title 1" />
						<P
							className="non-italic"
							text="Aliquam mattis tellus quis laoreet aliquet. Etiam mollis fringilla vestibulum. Nunc sollicitudin quam at mauris faucibus, id suscipit ante dapibus. Integer diam ipsum, hendrerit quis consectetur eget, sodales in magna. Sed malesuada feugiat augue vitae aliquet. Cras a massa justo. Aenean commodo, ligula nec vehicula ultricies, nulla purus accumsan nisi, vitae suscipit neque elit faucibus metus. Proin tempor, est at porttitor molestie, ipsum urna maximus risus, eu volutpat urna nunc sed dolor. Cras quam orci, vulputate et sem ullamcorper, faucibus mollis lorem. Maecenas pellentesque dolor eget gravida suscipit. Aliquam tempus in magna in feugiat. Curabitur eleifend imperdiet massa, non ornare elit rhoncus quis. "
						/>
					</div>
					<div className={`mb-12`}>
						<H3 className={`mb-5`} title="Title 2" />
						<P
							className="non-italic"
							text="Mauris gravida leo dolor, gravida sodales neque laoreet sed. Donec cursus et nisl quis malesuada. Proin rhoncus lacus quis venenatis tincidunt. Integer convallis quam massa, a aliquet dui laoreet at. Quisque vehicula ornare odio, vitae porta risus bibendum efficitur. Sed mattis posuere enim pellentesque vestibulum. Ut ac ligula dui. Donec maximus odio eget elit varius molestie. Donec ac gravida dui. Fusce eleifend quam felis, vel placerat ex mattis nec. Nam blandit fermentum metus, non tincidunt sem malesuada eu. Praesent eros purus, sollicitudin non auctor sit amet, ultricies sed odio. "
						/>
					</div>
				</section>
				<Image
					src={MethodicIllustration}
					className={`h-fit w-[45%] object-contain 2xl:w-[30rem]`}
					width={600}
					height={600}
					alt="illustration"
				/>
			</div>
		</>
	);
};

export default AboutPage;
