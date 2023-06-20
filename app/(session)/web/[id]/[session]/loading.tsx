import LoadingSkeleton from "@/components/LoadingSkeleton";

const WebLoadingPage = async () => {
	return (
		<div>
			<div className={`h-full w-full overflow-hidden lg:flex`}>
				<LoadingSkeleton className="fixed top-0 z-10 mt-16 h-screen  w-full bg-primary-200 shadow-lg lg:relative lg:mt-0 lg:w-[30rem] 3xl:w-[40rem]" />
				<div className={`flex h-screen w-full items-center justify-center`}>
					<LoadingSkeleton className="h-[50vw] w-[50vw] rounded-full" />
				</div>
			</div>
		</div>
	);
};

export default WebLoadingPage;
