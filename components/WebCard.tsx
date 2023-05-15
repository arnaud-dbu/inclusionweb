import { Btn } from "./Buttons"
import Web from "./Web"

type Props = {}

const WebCard = (props: Props) => {
    return (
        <article className="flex justify-between rounded-3xl p-10 text-neutral-800 border-[1.5px] border-neutral-600">
            <div className="">
                <div>
                    <span>Inclusieweb</span>
                    <span>Annelies Jacobs</span>
                </div>
                <div>
                    <Btn primary>Open</Btn>
                </div>
            </div>
            <Web className="w-[12.5rem] aspect-square" />
        </article>
    )
}

export default WebCard