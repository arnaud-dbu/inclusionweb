import MyWeb from "./partials/MyWeb";

type Props = {
    data: any;
};

const WebPage = async ({ params }) => {
    const res = await fetch(`http://localhost:3000/api/web/${params.id}`, {
        cache: "no-store",
    });
    const data = await res.json();

    return <MyWeb data={data} />;
};

export default WebPage;
