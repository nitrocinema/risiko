import {Image} from "@nextui-org/react";

export default function Dice(props: { num: number, team: string}) {
    const src = `/dices/${props.num}-${props.team}.PNG`;
    if (props.num == 0){
        return <></>
    }
    return (
        <Image
            width={150}
            height={150}
            src={src}
            alt="Dice"
            objectFit="cover"
        />
    );
}
